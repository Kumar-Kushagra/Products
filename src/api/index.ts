import axios from 'axios';
import {showMessage} from 'react-native-flash-message';
import Config from 'react-native-config';

// Files
import apiTypes from './apiTypes';
import {store} from '../redux/store';
import {setLoading} from '../redux/common';

const getInstance = ({hasImage, data, params, extraAdditionToHeader}: any) => {
  const instance = axios.create({
    baseURL: 'https://catalog-management-system-dev-ak3ogf6zea-uc.a.run.app',
  });

  const {CancelToken} = axios;
  const source = CancelToken.source();

  instance.interceptors.request.use(
    (request: any) => {
      console.log(Config.API_URL);
      request.data = data;
      request.params = params;
      request.cancelToken = source.token;
      if (extraAdditionToHeader) {
        request.headers = {...request.headers, ...extraAdditionToHeader};
      }
      if (hasImage !== 0) {
        request.headers['Content-Type'] = 'multipart/form-data';
      } else {
        request.headers['Content-Type'] = 'application/json';
      }
      console.log('Rquesting URL', request.url);
      return request;
    },
    error => {
      throw new Error(error.message);
    },
  );

  instance.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      throw new Error(error.message);
    },
  );

  return instance;
};

const api = async ({
  hasImage = 0,
  type,
  url,
  data,
  params = {},
  enableLoader = false,
  extraAdditionToHeader = null,
}: any) => {
  if (enableLoader) {
    store.dispatch(setLoading(true));
  }
  const instance = getInstance({
    hasImage,
    data,
    params,
    extraAdditionToHeader,
  });
  try {
    switch (type) {
      case apiTypes.post: {
        let response = await instance.post(url);
        return response?.data;
      }
      case apiTypes.patch: {
        let response = await instance.patch(url);
        return response?.data;
      }
      case apiTypes.put: {
        let response = await instance.put(url);
        return response?.data;
      }

      case apiTypes.delete: {
        let response = await instance.delete(url);
        return response?.data;
      }

      case apiTypes.get: {
        let response = await instance.get(url);
        return response?.data;
      }

      default: {
        let response = await instance.get(url);
        return response?.data;
      }
    }
  } catch (error: any) {
    console.log('Error in catch', error.message);
    if (error.message !== 'Cancelled') {
      showMessage({
        message: error.message,
        type: 'danger',
      });
    }
  } finally {
    store.dispatch(setLoading(false));
  }
};

export default api;
