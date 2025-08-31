import type {Units} from '@/store/types';

export type WorkoutDocument = {
  _type: string;
  userId: string;
  name: string;
  description: string;
  exercises: {
    _type: string;
    _key: string;
    exercise: {
      _ref: string;
      _type: string;
    };
    sets: {
      _type: string;
      setType: string;
      weight: number;
      reps: number;
      weightUnit: Units;
      _key: string;
    }[];
  }[];
  duration: number;
};
