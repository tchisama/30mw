/// admin zustand store  
import { create } from 'zustand';

export type AdminType = {
  fullName:string,
  email:string,
  password:string,
  _30mw_createdAt:Date,
  _30mw_updatedAt:Date,
  rule:string,
  _30mw_deleted:boolean,
  photo:string,
  accepted:boolean,
  id:string
}
export type Rule = {
  name:string,
  "but collections":{
    "collection name":string,
    "write / update": boolean
  }[]
  "access to all ":boolean
  "read all only":boolean
  id:string
}
type AdminState = {
  admin : AdminType | null
  setAdmin:Function
  rules : Rule[]
  setRules:Function
  selectedRule: Rule | null
  setSelectedRule:Function
}



export const useAdminStore = create<AdminState>((set) => ({
  admin:null,
  setAdmin: (admin:AdminType) => set({ admin }),
  rules:[],
  setRules: (rules:Rule[]) => set({ rules }),
  selectedRule: null,
  setSelectedRule: (selectedRule:Rule) => set({ selectedRule }),
}))