// Product Detail Page
// Just make one to show specific item as an example

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
import { useCart } from '../context/CartContext';

import { submitOrder } from '../services/api/order'; // use API wrapper
import { API_BASE_URL } from '@env'; // Load API base URL from .env

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
  const { addToCart } = useCart();

  // 🔁 Fetch product detail from API
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/products/6810eb982f5b9676d765d0fb`);
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

  // 📤 Share button
  const handleShare = async () => {
    try {
      await Share.share({
        title: 'Check this product',
        message: `Check out this product: ${product.name} - $${product.price}`,
        url: `${API_BASE_URL}/products/${product._id}`,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  // 🛒 Open address modal for "Buy Now"
  const handleBuyNow = () => {
    setShowModal(true);
  };

  // ✅ Submit order to backend (using wrapper)
  const handleSubmitOrder = async () => {
    const token = await AsyncStorage.getItem('token');
    const userId = await AsyncStorage.getItem('userId');

    try {
      const result = await submitOrder({
        token,
        userId,
        products: [{ product: product._id, quantity }],
        total: product.price * quantity,
        address,
      });

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
      console.error('Order submission error:', err);
      Alert.alert('Order Failed', err.message || 'Unknown error');
    }
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#d8135e" />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.loader}>
        <Text style={{ color: isDarkMode ? '#fff' : '#111' }}>Product not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* 🔙 Back */}
      <View style={{ position: 'absolute', top: 60, left: 20, zIndex: 10 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={26} color={isDarkMode ? '#fff' : '#111'} />
        </TouchableOpacity>
      </View>

      {/* 📤 Share */}
      <View style={{ position: 'absolute', top: 60, right: 20, zIndex: 10 }}>
        <TouchableOpacity onPress={handleShare}>
          <Feather name="share" size={24} color={isDarkMode ? '#fff' : '#111'} />
        </TouchableOpacity>
      </View>

      {/* 🖼️ Image */}
      <Image
        source={require('../assets/product-placeholder.jpeg')}
        style={styles.image}
        resizeMode="cover"
      />

      {/* 📦 Info */}
      <View style={styles.details}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.category}>Category: {product.category}</Text>
        <Text style={styles.price}>${product.price}</Text>
      </View>

      {/* ➕➖ Quantity */}
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

      {/* 🧾 Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => {
            if (!product || !product._id) {
              Alert.alert('Error', 'Product not loaded');
              return;
            }

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

      {/* 📮 Address Modal */}
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
