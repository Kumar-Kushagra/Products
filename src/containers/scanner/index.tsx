import {useCallback, useEffect} from 'react';
import {Alert, PermissionsAndroid, StyleSheet, View} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCodeScanner,
} from 'react-native-vision-camera';
import {store} from '../../redux/store';
import {codeScannerProductThunk} from '../../redux/common';

function Scanner() {
  const device = useCameraDevice('back');

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    if (device) {
      requestCameraPermission();
    }
  }, [device]);

  const onCodeScanned = useCallback((codes: Code[]) => {
    console.log(`Scanned ${codes.length} codes:`, codes[0].value);
    if (codes) {
      if (codes[0]?.value) {
        store.dispatch(codeScannerProductThunk(codes[0].value));
      }
    }
  }, []);

  // 5. Initialize the Code Scanner to scan QR codes and Barcodes
  const codeScanner = useCodeScanner({
    codeTypes: ['ean-13'],
    onCodeScanned: onCodeScanned,
  });

  return device === null ? (
    <View />
  ) : (
    <Camera
      codeScanner={codeScanner}
      enableZoomGesture={true}
      style={StyleSheet.absoluteFill}
      device={device}
      isActive={true}
    />
  );
}

export default Scanner;
