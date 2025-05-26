import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Context Providers
import { CartProvider } from '../context/CartContext';
import { ThemeProvider } from '../context/ThemeContext';

// Notification Setup
import { setupNotificationHandler } from '../services/notifications'; // Initialize notification system

// Screens
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import ProductsScreen from '../screens/ProductsScreen';
import CartScreen from '../screens/CartScreen';
import OrdersScreen from '../screens/OrdersScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import OrderDetailScreen from '../screens/OrderDetailScreen';
import GetOrderByIdScreen from '../screens/GetOrderByIdScreen';
import CategoryProductsScreen from '../screens/CategoryProductsScreen';
import AboutScreen from '../screens/AboutScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';

// Custom tab bar button
import CustomTabBarButton from '../components/CustomTabBarButton';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// 🔻 Tab navigator with 5 main sections
function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = 'home-outline';
          else if (route.name === 'Products') iconName = 'pricetags-outline';
          else if (route.name === 'Cart') iconName = 'bag-outline';
          else if (route.name === 'Orders') iconName = 'receipt-outline';
          else if (route.name === 'Profile') iconName = 'person-outline';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerShown: false,
        tabBarActiveTintColor: '#8c17b0',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Products" component={ProductsScreen} />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarButton: (props) => <CustomTabBarButton {...props} />,
          tabBarBadge: null, // ✅ Disable red badge
        }}
      />
      <Tab.Screen name="Orders" component={OrdersScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

// 🔻 Root stack navigator which wraps the tab navigator
export default function MainNavigator() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // ⏱️ Show splash screen briefly
    const timer = setTimeout(() => setShowSplash(false), 1000);

    // ✅ Setup notification handler at app launch
    setupNotificationHandler();

    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider>
      <CartProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {showSplash ? (
              // 🎬 Splash screen shown briefly on launch
              <Stack.Screen name="Splash" component={SplashScreen} />
            ) : (
              <>
                {/* 🔐 Auth Screens */}
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />

                {/* 🧭 Main Tab Screens */}
                <Stack.Screen name="AppTabs" component={AppTabs} />

                {/* ⚙️ Additional Standalone Screens */}
                <Stack.Screen name="Settings" component={SettingsScreen} />
                <Stack.Screen name="OrderDetail" component={OrderDetailScreen} />
                <Stack.Screen name="GetOrderById" component={GetOrderByIdScreen} />
                <Stack.Screen name="CategoryProducts" component={CategoryProductsScreen} />
                <Stack.Screen name="About" component={AboutScreen} />
                <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </CartProvider>
    </ThemeProvider>
  );
}
