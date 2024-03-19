import {createSlice} from '@reduxjs/toolkit';
import {getProducts} from '../../services/products';
import {Alert} from 'react-native';
import {goBack, navigate} from '../../utils/routerServices';

const initialState = {
  loading: false,
  results: [],
  cart: [],
};

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setResults(state, action) {
      state.results = action.payload;
    },

    setCart(state, action) {
      state.cart = action.payload;
    },

    resetCommonSlice: () => initialState,
  },
});

export const getProductsThunk = (pageNumber: number) => {
  return async (dispatch: any, getState) => {
    const results = getState().common.results;

    const res: any = await getProducts(pageNumber);
    if (res) {
      if (res?.products?.length) {
        if (pageNumber === 1) {
          dispatch(setResults(res?.products));
        } else {
          dispatch(setResults([...results, ...res?.products]));
        }
      }
    }
  };
};

export const cartManagerThunk = (product: string) => {
  return async (dispatch: any, getState: any) => {
    const cart = getState().common.cart;

    const index = cart.findIndex(item => item.sku_code === product.sku_code);
    if (index === -1) {
      dispatch(setCart([...cart, product]));
      Alert.alert('Product added!');
    }
  };
};

export const codeScannerProductThunk = (ean: string) => {
  return async (dispatch: any, getState: any) => {
    const results = getState().common.results;

    const index = results.findIndex(item =>
      item.label.includes(ean.toString()),
    );
    if (index !== -1) {
      goBack();
      navigate('ProductDetail', {data: results[index]});
    }
  };
};

export const deleteCartManagerThunk = (sku_code: string) => {
  return async (dispatch: any, getState: any) => {
    const cart = getState().common.cart;
    const updatedProducts = cart.filter(item => item.sku_code !== sku_code);
    dispatch(setCart(updatedProducts));
  };
};

export const {setLoading, setResults, resetCommonSlice, setCart} =
  commonSlice.actions;

export default commonSlice.reducer;
