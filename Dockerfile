# =========================
# Stage 1: deps
# Install dependencies only
# =========================
FROM node:24-alpine AS deps
WORKDIR /fere_web

COPY package.json package-lock.json* ./
RUN npm ci

# =========================
# Stage 2: builder
# Build the Next.js app
# =========================
FROM node:24-alpine AS builder
WORKDIR /fere_web

COPY --from=deps /fere_web/node_modules ./node_modules
COPY . .

# Build-time env (public vars saja)
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

RUN npm run build

# =========================
# Stage 3: runner
# Minimal runtime image
# =========================
FROM node:24-alpine AS runner
WORKDIR /fere_web

ENV NODE_ENV=production

# Create non-root user
RUN addgroup --system --gid 1001 nodejs \
 && adduser  --system --uid 1001 nextjs

# Copy standalone build output
COPY --from=builder --chown=nextjs:nodejs /fere_web/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /fere_web/.next/static   ./.next/static
COPY --from=builder --chown=nextjs:nodejs /fere_web/public         ./public

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
