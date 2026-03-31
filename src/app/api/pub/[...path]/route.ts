import { NextRequest, NextResponse } from "next/server";

const BE_BASE = "https://qa-api.ferecorps.com/api/fereapps/v1";

// ── Token cache (module-level, hidup selama server process berjalan) ──
let cachedToken: string | null = null;
let tokenExpiresAt = 0;

async function fetchToken(): Promise<string | null> {
  const phone = process.env.STORE_PHONE;
  const password = process.env.STORE_PASSWORD;

  if (!phone || !password) {
    console.warn("[pub-proxy] STORE_PHONE / STORE_PASSWORD belum diset di .env");
    return null;
  }

  try {
    const res = await fetch(`${BE_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone_number: phone, password }),
    });

    const json = await res.json();
    // Response shape: { data: { token, user, expires_in }, ... }
    const token: string | null = json?.data?.token ?? null;

    if (token) {
      cachedToken = token;
      // Anggap token valid 23 jam (aman sebelum expire)
      tokenExpiresAt = Date.now() + 23 * 60 * 60 * 1000;
    }

    return token;
  } catch (err) {
    console.error("[pub-proxy] Gagal auto-login:", err);
    return null;
  }
}

async function getToken(): Promise<string | null> {
  if (cachedToken && Date.now() < tokenExpiresAt) {
    return cachedToken;
  }
  // Token tidak ada / sudah expired → login ulang
  cachedToken = null;
  return fetchToken();
}

// ── Proxy handler ──
async function handle(
  request: NextRequest,
  params: { path: string[] }
): Promise<NextResponse> {
  const token = await getToken();

  if (!token) {
    return NextResponse.json(
      {
        status: "error",
        message:
          "Web order belum dikonfigurasi. Tambahkan STORE_PHONE dan STORE_PASSWORD di file .env.",
      },
      { status: 503 }
    );
  }

  const endpoint = "/" + params.path.join("/");
  const beUrl = new URL(BE_BASE + endpoint);

  // Forward search params (e.g. ?limit=50)
  request.nextUrl.searchParams.forEach((value, key) => {
    beUrl.searchParams.set(key, value);
  });

  const method = request.method;
  let body: string | undefined;
  if (method !== "GET" && method !== "HEAD") {
    body = await request.text();
  }

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const beRes = await fetch(beUrl.toString(), { method, headers, body });

  // Jika token expired → clear cache, retry sekali
  if (beRes.status === 401) {
    cachedToken = null;
    tokenExpiresAt = 0;
    const newToken = await fetchToken();

    if (!newToken) {
      return NextResponse.json({ status: "error", message: "Autentikasi gagal" }, { status: 503 });
    }

    const retryRes = await fetch(beUrl.toString(), {
      method,
      headers: { ...headers, Authorization: `Bearer ${newToken}` },
      body,
    });
    const retryJson = await retryRes.json();
    return NextResponse.json(retryJson, { status: retryRes.status });
  }

  const json = await beRes.json();
  return NextResponse.json(json, { status: beRes.status });
}

// ── Export HTTP methods ──
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  return handle(request, await params);
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  return handle(request, await params);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  return handle(request, await params);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  return handle(request, await params);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  return handle(request, await params);
}
