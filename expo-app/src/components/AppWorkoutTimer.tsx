import React from 'react';
import {Text} from 'react-native';
import {useFocusEffect} from 'expo-router';
import {useStopwatch} from 'react-timer-hook';
import {useTimerStore} from '@/store';

export const AppWorkoutTimer = () => {
  const {minutes, seconds, reset, totalSeconds, isRunning} = useStopwatch({
    autoStart: true,
  });

  const {setTimer} = useTimerStore();

  useFocusEffect(
    React.useCallback(() => {
      // reset();
      if (!isRunning) {
        reset(null, true);
      }
      return () => {
        if (isRunning) {
          reset(null, false);
        }
      };
    }, [reset, isRunning]),
  );

  React.useEffect(() => {
    setTimer(totalSeconds);
  }, [setTimer, totalSeconds]);

  const workoutDuration = React.useMemo(
    () =>
      `${minutes.toString().padStart(2, '0')}:${seconds
        .toString()
        .padStart(2, '0')}`,
    [minutes, seconds],
  );

  return (
    <Text className="text-gray-300 mt-px">
      {/* duration func */}
      {workoutDuration}
    </Text>
  );
};
