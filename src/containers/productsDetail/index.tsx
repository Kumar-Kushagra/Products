import {useTheme} from '@react-navigation/native';
import React, {useEffect, useMemo, useState} from 'react';
import {
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
// Files
import {getScreenHeight, getScreenWidth} from '../../utils/commonServices';
import {Colors} from '../../theme/types';
import fonts from '../../constants/fonts';
import {CustomHeader} from '../../components';
import FastImage from 'react-native-fast-image';
import {goBack, navigate} from '../../utils/routerServices';
import images from '../../constants/images';
import Carousel from 'react-native-reanimated-carousel';
import {cartManagerThunk} from '../../redux/common';
import routes from '../../constants/routes';

const width = Dimensions.get('screen').width;

const ProductDetail = (props: any) => {
  const theme = useTheme();
  const {colors} = theme;
  const styles = useMemo(() => createStyles(colors), [colors]);
  const dispatch: any = useDispatch();

  useEffect(() => {
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor(colors.background);
      StatusBar.setBarStyle('dark-content');
    }
  }, [colors?.background]);

  const data = props.route.params.data;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.screen}>
        <ScrollView bounces={false} style={styles.screen}>
          <CustomHeader
            leftAction={() => goBack()}
            leftIcon={images.back}
            rightIcon={images.cart}
            leftIconColor={'white'}
            rightIconColor="white"
            title={data?.brand}
            rightAction={() => {
              navigate(routes.CART, {});
            }}
          />

          <Carousel
            loop
            width={width}
            height={getScreenHeight(35)}
            autoPlay={true}
            data={Object.values(data.images)}
            scrollAnimationDuration={1000}
            onSnapToItem={index => console.log('current index:', index)}
            renderItem={({index, item}) => (
              console.log(item),
              (
                <FastImage
                  resizeMode="contain"
                  style={{
                    height: getScreenHeight(35),
                    width: width,
                  }}
                  source={{
                    uri: item,
                  }}
                />
              )
            )}
          />
          <ScrollView bounces={false} contentContainerStyle={styles.contanier}>
            <Text style={styles.title}>{data?.name}</Text>
            <View style={{height: getScreenHeight(2)}} />
            <Text style={styles.subtitle}>{data?.description}</Text>
            <Text style={styles.title}>Brand Name</Text>
            <Text style={styles.subtitle}>{data?.brand}</Text>
            <View style={{height: getScreenHeight(2)}} />
            <TouchableOpacity
              onPress={() => {
                dispatch(cartManagerThunk(data));
              }}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderRadius: getScreenHeight(1),
                paddingVertical: getScreenHeight(2),
                backgroundColor: colors.backgroundColor,
              }}>
              <Text
                style={{fontFamily: fonts.bold, fontSize: getScreenHeight(2)}}>
                Add to cart
              </Text>
            </TouchableOpacity>
            <View style={{height: getScreenHeight(4)}} />
          </ScrollView>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ProductDetail;

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
    item: {
      marginTop: getScreenHeight(2),
    },
    contanier: {
      padding: getScreenHeight(2),
    },
    image: {
      height: getScreenHeight(60),
      width: '100%',
      backgroundColor: theme.background,
    },
    subtitle: {
      fontSize: getScreenHeight(1.8),
      color: theme.textColor,
      marginBottom: getScreenHeight(1.5),
    },
    title: {
      fontSize: getScreenHeight(2.2),
      fontWeight: '700',
      color: theme.textColor,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    inc: {
      height: getScreenHeight(6),
      width: getScreenWidth(5),
      resizeMode: 'contain',
    },
    title2: {
      fontSize: getScreenHeight(2),
      color: 'black',
    },
    icon: {
      height: getScreenHeight(2.5),
      width: getScreenHeight(2.5),
    },
  });
};
