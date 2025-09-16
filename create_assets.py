#!/usr/bin/env python3
"""
Script to create basic app assets for the Budget Tracker app
"""

from PIL import Image, ImageDraw, ImageFont
import os

def create_icon(size, filename, bg_color="#1e3a8a", text="රු", text_color="white"):
    """Create app icon with specified size"""
    img = Image.new('RGBA', (size, size), bg_color)
    draw = ImageDraw.Draw(img)
    
    try:
        # Try to use a larger font
        font_size = size // 3
        font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", font_size)
    except:
        # Fallback to default font
        font = ImageFont.load_default()
    
    # Get text bounding box
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    
    # Calculate position to center text
    x = (size - text_width) // 2
    y = (size - text_height) // 2
    
    # Draw text
    draw.text((x, y), text, fill=text_color, font=font)
    
    # Save image
    img.save(f'/workspace/assets/{filename}')
    print(f"Created {filename} ({size}x{size})")

def create_splash_screen():
    """Create splash screen"""
    width, height = 1080, 1920
    img = Image.new('RGB', (width, height), "#1e3a8a")
    draw = ImageDraw.Draw(img)
    
    try:
        title_font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 80)
        subtitle_font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 40)
    except:
        title_font = ImageFont.load_default()
        subtitle_font = ImageFont.load_default()
    
    # App title
    title = "මුදල් කළමනාකරණ"
    title_bbox = draw.textbbox((0, 0), title, font=title_font)
    title_width = title_bbox[2] - title_bbox[0]
    title_x = (width - title_width) // 2
    title_y = height // 2 - 100
    
    draw.text((title_x, title_y), title, fill="white", font=title_font)
    
    # Subtitle
    subtitle = "Budget Tracker"
    subtitle_bbox = draw.textbbox((0, 0), subtitle, font=subtitle_font)
    subtitle_width = subtitle_bbox[2] - subtitle_bbox[0]
    subtitle_x = (width - subtitle_width) // 2
    subtitle_y = title_y + 120
    
    draw.text((subtitle_x, subtitle_y), subtitle, fill="#a0a0a0", font=subtitle_font)
    
    # Currency symbol
    currency_font_size = 200
    try:
        currency_font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", currency_font_size)
    except:
        currency_font = ImageFont.load_default()
    
    currency = "රු"
    currency_bbox = draw.textbbox((0, 0), currency, font=currency_font)
    currency_width = currency_bbox[2] - currency_bbox[0]
    currency_x = (width - currency_width) // 2
    currency_y = title_y - 300
    
    draw.text((currency_x, currency_y), currency, fill="white", font=currency_font)
    
    img.save('/workspace/assets/splash.png')
    print("Created splash.png")

def main():
    """Create all necessary assets"""
    os.makedirs('/workspace/assets', exist_ok=True)
    
    # App icons
    create_icon(1024, 'icon.png')
    create_icon(1024, 'adaptive-icon.png')
    create_icon(512, 'favicon.png')
    create_icon(96, 'notification-icon.png')
    
    # Splash screen
    create_splash_screen()
    
    print("\nAll assets created successfully!")
    print("Assets location: /workspace/assets/")

if __name__ == "__main__":
    main()