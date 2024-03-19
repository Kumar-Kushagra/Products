import {useTheme} from '@react-navigation/native';
import React, {useEffect, useMemo} from 'react';
import {
  FlatList,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
// Files
import {getScreenHeight, getScreenWidth} from '../../utils/commonServices';
import {CartItem, CustomHeader} from '../../components';
import images from '../../constants/images';
import {goBack} from '../../utils/routerServices';
import FastImage from 'react-native-fast-image';
import fonts from '../../constants/fonts';
import {fontSize} from '../../theme/text-variants';
import {setCart} from '../../redux/common';

const Cart = () => {
  const theme = useTheme();
  const {colors} = theme;

  const styles = useMemo(() => createStyles(colors), [colors]);
  const dispatch: any = useDispatch();
  const cartProducts = useSelector((state: any) => state.common.cart);

  useEffect(() => {
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor(colors.background);
      StatusBar.setBarStyle('dark-content');
    }
  }, [colors?.background]);

  const renderItem = ({item}: any) => {
    return (
      <View style={styles.item}>
        <CartItem item={item} />
      </View>
    );
  };
  const handler = () => {
    dispatch(setCart([]));
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.safe}>
        <CustomHeader
          title="Cart"
          leftAction={() => goBack()}
          leftIcon={images.back}
          leftIconColor={'white'}
        />
        {cartProducts?.length > 0 && (
          <TouchableOpacity style={styles.clear} onPress={() => handler()}>
            <Text style={styles.clearText}>Clear Cart</Text>
          </TouchableOpacity>
        )}
        <FlatList
          data={cartProducts}
          ListEmptyComponent={() => (
            <View style={{marginTop: getScreenHeight(28)}}>
              <FastImage
                style={styles.image}
                resizeMode={'contain'}
                source={images.empty_cart}
              />
              <Text style={styles.emptyCartText}>
                No Product Added to Cart Yet!
              </Text>
            </View>
          )}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderItem}
          contentContainerStyle={{padding: getScreenHeight(2)}}
        />

        {/* {cartProducts.length > 0 && (
          <View style={{ padding: getScreenHeight(2) }}>
            <CustomButton
              action={() => {
                navigate('ChooseAddress', {});
              }}
              title="Place Order"
            />
          </View>
        )} */}
      </View>
    </SafeAreaView>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    screen: {
      backgroundColor: theme.background,
      flex: 1,
    },
    safe: {
      backgroundColor: theme.backgroundColor,
      flex: 1,
    },
    item: {
      marginBottom: getScreenHeight(2),
    },
    contanier: {
      paddingHorizontal: getScreenHeight(2),
    },
    title: {
      color: theme.black,
      fontSize: fontSize['2xl'],
      fontFamily: fonts.bold,
    },
    image: {
      height: getScreenHeight(20),
      width: '100%',
    },
    clear: {
      justifyContent: 'center',
      alignItems: 'center',
      height: getScreenHeight(5),
      width: getScreenWidth(34),
      alignSelf: 'flex-end',
      marginRight: getScreenHeight(2),
      marginTop: getScreenHeight(1),
      borderRadius: getScreenHeight(1),
      backgroundColor: theme.textColor,
    },
    clearText: {
      fontSize: getScreenHeight(2.5),
      fontFamily: fonts.bold,
      color: theme.backgroundColor,
    },
    emptyCartText: {
      marginTop: getScreenHeight(2),
      fontSize: getScreenHeight(2.5),
      color: theme.textColor,
      fontFamily: fonts.bold,
      textAlign: 'center',
    },
  });

export default Cart;
