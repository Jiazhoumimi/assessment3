import * as Notifications from 'expo-notifications';
import { Alert, Platform } from 'react-native';

// Configure how notifications are handled when received
export async function setupNotificationHandler() {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  await requestNotificationPermission();
}

// Request permission to show notifications
export async function requestNotificationPermission() {
  const { status } = await Notifications.getPermissionsAsync();

  if (status !== 'granted') {
    const { status: newStatus } = await Notifications.requestPermissionsAsync();

    if (newStatus !== 'granted') {
      Alert.alert(
        'Permission denied',
        'You have denied notification permissions. You can enable it later in system settings.'
      );
    }

    return newStatus;
  }

  return status;
}

// Send a test local notification
export async function sendTestNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: '🌸 Welcome to IFN666',
      body: 'This is a test local notification.',
    },
    trigger: null,
  });
}

// Send a welcome promotional notification
export async function sendWelcomeDiscountNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: '🌺 What’s NEW!',
      body: 'HAUS LABS is coming soon!',
    },
    trigger: null,
  });
}

// Send login success notification with welcome offer
export async function sendLoginSuccessNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: '🛍️ Welcome Offer!',
      body: 'Enjoy 20% off as a new user – Do not miss out!',
    },
    trigger: null,
  });
}

// Send order confirmation notification with order ID
export async function sendOrderSuccessNotification(orderId) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: '🎀 Order Confirmed!',
      body: `Your order ORDER # ${orderId} is on the way 🚛🩷`,
    },
    trigger: null,
  });
}
