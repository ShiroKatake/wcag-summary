export default {
  name: 'criterion',
  type: 'document',
  title: 'Criterion',
  fields: [
    {
      name: 'guidelineRef',
      type: 'reference',
      to: [{ type: 'guideline' }],
      title: 'Guideline',
    },
    {
      name: 'id',
      type: 'number',
      title: 'ID'
    },
    {
      name: 'level',
      type: 'string',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'A', value: 'A' },
          { title: 'AA', value: 'AA' },
          { title: 'AAA', value: 'AAA' },
        ]
      },
      title: 'Level'
    },
    {
      name: 'name',
      type: 'string',
      title: 'Name'
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
      rows: 3
    },
    {
      name: 'notes',
      type: 'text',
      title: 'Notes',
      rows: 10
    },
    {
      name: 'justification',
      type: 'text',
      title: 'Justification',
      rows: 5
    },
    {
      name: 'benefits',
      type: 'array',
      of: [{ type: 'text', rows: 2 }],
      title: 'Specific Benefits'
    },
  ],
  initialValue: {
    level: 'A',
  },
  orderings: [
    {
      title: 'ID, Ascending',
      name: 'idAsc',
      by: [
        {
          field: 'id',
          direction: 'asc'
        }
      ]
    }
  ],
  preview: {
    select: {
      principleId: 'guidelineRef.principleRef.id',
      guidelineId: 'guidelineRef.id',
      title: 'name',
      id: 'id'
    },
    prepare(select: any) {
      const { principleId, guidelineId, id, title } = select
      return {
        title: `${principleId}.${guidelineId}.${id} ${title}`,
      }
    }
  }
}