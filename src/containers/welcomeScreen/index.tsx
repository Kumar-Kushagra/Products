import {useTheme} from '@react-navigation/native';
import React, {useEffect, useMemo} from 'react';
import {
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

// Files
import {getScreenHeight} from '../../utils/commonServices';
import {Colors} from '../../theme/types';
import FastImage from 'react-native-fast-image';
import images from '../../constants/images';
import fonts from '../../constants/fonts';
import {navigate, resetRoot} from '../../utils/routerServices';
import routes from '../../constants/routes';
import localization from '../../localization';
import {useSelector} from 'react-redux';

const WelcomeScreen = () => {
  const theme = useTheme();
  const {colors} = theme;
  const userInfo = useSelector((state: any) => state.auth.userInfo);

  const styles = useMemo(() => createStyles(colors), [colors]);

  useEffect(() => {
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor(colors.background);
      StatusBar.setBarStyle('dark-content');
    }
  }, [colors?.background]);

  useEffect(() => {
    if (userInfo) {
      setTimeout(() => {
        resetRoot(routes.PRODUCTS_LISTINGS);
      }, 2000);
    }
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.screen}>
        <FastImage
          resizeMode="contain"
          style={styles.icon}
          source={images.grocery}
        />
      </View>
      <Text style={styles.title}>
        {localization.productsWelcomeTextPrimary}
        <Text style={{...styles.title, color: colors?.secondary}}>
          {localization.favorite}
        </Text>
        {localization.productsWelcomeTextSecondary}
      </Text>
      {userInfo ? null : (
        <TouchableOpacity
          onPress={() => resetRoot(routes.AUTH)}
          style={styles.getStarted}>
          <Text style={styles.getStartedText}>Get Started</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

const createStyles = (theme: Colors) => {
  return StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: theme.backgroundColor,
    },
    safe: {
      flex: 1,
      backgroundColor: theme.backgroundColor,
    },
    icon: {
      width: '100%',
      height: '90%',
      marginTop: 10,
    },
    title: {
      fontSize: getScreenHeight(5),
      color: theme.textColor,
      marginHorizontal: getScreenHeight(3),
      fontFamily: fonts.bold,
    },
    getStarted: {
      width: '90%',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
      backgroundColor: theme.textColor,
      height: getScreenHeight(6),
      alignSelf: 'center',
      marginBottom: getScreenHeight(3),
    },
    getStartedText: {
      fontSize: getScreenHeight(2.5),
      color: theme.backgroundColor,
      fontFamily: fonts.semibold,
    },
  });
};

export default WelcomeScreen;
