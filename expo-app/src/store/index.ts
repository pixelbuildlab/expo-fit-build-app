import {create, StateCreator} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type {InitialState, Units, WorkoutStore, Set} from './types';

const INITIAL_STATE: InitialState = {
  weightUnit: 'lbs',
  workoutExercises: [],
  workoutTime: '',
  // timer: 0,
};

const getID = () => `${Math.random()}-${new Date().toISOString()}`;
const workoutStoreSlice: StateCreator<WorkoutStore> = set => ({
  ...INITIAL_STATE,

  addExerciseToWorkout: exercise => {
    set(state => ({
      ...state,
      workoutExercises: [
        ...state.workoutExercises,
        {
          id: getID(),
          name: exercise.name,
          sanityId: exercise.sanityId,
          sets: [],
        },
      ],
    }));
  },

  deleteWorkoutExercise: (exerciseId: string) => {
    set(state => {
      const updatedExercises = state.workoutExercises.filter(
        exercise => exercise.id !== exerciseId,
      );

      return {...state, workoutExercises: updatedExercises};
    });
  },

  resetWorkout: () => {
    set(() => ({
      workoutExercises: [],
    }));
  },

  setWeightUnit: (unit: Units) => {
    set(() => ({
      weightUnit: unit,
    }));
  },

  setWorkoutExercises: () => {
    console.log('implement');
  },

  addSetToExercise: (exerciseId: string) => {
    set(state => {
      const newSet: Set = {
        id: getID(),
        isCompleted: false,
        reps: '',
        weight: '',
        weightUnit: state.weightUnit,
      };

      const updatedExercises = state.workoutExercises.map(exercise => {
        if (exercise.id === exerciseId) {
          return {...exercise, sets: [...exercise.sets, newSet]};
        } else return exercise;
      });

      return {...state, workoutExercises: updatedExercises};
    });
  },

  updateExerciseSet: (
    exerciseId: string,
    setId: string,
    data: Partial<Set>,
  ) => {
    set(state => {
      const updatedExercises = state.workoutExercises.map(exercise => {
        if (exercise.id === exerciseId) {
          const exerciseSets = [...exercise.sets];

          const updatedSets = exerciseSets.map(_set => {
            if (_set.id === setId) {
              return {..._set, ...data};
            }
            return _set;
          });

          return {...exercise, sets: [...updatedSets]};
        } else return exercise;
      });

      return {...state, workoutExercises: updatedExercises};
    });
  },

  deleteExerciseSet: (exerciseId: string, setId: string) => {
    set(state => {
      const updatedExercises = state.workoutExercises.map(exercise => {
        if (exercise.id === exerciseId) {
          const exerciseSets = [...exercise.sets];
          const updatedSets = exerciseSets.filter(_set => _set.id !== setId);

          return {...exercise, sets: [...updatedSets]};
        } else return exercise;
      });

      return {...state, workoutExercises: updatedExercises};
    });
  },
});

export const useWorkoutStore = create<WorkoutStore>()(
  persist(workoutStoreSlice, {
    name: 'workout-store',
    storage: createJSONStorage(() => AsyncStorage),
    version: 5,
  }),
);

export const useTimerStore = create<{
  timer: number;
  setTimer: (timer: number) => void;
}>()(set => ({
  timer: 0,
  setTimer: (timer: number) => {
    set(() => ({timer}));
  },
}));
