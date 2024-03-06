"use client"
import { db } from '@/firebase';
import useCollections from '@/store/30mw/collections';
import { CollectionType } from '@/types/collection';
import { collection, onSnapshot } from 'firebase/firestore';
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react'

type Props = {
  children: React.ReactNode
}

function DashboardProvider({children}: Props) {
    
  const { collections , setCollections , setSelectedCollection , selectedCollection } = useCollections();
  const pathname = usePathname()
  const router = useRouter()
  const params = useParams()
  useEffect( () => {
    try{
      onSnapshot(collection(db, "collections"), (snapshot) => {
          setCollections(snapshot.docs.map((doc) => {
              return {...doc.data(), id: doc.id , structure: JSON.parse(doc.data().structure)} as CollectionType
          }))  
      console.log(snapshot.docs)
      })
    }catch (e){
      console.log(e)
    }
  },[setCollections])
  useEffect(() => {
    if(collections.length < 0) return
    // alert(searchParams.get("collectionName"))
    const coll = collections.find((c) => c.collection === params.collectionName)
    if(!coll && collections.length > 0){
      setSelectedCollection(collections[0])
      if(!(pathname == "/dashboard" || pathname.includes("/dashboard/settings/"))) {
        router.push((collections[0] as CollectionType)?.href)
      }
    }
    if(coll) setSelectedCollection(coll)
    // console.log(coll)
  },[collections,pathname,router,setSelectedCollection,params.collectionName])

  return (
    <div className='max-w-[1900px] 2xl:max-w-[2400px] px-8 mx-auto'>{children}</div>
  )
}

export default DashboardProvider