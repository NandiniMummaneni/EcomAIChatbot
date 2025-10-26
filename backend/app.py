from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
import json
import os

# Optimized FastAPI app with minimal overhead
app = FastAPI(
    title="EcomAI Backend", 
    version="1.0.0",
    docs_url="/docs",
    redoc_url=None,  # Disable ReDoc for minimal footprint
    openapi_url="/openapi.json"
)

# Minimal CORS - only allow frontend origin
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],  # Only Angular app
    allow_credentials=False,  # Disable for performance
    allow_methods=["GET"],  # Only needed methods
    allow_headers=["*"],
)

# Cached products data for optimal performance
_products_cache = None

def get_products_cache():
    global _products_cache
    if _products_cache is None:
        _products_cache = products_data
    return _products_cache

# Products data stored in Python
products_data = [
    {
        "id": 1,
        "name": "Wireless Bluetooth Headphones",
        "price": 6639,
        "description": "High-quality wireless headphones with noise cancellation and 30-hour battery life.",
        "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
        "category": "electronics",
        "rating": 4.5,
        "inStock": True
    },
    {
        "id": 2,
        "name": "Smart Fitness Watch",
        "price": 16599,
        "description": "Advanced fitness tracking with heart rate monitor, GPS, and smartphone integration.",
        "image": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
        "category": "electronics",
        "rating": 4.3,
        "inStock": True
    },
    {
        "id": 3,
        "name": "Smartphone Pro Max",
        "price": 82999,
        "description": "Latest flagship smartphone with advanced camera system and 5G connectivity.",
        "image": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400",
        "category": "electronics",
        "rating": 4.8,
        "inStock": True
    },
    {
        "id": 4,
        "name": "Wireless Gaming Mouse",
        "price": 7469,
        "description": "High-precision gaming mouse with RGB lighting and customizable buttons.",
        "image": "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400",
        "category": "electronics",
        "rating": 4.4,
        "inStock": True
    },
    {
        "id": 5,
        "name": "4K Webcam",
        "price": 12449,
        "description": "Ultra HD webcam with auto-focus and built-in microphone for streaming.",
        "image": "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=400",
        "category": "electronics",
        "rating": 4.2,
        "inStock": True
    },
    {
        "id": 6,
        "name": "Portable Speaker",
        "price": 4979,
        "description": "Waterproof Bluetooth speaker with 360-degree sound and 12-hour battery.",
        "image": "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400",
        "category": "electronics",
        "rating": 4.6,
        "inStock": True
    },
    {
        "id": 7,
        "name": "Laptop Stand",
        "price": 3319,
        "description": "Adjustable aluminum laptop stand for better ergonomics and cooling.",
        "image": "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400",
        "category": "electronics",
        "rating": 4.3,
        "inStock": True
    },
    {
        "id": 8,
        "name": "USB-C Hub",
        "price": 4149,
        "description": "7-in-1 USB-C hub with HDMI, USB 3.0, and SD card reader.",
        "image": "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=400",
        "category": "electronics",
        "rating": 4.1,
        "inStock": True
    },
    {
        "id": 9,
        "name": "Wireless Charger",
        "price": 2489,
        "description": "Fast wireless charging pad compatible with all Qi-enabled devices.",
        "image": "https://images.unsplash.com/photo-1609592806596-4d8b5b1d7d0e?w=400",
        "category": "electronics",
        "rating": 4.0,
        "inStock": True
    },
    {
        "id": 10,
        "name": "Smart Home Hub",
        "price": 10789,
        "description": "Voice-controlled smart home hub with built-in display and Zigbee support.",
        "image": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
        "category": "electronics",
        "rating": 4.5,
        "inStock": False
    }
]

@app.get("/products")
def get_products(category: Optional[str] = None):
    products = get_products_cache()  # Use cached data
    if category:
        # Optimized list comprehension
        return [p for p in products if p['category'] == category]
    return products

@app.get("/products/{product_id}")
def get_product(product_id: int):
    products = get_products_cache()  # Use cached data
    # Optimized lookup using next() with generator
    product = next((p for p in products if p['id'] == product_id), None)
    if product:
        return product
    return {'error': 'Product not found'}

@app.get("/health")
def health_check():
    return {'status': 'healthy', 'message': 'EcomAI Backend is running'}

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=3000, reload=True)