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
