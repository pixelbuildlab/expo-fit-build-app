export type Units = 'lbs' | 'kg';
export type WorkoutSet = {
  id: string;
  reps: string;
  weight: string;
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
  workoutTime: string;
};

export type Set = WorkoutStore['workoutExercises'][number]['sets'][number];

export type WorkoutStore = InitialState & {
  //   functions
  addExerciseToWorkout: (exercise: {name: string; sanityId: string}) => void;
  deleteWorkoutExercise: (exerciseId: string) => void;

  //   for this need to check implementation later
  setWorkoutExercises: () => void;

  setWeightUnit: (unit: Units) => void;
  resetWorkout: () => void;
  addSetToExercise: (exerciseId: string) => void;

  updateExerciseSet: (
    exerciseId: string,
    setId: string,
    data: Partial<Set>,
  ) => void;
  deleteExerciseSet: (exerciseId: string, setId: string) => void;
};
