import {defineType, defineField} from 'sanity'

export const comment = defineType({
  title: "Comment",
  name: "comment",
  type: "document",
  fields: [
    defineField({
        title:'postedBy',
        name:'PostedBy',
        type:'postedBy',
    }),
    defineField({
        title:'comment',
        name:'Comment',
        type:'string'
    })
  ]
})