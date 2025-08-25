import React from 'react';
import {useLocalSearchParams} from 'expo-router';
import {StyleSheet, Text, View} from 'react-native';

const WorkoutRecord = () => {
  const params = useLocalSearchParams();
  return (
    <View style={styles.container}>
      <Text>WorkoutRecord {JSON.stringify(params)}</Text>
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
