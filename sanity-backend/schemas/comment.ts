import {defineType, defineField} from 'sanity'

export const comment = defineType({
  title: "Comment",
  name: "comment",
  type: "document",
  fields: [
    defineField({
        title:'PostedBy',
        name:'postedBy',
        type:'postedBy',
    }),
    defineField({
        title:'Comment',
        name:'comment',
        type:'string'
    })
  ]
})