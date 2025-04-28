import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createNativeBottomTabNavigator } from '@bottom-tabs/react-navigation';
import Animated, { 
  useAnimatedStyle, 
  withRepeat, 
  withTiming,
  useSharedValue,
  Easing,
  withSequence,
  withDelay
} from 'react-native-reanimated';

const Tab = createNativeBottomTabNavigator();

const HomeScreen = () => {
  const translateY = useSharedValue(0);
  const rotate = useSharedValue(0);
  const scale = useSharedValue(1);

  React.useEffect(() => {
    translateY.value = withRepeat(
      withTiming(-20, { 
        duration: 2000,
        easing: Easing.inOut(Easing.sin)
      }),
      -1,
      true
    );

    rotate.value = withRepeat(
      withTiming(360, {
        duration: 3000,
        easing: Easing.linear
      }),
      -1,
      false
    );

    scale.value = withRepeat(
      withSequence(
        withTiming(1.2, { duration: 1000 }),
        withTiming(1, { duration: 1000 })
      ),
      -1,
      true
    );
  }, [translateY, rotate, scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateY.value },
      { rotate: `${rotate.value}deg` },
      { scale: scale.value }
    ]
  }));

  return (
    <View style={styles.screen}>
      <Animated.View style={[styles.animatedContainer, animatedStyle]}>
        <Text style={styles.text}>🎨 Welcome 🎨</Text>
        <Text style={styles.subText}>Watch me move!</Text>
      </Animated.View>
    </View>
  );
};

const ProfileScreen = () => (
  <View style={styles.screen}>
    <Text style={styles.text}>Profile Screen</Text>
  </View>
);

const SettingsScreen = () => (
  <View style={styles.screen}>
    <Text style={styles.text}>Settings Screen</Text>
  </View>
);

const ThreeTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} options={{
        tabBarIcon: () => ({ sfSymbol: 'house' }),
      }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{
        tabBarIcon: () => ({ sfSymbol: 'person' }),
      }} />
      <Tab.Screen name="Settings" component={SettingsScreen} options={{
        tabBarIcon: () => ({ sfSymbol: 'gear' }),
      }} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4c669f',
  },
  animatedContainer: {
    alignItems: 'center',
    padding: 20,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  text: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  subText: {
    fontSize: 20,
    color: '#fff',
    opacity: 0.8,
  },
});

export default ThreeTabs; 