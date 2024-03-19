import React, {useEffect, useMemo, useState} from 'react';
import {useTheme} from '@react-navigation/native';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import FastImage from 'react-native-fast-image';
import {getScreenHeight, getScreenWidth} from '../utils/commonServices';
import images from '../constants/images';
import fonts from '../constants/fonts';
import {fontSize} from '../theme/text-variants';
import {deleteCartManagerThunk} from '../redux/common';

const CartItem = (props: any) => {
  const theme = useTheme();
  const {colors} = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();

  const handler = () => {
    Alert.alert(
      'Are you sure?',
      'you wanted to remove this item from cart?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            dispatch(deleteCartManagerThunk(props.item.sku_code));
          },
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <View style={{...styles.screen}}>
      <View style={styles.imagecontanier}>
        {image ? (
          <FastImage
            style={styles.image}
            resizeMode="cover"
            source={{
              uri: image,
              priority: FastImage.priority.high,
            }}
          />
        ) : (
          <FastImage
            style={styles.icon}
            resizeMode="contain"
            source={images.grocery}
          />
        )}
      </View>
      <View style={styles.contanier}>
        <Text numberOfLines={2} style={styles.title}>
          {props.item.name}
        </Text>
        <Text
          style={{
            ...styles.price,
            color: colors.textColor,
            fontFamily: fonts.medium,
          }}>
          {props.item.brand}
          <Text style={{fontWeight: '500', ...styles.price}}>{}</Text>
        </Text>
        <TouchableOpacity style={styles.iconContanier} onPress={handler}>
          <FastImage
            tintColor={colors.textColor}
            resizeMode="contain"
            source={images.delete}
            style={styles.smallIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    screen: {
      backgroundColor: 'lavender',
      borderRadius: getScreenHeight(2),
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderColor: 'white',
      borderWidth: 1,
    },
    icon: {
      height: getScreenHeight(15),
      width: getScreenHeight(15),
    },
    image: {
      height: getScreenHeight(20),
      width: '100%',
      borderBottomLeftRadius: getScreenHeight(2),
      borderTopLeftRadius: getScreenHeight(2),
    },
    loading: {
      zIndex: 10,
      position: 'absolute',
    },
    imagecontanier: {
      height: getScreenHeight(20),
      justifyContent: 'center',
      alignItems: 'center',
      width: '45%',
    },
    contanier: {
      padding: getScreenHeight(2),
      width: '55%',
    },
    title: {
      color: 'black',
      fontSize: getScreenHeight(2),
      textTransform: 'capitalize',
      fontFamily: fonts.bold,
    },
    subtitle: {
      color: theme.black,
      fontSize: fontSize['2xl'],
      marginVertical: getScreenHeight(1),
      fontFamily: fonts.semibold,
    },
    price: {
      color: theme.productSubTitle,
      fontSize: getScreenHeight(2),
      marginTop: getScreenHeight(0.5),
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    smallIcon: {
      height: getScreenHeight(2.5),
      width: getScreenHeight(2.5),
    },
    iconContanier: {
      position: 'absolute',
      zIndex: 100,
      right: getScreenHeight(1),
      top: getScreenHeight(1),
    },
    action: {
      fontSize: getScreenHeight(2.5),
      color: theme.black,
    },
    inc: {
      height: getScreenHeight(5),
      width: getScreenWidth(5),
      resizeMode: 'contain',
      tintColor: theme.productSubTitle,
    },
    title2: {
      fontSize: getScreenHeight(2),
      color: theme.productSubTitle,
      marginTop: getScreenHeight(1),
    },
  });

export default CartItem;
