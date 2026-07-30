import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

const SINGLETON = 'workshopSettings'

export default defineConfig({
  name: 'default',
  title: 'Succesfulbob',

  projectId: '7926mumv',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Pinned to one document id so a second copy can never exist.
            S.listItem()
              .title('Workshop Settings')
              .id(SINGLETON)
              .child(S.document().schemaType(SINGLETON).documentId(SINGLETON).title('Workshop Settings')),
            S.divider(),
            S.documentTypeListItem('workshop').title('Workshops'),
            S.divider(),
            S.documentTypeListItem('post').title('Posts'),
            S.documentTypeListItem('category').title('Categories'),
            S.documentTypeListItem('author').title('Authors'),
          ]),
    }),
    visionTool(),
  ],

  // Without this the singleton can be duplicated or deleted, and the page would
  // then read an arbitrary copy with no visible cause.
  document: {
    actions: (prev, {schemaType}) =>
      schemaType === SINGLETON
        ? prev.filter(({action}) => action !== 'duplicate' && action !== 'delete' && action !== 'unpublish')
        : prev,
  },

  schema: {
    types: schemaTypes,
    // workshopSession is an object used inside workshop; it should never appear
    // as a top-level "create new" option.
    templates: (prev) => prev.filter((t) => t.schemaType !== 'workshopSession' && t.schemaType !== SINGLETON),
  },
})
