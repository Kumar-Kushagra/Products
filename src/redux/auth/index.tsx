import {createSlice} from '@reduxjs/toolkit';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {navigate, resetRoot} from '../../utils/routerServices';
import routes from '../../constants/routes';

const initialState = {
  userInfo: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
    resetCommonSlice: () => initialState,
  },
});

export const loginThunk = () => {
  return async (dispatch: any) => {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = await auth.GoogleAuthProvider.credential(
        idToken,
      );
      let userinfo = await auth().signInWithCredential(googleCredential);
      if (userinfo) {
        dispatch(setUserInfo(userinfo));
        resetRoot(routes.PRODUCTS_LISTINGS);
      }
      console.log('>>>> --------------------------', userinfo);
    } catch (error) {
      console.log(error);
    }
  };
};

export const {setUserInfo} = authSlice.actions;

export default authSlice.reducer;
