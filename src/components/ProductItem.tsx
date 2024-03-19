import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import FastImage from 'react-native-fast-image';
import {useFocusEffect} from '@react-navigation/native';
import images from '../constants/images';
import {getScreenHeight, getScreenWidth} from '../utils/commonServices';
import {useTheme} from '@react-navigation/native';
import fonts from '../constants/fonts';

const ProductItem = (props: any, ref: any) => {
  const theme = useTheme();
  const {colors} = theme;
  const dispatch = useDispatch();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={{...styles.screen}}>
      <View style={styles.imagecontanier}>
        {props.item?.images?.front ? (
          <FastImage
            style={styles.image}
            source={{
              uri: props.item?.images?.front,
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
          {props?.item?.name}
        </Text>

        <View style={styles.row}>
          <Text style={styles.price}>{props?.item?.brand}</Text>
        </View>
      </View>
    </View>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    screen: {
      backgroundColor: 'lavender',
      borderRadius: getScreenHeight(2),
      width: getScreenWidth(45),
      marginRight: getScreenHeight(1),
      alignSelf: 'center',
    },
    icon: {
      height: getScreenHeight(6),
      width: getScreenHeight(6),
    },
    image: {
      height: getScreenHeight(25),
      width: '100%',
      borderTopRightRadius: getScreenHeight(2),
      borderTopLeftRadius: getScreenHeight(2),
      resizeMode: 'cover',
    },
    loading: {
      zIndex: 10,
      position: 'absolute',
    },
    imagecontanier: {
      height: getScreenHeight(25),
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    },
    contanier: {
      padding: getScreenHeight(2),
    },
    title: {
      color: theme.black,
      fontSize: getScreenHeight(1.8),
      textTransform: 'capitalize',
      fontFamily: fonts.bold,
    },
    subtitle: {
      color: theme.black,
      fontSize: getScreenHeight(1.5),
      marginVertical: getScreenHeight(1),
    },
    price: {
      color: theme.black,
      fontSize: getScreenHeight(1),
      alignSelf: 'center',
      fontFamily: fonts.semibold,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    likeButton: {
      height: 20,
      width: 20,
      position: 'absolute',
      top: 10,
      right: 16,
    },
  });

export default ProductItem;
