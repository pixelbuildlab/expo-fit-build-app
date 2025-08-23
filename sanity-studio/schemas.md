# Schemas

## Exercise (Blueprint)
- Exercise Name - string
- description - string
- difficulty level - dropdown/radio [beginner, intermediate, advanced]
- exercise image - alt text
- video url - string
- active toggle - boolean

## Workout (Log)
- userId - from clerk->ID
- name - string (defaults to "Workout")
- description - text (optional)
- duration - seconds
- exercises - array of exercise sets
  - exercise - reference to Exercise
  - sets - array of sets
    - setType - radio [reps, duration]
    - reps - number (for rep-based sets)
    - duration - number (for duration-based sets)
    - weight - number (optional, for weighted exercises)
    - weightUnit - radio [kg, lbs] (shows only when weight > 0)
    - restTime - number (optional)
  - notes - text (optional)
- createdAt - datetime (auto-generated)
- updatedAt - datetime (auto-generated)

## Naming Format
Workout names display as: "Workout - UserID - ExerciseCount - mm/dd/yyyy"