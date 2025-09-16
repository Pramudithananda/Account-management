#!/bin/bash

echo "╔════════════════════════════════════════════════════════════╗"
echo "║         Financial Ledger - APK Builder                      ║"
echo "║         මූල්‍ය පොත - APK Build කිරීම                          ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✓${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install Node.js first."
    exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    print_status "Installing dependencies..."
    npm install
fi

# Create assets if they don't exist
if [ ! -d "assets" ]; then
    print_status "Creating assets directory..."
    mkdir -p assets
    
    # Create a simple icon using ImageMagick or create placeholder
    echo '<?xml version="1.0" encoding="UTF-8"?>
<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" rx="100" fill="#6200EE"/>
  <text x="256" y="280" font-family="Arial" font-size="200" fill="white" text-anchor="middle">₹</text>
</svg>' > assets/icon.svg
    
    print_status "Default assets created"
fi

# Check for build method
echo ""
echo "Select build method / Build කිරීමේ ක්‍රමය තෝරන්න:"
echo "1) Expo EAS Build (Recommended - Cloud build)"
echo "2) Local Gradle Build (Requires Android SDK)"
echo "3) Generate build instructions only"
echo ""
read -p "Enter choice (1-3): " choice

case $choice in
    1)
        print_status "Setting up Expo EAS Build..."
        
        # Check if eas-cli is installed
        if ! command -v eas &> /dev/null; then
            print_warning "Installing EAS CLI..."
            npm install -g eas-cli
        fi
        
        print_status "Please login to your Expo account:"
        eas login
        
        print_status "Configuring build..."
        eas build:configure
        
        print_status "Starting APK build..."
        eas build --platform android --profile preview
        
        print_status "Build initiated! Check your Expo dashboard for the APK download link."
        ;;
        
    2)
        print_status "Starting local Gradle build..."
        
        # Check if Android SDK is available
        if [ -z "$ANDROID_HOME" ]; then
            print_error "ANDROID_HOME is not set. Please install Android SDK."
            echo "Visit: https://developer.android.com/studio"
            exit 1
        fi
        
        # Create bundle
        print_status "Creating JavaScript bundle..."
        npx react-native bundle --platform android --dev false \
            --entry-file index.js \
            --bundle-output android/app/src/main/assets/index.android.bundle \
            --assets-dest android/app/src/main/res/
        
        # Build APK
        print_status "Building APK..."
        cd android
        ./gradlew assembleDebug
        
        if [ -f "app/build/outputs/apk/debug/app-debug.apk" ]; then
            print_status "APK built successfully!"
            echo ""
            echo "APK location: $(pwd)/app/build/outputs/apk/debug/app-debug.apk"
            
            # Copy to project root
            cp app/build/outputs/apk/debug/app-debug.apk ../FinancialLedger.apk
            print_status "APK copied to: FinancialLedger.apk"
        else
            print_error "APK build failed!"
            exit 1
        fi
        ;;
        
    3)
        print_status "Generating build instructions..."
        
        echo ""
        echo "════════════════════════════════════════════════════════════"
        echo "                    BUILD INSTRUCTIONS                       "
        echo "════════════════════════════════════════════════════════════"
        echo ""
        echo "Option 1: Expo EAS Build (Easiest)"
        echo "-----------------------------------"
        echo "1. Create Expo account: https://expo.dev/signup"
        echo "2. Run: npm install -g eas-cli"
        echo "3. Run: eas login"
        echo "4. Run: eas build:configure"
        echo "5. Run: eas build --platform android --profile preview"
        echo "6. Download APK from Expo dashboard"
        echo ""
        echo "Option 2: GitHub Actions"
        echo "------------------------"
        echo "1. Push code to GitHub repository"
        echo "2. Add .github/workflows/build.yml"
        echo "3. Push changes to trigger build"
        echo "4. Download APK from Actions artifacts"
        echo ""
        echo "Option 3: Local Build"
        echo "--------------------"
        echo "1. Install Android Studio"
        echo "2. Set ANDROID_HOME environment variable"
        echo "3. Run: cd android && ./gradlew assembleDebug"
        echo "4. Find APK in android/app/build/outputs/apk/debug/"
        echo ""
        ;;
        
    *)
        print_error "Invalid choice"
        exit 1
        ;;
esac

echo ""
echo "════════════════════════════════════════════════════════════"
print_status "Process completed!"
echo "════════════════════════════════════════════════════════════"