import React, {FC, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Svg, {Circle} from 'react-native-svg';
import {useAppSelector} from '../redux/hooks';
import {
  Collection,
  imagesToDelete,
} from '../redux/imageCollection/imageCollectionSlice';

import SvgUri from 'react-native-svg-uri-updated';

export const CheckMark = (props: Collection) => {
  const [imageIsChosen, setImageIsChosen] = useState<boolean>(false);
  const chosenImages = useAppSelector(imagesToDelete);
  const {isRemoving} = props;

  useEffect(() => {
    if (chosenImages) {
      let isChosen = chosenImages
        ? chosenImages.find(image => image.fileName === props.fileName)
        : false;
      setImageIsChosen(isChosen ? true : false);
    } else {
      setImageIsChosen(false);
    }
  }, [chosenImages]);

  useEffect(() => {
    console.log('imageIsChosen', imageIsChosen);
  }, [imageIsChosen]);

  return (
    <>
      {isRemoving && imageIsChosen ? (
        <Svg
          height="20"
          width="20"
          style={[styles.deleteCircle, styles.svgStyle]}>
          <Circle
            cx="10"
            cy="10"
            r="10"
            fill={'#00b3b3'}
            opacity={1}
            stroke="white"
            strokeWidth="1"
          />
          <SvgUri
            fill="white"
            height="18"
            width="20"
            source={require('../assets/images/delete_check_mark.svg')}
          />
        </Svg>
      ) : isRemoving ? (
        <Svg
          height="20"
          width="20"
          style={[styles.deleteCircle, styles.svgStyle]}>
          <Circle cx="10" cy="10" r="10" fill={'black'} opacity={1} />
        </Svg>
      ) : null}
    </>
  );
};
const styles = StyleSheet.create({
  svgStyle: {
    position: 'absolute',
    zIndex: 1,
    right: -8,
    top: -8,
    margin: 2,
    borderWidth: 6,
    borderColor: 'white',
  },

  deleteCircle: {
    borderColor: 'white',
    borderWidth: 6,
    borderRadius: 10,
  },
});
