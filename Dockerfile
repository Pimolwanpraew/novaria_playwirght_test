FROM node:20-slim AS base

RUN apt-get update -y && apt-get install -y openssl

FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json* bun.lockb* ./
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1

ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

# ชี้ path ไปที่ src/prisma/schema.prisma
RUN npx prisma generate --schema=./src/prisma/schema.prisma
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# แก้ไข path จาก /app/prisma เป็น /app/src/prisma
COPY --from=builder --chown=nextjs:nodejs /app/src/prisma ./src/prisma

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]