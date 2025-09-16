// Create simple SVG icons for different densities
const fs = require('fs');
const path = require('path');

// Create basic SVG icon
function createIcon(size, filename) {
    const svg = `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
        <rect width="${size}" height="${size}" fill="#1e3a8a" rx="${size * 0.15}"/>
        <text x="${size/2}" y="${size * 0.65}" font-family="Arial, sans-serif" font-size="${size * 0.4}" font-weight="bold" fill="white" text-anchor="middle">රු</text>
    </svg>`;
    
    fs.writeFileSync(path.join('res/android', filename), svg);
    console.log(`Created ${filename} (${size}x${size})`);
}

// Create splash screen
function createSplash(width, height, filename) {
    const svg = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
        <rect width="${width}" height="${height}" fill="#1e3a8a"/>
        <text x="${width/2}" y="${height * 0.4}" font-family="Arial, sans-serif" font-size="${Math.min(width, height) * 0.15}" font-weight="bold" fill="white" text-anchor="middle">රු</text>
        <text x="${width/2}" y="${height * 0.55}" font-family="Arial, sans-serif" font-size="${Math.min(width, height) * 0.06}" font-weight="bold" fill="white" text-anchor="middle">මුදල් කළමනාකරණ</text>
        <text x="${width/2}" y="${height * 0.65}" font-family="Arial, sans-serif" font-size="${Math.min(width, height) * 0.04}" fill="#a0a0a0" text-anchor="middle">Budget Tracker</text>
    </svg>`;
    
    fs.writeFileSync(path.join('res/android', filename), svg);
    console.log(`Created ${filename} (${width}x${height})`);
}

// Create all required icons
createIcon(36, 'ldpi.png');
createIcon(48, 'mdpi.png');
createIcon(72, 'hdpi.png');
createIcon(96, 'xhdpi.png');
createIcon(144, 'xxhdpi.png');
createIcon(192, 'xxxhdpi.png');

// Create splash screens
createSplash(320, 200, 'splash-land-ldpi.png');
createSplash(480, 320, 'splash-land-mdpi.png');
createSplash(800, 480, 'splash-land-hdpi.png');
createSplash(1280, 720, 'splash-land-xhdpi.png');
createSplash(1600, 960, 'splash-land-xxhdpi.png');
createSplash(1920, 1280, 'splash-land-xxxhdpi.png');

createSplash(200, 320, 'splash-port-ldpi.png');
createSplash(320, 480, 'splash-port-mdpi.png');
createSplash(480, 800, 'splash-port-hdpi.png');
createSplash(720, 1280, 'splash-port-xhdpi.png');
createSplash(960, 1600, 'splash-port-xxhdpi.png');
createSplash(1280, 1920, 'splash-port-xxxhdpi.png');

console.log('All icons and splash screens created!');