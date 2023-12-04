import {defineConfig} from 'sanity'
import {ListItemBuilder, StructureBuilder, deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import {client} from './sanityClient';

const getGuidelines = async (S: StructureBuilder) => {
  let guidelineStructure: ListItemBuilder[] = []
  const res = await client.fetch('*[_type == "guideline"]{id, "principleId": principleRef->id, name} | order(id asc) | order(principleId asc)')
  
  res.forEach((guideline: any) => {
    guidelineStructure.push(
      S.listItem()
        .title(`${guideline.principleId}.${guideline.id} ${guideline.name}`)
        .id(`${guideline.principleId}.${guideline.id}`)
        .child(
          S.documentList()
            .apiVersion('v2023-05-03')
            .title('Criterions')
            .filter('_type == "criterion" && guidelineRef->id == $guidelineId && guidelineRef->principleRef->id == $principleId')
            .params({guidelineId: guideline.id, principleId: guideline.principleId})
            .defaultOrdering([{ field: 'id', direction: 'asc' }])
        )
    )
  });

  return guidelineStructure
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
