import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export function getHomeStyles(isDarkMode) {
  return StyleSheet.create({
    // Root container background
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#000' : '#fff',
    },

    // Section at the top of the page (includes heading and carousel)
    topSection: {
      marginTop: 10,
      marginBottom: 5,
      alignItems: 'flex-start',
    },

    // Title text above carousel
    topTitle: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 12,
      color: isDarkMode ? '#fff' : '#111',
      letterSpacing: 1.2,
      paddingHorizontal: 20,
    },

    // Wrapper for menu buttons below category cards
    buttonContainer: {
      marginTop: 0,
      alignItems: 'center',
    },

    // Carousel wrapper with rounded corners
    carouselWrapper: {
      borderRadius: 16,
      overflow: 'hidden',
      width: width * 0.9,
      height: 250,
    },

    // Image inside the carousel
    carouselImage: {
      width: '100%',
      height: '100%',
    },
  });
}
