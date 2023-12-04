export default {
  name: 'principle',
  type: 'document',
  title: 'Principle',
  fields: [
    {
      name: 'id',
      type: 'number',
      title: 'ID'
    },
    {
      name: 'name',
      type: 'string',
      title: 'Name'
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
      title: 'name',
      id: 'id'
    },
    prepare(select:any) {
      const {title, id} = select
      return {
        title: `${id}. ${title}`,
      }
    }
  }
}