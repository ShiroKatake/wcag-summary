import {defineConfig} from 'sanity'
import {ListItemBuilder, StructureBuilder, deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import {client} from './sanityClient';

const getGuidelines = async (S: StructureBuilder) => {
  let principleStructure: ListItemBuilder[] = []
  const res = await client.fetch(`{
    'principle': *[_type == "principle"]{id, name} | order(id asc),
    'guideline': *[_type == "guideline"]{id, "principleId": principleRef->id, name} | order(principleId asc) | order(id asc)
  }`)
  
  const guidelines = (principleId: any) => {
    let guidelineStructure: ListItemBuilder[] = []
    res.guideline.forEach((guideline: any) => {
      principleId == guideline.principleId && guidelineStructure.push(
        S.listItem()
          .title(`${guideline.principleId}.${guideline.id} ${guideline.name}`)
          .id(`${guideline.principleId}.${guideline.id}`)
          .child(
            S.documentList()
              .apiVersion('v2023-05-03')
              .title('Criterions')
              .filter('_type == "criterion" && guidelineRef->id == $id && guidelineRef->principleRef->id == $principleId')
              .params({id: guideline.id, principleId: guideline.principleId})
              .defaultOrdering([{ field: 'id', direction: 'asc' }])
          )
      )
    });
    return guidelineStructure
  }

  res.principle.forEach((principle: any) => {
    principleStructure.push(
      S.listItem()
        .title(`${principle.id}. ${principle.name}`)
        .id(`${principle.id}`)
        .child(principleId =>
          {
            return S.list()
            .title('Guidelines')
            .items(guidelines(principleId))}
        )
    )
  });

  return principleStructure
}

export default defineConfig({
  name: 'default',
  title: 'WCAG Summary',

  projectId: 'qq18jngx',
  dataset: 'production',

  plugins: [deskTool({
    structure: async (S) =>
    S.list()
      .title('Principles')
      .items(await getGuidelines(S))
  }), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
