import api from '../../api';
import apiTypes from '../../api/apiTypes';

export type Products = {
  name: string;
  brand: string;
  description: string;
};

export const getProducts = async (pageNumber: number) => {
  const res = await api({
    enableLoader: true,
    type: apiTypes.get,
    url: `/cms/products?page=${pageNumber}`,
  });
  return res;
};
