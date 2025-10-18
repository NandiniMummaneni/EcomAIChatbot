# EcomAI Python Backend

Flask-based REST API backend for the EcomAI shopping cart application.

## Setup

1. **Install Python dependencies:**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

2. **Run the backend:**
   ```bash
   python run.py
   ```
   
   Backend will start on http://localhost:3000

## API Endpoints

- `GET /products` - Get all products
- `GET /products?category=electronics` - Get products by category
- `GET /products/{id}` - Get single product by ID
- `GET /health` - Health check endpoint

## Features

- CORS enabled for frontend integration
- Category-based product filtering
- JSON response format
- Error handling for missing products
- Development server with auto-reload