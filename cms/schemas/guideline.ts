export default {
  name: 'guideline',
  type: 'document',
  title: 'Guideline',
  fields: [
    {
      name: 'principleRef',
      type: 'reference',
      to: [{ type: 'principle' }],
      title: 'Principle',
    },
    {
      name: 'id',
      type: 'number',
      title: 'ID'
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
    }
  ],
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
      principleId: 'principleRef.id',
      title: 'name',
      id: 'id'
    },
    prepare(select:any) {
      const {principleId, id, title} = select
      return {
        title: `${principleId}.${id} ${title}`,
      }
    }
  }
}