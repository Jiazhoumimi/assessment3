// styles/CardStyles.js
import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  cardWrapper: {
    width: width * 0.9,
    backgroundColor: '#000', // black background
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
  cardTextBlock: {
    flex: 1,
    marginRight: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff', // white text
    marginBottom: 25,
  },
  cardSubText: {
    fontSize: 14,
    color: '#fff', // white text
    marginBottom: 8,
  },
  exploreButton: {
    backgroundColor: '#f7abe2', // pink button
    paddingHorizontal: 12,
    paddingVertical:9,
    borderRadius: 30,
    alignSelf: 'flex-start',
  },
  exploreText: {
    color: '#000', // black text on white button
    fontWeight: '600',
    fontSize: 14,
  },
  cardImage: {
    width: 90,
    height: 90,
    borderRadius: 16,
    resizeMode: 'cover',
  },
});
