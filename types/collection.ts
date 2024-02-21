import { db } from "@/firebase"
// import { addDoc, collection } from "firebase/firestore"

export type CollectionType = {
  id: string
  structure:Field[]
}




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




















export const UserCollection : CollectionType = {
  id: "",
  structure: [
    {
      name: "_id",
      type: "string"
    },
    {
      name: "image",
      type: "image"
    },
    {
      name: "product",
      type: "object",
      structure: [
        {
          name: "photo",
          type: "avatar"
        },
        {
          name: "name",
          type: "string"
        },
        {
          name: "price",
          type: "number",
          prefix: "Dh"
        },
        {
          name: "quantity",
          type: "number",
          prefix: "pieces"
        },
        {
          name: "createdAt",
          type: "date"
        },
        {
          name: "category",
          type: "select",
          options: [
            {
              name: "electronics",
              value: "electronics"
            },
            {
              name: "food",
              value: "food"
            },
            {
              name: "clothes",
              value: "clothes"
            }
          ]
        },
        {
          name: "description",
          type: "text"
        }
      ]
    },
    {
      name: "in stock",
      type: "boolean",
      prefix:"check it",
      labels: {
        true: "in stock",
        false: "out of stock"
      }
    },
    {
      name: "reviews",
      type: "array",
      structure: [
        {
          name: "userId",
          type: "string"
        },
        {
          name: "comment",
          type: "text"
        },
        {
          name: "rating",
          type: "select",
          options: [
            {
              name: "⭐",
              value: "1"
            },
            {
              name: "⭐⭐",
              value: "2"
            },
            {
              name: "⭐⭐⭐",
              value: "3"
            },
            {
              name: "⭐⭐⭐⭐",
              value: "4"
            },
            {
              name: "⭐⭐⭐⭐⭐",
              value: "5"
            }
          ]
        }
      ]
    }
  ]
};




export const me = {
  _id: "abcd1234",
  user: {
    username: "example_user",
    email: "user@example.com",
    createdAt: new Date("2022-01-01"),
    address: {
      street: "123 Main St",
      city: "Cityville",
      zip: "12345",
      country: "Countryland"
    },
  }
};





