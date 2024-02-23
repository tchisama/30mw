"use client"
import React, { useEffect, useMemo } from 'react'
import Doc from '../DocComponents/Doc'
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, Input, useDisclosure, Skeleton} from "@nextui-org/react";
import { Filter, Plus, Search, Trash } from 'lucide-react';
import { CollectionType } from '@/types/collection';
import { addDoc, collection, getDocs, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { db } from '@/firebase';
import CreateModal from '../DocComponents/Create';
import useCollections from '@/store/30mw/collections';
import LoadingTiming from '../LoadingTiming';
type Props = {}

const CollectionPage = (props: Props) => {
  const [docs, setDocs] = React.useState<CollectionType[]>([])
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const {collections, setCollections ,selectedCollection, setSelectedCollection} = useCollections()
  const [loading,setLoading] = React.useState(true)

  useMemo(() => {
    setDocs([])
    setLoading(true)
    if(!selectedCollection.collection) return
    const q = query(collection(db,selectedCollection.collection),where('_30mw_deleted', '==', false));
    onSnapshot(q, (snapshot) => {
      setDocs(snapshot.docs.map((doc) => {
        return {...doc.data(), id: doc.id} as CollectionType
      }))
    })
    setDocs(p=>p.sort((a:any,b:any)=>new Date(b._30mw_createdAt).getTime()-new Date(a._30mw_createdAt).getTime()))
    setLoading(false)
  },[selectedCollection])

  return (
    selectedCollection && !loading &&
    <div className='flex-1'>
    <Navbar maxWidth='2xl' isBlurred={false} height={"80px"} isBordered shouldHideOnScroll className=''>
      <NavbarBrand>
        <LoadingTiming>
          {
            (loading)=>(
                loading ?
                <Skeleton className=" h-8 text-2xl w-fit rounded-xl" >{selectedCollection.name}</Skeleton> :
                <p className="font-bold text-2xl text-inherit flex items-center gap-2 capitalize"><span className='pb-2 text-3xl'>{selectedCollection?.icon}</span> {selectedCollection.name}</p>
            )
          }
        </LoadingTiming>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <Input
          type="text"
          placeholder={"Search in " + selectedCollection.name}
          labelPlacement="outside"
          className='w-full min-w-[400px]'
          startContent={
            <Search size={16}/>
          }
        />
        <Button isIconOnly><Filter size={16}/></Button>
      </NavbarContent>

      <NavbarContent justify="end">
        <Button onPress={onOpen} variant='shadow' color="primary" className='capitalize' ><Plus size={18}/> new</Button>
        {/* <Button variant='faded' color="primary"><Trash size={16}/> Trash</Button> */}
        <CreateModal collection={selectedCollection} model={{isOpen, onOpen, onOpenChange}}/>
      </NavbarContent>
    </Navbar>
    <div className='p-5 grid gap-4 grid-cols-3 mt-12'>
      {
        !loading &&
        docs.map((doc,index) => {
          return <Doc doc={doc} key={doc.id}/>
        })
      }
    </div>
      {
        docs.length === 0 && 
        <div className='min-h-[50vh]  flex-1 w-full flex items-center justify-center'>
          <p className=' text-3xl w-fit'>🥲 No documents</p>
        </div>
      }
    </div>
  )
}

export default CollectionPage