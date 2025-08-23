import {defineField, defineType} from 'sanity'

export const exerciseType = defineType({
  name: 'exercise',
  title: 'Exercise',
  type: 'document',
  groups: [
    {
      name: 'basic',
      title: 'Basic Information',
      default: true,
    },
    {
      name: 'media',
      title: 'Media & Resources',
    },
    {
      name: 'settings',
      title: 'Settings',
    },
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Exercise Name',
      type: 'string',
      group: 'basic',
      validation: (rule) =>
        rule
          .required()
          .error('Exercise name is required')
          .min(3)
          .warning('Exercise name should be at least 3 characters')
          .max(100)
          .warning('Exercise name should be less than 100 characters'),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      group: 'basic',
      rows: 3,
      validation: (rule) =>
        rule
          .required()
          .error('Description is required')
          .min(10)
          .warning('Description should be at least 10 characters')
          .max(500)
          .warning('Description should be less than 500 characters'),
    }),
    defineField({
      name: 'difficultyLevel',
      title: 'Difficulty Level',
      type: 'string',
      group: 'basic',
      options: {
        list: [
          {title: 'Beginner', value: 'beginner'},
          {title: 'Intermediate', value: 'intermediate'},
          {title: 'Advanced', value: 'advanced'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required().error('Difficulty level is required'),
    }),
    defineField({
      name: 'exerciseImage',
      title: 'Exercise Image',
      type: 'image',
      group: 'media',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: (rule) => rule.required().error('Alt text is required for accessibility'),
        }),
      ],
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      group: 'media',
      description: 'URL to demonstration video (YouTube, Vimeo, etc.)',
      validation: (rule) =>
        rule
          .uri({
            scheme: ['http', 'https'],
          })
          .error('Please enter a valid URL'),
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      group: 'settings',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      difficulty: 'difficultyLevel',
      media: 'exerciseImage',
      active: 'isActive',
    },
    prepare({title, difficulty, media, active}) {
      return {
        title,
        subtitle: `${difficulty} • ${active ? 'Active' : 'Inactive'}`,
        media,
      }
    },
  },
})
