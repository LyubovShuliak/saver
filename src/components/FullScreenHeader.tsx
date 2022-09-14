import React, {FC, useCallback, useEffect, useRef} from 'react';
import {
  Pressable,
  StyleSheet,
  Animated,
  StatusBar,
  SafeAreaView,
  View,
  Text,
} from 'react-native';

import ReturnButton from '../assets/images/return_to_main_screen.svg';
import DeleteButton from '../assets/images/delete_button.svg';
import { SvgUri } from 'react-native-svg';
import SvgContainer from 'react-native-svg-uri';

type Header = {
  handleClose: () => void;
  handleDelete: () => void;
  controlBarVisibility: boolean;
};
export const FullScreenHeader= ({
  handleClose,
  handleDelete,
  controlBarVisibility,
}: Header) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = useCallback(() => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const fadeOut = useCallback(() => {
    Animated.timing(fadeAnim, {
      toValue: -50,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  useEffect(() => {
    if (controlBarVisibility) {
      fadeIn();
    } else {
      fadeOut();
    }
  }, [controlBarVisibility, fadeIn, fadeOut]);

  useEffect(()=>{

  }, )

  return (   
    <SafeAreaView style={styles.buttonsContainer}>
      <Animated.View
        style={[
          styles.controlButtons,
          {
            top: StatusBar.currentHeight,
            opacity: fadeAnim.interpolate({
              inputRange: [-50, -20, 0],
              outputRange: [0, 0.3, 1],
            }),
            transform: [{translateY: fadeAnim}],
          },
        ]}>
        <Pressable onPress={handleClose} hitSlop={20}>
        <Text>close</Text>
         {/* <SvgUri height={20} width={20} /> */}
         <SvgContainer
           height="18"
           width="18"
           source={require('../assets/images/return_to_main_screen.svg')}
             />
          {/* <ReturnButton height={20} width={20} /> */}
        </Pressable>
        <Pressable onPress={handleDelete} hitSlop={20}>
          <Text>delete</Text>
          {/* <DeleteButton width={20} height={20} /> */}
          <SvgContainer
           height="18"
           width="18"
           source={require('../assets/images/delete_check_mark.svg')}
             />
        </Pressable>
      </Animated.View>
    </SafeAreaView>
 
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {zIndex: 1},
  controlButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    color: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    position: 'absolute',
    width: '100%',
  },
});
