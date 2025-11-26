#!/bin/bash

# APK Build Script for Account Management App
# ගිණුම් කළමනාකරණ යෙදුම සඳහා APK Build Script

echo "🚀 Account Management App - APK Builder"
echo "========================================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if EAS CLI is installed
if ! command -v eas &> /dev/null; then
    echo -e "${RED}❌ EAS CLI සොයාගත නොහැක / EAS CLI not found${NC}"
    echo -e "${YELLOW}Installing EAS CLI...${NC}"
    npm install -g eas-cli
fi

# Check if user is logged in
echo -e "${YELLOW}🔐 Checking EAS login status...${NC}"
if ! eas whoami &> /dev/null; then
    echo -e "${YELLOW}📝 Please login to your Expo account:${NC}"
    eas login
fi

# Menu
echo ""
echo "Select build type / Build වර්ගය තෝරන්න:"
echo "1) Preview Build (Testing) - ප්‍රදර්ශන Build"
echo "2) Production Build (Release) - නිෂ්පාදන Build"
echo "3) Development Build - සංවර්ධන Build"
echo "4) Configure EAS Build - EAS Build සකසන්න"
echo "5) Exit - පිටවන්න"
echo ""

read -p "Enter your choice (1-5): " choice

case $choice in
    1)
        echo -e "${GREEN}🔨 Building Preview APK...${NC}"
        echo -e "${YELLOW}මෙය කිහිපයක් මිනිත්තු ගත විය හැක / This may take several minutes${NC}"
        eas build --platform android --profile preview
        echo -e "${GREEN}✅ Preview build started! Check your email or EAS dashboard for download link.${NC}"
        ;;
    2)
        echo -e "${GREEN}🔨 Building Production APK...${NC}"
        echo -e "${YELLOW}මෙය කිහිපයක් මිනිත්තු ගත විය හැක / This may take several minutes${NC}"
        eas build --platform android --profile production
        echo -e "${GREEN}✅ Production build started! Check your email or EAS dashboard for download link.${NC}"
        ;;
    3)
        echo -e "${GREEN}🔨 Building Development APK...${NC}"
        eas build --platform android --profile development
        echo -e "${GREEN}✅ Development build started!${NC}"
        ;;
    4)
        echo -e "${YELLOW}🔧 Configuring EAS Build...${NC}"
        eas build:configure
        echo -e "${GREEN}✅ Configuration complete!${NC}"
        ;;
    5)
        echo -e "${GREEN}👋 Goodbye! / ආයුබෝවන්!${NC}"
        exit 0
        ;;
    *)
        echo -e "${RED}❌ Invalid choice / වලංගු නොවන තේරීමක්${NC}"
        exit 1
        ;;
esac

echo ""
echo -e "${GREEN}📱 Build Information:${NC}"
echo "- Build logs: https://expo.dev/accounts/[your-account]/projects/sinhala-account-manager/builds"
echo "- APK will be available for download once build completes"
echo "- You will receive an email notification"
echo ""
echo -e "${YELLOW}Need help? / උදවු අවශ්‍යද?${NC}"
echo "Check BUILD_INSTRUCTIONS.md for detailed instructions"
