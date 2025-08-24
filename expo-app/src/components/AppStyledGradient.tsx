import React from 'react';
import {LinearGradient, LinearGradientProps} from 'expo-linear-gradient';
import {cssInterop} from 'nativewind';

const GradientStyled = cssInterop(LinearGradient, {
  className: 'style',
});

// fix gradients not being displayed
const AppStyledGradient = (props: LinearGradientProps) => {
  return <GradientStyled {...props} />;
};

export {AppStyledGradient};
