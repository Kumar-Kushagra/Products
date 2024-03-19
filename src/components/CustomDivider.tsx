import React, {useMemo} from 'react';
import {View} from 'react-native';
import {getScreenHeight} from '../utils/commonServices';
import {useTheme} from '@react-navigation/native';

type CustomDividerProps = {
  color?: string;
};

const CustomDivider = ({color}: CustomDividerProps) => {
  const theme = useTheme();
  const {colors} = theme;

  return (
    <View
      style={{
        backgroundColor: color ? color : colors.grey,
        height: getScreenHeight(0.1),
        width: '100%',
      }}
    />
  );
};

export default CustomDivider;
