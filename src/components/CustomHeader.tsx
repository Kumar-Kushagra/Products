import React, {useMemo} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useTheme} from '@react-navigation/native';

// Files
import fonts from '../constants/fonts';
import {getScreenHeight} from '../utils/commonServices';
import {Colors} from '../theme';
import {fontSize} from '../theme/text-variants';
import {useSelector} from 'react-redux';

type CustomHeaderProps = {
  title?: string;
  leftIcon?: any;
  rightIcon?: any;
  leftAction?: () => void;
  rightAction?: () => void;
  leftIconColor?: string;
  rightIconColor?: string;
};

const CustomHeader = ({
  title,
  leftIcon,
  rightIcon,
  leftAction,
  rightAction,
  leftIconColor,
  rightIconColor,
}: CustomHeaderProps) => {
  const theme = useTheme();
  const {colors} = theme;
  const styles = useMemo(() => createStyles(colors), [colors]);
  const cart = useSelector((state: any) => state.common.cart);

  return (
    <View style={styles.screen}>
      {leftIcon ? (
        <TouchableOpacity
          disabled={!leftAction}
          onPress={leftAction}
          style={styles.iconContainer}>
          <FastImage
            tintColor={leftIconColor}
            resizeMode="contain"
            source={leftIcon}
            style={styles.icon}
          />
        </TouchableOpacity>
      ) : (
        <View style={styles.iconContainer} />
      )}
      <Text numberOfLines={2} style={styles.title}>
        {title}
      </Text>
      {rightIcon ? (
        <TouchableOpacity
          disabled={!rightAction}
          onPress={rightAction}
          style={styles.iconContainer}>
          <FastImage
            tintColor={rightIconColor}
            resizeMode="contain"
            source={rightIcon}
            style={styles.icon}
          />
          <View
            style={{
              backgroundColor: 'red',
              height: getScreenHeight(2),
              width: getScreenHeight(2),
              borderRadius: 100,
              position: 'absolute',
              top: 10,
              left: -5,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontFamily: fonts.bold,
                color: 'white',
                fontSize: getScreenHeight(1.5),
              }}>
              {cart.length}
            </Text>
          </View>
        </TouchableOpacity>
      ) : (
        <View style={styles.iconContainer} />
      )}
    </View>
  );
};

const createStyles = (theme: Colors) =>
  StyleSheet.create({
    screen: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: getScreenHeight(6.5),
      backgroundColor: '#6739A6',
    },
    title: {
      fontFamily: fonts.medium,
      fontSize: fontSize['3xl'],
      color: theme.backgroundColor,
      textTransform: 'capitalize',
      flex: 1,
      textAlign: 'center',
    },
    iconContainer: {
      width: '10%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    icon: {
      width: getScreenHeight(2.5),
      height: getScreenHeight(2.5),
    },
  });

export default CustomHeader;
