// Simple script to create basic SVG assets that can be converted to PNG
const fs = require('fs');
const path = require('path');

// Create assets directory
const assetsDir = path.join(__dirname, 'assets');
if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir);
}

// Create app icon SVG
const iconSVG = `
<svg width="1024" height="1024" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
    <rect width="1024" height="1024" fill="#1e3a8a" rx="150"/>
    <circle cx="512" cy="400" r="180" fill="none" stroke="white" stroke-width="20"/>
    <text x="512" y="420" font-family="Arial, sans-serif" font-size="120" font-weight="bold" fill="white" text-anchor="middle">රු</text>
    <rect x="200" y="600" width="624" height="80" fill="white" rx="40"/>
    <rect x="200" y="720" width="424" height="60" fill="white" rx="30"/>
    <rect x="200" y="820" width="524" height="60" fill="white" rx="30"/>
</svg>
`;

// Create splash screen SVG
const splashSVG = `
<svg width="1080" height="1920" viewBox="0 0 1080 1920" xmlns="http://www.w3.org/2000/svg">
    <rect width="1080" height="1920" fill="#1e3a8a"/>
    <text x="540" y="800" font-family="Arial, sans-serif" font-size="200" font-weight="bold" fill="white" text-anchor="middle">රු</text>
    <text x="540" y="1000" font-family="Arial, sans-serif" font-size="60" font-weight="bold" fill="white" text-anchor="middle">මුදල් කළමනාකරණ</text>
    <text x="540" y="1100" font-family="Arial, sans-serif" font-size="40" fill="#a0a0a0" text-anchor="middle">Budget Tracker</text>
</svg>
`;

// Create notification icon SVG
const notificationSVG = `
<svg width="96" height="96" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg">
    <rect width="96" height="96" fill="#1e3a8a" rx="20"/>
    <text x="48" y="60" font-family="Arial, sans-serif" font-size="40" font-weight="bold" fill="white" text-anchor="middle">රු</text>
</svg>
`;

// Write SVG files
fs.writeFileSync(path.join(assetsDir, 'icon.svg'), iconSVG);
fs.writeFileSync(path.join(assetsDir, 'splash.svg'), splashSVG);
fs.writeFileSync(path.join(assetsDir, 'notification-icon.svg'), notificationSVG);

console.log('SVG assets created successfully!');
console.log('Note: These SVG files can be converted to PNG using online converters or tools like ImageMagick');