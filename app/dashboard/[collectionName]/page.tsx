"use client";
import Doc from "@/components/30mw components/DocComponents/Doc";
import CollectionPage from "@/components/30mw components/PageItems/CollectionPage";
import SideNavbar from "@/components/30mw components/SideNavbar";
import { db } from "@/firebase";
import {getValue , returnUpdated, createEmptyObject } from "@/lib/utils/index";
import useCollections from "@/store/30mw/collections";
import { CollectionType, Field} from "@/types/collection";
import { collection, getDocs, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Home = () => {
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
      router.push((collections[0] as CollectionType)?.href)
    }
    if(coll) setSelectedCollection(coll)
    // console.log(coll)
  },[collections,pathname,router,setSelectedCollection])

	return (
    collections.length > 0 && selectedCollection &&
    <div className="flex">
      <SideNavbar />
			<CollectionPage />
    </div>
	);
};












export default Home;
