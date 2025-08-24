import React from 'react';
import {TextInput, TextInputProps} from 'react-native';

const FormTextInput = ({className, ...inputProps}: TextInputProps) => {
  return (
    <TextInput
      textAlignVertical="center"
      // fix more height for input in android
      className={`py-0 ${className ?? ''}`}
      //   fix line height issue in android
      multiline={false}
      numberOfLines={1}
      {...inputProps}
    />
  );
};

export {FormTextInput};
