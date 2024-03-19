import React, {useMemo} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {useTheme} from '@react-navigation/native';

// Files
import {getScreenHeight} from '../utils/commonServices';
import {Colors} from '../theme';
import fonts from '../constants/fonts';
import FastImage from 'react-native-fast-image';
import {useSelector} from 'react-redux';
import {fontSize, rounded} from '../theme/text-variants';

type CustomButtonProps = {
  title: string;
  disabled?: boolean;
  action?: () => void;
  height?: number;
  icon?: any;
  iconColor?: string;
};

const CustomButton = ({
  title,
  disabled,
  action,
  height,
  icon,
  iconColor,
}: CustomButtonProps) => {
  const theme = useTheme();
  const {colors} = theme;
  const styles = useMemo(() => createStyles(colors), [colors]);
  const loading = useSelector((state: any) => state.common.loading);

  return (
    <TouchableOpacity
      disabled={disabled || loading}
      onPress={action}
      activeOpacity={0.7}
      style={[
        styles.screen,
        {
          height: height ? height : getScreenHeight(6),
        },
      ]}>
      {loading ? (
        <ActivityIndicator color={colors.textColor} size={'small'} />
      ) : (
        <>
          {icon ? (
            <FastImage
              tintColor={iconColor ? iconColor : theme.colors.textColor}
              style={styles.icon}
              source={icon}
              resizeMode="contain"
            />
          ) : null}
          <Text style={styles.title}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const createStyles = (theme: Colors) =>
  StyleSheet.create({
    screen: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.primary,
      borderRadius: rounded.l,
      flexDirection: 'row',
    },
    title: {
      color: theme.textColor,
      fontFamily: fonts.medium,
      fontSize: fontSize.xl,
    },
    icon: {
      width: getScreenHeight(2.5),
      height: getScreenHeight(2.5),
      marginRight: getScreenHeight(1),
    },
  });

export default CustomButton;
