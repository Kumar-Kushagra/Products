import {getScreenHeight} from '../utils/commonServices';

type FontVariants = {
  s: number;
  m: number;
  l: number;
  xl: number;
  '2xl': number;
  '3xl': number;
};

type Rounded = {
  s: number;
  m: number;
  l: number;
  full: number;
};

export const fontSize: FontVariants = {
  s: getScreenHeight(1.1),
  m: getScreenHeight(1.3),
  l: getScreenHeight(1.6),
  xl: getScreenHeight(1.8),
  '2xl': getScreenHeight(2),
  '3xl': getScreenHeight(2.5),
};

export const rounded: Rounded = {
  s: getScreenHeight(0.1),
  m: getScreenHeight(0.5),
  l: getScreenHeight(1),
  full: getScreenHeight(100),
};
