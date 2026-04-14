import React, { useEffect, useRef, useState } from 'react';
import { View, Animated, StyleSheet, Easing, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default App = () => {
  const [phase, setPhase] = useState(0);

  const blueSquareScale = useRef(new Animated.Value(1)).current;
  const purpleScale = useRef(new Animated.Value(0)).current;
  const pinkScale = useRef(new Animated.Value(0)).current;

  const circleSize = 500; // Define circleSize here

  useEffect(() => {
    Animated.timing(blueSquareScale, {
      toValue: 10,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      setPhase(1);
      Animated.stagger(60, [
        Animated.timing(purpleScale, {
          easing: Easing.cubic,
          toValue: 6, // Adjusted size
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pinkScale, {
          easing: Easing.cubic,
          toValue: 6, // Adjusted size
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // Trigger navigation or next step here
      });
    });
  }, []);

  const styles = createStyles(circleSize); // Pass circleSize to the styles function

  return (
    <View style={styles.fullScreen}>
      {phase === 0 ? (
        <Animated.View
          style={[
            styles.blueSquare,
            {
              transform: [{ scale: blueSquareScale }],
            },
          ]}
        />
      ) : null}

      {phase >= 1 ? (
        <View style={styles.fullBlueBackground}>
          <Animated.View
            style={[
              styles.circle,
              styles.purple,
              {
                transform: [{ scale: purpleScale }],
                position: 'absolute',
                top: height / 2 - circleSize / 2, // Center vertically
                left: width / 2 - circleSize / 2, // Center horizontally
              },
            ]}
          />
          <Animated.View
            style={[
              styles.circle,
              styles.pink,
              {
                transform: [{ scale: pinkScale }],
                position: 'absolute',
                top: height / 2 - circleSize / 2, // Center vertically
                left: width / 2 - circleSize / 2, // Center horizontally
              },
            ]}
          />
        </View>
      ) : null}
    </View>
  );
};

const createStyles = (circleSize) =>
  StyleSheet.create({
    fullScreen: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    blueSquare: {
      width: 100,
      height: 100,
      backgroundColor: '#e60000',
    },
    fullBlueBackground: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: '#e60000',
      justifyContent: 'center',
      alignItems: 'center',
    },
    circle: {
      width: circleSize,
      height: circleSize,
      borderRadius: circleSize / 2,
      borderWidth: circleSize / 3,
    },
    purple: {
      borderColor: '#e8a8b7',
    },
    pink: {
      borderColor: '#e07776',
    },
  });