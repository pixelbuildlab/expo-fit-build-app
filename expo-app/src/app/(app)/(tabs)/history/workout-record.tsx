import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const WorkoutRecord = () => {
  return (
    <View style={styles.container}>
      <Text>WorkoutRecord</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default WorkoutRecord;
