import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from '../styles/CardStyles'; 

export default function CategoryCard({ title, imageSource, onPress }) {
  return (
    <TouchableOpacity style={styles.cardWrapper} onPress={onPress}>
      <View style={styles.cardTextBlock}>
        <Text style={styles.cardTitle}>{title}</Text>
        <View style={styles.exploreButton}>
          <Text style={styles.exploreText}>Explore</Text>
        </View>
      </View>
      <Image source={imageSource} style={styles.cardImage} />
    </TouchableOpacity>
  );
}
