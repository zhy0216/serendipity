#!/bin/bash

# Script to extract frontend build files from Docker container
# Usage: ./docker/extract-frontend.sh [output-directory]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Default output directory
OUTPUT_DIR=${1:-"./frontend-dist"}

echo -e "${YELLOW}🏗️  Extracting frontend build files...${NC}"

# Build frontend image if it doesn't exist
if ! docker image inspect serendipity-frontend:latest >/dev/null 2>&1; then
    echo -e "${YELLOW}Frontend image not found. Building...${NC}"
    docker build -f docker/Dockerfile --target frontend -t serendipity-frontend:latest .
fi

# Create temporary container
CONTAINER_ID=$(docker create serendipity-frontend:latest)

echo -e "${YELLOW}Container created: ${CONTAINER_ID:0:12}${NC}"

# Copy files out
echo -e "${YELLOW}Copying files to ${OUTPUT_DIR}...${NC}"
docker cp ${CONTAINER_ID}:/app/dist ${OUTPUT_DIR}

# Clean up container
docker rm ${CONTAINER_ID} >/dev/null

echo -e "${GREEN}✅ Frontend files extracted successfully!${NC}"
echo -e "${YELLOW}📁 Files available in: ${OUTPUT_DIR}${NC}"
echo -e "${YELLOW}📄 Contents:${NC}"
ls -la ${OUTPUT_DIR}
