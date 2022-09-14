import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Svg, {Circle} from 'react-native-svg';
import {useAppSelector} from '../redux/hooks';
import {
  Collection,
  imagesToDelete,
} from '../redux/imageCollection/imageCollectionSlice';
import DeleteImageCheckMark from '../assets/images/delete_check_mark.svg';
import SvgUri from 'react-native-svg-uri';

export const CheckMark: FC<Collection> = props => {
  const chosenImages = useAppSelector(imagesToDelete).find(
    image => props.uri === image.uri,
  );
  const {isRemoving} = props;

  return (
    <>
      {isRemoving ? (
        <Svg
          height="20"
          width="20"
          style={[styles.deleteCircle, styles.svgStyle]}>
          <Circle
            cx="10"
            cy="10"
            r="10"
            fill={chosenImages ? '#00b3b3' : 'black'}
            opacity={chosenImages ? 1 : 0.5}
          />
          {chosenImages ? (
            <SvgUri
              fill='white'
              height="18"
              width="20"
              source={require('../assets/images/delete_check_mark.svg')}
            />
          ) : 
          null}
        </Svg>
      ) : null}
    </>
  );
};
const styles = StyleSheet.create({
  svgStyle: {
    position: 'absolute',
    zIndex: 1,
    right: 0,
    margin: 2,
  },

  deleteCircle: {
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 10,
  },
});
