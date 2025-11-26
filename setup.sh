#!/bin/bash

# Setup Script for Account Management App
# ගිණුම් කළමනාකරණ යෙදුම සඳහා Setup Script

echo "🎯 Account Management App - Setup"
echo "===================================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check Node.js
echo -e "${BLUE}🔍 Checking Node.js...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js not found!${NC}"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
else
    NODE_VERSION=$(node -v)
    echo -e "${GREEN}✅ Node.js found: $NODE_VERSION${NC}"
fi

# Check npm
echo -e "${BLUE}🔍 Checking npm...${NC}"
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm not found!${NC}"
    exit 1
else
    NPM_VERSION=$(npm -v)
    echo -e "${GREEN}✅ npm found: $NPM_VERSION${NC}"
fi

echo ""
echo -e "${YELLOW}📦 Installing dependencies...${NC}"
echo "මෙය කිහිපයක් මිනිත්තු ගත විය හැක / This may take a few minutes"
echo ""

# Install dependencies
npm install

if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}✅ Dependencies installed successfully!${NC}"
else
    echo ""
    echo -e "${RED}❌ Failed to install dependencies${NC}"
    echo "Try running: npm install --legacy-peer-deps"
    exit 1
fi

# Check Expo CLI
echo ""
echo -e "${BLUE}🔍 Checking Expo CLI...${NC}"
if ! command -v expo &> /dev/null; then
    echo -e "${YELLOW}Installing Expo CLI globally...${NC}"
    npm install -g expo-cli
    echo -e "${GREEN}✅ Expo CLI installed${NC}"
else
    echo -e "${GREEN}✅ Expo CLI already installed${NC}"
fi

# Check EAS CLI
echo ""
echo -e "${BLUE}🔍 Checking EAS CLI...${NC}"
if ! command -v eas &> /dev/null; then
    echo -e "${YELLOW}Installing EAS CLI globally...${NC}"
    npm install -g eas-cli
    echo -e "${GREEN}✅ EAS CLI installed${NC}"
else
    echo -e "${GREEN}✅ EAS CLI already installed${NC}"
fi

# Create assets placeholders if they don't exist
echo ""
echo -e "${BLUE}🎨 Setting up assets...${NC}"

if [ ! -d "assets" ]; then
    mkdir -p assets
    echo -e "${YELLOW}📁 Assets folder created${NC}"
    echo -e "${YELLOW}⚠️  Note: Please add your own icon.png, splash.png, and adaptive-icon.png${NC}"
fi

# Setup complete
echo ""
echo -e "${GREEN}✅ Setup complete!${NC}"
echo ""
echo "================================================"
echo -e "${BLUE}📱 Next Steps:${NC}"
echo "================================================"
echo ""
echo "1️⃣  Start Development Server:"
echo "   ${YELLOW}npm start${NC}"
echo ""
echo "2️⃣  Run on Android:"
echo "   ${YELLOW}npm run android${NC}"
echo ""
echo "3️⃣  Build APK (requires Expo account):"
echo "   ${YELLOW}./build-apk.sh${NC}"
echo "   හෝ manually: ${YELLOW}eas build --platform android --profile preview${NC}"
echo ""
echo "4️⃣  Read Documentation:"
echo "   - QUICK_START.md - ඉක්මන් ආරම්භය"
echo "   - BUILD_INSTRUCTIONS.md - APK build කිරීම"
echo "   - README.md - සම්පූර්ණ documentation"
echo ""
echo "================================================"
echo ""
echo -e "${GREEN}🎉 සතුටින් code කරන්න! Happy coding!${NC}"
echo ""

# Ask if user wants to start the development server
read -p "Do you want to start the development server now? (y/n): " START_SERVER

if [ "$START_SERVER" = "y" ] || [ "$START_SERVER" = "Y" ]; then
    echo ""
    echo -e "${GREEN}🚀 Starting development server...${NC}"
    npm start
fi
