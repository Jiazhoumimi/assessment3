import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  Share,
  Alert,
} from 'react-native';
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useThemeMode } from '../context/ThemeContext';
import { getProductDetailStyles } from '../styles/ProductDetailStyles';
import AddressModal from '../components/AddressModal';
import { sendOrderSuccessNotification } from '../services/notifications';
import { useCart } from '../context/CartContext'; // Shopping cart context

export default function ProductDetailScreen() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'Australia',
  });

  const { isDarkMode } = useThemeMode();
  const styles = getProductDetailStyles(isDarkMode);
  const navigation = useNavigation();
  const { addToCart } = useCart(); // Get addToCart function from context

  // 🔁 Fetch product details on mount
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch('https://n11501910.ifn666.com/assessment02/products/6810eb982f5b9676d765d0fb');
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, []);

  // 📤 Share product link
  const handleShare = async () => {
    try {
      await Share.share({
        title: 'Check this product',
        message: `Check out this product: ${product.name} - $${product.price}`,
        url: `https://n11501910.ifn666.com/assessment02/products/${product._id}`,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  // 🛒 Trigger address modal for direct purchase
  const handleBuyNow = () => {
    setShowModal(true);
  };

  // ✅ Submit order to backend
  const handleSubmitOrder = async () => {
    const token = await AsyncStorage.getItem('token');
    const userId = await AsyncStorage.getItem('userId');

    const payload = {
      user: userId,
      products: [{ product: product._id, quantity }],
      total: product.price * quantity,
      shippingAddress: address,
    };

    try {
      const res = await fetch('https://n11501910.ifn666.com/assessment02/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok) {
        Alert.alert('Order Failed', result?.message || 'Unknown error');
        return;
      }

      Alert.alert('Success', 'Order placed successfully!', [
        {
          text: 'OK',
          onPress: async () => {
            setShowModal(false);
            await sendOrderSuccessNotification(result?.data?._id);
            navigation.navigate('AppTabs', { screen: 'Orders' });
          },
        },
      ]);
    } catch (err) {
      console.error('Network error:', err);
      Alert.alert('Network Error', 'Please try again later.');
    }
  };

  // ⏳ Show loading spinner
  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#d8135e" />
      </View>
    );
  }

  // ❌ Handle missing product
  if (!product) {
    return (
      <View style={styles.loader}>
        <Text style={{ color: isDarkMode ? '#fff' : '#111' }}>Product not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* 🔙 Back Button */}
      <View style={{ position: 'absolute', top: 60, left: 20, zIndex: 10 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={26} color={isDarkMode ? '#fff' : '#111'} />
        </TouchableOpacity>
      </View>

      {/* 📤 Share Button */}
      <View style={{ position: 'absolute', top: 60, right: 20, zIndex: 10 }}>
        <TouchableOpacity onPress={handleShare}>
          <Feather name="share" size={24} color={isDarkMode ? '#fff' : '#111'} />
        </TouchableOpacity>
      </View>

      {/* 🖼️ Product Image */}
      <Image
        source={require('../assets/product-placeholder.jpeg')}
        style={styles.image}
        resizeMode="cover"
      />

      {/* 📦 Product Info */}
      <View style={styles.details}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.category}>Category: {product.category}</Text>
        <Text style={styles.price}>${product.price}</Text>
      </View>

      {/* ➕➖ Quantity Selector */}
      <View style={styles.quantityWrapper}>
        <TouchableOpacity
          style={styles.quantityBtn}
          onPress={() => setQuantity(Math.max(1, quantity - 1))}
        >
          <Text style={styles.quantityBtnText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityValue}>{quantity}</Text>
        <TouchableOpacity
          style={styles.quantityBtn}
          onPress={() => setQuantity(quantity + 1)}
        >
          <Text style={styles.quantityBtnText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* 🧾 Buttons: Add to Bag + Buy Now */}
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => {
            if (!product || !product._id) {
              Alert.alert('Error', 'Product not loaded');
              return;
            }

            // ✅ Add to cart in object map format
            addToCart({ [product._id]: quantity });

            Alert.alert('Added to Bag', `${product.name} x${quantity} has been added.`);
          }}
        >
          <Ionicons name="cart-outline" size={20} color="#fff" />
          <Text style={styles.cartButtonText}>Add to Bag</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buyButton} onPress={handleBuyNow}>
          <Ionicons name="card-outline" size={20} color="#fff" />
          <Text style={styles.buyButtonText}>Buy Now</Text>
        </TouchableOpacity>
      </View>

      {/* 📮 Address Modal for Checkout */}
      <AddressModal
        visible={showModal}
        address={address}
        setAddress={setAddress}
        onSubmit={handleSubmitOrder}
        onCancel={() => setShowModal(false)}
        isDarkMode={isDarkMode}
      />
    </ScrollView>
  );
}
