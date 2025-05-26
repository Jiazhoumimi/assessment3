import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  // Full screen container with lavender background and center alignment
  container: {
    flex: 1,
    backgroundColor: '#e6c3f7',  // Light lavender background
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  // Wrapper that centers all children horizontally
  centeredWrapper: {
    width: '100%',
    alignItems: 'center',
  },

  // Card-like container with white background and shadow
  card: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6, // Android shadow
  },

  // Title text styling
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#b491c8',  // Muted purple
  },

  // Logo or profile image styling
  logo: {
    width: 140,
    height: 140,
    marginBottom: 70,
    borderRadius: 20,
    overflow: 'hidden',
  },

  // Text for bottom link (e.g. "Don't have an account?")
  linkText: {
    textAlign: 'center',
    color: '#333333',
    fontSize: 14,
  },

  // Highlighted part of the link (e.g. "Sign in")
  linkHighlight: {
    color: '#8c17b0',
    fontWeight: 'bold',
  },
});
