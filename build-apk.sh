#!/bin/bash

# Sinhala Expense Tracker - APK Build Script
# මෙම script එක භාවිතා කරන්න APK file එකක් සෑදීමට

echo "================================================"
echo "Sinhala Expense Tracker - APK Build Script"
echo "================================================"
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}Error: Node.js is not installed!${NC}"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo -e "${GREEN}✓ Node.js is installed${NC}"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo -e "${RED}Error: npm is not installed!${NC}"
    exit 1
fi

echo -e "${GREEN}✓ npm is installed${NC}"

# Install dependencies if not installed
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}Installing dependencies...${NC}"
    npm install
    if [ $? -ne 0 ]; then
        echo -e "${RED}Failed to install dependencies!${NC}"
        exit 1
    fi
    echo -e "${GREEN}✓ Dependencies installed${NC}"
else
    echo -e "${GREEN}✓ Dependencies already installed${NC}"
fi

echo ""
echo "================================================"
echo "Build Method Selection"
echo "================================================"
echo "1) EAS Build (Cloud) - Recommended"
echo "2) Local Build"
echo "3) Show Instructions Only"
echo ""
read -p "Select method (1-3): " method

case $method in
    1)
        echo ""
        echo -e "${YELLOW}Starting EAS Cloud Build...${NC}"
        echo ""
        
        # Check if EAS CLI is installed
        if ! command -v eas &> /dev/null; then
            echo -e "${YELLOW}Installing EAS CLI...${NC}"
            npm install -g eas-cli
        fi
        
        echo ""
        echo -e "${GREEN}✓ EAS CLI is ready${NC}"
        echo ""
        
        # Check if user is logged in
        echo "Checking Expo login status..."
        if ! eas whoami &> /dev/null; then
            echo ""
            echo -e "${YELLOW}Please login to your Expo account:${NC}"
            eas login
        else
            echo -e "${GREEN}✓ Already logged in${NC}"
        fi
        
        echo ""
        echo -e "${YELLOW}Starting build process...${NC}"
        echo "This will take 10-20 minutes."
        echo ""
        
        # Build APK
        eas build --platform android --profile preview
        
        echo ""
        echo -e "${GREEN}================================================${NC}"
        echo -e "${GREEN}Build Complete!${NC}"
        echo -e "${GREEN}================================================${NC}"
        echo ""
        echo "Download your APK from the link shown above"
        echo "Or visit: https://expo.dev/"
        echo "  → Projects"
        echo "  → Your Project"
        echo "  → Builds"
        echo "  → Download latest build"
        echo ""
        ;;
        
    2)
        echo ""
        echo -e "${YELLOW}Local Build Process${NC}"
        echo ""
        echo "Prerequisites:"
        echo "1. Android Studio installed"
        echo "2. Android SDK configured"
        echo "3. Java JDK installed"
        echo ""
        read -p "Do you have all prerequisites? (y/n): " prereq
        
        if [ "$prereq" != "y" ]; then
            echo -e "${YELLOW}Please install prerequisites first.${NC}"
            echo "See BUILD_INSTRUCTIONS.md for details"
            exit 0
        fi
        
        echo ""
        echo -e "${YELLOW}Running prebuild...${NC}"
        npx expo prebuild --platform android
        
        if [ $? -ne 0 ]; then
            echo -e "${RED}Prebuild failed!${NC}"
            exit 1
        fi
        
        echo ""
        echo -e "${YELLOW}Building APK...${NC}"
        cd android
        ./gradlew assembleRelease
        
        if [ $? -eq 0 ]; then
            echo ""
            echo -e "${GREEN}================================================${NC}"
            echo -e "${GREEN}Build Complete!${NC}"
            echo -e "${GREEN}================================================${NC}"
            echo ""
            echo "APK Location:"
            echo "android/app/build/outputs/apk/release/app-release.apk"
            echo ""
        else
            echo -e "${RED}Build failed!${NC}"
            echo "Check the error messages above"
            exit 1
        fi
        ;;
        
    3)
        echo ""
        echo -e "${GREEN}Build Instructions${NC}"
        echo ""
        cat BUILD_INSTRUCTIONS.md
        ;;
        
    *)
        echo -e "${RED}Invalid selection!${NC}"
        exit 1
        ;;
esac

echo ""
echo -e "${GREEN}Thank you for using Sinhala Expense Tracker!${NC}"
echo ""
