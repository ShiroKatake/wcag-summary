import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'default',
  title: 'WCAG Summary',

  projectId: 'qq18jngx',
  dataset: 'production',

  plugins: [deskTool({
    structure: (S) =>
    S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Criterions")
        .id("criterion")
        .schemaType("criterion")
        .child(
          S.documentList()
            .title("Criterions")
            .filter('_type == "criterion"')
            .defaultOrdering([
              {
                field: 'guidelineRef',
                direction: 'desc'
              },
            ])
        ),
      S.listItem()
        .title("Guidelines")
        .id("guideline")
        .schemaType("guideline")
        .child(
          S.documentList()
            .title("Guidelines")
            .filter('_type == "guideline"')
            .defaultOrdering([{
              field: 'id',
              direction: 'asc'
            }])
        ),
      S.listItem()
        .title("Principles")
        .id("principle")
        .schemaType("principle")
        .child(
          S.documentList()
            .title("Principles")
            .filter('_type == "principle"')
            .defaultOrdering([{
              field: 'id',
              direction: 'asc'
            }])
        ),
      ]),
  }), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
