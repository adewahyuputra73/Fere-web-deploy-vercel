"use client";

import { Suspense, useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
    CheckCircle2, Ticket, Printer, Share2, Home, CreditCard,
    ChevronRight, FileText, Truck, MessageCircle, BellOff, ShoppingBag, Eye,
} from "lucide-react";

// ── WhatsApp Notification Bottom Sheet ────────────────────────────────────────
function WhatsAppNotifSheet({
    open,
    onClose,
    storeName,
    storePhone,
    customerName,
    orderNumber,
}: {
    open: boolean;
    onClose: () => void;
    storeName: string;
    storePhone: string;
    customerName: string;
    orderNumber: string;
}) {
    const template = encodeURIComponent(
        `Halo ${storeName}, saya ${customerName} dengan pesanan #${orderNumber}. Mohon kabari saya via WhatsApp ini ketika pesanan sudah dikirim atau ada update status pengiriman. Terima kasih! 🙏`
    );
    const waUrl = `https://wa.me/${storePhone}?text=${template}`;

    if (!open) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
                onClick={onClose}
            />
            {/* Sheet */}
            <div
                className="fixed bottom-0 left-0 right-0 z-50 rounded-t-[2rem] p-6 pb-10 max-w-lg mx-auto"
                style={{ backgroundColor: "#FFFBF5", boxShadow: "0 -8px 40px rgba(28,10,0,0.15)" }}
            >
                {/* Handle */}
                <div
                    className="w-10 h-1.5 rounded-full mx-auto mb-6"
                    style={{ backgroundColor: "rgba(124,74,30,0.2)" }}
                />

                {/* Icon */}
                <div
                    className="h-16 w-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: "#DCFCE7" }}
                >
                    <MessageCircle className="h-8 w-8" style={{ color: "#16A34A" }} />
                </div>

                <h2
                    className="text-xl font-black text-center mb-2 tracking-tight"
                    style={{ color: "#1C0A00" }}
                >
                    Mau update status pengiriman?
                </h2>
                <p
                    className="text-sm font-medium text-center mb-6 px-2 leading-relaxed"
                    style={{ color: "#6B4C2A" }}
                >
                    Kirim pesan ke WhatsApp toko agar kamu dapat notif saat pesanan dikirim
                </p>

                {/* Preview template */}
                <div
                    className="rounded-2xl p-4 mb-6 text-sm font-medium leading-relaxed"
                    style={{
                        backgroundColor: "#F0FDF4",
                        border: "1.5px solid #BBF7D0",
                        color: "#166534",
                    }}
                >
                    <span
                        className="text-[10px] font-black uppercase tracking-widest block mb-2"
                        style={{ color: "#16A34A" }}
                    >
                        Pesan yang akan dikirim ke {storeName}
                    </span>
                    Halo {storeName}, saya {customerName} dengan pesanan #{orderNumber}. Mohon kabari saya via WhatsApp ini ketika pesanan sudah dikirim atau ada update status pengiriman. Terima kasih! 🙏
                </div>

                <div className="space-y-3">
                    <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={onClose}
                        className="flex items-center justify-center gap-3 w-full h-14 rounded-2xl font-black text-base transition-all active:scale-[0.98]"
                        style={{ backgroundColor: "#25D366", color: "#FFFFFF" }}
                    >
                        <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        Ya, Kirim ke WhatsApp
                    </a>
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex items-center justify-center gap-2 w-full h-12 rounded-2xl font-black text-sm transition-all active:scale-[0.98] border-2"
                        style={{
                            borderColor: "rgba(124,74,30,0.18)",
                            color: "#9C7D58",
                            backgroundColor: "transparent",
                        }}
                    >
                        <BellOff className="h-4 w-4" />
                        Tidak, terima kasih
                    </button>
                </div>
            </div>
        </>
    );
}

