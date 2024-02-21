import { db } from "@/firebase"
// import { addDoc, collection } from "firebase/firestore"

export type CollectionType = {
  id: string
  structure:Field[]
}




export type Field = {
  name: string
} & (  StringField | NumberField | BooleanField | DateField | TimeField | SelectField | ObjectField |  ArrayField | ReferenceField )



/// all the types

type StringField ={
  type : "string" | "text" | "image" | "avatar"
  defaultValue?: string
  value?: string
}

type NumberField ={
  type: "number"
  defaultValue?: number
  value?: number
}

type BooleanField ={
  type: "boolean"
  defaultValue?: boolean
  value?: boolean
}

type DateField ={
  type: "date"
  defaultValue?: Date
  value?: Date
}

type TimeField ={
  type: "time"
  defaultValue?: string
  value?: string
}

type SelectField ={
  type: "select"
  defaultValue?: string
  value?: string
  select: {
    name:string,
    value:string
  }[]
}

type ObjectField ={
  type: "object" | "array"
  defaultValue?: Field[]
  value?: Field[]
  structure: Field[]
}

type ArrayField ={
  type: "object" | "array"
  defaultValue?: Field[][]
  value?: Field[][]
  structure: Field[]
}

type ReferenceField ={
  type: "reference",
  defaultValue?: string | number | boolean | Date 
  value?:  string | number | boolean | Date
  reference: {
    collection: string
    key: string
  }
}

























export const UserCollection : CollectionType = {
  id:" ",
  structure:[
    {
      name:"person",
      type:"object",
      structure:[
        {
          name:"name",
          type:"string"
        },
        {
          name:"age",
          type:"number"
        },
        {
          name:"active",
          type:"boolean"
        },
        {
          name:"skills",
          type:"array",
          structure:[
            {
              name:"skill",
              type:"string"
            },
            {
              name:"level",
              type:"select",
              select:[
                {name:"beginner",value:"beginner"},
                {name:"intermediate",value:"intermediate"},
                {name:"advanced",value:"advanced"}
              ]
            }
          ]
        }
      ]
    }
  ]
}



export const me = {
  id:"abcd",
  person:{
    name:"tchisama",
    age:20,
    active:true,
    skills:[
      {
        skill:"developer",
        level:"good"
      }
    ]
  }
}










