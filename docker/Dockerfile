# Multi-target Dockerfile for Serendipity monorepo
FROM node:24-alpine AS base

# Dependencies stage - shared by both frontend and backend
FROM base AS dependencies
WORKDIR /app

# Copy package files for dependency installation
COPY package*.json ./

# Create directory structure and copy package.json files
RUN mkdir -p apps/backend apps/frontend packages/types

# Copy app-specific package.json files if they exist
COPY apps/backend/package*.json ./apps/backend/
COPY apps/frontend/package*.json ./apps/frontend/ 

# Copy packages package.json files if they exist
COPY packages/types/package*.json ./packages/types/

# Install all dependencies (including dev dependencies for building)
RUN npm ci && npm cache clean --force

# Builder stage - builds both applications
FROM base AS builder
WORKDIR /app

# Copy dependencies
COPY --from=dependencies /app/node_modules ./node_modules

# Copy source code and configuration files
COPY . .

# Build in correct dependency order
# First build types package (dependency)
RUN npx nx build @serendipity/types

# Then build backend and frontend
RUN npx nx build backend && npx nx build frontend

# Production dependencies - only for backend runtime
FROM base AS prod-dependencies
WORKDIR /app

# Copy package files and create directory structure
COPY package*.json ./
RUN mkdir -p apps/backend packages/types
COPY apps/backend/package*.json ./apps/backend/
COPY packages/types/package*.json ./packages/types/

# Install only production dependencies
RUN npm ci --only=production && npm cache clean --force

# =============================================================================
# BACKEND TARGET
# =============================================================================
FROM node:24-alpine AS backend
WORKDIR /app

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S backend -u 1001

# Copy built backend application
COPY --from=builder --chown=backend:nodejs /app/apps/backend/dist ./dist

# Copy production dependencies
COPY --from=prod-dependencies --chown=backend:nodejs /app/node_modules ./node_modules

# Copy necessary configuration files
COPY --chown=backend:nodejs package*.json ./
COPY --chown=backend:nodejs nx.json ./

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Expose port
EXPOSE 3000

# Switch to non-root user
USER backend

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1

# Start command
CMD ["node", "dist/index.js"]

# =============================================================================
# FRONTEND TARGET - Just build files (no nginx)
# =============================================================================
FROM alpine:latest AS frontend

# Create a simple container with just the built files
WORKDIR /app

# Copy built frontend application
COPY --from=builder /app/apps/frontend/dist ./dist

# Create a simple index to show what's available
RUN echo '#!/bin/sh' > /entrypoint.sh && \
    echo 'echo "Frontend build files are ready in /app/dist"' >> /entrypoint.sh && \
    echo 'echo "Contents:"' >> /entrypoint.sh && \
    echo 'ls -la /app/dist' >> /entrypoint.sh && \
    echo 'echo "\nTo copy files out: docker cp <container_id>:/app/dist ./frontend-dist"' >> /entrypoint.sh && \
    echo 'tail -f /dev/null' >> /entrypoint.sh && \
    chmod +x /entrypoint.sh

# Default command shows the files and keeps container running
CMD ["/entrypoint.sh"]
