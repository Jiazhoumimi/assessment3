// Cart Screen
import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useThemeMode } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';

import HeaderBar from '../components/HeaderBar';
import ProductListContainer from '../components/ProductListContainer';
import OrderSummaryBar from '../components/OrderSummaryBar';
import AddressModal from '../components/AddressModal';
import { sendOrderSuccessNotification } from '../services/notifications';

import useCartProducts from '../hooks/useCartProducts';
import { getCartStyles } from '../styles/CartStyles'; 
import { submitOrder } from '../services/api/order'; // use API wrapper

export default function CartScreen() {
  const { isDarkMode } = useThemeMode();
  const styles = getCartStyles(isDarkMode); 
  const navigation = useNavigation();

  // Get cart state and functions from context
  const {
    cartItems,
    updateCartQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const cartProductIds = Object.keys(cartItems);
  const { products: cartProducts, loading } = useCartProducts(cartProductIds);

  const [showModal, setShowModal] = useState(false);
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'Australia',
  });

  // Filter products that exist in cart
  const cartProductList = cartProducts.filter((p) => cartItems[p._id]);
  const cartQuantities = Object.fromEntries(
    Object.entries(cartItems).filter(([id]) =>
      cartProductList.some((p) => p._id === id)
    )
  );

  const quantity = Object.values(cartQuantities).reduce((a, b) => a + b, 0);
  const total = cartProductList.reduce((sum, product) => {
    const qty = cartQuantities[product._id] || 0;
    return sum + product.price * qty;
  }, 0);

  const handleCheckout = () => {
    if (quantity === 0) {
      Alert.alert('Cart is empty', 'Please add items before checkout.');
      return;
    }
    setShowModal(true); // Open address modal
  };

  const handleSubmitOrder = async () => {
    if (!address.street || !address.city || !address.postalCode) {
      Alert.alert('Incomplete Address', 'Please fill in all required address fields.');
      return;
    }

    const userId = await AsyncStorage.getItem('userId');
    const token = await AsyncStorage.getItem('token');

    if (!userId || !token) {
      Alert.alert('Login Required', 'Please log in before placing an order.');
      return;
    }

    const productsToSubmit = Object.entries(cartQuantities).map(([productId, quantity]) => ({
      product: productId,
      quantity,
    }));

    try {
      // ✅ Submit order using API wrapper
      const data = await submitOrder({
        token,
        userId,
        products: productsToSubmit,
        total,
        address,
      });

      await sendOrderSuccessNotification(data.data._id); // Notify user locally

      Alert.alert('Order Confirmed', `Order #${data.data._id} is confirmed!`, [
        {
          text: 'OK',
          onPress: () => {
            clearCart(); // Clear cart after success
            setShowModal(false);
            navigation.navigate('Orders');
          },
        },
      ]);
    } catch (err) {
      console.error('❌ Order submission error:', err);
      Alert.alert('Order Failed', err.message || 'Unable to submit order.');
    }
  };

  return (
    <View style={styles.container}>
      <HeaderBar />

      <View style={styles.titleWrapper}>
        <Text style={styles.title}>Shopping Bag</Text>
      </View>

      {cartProductList.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            The cart is empty.
          </Text>
        </View>
      ) : (
        <ProductListContainer
          products={cartProductList}
          quantities={cartQuantities}
          updateQuantity={updateCartQuantity}
          isDarkMode={isDarkMode}
          hasMore={false}
          page={1}
          setPage={() => {}}
          fetchProducts={() => {}}
          loading={loading}
          searchText=""
          removeItem={removeFromCart}
        />
      )}

      <OrderSummaryBar
        total={total}
        quantity={quantity}
        onSubmit={handleCheckout}
        isDarkMode={isDarkMode}
        buttonLabel="CHECKOUT"
      />

      <AddressModal
        visible={showModal}
        address={address}
        setAddress={setAddress}
        onSubmit={handleSubmitOrder}
        onCancel={() => setShowModal(false)}
        isDarkMode={isDarkMode}
      />
    </View>
  );
}
