type CollectionType = {
  name: string
  collection: string
  id: string
  fields:Field[]
  structure: string[]
}




type Field = {
  name: string
  id: string
} & ( NormalField | SelectField | ObjectField | ReferenceField )



/// all the types
type NormalField ={
  type: "string" | "number" | "boolean" | "date" | "time" | "image" | "avatar" | "text"
}

type SelectField ={
  type: "select"
  select: {
    name:string,
    value:string
  }[]
}

type ObjectField ={
  type: "object" | "array"
  structure: string[]
}

type ReferenceField ={
  type: "reference"
  reference: {
    collection: string
    key: string
  }
}























const collection: CollectionType = {
  name: "test",
  collection: "test",
  id: "test",
  fields: [
    {
      name:"name",
      type:"select",
      id:"hello world",
      select:[
        {
          name:"hello",
          value:"world"
        }
      ]
    },
    {
      name:"name",
      id:"hell",
      type:"reference",
      reference:{
        collection:"test",
        key:"test"
      }
    }
  ],
  structure: ["hello world"]
}