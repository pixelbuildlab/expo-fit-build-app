import {defineField, defineType, defineArrayMember} from 'sanity'

export const workoutType = defineType({
  name: 'workout',
  title: 'Workout',
  type: 'document',
  groups: [
    {
      name: 'basic',
      title: 'Basic Information',
      default: true,
    },
    {
      name: 'exercises',
      title: 'Exercises & Sets',
    },
    {
      name: 'metadata',
      title: 'Metadata',
    },
  ],
  fields: [
    defineField({
      name: 'userId',
      title: 'User ID',
      type: 'string',
      group: 'basic',
      description: 'User ID from Clerk authentication',
      validation: (rule) => rule.required().error('User ID is required'),
    }),
    defineField({
      name: 'name',
      title: 'Workout Name',
      type: 'string',
      group: 'basic',
      initialValue: 'Workout',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      group: 'basic',
      rows: 2,
    }),
    defineField({
      name: 'duration',
      title: 'Duration (seconds)',
      type: 'number',
      group: 'basic',
      description: 'Total workout duration in seconds',
      validation: (rule) =>
        rule.required().error('Duration is required').positive().error('Duration must be positive'),
    }),
    defineField({
      name: 'exercises',
      title: 'Exercises',
      type: 'array',
      group: 'exercises',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'exerciseSet',
          title: 'Exercise Set',
          fields: [
            defineField({
              name: 'exercise',
              title: 'Exercise',
              type: 'reference',
              to: [{type: 'exercise'}],
              validation: (rule) => rule.required().error('Exercise is required'),
            }),
            defineField({
              name: 'sets',
              title: 'Sets',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  name: 'set',
                  title: 'Set',
                  fields: [
                    defineField({
                      name: 'setType',
                      title: 'Set Type',
                      type: 'string',
                      options: {
                        list: [
                          {title: 'Reps', value: 'reps'},
                          {title: 'Duration', value: 'duration'},
                        ],
                        layout: 'radio',
                      },
                      initialValue: 'reps',
                      validation: (rule) => rule.required().error('Set type is required'),
                    }),
                    defineField({
                      name: 'reps',
                      title: 'Reps',
                      type: 'number',
                      hidden: ({parent}) => parent?.setType !== 'reps',
                      validation: (rule) =>
                        rule
                          .custom((value, context) => {
                            const parent = context.parent as any
                            if (parent?.setType === 'reps' && !value) {
                              return 'Reps are required for rep-based sets'
                            }
                            if (value && value <= 0) {
                              return 'Reps must be positive'
                            }
                            return true
                          })
                          .error(),
                    }),
                    defineField({
                      name: 'duration',
                      title: 'Duration (seconds)',
                      type: 'number',
                      hidden: ({parent}) => parent?.setType !== 'duration',
                      validation: (rule) =>
                        rule
                          .custom((value, context) => {
                            const parent = context.parent as any
                            if (parent?.setType === 'duration' && !value) {
                              return 'Duration is required for duration-based sets'
                            }
                            if (value && value <= 0) {
                              return 'Duration must be positive'
                            }
                            return true
                          })
                          .error(),
                    }),
                    defineField({
                      name: 'weight',
                      title: 'Weight',
                      type: 'number',
                      description: 'Leave empty for bodyweight exercises',
                      validation: (rule) => rule.min(0).error('Weight cannot be negative'),
                    }),
                    defineField({
                      name: 'weightUnit',
                      title: 'Weight Unit',
                      type: 'string',
                      hidden: ({parent}) => !parent?.weight || parent.weight === 0,
                      options: {
                        list: [
                          {title: 'kg', value: 'kg'},
                          {title: 'lbs', value: 'lbs'},
                        ],
                        layout: 'radio',
                      },
                      initialValue: 'kg',
                    }),
                    defineField({
                      name: 'restTime',
                      title: 'Rest Time (seconds)',
                      type: 'number',
                      description: 'Rest time after this set in seconds',
                      validation: (rule) => rule.min(0).error('Rest time cannot be negative'),
                    }),
                  ],
                  preview: {
                    select: {
                      setType: 'setType',
                      reps: 'reps',
                      duration: 'duration',
                      weight: 'weight',
                      weightUnit: 'weightUnit',
                    },
                    prepare({setType, reps, duration, weight, weightUnit}) {
                      const measure = setType === 'reps' ? `${reps} reps` : `${duration}s`
                      const weightText = weight && weight > 0 ? ` • ${weight}${weightUnit}` : ''
                      return {
                        title: `${measure}${weightText}`,
                      }
                    },
                  },
                }),
              ],
              validation: (rule) =>
                rule
                  .required()
                  .error('At least one set is required')
                  .min(1)
                  .error('At least one set is required'),
            }),
            defineField({
              name: 'notes',
              title: 'Notes',
              type: 'text',
              rows: 2,
            }),
          ],
          preview: {
            select: {
              exerciseName: 'exercise.name',
              setsCount: 'sets',
            },
            prepare({exerciseName, setsCount}) {
              return {
                title: exerciseName || 'Exercise',
                subtitle: `${setsCount?.length || 0} sets`,
              }
            },
          },
        }),
      ],
      validation: (rule) =>
        rule
          .required()
          .error('At least one exercise is required')
          .min(1)
          .error('At least one exercise is required'),
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      group: 'metadata',
      readOnly: true,
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'updatedAt',
      title: 'Updated At',
      type: 'datetime',
      group: 'metadata',
      readOnly: true,
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      name: 'name',
      userId: 'userId',
      duration: 'duration',
      exercises: 'exercises',
      createdAt: 'createdAt',
    },
    prepare({name, userId, duration, exercises, createdAt}) {
      const dateStr = createdAt
        ? new Date(createdAt).toLocaleDateString('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          })
        : ''
      const title = `${name || 'Workout'} - ${userId} - ${dateStr}`

      const totalSeconds = duration || 0
      const hours = Math.floor(totalSeconds / 3600)
      const minutes = Math.floor((totalSeconds % 3600) / 60)
      const seconds = totalSeconds % 60

      let durationText = ''
      if (hours > 0) {
        durationText = `${hours}h ${minutes}m ${seconds}s`
      } else if (minutes > 0) {
        durationText = `${minutes}m ${seconds}s`
      } else {
        durationText = `${seconds}s`
      }

      return {
        title,
        subtitle: `${exercises?.length || 0} exercises • ${durationText}`,
      }
    },
  },
})
