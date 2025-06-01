### 🎀 666 Order Management App

A feature-rich wholesale ordering app built with React Native and Expo, showcasing modern mobile UI and RESTful API integration. Developed as part of the IFN666 Web & Mobile Application course at QUT.

### 🚀 Features

🛍️ Product Catalog

- Browse products by category
- Sort by price
- View product detail 
- Add to Cart or Buy Now

📦 Order Management

- Create new orders (select + address input)
- View order history
- Edit orders (status, address)
- Get order by ID
- Cancel orders

🌺 Modern UI/UX

- Dark mode toggle (with shake gesture)
- Carousel with pagination dots
- Category cards with images
- Styled modal forms

🌴 Mobile Features

- Local push notifications
- Share product links
- Persistent user login via AsyncStorage

🥥 Architecture

- React Native + Expo
- RESTful API integration (Assessment 2)
- Theme management with React Context
- Modular components & hooks


### 🏠 Installation & Run Instructions

1. Clone the repo
git clone https://github.com/jiazhoumimi/666-order-app.git
cd 666-order-app

2. Install dependencies
npm install

3. Start Expo
npx expo start

4. Open in Expo Go (on your mobile) or an iOS/Android emulator

### 🌸 API Endpoints (Connected to Assessment 2 Backend)

# Base URL:
😍😍😍

Feature	            Method	Endpoint	                Description
Get all products	GET	    /products	                Supports pagination, category, sort
Get one product	    GET	    /products/:id	            Fetch a single product by ID
Get all orders	    GET  	/orders	                    Fetch all orders (with JWT)
Get one order	    GET	    /orders/:id	                Fetch one order by ID
Create order	    POST	/orders	                    Submit order with products & address
Update order	    PUT	    /orders/:id	                Modify status/address of an order
User login/register	POST	/auth/login, /auth/register	Authentication (JWT based)

✅ Token-based authentication using Authorization: Bearer <token>

### 📂 Folder Structure

├── assets/
├── components/
├── context/
├── hooks/
├── screens/
├── services/
├── styles/
└── App.js

### 🦋 Author

Cecilia Lo
n1150xxxx
Version: 1.0.0
IFN666 – QUT 2025
