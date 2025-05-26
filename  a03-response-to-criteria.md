# IFN666_25se1 Assessment 03 Submission

**Student name:**  Sai Lo

**Student ID:** n11501910 

# Response to marking criteria

## Core: Development workflow (3 marks)

- **One line description:** Demonstrated structured development workflow using VS Code, Git version control, and Expo with frequent commits and well-organized folders.
- **Video timestamp:** 
- **Relevant files**
   - .gitignore
   - package.json
   - app.json
   - index.js
   - App.js
   - /components/...
   - /screens/...
   - /hooks/...
   - /navigation/...

## Core: Core functionality (3 marks)

- **One line description:** Implemented login, product browsing, view by category, order creation, edit order, get order by ID, and order history viewing with bottom tab navigation.

- **Video timestamp:** 
- **Relevant files**
   - screens/LoginScreen.jsx
   - screens/HomeScreen.jsx
   - screens/CreateOrderScreen.jsx
   - screens/OrdersScreen.jsx
   - screens/OrderDetailScreen.jsx
   - screens/GetOrderByIdScreen.jsx
   - screens/ProductsScreen.jsx
   - screens/CategoryProductsScreen.jsx
   - navigation/MainNavigator.jsx

## Core: User interface design (3 marks)

- **One line description:** Used consistent and user-friendly UI with dark mode support, custom components, and themed styling.
- **Video timestamp:** 
- **Relevant files**
   - components/HeaderBar.jsx
   - styles/HomeStyles.js
   - styles/ProfileStyle.js
   - styles/SettingStyle.js
   - styles/OrderScreenStyle.js
   - styles/OrderDetailStyle.js
   - context/ThemeContext.js

## Core: API integration (3 marks)

- **One line description:** Connected the app to backend REST API with JWT-based login, authenticated order creation, product browsing, and order retrieval.
- **Video timestamp:** 
- **Relevant files**
   - screens/LoginScreen.jsx  // Login with JWT
   - screens/CreateOrderScreen.jsx  // Create new order
   - screens/GetOrderByIdScreen.jsx  // Get order by ID
   - screens/OrdersScreen.jsx  // View all my orders
   - screens/ProductsScreen.jsx  // Browse products
   - screens/CategoryProductsScreen.jsx  // Filter by category
   - screens/OrderDetailScreen.jsx  // View order detail
   - hooks/useProductBrowser.js  // Fetch products by category/sort/pagination
   - hooks/useProductOrder.js  // Create Order from fetching product list 

## Additional: Device notifications (3 marks)

- **One line description:** Implemented local push notifications that are triggered after successful login and order creation, with notification toggle in the Settings screen.
- **Video timestamp:** 
- **Relevant files**
   - services/notifications.js  
   - screens/SettingsScreen.jsx 
   - components/SettingsRow.jsx  
 

## Additional: Gestures (3 marks)

- **One line description:** Added shake gesture to toggle light/dark mode using Expo Accelerometer.
- **Video timestamp:** 
- **Relevant files**
   - screens/SettingsScreen.jsx
   - context/ThemeContext.js


## Additional: Share (3 marks)

- **One line description:** Enabled sharing product details to other apps via system share sheet.
- **Video timestamp:** 
- **Relevant files**
   - screens/ProductDetailScreen.jsx


## Additional: Status bar (3 marks)

- **One line description:** Customized status bar appearance based on dark/light mode using Expo’s StatusBar.
- **Video timestamp:** 
- **Relevant files**
   - screens/SettingsScreen.jsx
   - App.js


## Additional: Safe areas (3 marks)

- **One line description:** Used react-native-safe-area-context to ensure content is within safe display areas.
- **Video timestamp:** 
- **Relevant files**
   - screens/HomeScreen.jsx
   - screens/ProfileScreen.jsx
