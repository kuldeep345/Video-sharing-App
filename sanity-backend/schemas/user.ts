import {defineType, defineField} from 'sanity'

export const user = defineType({
  title: "User",
  name: "user",
  type: "document",
  fields: [
    defineField({
        title:'User Name',
        name:'userName',
        type:'string'
    }),
    defineField({
        title:'image',
        name:'Image',
        type:'string'
    })
  ]
})