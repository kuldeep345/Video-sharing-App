import {defineType} from 'sanity'

export const postedBy = defineType({
  title: "PostedBy",
  name: "postedBy",
  type: "reference",
  to:[{type:'user'}]
})