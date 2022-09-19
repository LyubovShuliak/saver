import {createAsyncThunk} from '@reduxjs/toolkit';
import {
  ImageLibraryOptions,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import RNFS, {ReadDirItem, UploadFileItem} from 'react-native-fs';
import {Platform} from 'react-native';

import Parse from 'parse/react-native';
export type Params = {
  options: ImageLibraryOptions;
  source: 'gallery' | 'camera';
};

export const getImages = createAsyncThunk(
  'gallery/getImages',
  async (params: Params) => {
    const response: ImagePickerResponse =
      params.source === 'gallery'
        ? await launchImageLibrary(params.options)
        : await launchCamera(params.options);

    if (response.assets) {
      return response.assets;
    }

    return [];
  },
);

export const getAppImages = createAsyncThunk('uploadImages', async () => {
  const imagePath = `${
    Platform.OS === 'android' ? RNFS.DocumentDirectoryPath : RNFS.MainBundlePath
  }`;
  const files: ReadDirItem[] = await RNFS.readDir(imagePath);
  try {
    // console.log(files);

    return (
      files.slice(1).map(file => ({
        ...file,
        isDirectory: null,
        isFile: null,
        fileName: file.name,
        uri: 'file://' + file.path,
        mtime: file.mtime?.toString(),
      })) || []
    );
  } catch (error) {
    return [];
  }
});
