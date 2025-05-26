// Home Screen

import React, { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useThemeMode } from '../context/ThemeContext';
import { getHomeStyles } from '../styles/HomeStyles';

import HeaderBar from '../components/HeaderBar';
import MenuButton from '../components/MenuButton';
import CategoryCard from '../components/CategoryCard';
import ImageCarousel from '../components/ImageCarousel';
import {
  sendWelcomeDiscountNotification,
  setupNotificationHandler,
} from '../services/notifications';

export default function HomeScreen() {
  const navigation = useNavigation();
  const { isDarkMode } = useThemeMode();
  const styles = getHomeStyles(isDarkMode);

  useEffect(() => {
    setupNotificationHandler();
  }, []);

  const carouselImages = [
    require('../assets/home.jpg'),
    require('../assets/home2.jpg'),
    require('../assets/home3.jpg'),
    require('../assets/home4.jpg'),
  ];

  const handleCarouselPress = (index) => {
    if (index === 0) {
      sendWelcomeDiscountNotification();
    }
  };

  const categories = [
    { title: 'Home Appliances', image: require('../assets/home_appliance.jpg') },
    { title: 'Electronics', image: require('../assets/electronic.jpg') },
    { title: 'Clothing', image: require('../assets/clothing.jpg') },
    { title: 'Beauty', image: require('../assets/beauty.jpg') },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <HeaderBar />

      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        {/* 🔔 What's New section */}
        <View style={styles.topSection}>
          <Text style={styles.topTitle}>What's New?</Text>
          <ImageCarousel images={carouselImages} onPress={handleCarouselPress} />
        </View>

        {/* 🏷️ Category cards with navigation */}
        {categories.map((cat) => (
          <CategoryCard
            key={cat.title}
            title={cat.title}
            imageSource={cat.image}
            onPress={() =>
              navigation.navigate('CategoryProducts', {
                category: cat.title,
              })
            }
          />
        ))}

        {/* 📦 Buttons for other features */}
        <View style={styles.buttonContainer}>
          <MenuButton title="Get Order By ID" onPress={() => navigation.navigate('GetOrderById')} />
          <MenuButton title="My Orders" onPress={() => navigation.navigate('Orders')} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
