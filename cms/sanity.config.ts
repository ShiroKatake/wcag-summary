import {defineConfig} from 'sanity'
import {StructureBuilder, deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import {client} from './sanityClient'

const getGuidelines = async (S: StructureBuilder) => {
  let guidelineStructure: any[] = []
  const res = await client.fetch(
    '*[_type == "guideline"]{id, "principleId": principleRef->id, "principleName": principleRef->name, name} | order(id asc) | order(principleId asc)'
  )

  res.forEach((guideline: any) => {
    if (guideline.id == '1') {
      if (guideline.principleId != '1') {
        guidelineStructure.push(
          S.divider()
        )
      }      
      guidelineStructure.push(
        S.listItem()
          .title(`${guideline.principleId}. ${guideline.principleName}`)
          .id(`${guideline.principleId}`)
          .showIcon(false)
          .child(
            S.documentList()
              .apiVersion('v2023-05-03')
              .title('Priciple')
              .filter('_type == "principle" && id == $principleId')
              .params({principleId: guideline.principleId})
          )
      )
    }
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

  plugins: [
    deskTool({
      structure: async (S) =>
        S.list()
          .title('Guidelines')
          .items(await getGuidelines(S)),
    }), visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
