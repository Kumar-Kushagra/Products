import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Files
import routes from '../constants/routes';
import WelcomeScreen from '../containers/welcomeScreen';
import ProductListings from '../containers/productsListing';
import ProductDetail from '../containers/productsDetail';
import Cart from '../containers/cart';
import Auth from '../containers/auth';
import Scanner from '../containers/scanner';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name={routes.WELCOME_SCREEN} component={WelcomeScreen} />
        <Stack.Screen
          name={routes.PRODUCTS_LISTINGS}
          component={ProductListings}
        />
        <Stack.Screen name={routes.PRODUCTS_DETAIL} component={ProductDetail} />
        <Stack.Screen name={routes.CART} component={Cart} />
        <Stack.Screen name={routes.AUTH} component={Auth} />
        <Stack.Screen name={'Scanner'} component={Scanner} />
      </Stack.Navigator>
    </>
  );
};

export default MainStack;
