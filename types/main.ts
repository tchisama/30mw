import { Timestamp } from "firebase/firestore/lite"

export type Notification = {
  id: string
  action: string
  collection: string
  type: string
  _30mw_deleted: boolean
  _30mw_createdAt: Timestamp
  _30mw_updatedAt: Timestamp
  maker: {
    id: string
    fullName: string
    photo: string
  }
  seenBy: string[]
  document:string,
  // documentLink:string,
  data: {
    document:any,
    newDocument:any
  }
}