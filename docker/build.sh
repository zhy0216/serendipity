#!/bin/bash

# Build script for Serendipity Docker images

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}Building Serendipity Docker images...${NC}"

# Build backend image
echo -e "${YELLOW}Building backend image...${NC}"
docker build -f docker/Dockerfile --target backend -t serendipity-backend:latest .

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Backend image built successfully${NC}"
else
    echo -e "${RED}✗ Backend image build failed${NC}"
    exit 1
fi

# Build frontend image (files only)
echo -e "${YELLOW}Building frontend image (files only)...${NC}"
docker build -f docker/Dockerfile --target frontend -t serendipity-frontend:latest .

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Frontend image built successfully${NC}"
else
    echo -e "${RED}✗ Frontend image build failed${NC}"
    exit 1
fi

echo -e "${GREEN}All images built successfully!${NC}"
echo -e "${YELLOW}Images:${NC}"
echo "  - serendipity-backend:latest"
echo "  - serendipity-frontend:latest"

echo -e "${YELLOW}To run the services:${NC}"
echo "  Backend:  docker run -p 3000:3000 --env-file .env serendipity-backend:latest"
echo ""
echo -e "${YELLOW}To extract frontend build files:${NC}"
echo "  1. Run frontend container: docker run -d --name frontend-files serendipity-frontend:latest"
echo "  2. Copy files out: docker cp frontend-files:/app/dist ./frontend-dist"
echo "  3. Clean up: docker rm -f frontend-files"
echo ""
echo -e "${YELLOW}To serve frontend with nginx (if built):${NC}"
echo "  docker run -p 80:80 serendipity-frontend-nginx:latest"
echo ""
echo -e "${YELLOW}Build individual targets:${NC}"
echo "  Backend only:       docker build -f docker/Dockerfile --target backend -t serendipity-backend ."
echo "  Frontend files:     docker build -f docker/Dockerfile --target frontend -t serendipity-frontend ."
echo "  Builder only:       docker build -f docker/Dockerfile --target builder -t serendipity-builder ."
