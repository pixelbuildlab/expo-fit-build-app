export type Units = 'lbs' | 'kg';
export type WorkoutSet = {
  id: string;
  reps: string;
  weight: number;
  weightUnit: Units;
  isCompleted: boolean;
};

export type WorkoutExercise = {
  id: string;
  sanityId: string;
  name: string;
  sets: WorkoutSet[];
};
export type InitialState = {
  workoutExercises: WorkoutExercise[];
  weightUnit: Units;
};

export type WorkoutStore = InitialState & {
  // variables
  //   workoutExercises: WorkoutExercise[];
  //   weightUnit: Units;

  //   functions
  addExerciseToWorkout: (exercise: {name: string; sanityId: string}) => void;
  //   for this need to check implementation later
  setWorkoutExercises: () => void;

  setWeightUnit: (unit: Units) => void;
  resetWorkout: () => void;
};
