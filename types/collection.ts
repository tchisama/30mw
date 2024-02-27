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
}

export type FieldTypes = "string" | "image" | "number" | "boolean" | "date" | "time" | "select" | "object" | "array" | "reference" | "avatar"


export type Field = {
  name: string
  prefix?: string
} & (  ImageField |StringField | NumberField | BooleanField | DateField | TimeField | SelectField | ObjectField |  ArrayField | ReferenceField )



/// all the types

type StringField ={
  type : "string" | "text" 
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





export const usersColl: CollectionType = {
    "id": "abc123xyz456",
    "collection": "users",
    "icon" : "👥",
    "href": "/dashboard/users",
    "subtitle": "manage users",
    "structure": [
        {
            "name": "avatar",
            "type": "image"
        },
        {
            "name": "name",
            "type": "object",
            "structure": [
                {
                    "name": "first",
                    "type": "string"
                },
                {
                    "name": "last",
                    "type": "string"
                }
            ]
        },
        {
            "name": "email",
            "type": "string"
        },
        {
            "name": "age",
            "type": "number"
        },
        {
            "name": "active",
            "type": "boolean",
            "labels": {
                "true": "active",
                "false": "inactive"
            }
        },
        {
            "name": "role",
            "type": "select",
            "options": [
                {
                    "name": "Admin",
                    "value": "admin"
                },
                {
                    "name": "User",
                    "value": "user"
                }
            ]
        },
        {
            "name": "createdAt",
            "type": "date"
        },
        {
            "name": "address",
            "type": "object",
            "structure": [
                {
                    "name": "street",
                    "type": "string"
                },
                {
                    "name": "city",
                    "type": "string"
                },
                {
                    "name": "zipcode",
                    "type": "string"
                },
                {
                    "name": "country",
                    "type": "string"
                }
            ]
        },
        {
            "name": "bio",
            "type": "text"
        }
    ],
    "name": "users"
}












