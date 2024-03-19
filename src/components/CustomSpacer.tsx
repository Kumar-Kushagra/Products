import React from 'react';
import {View} from 'react-native';
import {getScreenHeight} from '../utils/commonServices';

type CustomSpaceProps = {
  height?: number;
};

const CustomSpacer = ({height}: CustomSpaceProps) => {
  return <View style={{height: height ? height : getScreenHeight(2)}} />;
};

export default CustomSpacer;
