#!/bin/bash

echo "🚀 Setting up Money Manager App..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# For iOS, install pods
if [[ "$OSTYPE" == "darwin"* ]]; then
    echo "🍎 Installing iOS dependencies..."
    cd ios && pod install && cd ..
fi

echo "✅ Setup complete!"
echo ""
echo "To run the app:"
echo "  Android: npm run android"
echo "  iOS: npm run ios"
echo ""
echo "The app includes:"
echo "  🏦 Bank account management"
echo "  💰 Cash tracking"
echo "  🎯 Goal-based expense tracking (like pen purchases)"
echo "  📊 Dashboard with progress tracking"
echo "  💳 Transaction management"
echo "  📱 Modern Material Design UI"