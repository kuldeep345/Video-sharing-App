import {defineType, defineField} from 'sanity'

export const Post = defineType({
  title: "post",
  name: "Post",
  type: "document",
  fields: [
    defineField({
        title:'caption',
        name:'Caption',
        type:'string'
    }),
    defineField({
        title:'video',
        name:'Video',
        type:'file',
    }),
    defineField({
        title:'userId',
        name:'UserId',
        type:'string',
    }),
    defineField({
        title:'postedBy',
        name:'PostedBy',
        type:'postedBy',

    }),
    defineField({
        title:'Likes',
        name:'likes',
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