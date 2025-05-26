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
import { getProductScreenStyles } from '../styles/ProductScreenStyles';

export default function CartScreen() {
  const { isDarkMode } = useThemeMode();
  const styles = getProductScreenStyles(isDarkMode);
  const navigation = useNavigation();

  // Cart context
  const {
    cartItems,
    updateCartQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  // Pull all product IDs from cart
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

  // Filter matched products with quantity
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
    setShowModal(true);
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
      const res = await fetch('https://n11501910.ifn666.com/assessment02/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          user: userId,
          products: productsToSubmit,
          total,
          shippingAddress: address,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        Alert.alert('Order Failed', data?.message || 'Something went wrong.');
        return;
      }

      await sendOrderSuccessNotification(data.data._id);

      Alert.alert('Success', `Order #${data.data._id} placed successfully!`, [
        {
          text: 'OK',
          onPress: () => {
            clearCart();
            setShowModal(false);
            navigation.navigate('Orders');
          },
        },
      ]);
    } catch (err) {
      console.error('❌ Order submission error:', err);
      Alert.alert('Network Error', 'Unable to submit order. Try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <HeaderBar />

      <View style={{ paddingHorizontal: 16, paddingTop: 12 }}>
        <Text style={{ fontSize: 20, fontWeight: '600', color: isDarkMode ? '#fff' : '#111' }}>
          Shopping Bag
        </Text>
      </View>

      {cartProductList.length === 0 ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 16, color: isDarkMode ? '#888' : '#666' }}>
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
