import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import React, {FC, useEffect} from 'react';
import {
  Image,
  StyleSheet,
  Pressable,
  View,
  useWindowDimensions,
  GestureResponderEvent,
} from 'react-native';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {
  chooseImagesToDelete,
  Collection,
  imagesToDelete,
} from '../redux/imageCollection/imageCollectionSlice';

import {CheckMark} from './CheckMark';

export const ImageItem = (props: {image: Collection}) => {
  const {width, height} = useWindowDimensions();

  const {image} = props;

  const chosenImages = useAppSelector(imagesToDelete).find(
    image => image.uri === image.uri,
  );

  useEffect(() => {
    console.log('chosenImages', chosenImages);
  }, [chosenImages]);

  const imageSizeForPortrait = Math.floor(width / 4);
  const imageSizeForLandscape = Math.floor(width / 7);

  const {uri, isRemoving} = image;

  const dispatch = useAppDispatch();
  const navigation =
    useNavigation<
      StackNavigationProp<{FullScreenImage: {image: Collection}}>
    >();

  const openFullScreenImage = () => {
    navigation.navigate('FullScreenImage', {
      image: image,
    });
  };

  const handleSelect = (e: any) => {
    console.log(isRemoving, chosenImages);

    return isRemoving
      ? dispatch(chooseImagesToDelete(image))
      : openFullScreenImage();
  };
  return (
    <View
      style={[
        styles.imageContainer,
        {
          width: width > height ? imageSizeForLandscape : imageSizeForPortrait,
          height: width > height ? imageSizeForLandscape : imageSizeForPortrait,
        },
      ]}>
      <Pressable
        onPress={handleSelect}
        onLongPress={() => dispatch(chooseImagesToDelete(image))}>
        <View>
          <CheckMark {...image} />
          <Image
            style={styles.image}
            source={{
              uri,
            }}
          />
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    justifyContent: 'center',
    alignContent: 'space-around',
    padding: 10,
  },
  image: {
    height: '100%',
    width: '100%',
  },
});
