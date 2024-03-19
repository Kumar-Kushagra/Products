import {useFocusEffect, useTheme} from '@react-navigation/native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  PermissionsAndroid,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
// Files
import {getScreenHeight, getScreenWidth} from '../../utils/commonServices';
import {CustomHeader} from '../../components';
import FastImage from 'react-native-fast-image';
import images from '../../constants/images';
import {navigate} from '../../utils/routerServices';
import ProductItem from '../../components/ProductItem';
import {getProductsThunk} from '../../redux/common';
import routes from '../../constants/routes';
import fonts from '../../constants/fonts';

const ProductListings = () => {
  const theme = useTheme();
  const {colors} = theme;
  const [loading, setLoading] = useState(true);
  const products = useSelector((state: any) => state.common.results);
  const userInfo = useSelector((state: any) => state.auth.userInfo);
  const styles = useMemo(() => createStyles(colors), [colors]);
  const dispatch: any = useDispatch();
  const currentPageRef = useRef<number>(1);

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
        navigate('Scanner', {});
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    await dispatch(getProductsThunk(currentPageRef.current));
    setLoading(false);
  };
  useEffect(() => {
    fetchProducts();
  }, [dispatch]);

  useFocusEffect(
    React.useCallback(() => {
      currentPageRef.current = 1;
    }, []),
  );

  const renderItem = ({item}: any) => {
    return (
      <Pressable
        onPress={() => navigate('ProductDetail', {data: item})}
        style={styles.item}>
        <ProductItem item={item} />
      </Pressable>
    );
  };

  const onEndReached = () => {
    currentPageRef.current = currentPageRef.current + 1;
    fetchProducts();
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor(colors.background);
      StatusBar.setBarStyle('dark-content');
    }
  }, [colors?.background]);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.screen}>
        <CustomHeader
          rightIcon={images.cart}
          rightIconColor="white"
          rightAction={() => {
            navigate(routes.CART, {});
          }}
          title="Home"
        />

        <Text style={styles.heading}>HI, {userInfo.user.displayName}</Text>

        <TouchableOpacity
          onPress={() => {
            requestCameraPermission();
          }}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            borderRadius: getScreenHeight(1),
            paddingVertical: getScreenHeight(2),
            backgroundColor: colors.backgroundColor,
            width : "90%",
            alignSelf:"center"
          }}>
          <Text style={{fontFamily: fonts.bold, fontSize: getScreenHeight(2)}}>
            Scan Product
          </Text>
        </TouchableOpacity>
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={{alignSelf: 'center', width: '97%'}}
          numColumns={2}
          data={products}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderItem}
          ListEmptyComponent={
            loading ? null : (
              <View style={{marginTop: getScreenHeight(22)}}>
                <FastImage
                  style={styles.image1}
                  resizeMode={'contain'}
                  source={images.grocery}
                />
                <Text style={{...styles.title, ...styles.emptyContainer}}>
                  No Products Yet!
                </Text>
              </View>
            )
          }
          contentContainerStyle={styles.flatlist}
          onEndReached={onEndReached}
          ListFooterComponent={() =>
            loading ? (
              <ActivityIndicator
                color={colors.grey}
                size={'large'}
                style={{marginVertical: getScreenHeight(5)}}
              />
            ) : null
          }
          onEndReachedThreshold={0.5}
        />
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
      backgroundColor: theme.primary,
      flex: 1,
    },
    item: {
      marginBottom: getScreenHeight(2),
      alignSelf: 'center',
    },
    title: {
      fontSize: getScreenHeight(2),
      color: theme.black,
    },
    header: {
      padding: getScreenHeight(2),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    flatlist: {
      justifyContent: 'space-between',
      paddingTop: getScreenHeight(2),
      paddingLeft: getScreenHeight(1.5),
    },
    image: {
      height: getScreenHeight(5),
      width: getScreenWidth(6),
    },
    image1: {
      height: getScreenHeight(20),
      width: '100%',
    },
    clear: {
      justifyContent: 'center',
      alignItems: 'center',
      height: getScreenHeight(4),
      width: getScreenWidth(30),
      alignSelf: 'flex-end',
      marginRight: getScreenHeight(2),
      marginTop: getScreenHeight(1.5),
      borderRadius: getScreenHeight(1),
      backgroundColor: theme.primary,
    },
    clearText: {
      fontSize: getScreenHeight(2.5),
      fontFamily: fonts.bold,
      color: theme.white,
    },
    emptyContainer: {
      marginTop: getScreenHeight(2),
      textAlign: 'center',
      fontSize: getScreenHeight(2.5),
      color: theme.textColor,
      fontWeight: 'bold',
    },
    searchView: {
      width: '15%',
      borderRadius: getScreenHeight(2),
      justifyContent: 'center',
      alignItems: 'center',
    },
    textInput: {
      width: '85%',
      borderRadius: getScreenHeight(2),
      paddingLeft: getScreenHeight(3),
      fontFamily: fonts.bold,
      fontSize: getScreenWidth(4),
      color: theme.textColor,
    },
    parentSearchView: {
      height: getScreenHeight(6),
      backgroundColor: 'lavender',
      marginTop: getScreenHeight(1),
      borderRadius: getScreenHeight(2),
      width: '90%',
      //alignSelf: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    parentView: {
      marginTop: getScreenHeight(1),
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'center',
      justifyContent: 'space-between',
    },
    heading: {
      fontFamily: fonts.bold,
      color: theme.textColor,
      paddingHorizontal: getScreenHeight(1),
      fontSize: getScreenHeight(2.5),
      marginTop: getScreenHeight(1),
    },
  });

export default ProductListings;
