import {useTheme} from '@react-navigation/native';
import React, {useEffect, useMemo} from 'react';
import {
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';

// Files
import {getScreenHeight, getScreenWidth} from '../../utils/commonServices';
import {loginThunk} from '../../redux/auth';
import fonts from '../../constants/fonts';
import images from '../../constants/images';

const Auth = () => {
  const theme = useTheme();
  const {colors} = theme;
  const styles = useMemo(() => createStyles(colors), [colors]);
  const dispatch = useDispatch<any>();

  useEffect(() => {
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor(colors.background);
      StatusBar.setBarStyle('dark-content');
    }
  }, [colors?.background]);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.screen}>
        <TouchableOpacity
          style={styles.google}
          onPress={() => {
            dispatch(loginThunk());
          }}>
          <Image source={images.google} style={styles.icon} />
          <Text style={styles.title}>Google sign </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    screen: {
      backgroundColor: theme.background,
      flex: 1,
      justifyContent: 'center',
      padding: getScreenHeight(2),
    },
    safe: {
      backgroundColor: theme.primary,
      flex: 1,
    },
    google: {
      borderRadius: 10,
      borderColor: 'grey',
      borderWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: getScreenHeight(2),
      flexDirection: 'row',
    },
    title: {
      fontFamily: fonts.bold,
      fontSize: getScreenHeight(1.8),
    },
    icon: {
      height: getScreenHeight(3),
      width: getScreenHeight(3),
      marginRight: getScreenHeight(1),
    },
  });

export default Auth;
