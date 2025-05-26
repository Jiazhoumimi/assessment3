import React, { useState, useRef } from 'react';
import {
  FlatList,
  Image,
  TouchableOpacity,
  View,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { useThemeMode } from '../context/ThemeContext';
import { getHomeStyles } from '../styles/HomeStyles';

const screenWidth = Dimensions.get('window').width;
const horizontalPadding = screenWidth * 0.05;

export default function ImageCarousel({ images, onPress }) {
  const { isDarkMode } = useThemeMode(); // Automatically read dark mode context
  const styles = getHomeStyles(isDarkMode);
  const [activeIndex, setActiveIndex] = useState(0);

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index);
    }
  }).current;

  const viewabilityConfigRef = useRef({
    viewAreaCoveragePercentThreshold: 50,
  });

  return (
    <View style={{ height: 280 }}>
      <FlatList
        data={images}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToAlignment="start"
        decelerationRate="fast"
        contentContainerStyle={{ paddingHorizontal: horizontalPadding }}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => onPress(index)} activeOpacity={0.8}>
            <View style={styles.carouselWrapper}>
              <Image source={item} style={styles.carouselImage} resizeMode="cover" />
            </View>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfigRef.current}
      />

      {/* Pagination Dots */}
      {images.length > 1 && (
        <View style={{ alignItems: 'center', marginTop: 8, marginBottom: 4 }}>
          <View style={dotStyles.dotContainer}>
            {images.map((_, idx) => (
              <View
                key={idx}
                style={[
                  dotStyles.dot,
                  {
                    backgroundColor:
                      activeIndex === idx
                        ? isDarkMode ? '#fff' : '#111'
                        : isDarkMode ? '#555' : '#ccc',
                  },
                ]}
              />
            ))}
          </View>
        </View>
      )}
    </View>
  );
}

const dotStyles = StyleSheet.create({
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 5,
  },
});
