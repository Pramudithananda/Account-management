#!/usr/bin/env python3
"""
Simple HTTP server to serve the Financial Ledger app download
"""

import http.server
import socketserver
import os
import sys

PORT = 8080
DIRECTORY = "/workspace"

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)
    
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()
    
    def do_GET(self):
        if self.path == '/':
            self.path = '/download.html'
        return super().do_GET()

def run_server():
    with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
        print(f"""
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║       Financial Ledger App - Download Server              ║
║                                                            ║
╠════════════════════════════════════════════════════════════╣
║                                                            ║
║   🌐 Server running at: http://localhost:{PORT}/            ║
║                                                            ║
║   📦 Files available:                                     ║
║      • Source Code: FinancialLedger.tar.gz (865 KB)       ║
║      • Instructions: BUILD_APK_INSTRUCTIONS.md            ║
║                                                            ║
║   📱 To build APK:                                        ║
║      1. Download the source code                          ║
║      2. Follow BUILD_APK_INSTRUCTIONS.md                  ║
║                                                            ║
║   Press Ctrl+C to stop the server                         ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
        """)
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n\n✅ Server stopped successfully")
            sys.exit(0)

if __name__ == "__main__":
    os.chdir(DIRECTORY)
    run_server()