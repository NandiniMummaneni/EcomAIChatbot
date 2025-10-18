#!/usr/bin/env python3
import os
import sys
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app import app

if __name__ == '__main__':
    print("Starting EcomAI Python Backend...")
    print("Backend running on http://localhost:3000")
    app.run(debug=True, host='0.0.0.0', port=3000)