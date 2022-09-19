import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {ImageList} from '../components/ImageList';
import {HandleButtons} from '../components/HandleButtons';
import {IsLoading} from '../components/IsLoading';
import {useAppDispatch} from '../redux/hooks';
import {useFocusEffect} from '@react-navigation/native';
import {getAppImages} from '../redux/imageCollection/uploadImages';

export const HomeScreen = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAppImages());
  }, []);
  return (
    <>
      <SafeAreaView style={styles.wrapper}>
        <HandleButtons />

        <ImageList />
      </SafeAreaView>

      <IsLoading />
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});
