# EcomAI - Smart Shopping Cart App

![Hykaa](Hykaa.jpeg)

A modern e-commerce application built with Angular 17.3.17 featuring an AI chatbot assistant named REX.

## Features

- 🛍️ **E-commerce Functionality**: Product browsing, cart management, wishlist
- 🤖 **AI Chatbot**: REX - Interactive shopping assistant with purple gradient theme
- 📱 **Responsive Design**: Mobile-friendly layouts
- 🗺️ **Store Locator**: Interactive footer with store information
- 🔄 **State Management**: Services for cart, wishlist, and products
- 🌐 **SPA Routing**: Seamless navigation between pages

## Tech Stack

- **Framework**: Angular 17.3.17 (Standalone Components)
- **Language**: TypeScript
- **Styling**: CSS with modern gradients and animations
- **Backend**: JSON Server (mock API)
- **Architecture**: Component-based with services and routing

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── header/          # Navigation component
│   │   ├── home/            # Landing page
│   │   ├── product-list/    # Product catalog
│   │   ├── product-detail/  # Individual product view
│   │   ├── cart/            # Shopping cart
│   │   ├── wishlist/        # Favorite products
│   │   ├── footer/          # Contact info & store locator
│   │   ├── login/           # User authentication
│   │   └── chatbot/         # REX AI Assistant
│   ├── services/
│   │   ├── product.service.ts
│   │   ├── cart.service.ts
│   │   └── wishlist.service.ts
│   └── models/
│       └── product.model.ts
└── mock.json               # Sample product data
```

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Mock API Server**
   ```bash
   npm run serve:api
   ```
   This starts JSON Server on http://localhost:3000

3. **Start Angular Development Server**
   ```bash
   npm start
   ```
   Application runs on http://localhost:4200

4. **Build for Production**
   ```bash
   npm run build
   ```

## Components Overview

### Core Components
- **Header**: Navigation with cart/wishlist counters
- **Home**: Hero section with product categories
- **Product List**: Grid view with filtering and search
- **Product Detail**: Detailed product information
- **Cart**: Shopping cart with quantity management
- **Wishlist**: Favorite products management
- **Footer**: Store locator and business information
- **Login**: User authentication form

### AI Features
- **REX Chatbot**: Purple gradient themed AI assistant
- Interactive chat interface
- Context-aware responses for shopping queries
- Floating chat widget

## Services

- **ProductService**: API interactions for product data
- **CartService**: Shopping cart state management
- **WishlistService**: Wishlist functionality

## Styling

- Modern gradient themes (purple/blue)
- Responsive grid layouts
- Smooth animations and transitions
- Mobile-first design approach

## API Endpoints

Mock API provides:
- `GET /products` - All products
- `GET /products/:id` - Single product
- `GET /products?category=:category` - Products by category

## Development

The app uses Angular 17.3.17 standalone components architecture for better tree-shaking and performance. All components are lazy-loaded for optimal bundle size.

## Future Enhancements

- User authentication integration
- Payment processing
- Real-time inventory updates
- Advanced AI chatbot features
- Store locator with maps integration