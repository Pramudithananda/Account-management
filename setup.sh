#!/bin/bash

# සිංහල Expense Tracker - Setup Script
# මෙම script එක run කිරීමෙන් ව්‍යාපෘතිය සකසා APK එකක් සාදන්න

echo "╔═══════════════════════════════════════════════════════════╗"
echo "║   සිංහල Expense Tracker - Multi-Account Setup           ║"
echo "║   බහු ගිණුම් කළමනාකරණ පද්ධතිය                          ║"
echo "╚═══════════════════════════════════════════════════════════╝"
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check Node.js
echo -e "${BLUE}[1/7]${NC} Checking Node.js installation..."
if command -v node &> /dev/null
then
    NODE_VERSION=$(node --version)
    echo -e "${GREEN}✓${NC} Node.js is installed: $NODE_VERSION"
else
    echo -e "${RED}✗${NC} Node.js is not installed"
    echo -e "${YELLOW}Please install Node.js from https://nodejs.org/${NC}"
    exit 1
fi

# Check npm
echo -e "\n${BLUE}[2/7]${NC} Checking npm installation..."
if command -v npm &> /dev/null
then
    NPM_VERSION=$(npm --version)
    echo -e "${GREEN}✓${NC} npm is installed: $NPM_VERSION"
else
    echo -e "${RED}✗${NC} npm is not installed"
    exit 1
fi

# Install dependencies
echo -e "\n${BLUE}[3/7]${NC} Installing project dependencies..."
echo -e "${YELLOW}This may take a few minutes...${NC}"
npm install
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓${NC} Dependencies installed successfully"
else
    echo -e "${RED}✗${NC} Failed to install dependencies"
    exit 1
fi

# Check/Install Expo CLI
echo -e "\n${BLUE}[4/7]${NC} Checking Expo CLI..."
if command -v expo &> /dev/null
then
    EXPO_VERSION=$(expo --version)
    echo -e "${GREEN}✓${NC} Expo CLI is installed: $EXPO_VERSION"
else
    echo -e "${YELLOW}Installing Expo CLI globally...${NC}"
    npm install -g expo-cli
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓${NC} Expo CLI installed successfully"
    else
        echo -e "${RED}✗${NC} Failed to install Expo CLI"
        exit 1
    fi
fi

# Check/Install EAS CLI
echo -e "\n${BLUE}[5/7]${NC} Checking EAS CLI..."
if command -v eas &> /dev/null
then
    EAS_VERSION=$(eas --version)
    echo -e "${GREEN}✓${NC} EAS CLI is installed: $EAS_VERSION"
else
    echo -e "${YELLOW}Installing EAS CLI globally...${NC}"
    npm install -g eas-cli
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓${NC} EAS CLI installed successfully"
    else
        echo -e "${RED}✗${NC} Failed to install EAS CLI"
        exit 1
    fi
fi

# Project structure verification
echo -e "\n${BLUE}[6/7]${NC} Verifying project structure..."
if [ -d "src/screens" ] && [ -d "src/contexts" ]; then
    SCREEN_COUNT=$(ls -1 src/screens/*.js 2>/dev/null | wc -l)
    echo -e "${GREEN}✓${NC} Project structure is correct"
    echo -e "   - $SCREEN_COUNT screens found"
    echo -e "   - Contexts configured"
else
    echo -e "${RED}✗${NC} Project structure is incomplete"
    exit 1
fi

# Setup complete
echo -e "\n${BLUE}[7/7]${NC} Setup verification complete!"
echo ""
echo -e "${GREEN}╔═══════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║              Setup completed successfully! ✓              ║${NC}"
echo -e "${GREEN}╚═══════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${BLUE}Next Steps:${NC}"
echo ""
echo -e "  ${YELLOW}1. Test in development mode:${NC}"
echo -e "     npm start"
echo -e "     (Then press 'a' for Android emulator or scan QR with Expo Go)"
echo ""
echo -e "  ${YELLOW}2. Build APK (requires Expo account):${NC}"
echo -e "     eas login"
echo -e "     eas build --platform android --profile preview"
echo ""
echo -e "  ${YELLOW}3. Quick build (alternative):${NC}"
echo -e "     npm run build:android:preview"
echo ""
echo -e "${BLUE}Documentation:${NC}"
echo -e "  - Quick Start: ${YELLOW}QUICK_START.md${NC}"
echo -e "  - Full Build Guide: ${YELLOW}BUILD_INSTRUCTIONS.md${NC}"
echo -e "  - Project Info: ${YELLOW}README.md${NC}"
echo -e "  - Summary: ${YELLOW}SUMMARY.md${NC}"
echo ""
echo -e "${GREEN}Happy coding! 🚀${NC}"
echo ""
