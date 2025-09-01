import {defineQuery} from 'groq';

export const getWorkoutQuery =
  defineQuery(`*[_type == "workout" && userId == $userId] | order(_createdAt desc) {
  _id,
  _createdAt,
  duration,
  exercises [] {
   exercise -> {
   _id,
   name
   },
   sets [] {
    setType,
    reps,
    weight,
    weightUnit,
    duration,
    restTime,
    _type,
    _key
   },
   _type,
   _key
  }
  }`);

export const getSingleWorkoutQuery =
  defineQuery(`*[_type == "workout" && _id == $workoutId][0] {
  _id,
  _createdAt,
  duration,
  exercises [] {
   exercise -> {
   _id,
   name
   },
   sets [] {
    setType,
    reps,
    weight,
    weightUnit,
    duration,
    restTime,
    _type,
    _key
   },
   _type,
   _key
  }
  }`);

export const exerciseQuery = defineQuery(
  `*[_type == "exercise" && isActive == true]`,
);

export const singleExerciseQuery = defineQuery(
  '*[_type == "exercise" && isActive == true && _id == $id][0]',
);
