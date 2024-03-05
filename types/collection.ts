import { db } from "@/firebase"
// import { addDoc, collection } from "firebase/firestore"

export type CollectionType = {
  id: string
  collection: string
  name: string
  icon: string
  subtitle: string
  structure:Field[]
  href: string
  for_30mw?: boolean
  motherCollection?: string
  addAsField?: string
  cards?:{
    title : string
    icon : string
    subtitle : string
    value : string
  }
  defaultView: "table" | "grid" | "analytics"
  table : boolean
} & (
  {
    table:false
  }
  |{
  table: true ,
  tableRows : {
    title : string ,
    indexes : (string | number)[],
    id: string
  }[]
})


export type FieldTypes = "richText" | "string" | "image" | "number" | "boolean" | "date" | "time" | "select" | "object" | "array" | "reference" | "avatar"


export type Field = {
  name: string
  prefix?: string
} & (  ImageField |StringField | NumberField | BooleanField | DateField | TimeField | SelectField | ObjectField |  ArrayField | ReferenceField )



/// all the types

type StringField ={
  type : "string" | "text" | "richText"
  defaultValue?: string
  value?: string
}
type ImageField ={
  type: "image" | "avatar"
  defaultValue?: string
}

type NumberField ={
  type: "number"
  defaultValue?: number
  value?: number
}

type BooleanField ={
  type: "boolean"
  defaultValue?: boolean
  labels?: {
    true: string
    false: string
  }
}

type DateField ={
  type: "date"
  defaultValue?: Date
}

type TimeField ={
  type: "time"
  defaultValue?: string
}

type SelectField ={
  type: "select"
  defaultValue?: string
  value?: string
  options: {
    name:string,
    value: string
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












