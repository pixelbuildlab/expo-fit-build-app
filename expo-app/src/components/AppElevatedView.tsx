// // // import React from 'react';
// // // import {View, Platform, type ViewProps} from 'react-native';

// // // type Props = {
// // //   elevation?: number;
// // // } & ViewProps;

// // // export function AppElevatedView({
// // //   elevation = 0,
// // //   style,
// // //   className = '',
// // //   ...rest
// // // }: Props) {
// // //   if (elevation === 0) {
// // //     return <View style={style} className={className} {...rest} />;
// // //   }

// // //   if (Platform.OS === 'android') {
// // //     return (
// // //       <View
// // //         className={`elevation-[${elevation}] ${className}`}
// // //         style={style}
// // //         {...rest}
// // //       />
// // //     );
// // //   }

// // //   const iosShadowElevation = {
// // //     shadowOpacity: 0.0015 * elevation + 0.18,
// // //     shadowRadius: 0.54 * elevation,
// // //     shadowOffset: {
// // //       height: 0.6 * elevation,
// // //       width: 0,
// // //     },
// // //   };

// // //   return <View style={[iosShadowElevation, style]} {...rest} />;
// // // }

// // import React from 'react';
// // import {View, Platform, type ViewProps} from 'react-native';

// // type Props = {
// //   elevation?: number;
// // } & ViewProps;

// // export function AppElevatedView({
// //   elevation = 0,
// //   style,
// //   className = '',
// //   ...rest
// // }: Props) {
// //   if (elevation === 0) {
// //     return <View style={style} className={className} {...rest} />;
// //   }

// //   if (Platform.OS === 'android') {
// //     return (
// //       <View
// //         style={[
// //           {
// //             elevation: elevation,
// //           },
// //           style,
// //         ]}
// //         className={className}
// //         {...rest}
// //       />
// //     );
// //   }

// //   const iosShadowElevation = {
// //     shadowColor: '#000',
// //     shadowOpacity: 0.0015 * elevation + 0.18,
// //     shadowRadius: 0.54 * elevation,
// //     shadowOffset: {
// //       height: 0.6 * elevation,
// //       width: 0,
// //     },
// //   };

// //   return (
// //     <View style={[iosShadowElevation, style]} className={className} {...rest} />
// //   );
// // }

// import React, {useMemo} from 'react';
// import {
//   View,
//   Platform,
//   type ViewProps,
//   type ViewStyle,
//   type StyleProp,
// } from 'react-native';

// type Props = {
//   elevation?: number;
//   shadowColor?: string;
// } & ViewProps;

// export function AppElevatedView({
//   elevation = 0,
//   shadowColor = '#000',
//   style,
//   className = '',
//   ...rest
// }: Props) {
//   const clampedElevation = useMemo(() => {
//     if (typeof elevation !== 'number' || isNaN(elevation)) return 0;
//     return Math.max(0, Math.min(elevation, 24));
//   }, [elevation]);

//   const iosShadowStyle = useMemo((): ViewStyle => {
//     if (Platform.OS !== 'ios' || clampedElevation === 0) return {};

//     return {
//       shadowColor,
//       shadowOpacity: Math.min(0.0015 * clampedElevation + 0.18, 1),
//       shadowRadius: Math.max(0.54 * clampedElevation, 0),
//       shadowOffset: {
//         width: 0,
//         height: Math.max(0.6 * clampedElevation, 0),
//       },
//     };
//   }, [clampedElevation, shadowColor]);

//   if (clampedElevation === 0) {
//     return <View style={style} className={className} {...rest} />;
//   }

//   if (Platform.OS === 'android') {
//     const androidStyle: StyleProp<ViewStyle> = [
//       {elevation: clampedElevation},
//       style,
//     ];

//     return <View style={androidStyle} className={className} {...rest} />;
//   }

//   if (Platform.OS === 'ios') {
//     const iosStyle: StyleProp<ViewStyle> = [iosShadowStyle, style];

//     return <View style={iosStyle} className={className} {...rest} />;
//   }

//   if (Platform.OS === 'web') {
//     const webShadowStyle: ViewStyle = {
//       boxShadow:
//         clampedElevation > 0
//           ? `0px ${0.6 * clampedElevation}px ${
//               0.54 * clampedElevation
//             }px ${shadowColor}${Math.floor(
//               (0.0015 * clampedElevation + 0.18) * 255,
//             )
//               .toString(16)
//               .padStart(2, '0')}`
//           : 'none',
//     };

//     const webStyle: StyleProp<ViewStyle> = [webShadowStyle, style];

//     return <View style={webStyle} className={className} {...rest} />;
//   }

//   return <View style={style} className={className} {...rest} />;
// }

import React from 'react';

export function AppElevatedView() {
  return <></>;
}