// ── Main Content ───────────────────────────────────────────────────────────────
function ConfirmationContent() {
    const searchParams = useSearchParams();
    const orderNumber = searchParams.get("orderNumber") || "ORD-0000";
    const customerName = searchParams.get("name") || "Pelanggan";
    const orderId = searchParams.get("orderId") || "";
    const fulfillmentType = searchParams.get("type") as "dine_in" | "pickup" | "delivery" | null;
    const hasDelivery = searchParams.get("hasDelivery") === "1";
    const storeName = searchParams.get("storeName") || "Toko";
    const storePhone = searchParams.get("storePhone") || "";

    const isDelivery = fulfillmentType === "delivery" || (!fulfillmentType && hasDelivery);
    const isPickup = fulfillmentType === "pickup";
    const isDineIn = fulfillmentType === "dine_in";

    const [showWaSheet, setShowWaSheet] = useState(false);

    // Countdown untuk dine_in: blokir tombol "Kembali ke Menu" selama 8 detik
    const [countdown, setCountdown] = useState<number | null>(isDineIn ? 8 : null);
    const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        if (!isDineIn) return;
        setCountdown(8);
        countdownRef.current = setInterval(() => {
            setCountdown((prev) => {
                if (prev === null || prev <= 1) {
                    clearInterval(countdownRef.current!);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => {
            if (countdownRef.current) clearInterval(countdownRef.current);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Auto-show WA sheet setelah 800ms (hanya delivery + ada nomor WA toko)
    useEffect(() => {
        if (isDelivery && storePhone) {
            const t = setTimeout(() => setShowWaSheet(true), 800);
            return () => clearTimeout(t);
        }
    }, [isDelivery, storePhone]);

    const backButtonLocked = isDineIn && countdown !== null && countdown > 0;

    return (
        <div className="container mx-auto px-4 pt-16 pb-32 max-w-xl text-center">
            {/* Success Animation */}
            <div className="relative mb-12">
                <div className="absolute inset-0 bg-primary/20 scale-150 blur-3xl rounded-full opacity-30 animate-pulse" />
                <div className="relative h-32 w-32 rounded-[2.5rem] bg-emerald-500 shadow-2xl shadow-emerald-500/40 flex items-center justify-center mx-auto transform rotate-12 transition-transform hover:rotate-0 duration-500">
                    <CheckCircle2 className="h-16 w-16 text-white stroke-[3px]" />
                </div>
            </div>

            <h1 className="text-4xl font-black text-text-primary mb-4 tracking-tighter">
                Pesanan Diterima!
            </h1>
            <p className="text-text-secondary leading-relaxed mb-10 font-medium px-4">
                Terima kasih <span className="text-text-primary font-black">{customerName}</span>, pesanan Anda sedang kami proses.
            </p>

            {/* Order Ticket */}
            <div className="bg-white rounded-[2.5rem] border border-divider shadow-card p-10 mb-8 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Ticket className="h-40 w-40 -rotate-12" />
                </div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-text-disabled mb-2">
                    Nomor Antrean / Pesanan
                </p>
                <div className="text-5xl font-black text-primary tracking-tight mb-8">
                    #{orderNumber}
                </div>

                {/* Dine-in info: tunjukkan ke pelayan */}
                {isDineIn && (
                    <div
                        className="rounded-2xl px-4 py-3 mb-6 flex items-center gap-3 text-left"
                        style={{ backgroundColor: "#FEF3C7", border: "1.5px solid rgba(245,158,11,0.3)" }}
                    >
                        <div
                            className="h-8 w-8 rounded-xl flex items-center justify-center shrink-0"
                            style={{ backgroundColor: "#F59E0B" }}
                        >
                            <ShoppingBag className="h-4 w-4 text-white" />
                        </div>
                        <p className="text-[11px] font-bold leading-snug" style={{ color: "#92400E" }}>
                            Tunjukkan nomor ini ke pelayan atau kasir untuk konfirmasi pesananmu
                        </p>
                    </div>
                )}

                {/* Pickup info: ke kasir setelah siap */}
                {isPickup && (
                    <div
                        className="rounded-2xl px-4 py-3 mb-6 flex items-center gap-3 text-left"
                        style={{ backgroundColor: "#EFF6FF", border: "1.5px solid rgba(59,130,246,0.25)" }}
                    >
                        <div
                            className="h-8 w-8 rounded-xl flex items-center justify-center shrink-0"
                            style={{ backgroundColor: "#DBEAFE" }}
                        >
                            <Eye className="h-4 w-4" style={{ color: "#2563EB" }} />
                        </div>
                        <p className="text-[11px] font-bold leading-snug" style={{ color: "#1E40AF" }}>
                            Pantau status di bawah — kami akan beri tahu saat pesanan siap diambil
                        </p>
                    </div>
                )}

                <div className="grid grid-cols-2 gap-4 border-t border-divider pt-8">
                    <button
                        onClick={() => {
                            if (orderId) {
                                const url = `${window.location.origin}/invoice/${orderId}`;
                                const w = window.open(url, "_blank");
                                if (w) w.addEventListener("load", () => setTimeout(() => w.print(), 500));
                            }
                        }}
                        className="flex flex-col items-center gap-2 p-4 rounded-2xl hover:bg-slate-50 transition-colors group"
                    >
                        <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                            <Printer className="h-5 w-5" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Simpan PDF</span>
                    </button>
                    <button
                        onClick={async () => {
                            const url = orderId ? `${window.location.origin}/invoice/${orderId}` : window.location.href;
                            if (navigator.share) {
                                try { await navigator.share({ title: `Pesanan #${orderNumber}`, url }); } catch {}
                            } else {
                                await navigator.clipboard.writeText(url);
                                alert("Link invoice disalin ke clipboard!");
                            }
                        }}
                        className="flex flex-col items-center gap-2 p-4 rounded-2xl hover:bg-slate-50 transition-colors group"
                    >
                        <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                            <Share2 className="h-5 w-5" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Bagikan</span>
                    </button>
                </div>
            </div>

            {/* Action buttons */}
            <div className="space-y-4">

                {/* PICKUP: Pantau Status — primary CTA */}
                {isPickup && orderId && (
                    <Link
                        href={`/order/status/${orderId}`}
                        className="inline-flex items-center justify-center font-semibold transition-all duration-200 rounded-2xl active:scale-[0.98] w-full h-16 text-lg shadow-xl"
                        style={{ backgroundColor: "#F59E0B", color: "#1C0A00", boxShadow: "0 8px 24px rgba(245,158,11,0.35)" }}
                    >
                        <Eye className="mr-3 h-5 w-5" />
                        Pantau Status Pesanan
                    </Link>
                )}

                {/* DELIVERY: Lacak Pesanan */}
                {orderId && isDelivery && (
                    <Link
                        href={`/order/tracking/${orderId}`}
                        className="inline-flex items-center justify-center font-semibold transition-all duration-200 rounded-2xl active:scale-[0.98] w-full h-16 text-lg bg-emerald-500 text-white hover:bg-emerald-600 shadow-xl shadow-emerald-500/25"
                    >
                        <Truck className="mr-3 h-5 w-5" />
                        Lacak Pesanan
                    </Link>
                )}

                {/* DELIVERY: WA notif button */}
                {isDelivery && storePhone && (
                    <button
                        type="button"
                        onClick={() => setShowWaSheet(true)}
                        className="inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 rounded-2xl active:scale-[0.98] w-full h-14 text-base border-2"
                        style={{ borderColor: "#25D366", color: "#16A34A", backgroundColor: "#F0FDF4" }}
                    >
                        <MessageCircle className="h-5 w-5" />
                        Minta notif pengiriman via WA
                    </button>
                )}

                {/* Invoice (semua tipe) */}
                {orderId && (
                    <Link
                        href={`/invoice/${orderId}`}
                        className="inline-flex items-center justify-center font-semibold transition-all duration-200 rounded-2xl active:scale-[0.98] w-full h-14 text-base border-2"
                        style={{ borderColor: "rgba(245,158,11,0.4)", color: "#D97706", backgroundColor: "#FFFBEB" }}
                    >
                        <FileText className="mr-3 h-4 w-4" />
                        Lihat Invoice
                    </Link>
                )}

                {/* Ulasan (semua tipe) */}
                {orderId && (
                    <Link
                        href={`/order/review?order_id=${orderId}`}
                        className="inline-flex items-center justify-center font-semibold transition-all duration-200 rounded-2xl active:scale-[0.98] w-full h-14 text-base border-2 border-primary text-primary hover:bg-primary/5"
                    >
                        Beri Ulasan
                    </Link>
                )}

                {/* Kembali ke Menu — dikunci 8 detik untuk dine_in */}
                <Link
                    href="/order"
                    onClick={(e) => { if (backButtonLocked) e.preventDefault(); }}
                    className="inline-flex items-center justify-center font-semibold transition-all duration-200 rounded-2xl active:scale-[0.98] w-full h-16 text-lg shadow-xl"
                    style={
                        backButtonLocked
                            ? { backgroundColor: "rgba(28,10,0,0.1)", color: "#C4A882", cursor: "not-allowed", boxShadow: "none" }
                            : { backgroundColor: "#1C0A00", color: "#FFFFFF", boxShadow: "0 8px 24px rgba(28,10,0,0.25)" }
                    }
                >
                    <Home className="mr-3 h-5 w-5" />
                    {backButtonLocked
                        ? `Kembali ke Menu (${countdown})`
                        : "Kembali ke Menu"
                    }
                </Link>

                <p className="text-xs text-text-disabled font-bold uppercase tracking-widest pt-4">
                    Butuh bantuan?{" "}
                    {storePhone ? (
                        <a href={`https://wa.me/${storePhone}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                            Hubungi Toko
                        </a>
                    ) : (
                        <span className="text-primary">Hubungi Toko</span>
                    )}
                </p>
            </div>

            {/* Info card bayar — hanya dine_in & pickup */}
            {(isDineIn || isPickup || !fulfillmentType) && (
                <div className="mt-12 bg-slate-100/50 rounded-3xl p-6 border border-divider text-left flex items-start gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-white shadow-sm flex items-center justify-center shrink-0">
                        <CreditCard className="h-6 w-6 text-text-secondary" />
                    </div>
                    <div>
                        <h3 className="text-sm font-black text-text-primary mb-1">Bayar di Tempat</h3>
                        <p className="text-[11px] text-text-secondary font-medium leading-relaxed">
                            Tunjukkan nomor pesanan di atas ke meja kasir untuk melakukan pembayaran dan mengambil pesanan.
                        </p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-text-disabled mt-3 ml-auto" />
                </div>
            )}

            {/* WA Bottom Sheet */}
            <WhatsAppNotifSheet
                open={showWaSheet}
                onClose={() => setShowWaSheet(false)}
                storeName={storeName}
                storePhone={storePhone}
                customerName={customerName}
                orderNumber={orderNumber}
            />
        </div>
    );
}

export default function ConfirmationPage() {
    return (
        <Suspense fallback={
            <div className="container mx-auto px-4 pt-16 pb-32 text-center">
                <p className="text-text-secondary font-medium">Memuat rincian pesanan...</p>
            </div>
        }>
            <ConfirmationContent />
        </Suspense>
    );
}
