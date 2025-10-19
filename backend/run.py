#!/usr/bin/env python3
import os
import sys
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app import app
import uvicorn

if __name__ == '__main__':
    print("Starting EcomAI FastAPI Backend (Optimized)...")
    print("Backend running on http://localhost:3000")
    print("API Docs available at http://localhost:3000/docs")
    # Optimized for performance
    uvicorn.run(
        app, 
        host="0.0.0.0", 
        port=3000, 
        reload=True,
        access_log=False,  # Disable access logs for performance
        workers=1  # Single worker for development
    )