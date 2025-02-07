import { launchImageLibrary } from 'react-native-image-picker';

const selectImage = () => {
  return new Promise((resolve, reject) => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
        resolve(null);
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
        reject(response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const selectedImage = response.assets[0];
        resolve(selectedImage.uri);
      } else {
        resolve(null);
      }
    });
  });
};

export default selectImage;
