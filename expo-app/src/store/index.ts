import {create, StateCreator} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type {InitialState, Units, WorkoutStore} from './types';

const INITIAL_STATE: InitialState = {
  weightUnit: 'lbs',
  workoutExercises: [],
};

const workoutStoreSlice: StateCreator<WorkoutStore> = set => ({
  ...INITIAL_STATE,

  addExerciseToWorkout: exercise => {
    set(state => ({
      ...state,
      workoutExercises: [
        ...state.workoutExercises,
        {
          id: `${Math.random()}-${new Date().toISOString()}`,
          name: exercise.name,
          sanityId: exercise.sanityId,
          sets: [],
        },
      ],
    }));
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
});

export const useWorkoutStore = create<WorkoutStore>()(
  persist(workoutStoreSlice, {
    name: 'workout-store',
    storage: createJSONStorage(() => AsyncStorage),
    partialize: state => ({
      weightUnit: state.weightUnit,
    }),
  }),
);
