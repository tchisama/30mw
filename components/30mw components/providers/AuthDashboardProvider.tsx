"use client"
import { db } from '@/firebase'
import { Rule, useAdminStore } from '@/store/30mw/admin'
import { Spinner } from '@nextui-org/react'
import { Timestamp, addDoc, collection, doc, getDoc, getDocs, onSnapshot } from 'firebase/firestore'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

type Props = {
  children: React.ReactNode
}

const AuthDashboardProvider = ({children}: Props) => {
  const {admin ,setAdmin ,setRules , rules ,setSelectedRule } = useAdminStore()
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
  onSnapshot(collection(db,"_30mw_admins_rules"), (snapshot) => {
      if(snapshot.docs.length > 0){
        setRules(snapshot.docs.map((doc) => {
          return {...doc.data(), id: doc.id }
        }))
      }
      return snapshot.docs.map((doc) => {
          return {...doc.data(), id: doc.id }
      })
    }) 
  },[setRules])

  const [firstLoad, setFirstLoad] = React.useState(true)
  useEffect(() => {
       
  },[])





  useEffect(() => {

    (async () => {

    if(pathname == "/dashboard/login") return



    const getAdminFromLocalStorage = localStorage.getItem("_30mw_admin")
    if(getAdminFromLocalStorage){
      getDoc(doc(db,"_30mw_admins",JSON.parse(getAdminFromLocalStorage).id)).then((doc)=>{ 
        if(!doc.exists()) return router.push("/dashboard/login")
        setAdmin({... doc.data(), id: doc.id} as Rule)
      })
      const ruleId = JSON.parse(getAdminFromLocalStorage).rule
      if(!ruleId) return
      if(!rules) return
      const rule = rules.find((r) => r.id === ruleId)
      console.log(rule)
      setSelectedRule(rule)
    }else{
      router.push("/dashboard/login")
    }
     })()
  },[setAdmin,router,pathname ,setRules,setSelectedRule,rules])
  return (
    pathname == "/dashboard/login" ? children :
    (
    admin==null ?
    <div className='w-full h-screen flex items-center justify-center flex-col gap-4'><Spinner /> Loading 😗</div>
    :
    children
    )
  )
}

export default AuthDashboardProvider