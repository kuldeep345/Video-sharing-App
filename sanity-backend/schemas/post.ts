import {defineType, defineField} from 'sanity'

export const Post = defineType({
  title: "Post",
  name: "post",
  type: "document",
  fields: [
    defineField({
        name:'caption',
        title:'Caption',
        type:'string'
    }),
    defineField({
        name:'video',
        title:'Video',
        type:'file',
    }),
    defineField({
        name:'userId',
        title:'UserId',
        type:'string',
    }),
    defineField({
        name:'postedBy',
        title:'PostedBy',
        type:'postedBy',

    }),
    defineField({
        name:'likes',
        title:'Likes',
        type:'array',
        of:[
            {
                type:'reference',
                to:[{type:'user'}]
            }
        ]
    }),
    defineField({
        name:'comments',
        title:'Comments',
        type:'array',
        of:[{type:'comment'}]
    }),
    defineField({
        name:'topic',
        title:'Topic',
        type:'string'
    })
  ]
})