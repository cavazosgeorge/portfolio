# Build stage
FROM oven/bun:1 AS builder
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile
COPY . .
RUN bun run build

# Production stage
FROM oven/bun:1-slim
WORKDIR /app

# Copy built assets and server code
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server ./server
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules

# Create data directory for SQLite persistence
RUN mkdir -p /app/data

# Set environment
ENV NODE_ENV=production
ENV PORT=3000
ENV DB_PATH=/app/data/portfolio.db

EXPOSE 3000

# Volume for persistent data
VOLUME ["/app/data"]

# Seed admin on startup if env vars are set, then start server
CMD bun run db:seed-admin 2>/dev/null; bun run start
