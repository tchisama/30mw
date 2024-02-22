"use client"
import { db } from '@/firebase';
import useCollections from '@/store/30mw/collections';
import { CollectionType } from '@/types/collection';
import { collection, onSnapshot } from 'firebase/firestore';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

type Props = {
  children: React.ReactNode
}

function DashboardProvider({children}: Props) {
    
  const { collections , setCollections , setSelectedCollection , selectedCollection } = useCollections();
  const pathname = usePathname()
  const router = useRouter()
  useEffect( () => {
    try{
      onSnapshot(collection(db, "collections"), (snapshot) => {
          setCollections(snapshot.docs.map((doc) => {
              return {...doc.data(), id: doc.id , structure: JSON.parse(doc.data().structure)} as CollectionType
          }))  
      })

    }catch (e){
      console.log(e)
    }
  },[setCollections])
  useEffect(() => {
    if(collections.length < 0) return
    const coll = collections.find((c) => c.href === pathname) 
    if(!coll && collections.length > 0){
      setSelectedCollection(collections[0])
      if(!pathname.includes("/dashboard/settings")){
        router.push((collections[0] as CollectionType)?.href)
      }
    }
    if(coll) setSelectedCollection(coll)
    // console.log(coll)
  },[collections,pathname,router,setSelectedCollection])

  return (
    <div className='max-w-[1900px] px-8 mx-auto'>{children}</div>
  )
}

export default DashboardProvider