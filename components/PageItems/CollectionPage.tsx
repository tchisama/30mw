import React, { useEffect } from 'react'
import Doc from '../DocComponents/Doc'
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, Input, useDisclosure} from "@nextui-org/react";
import { Filter, Plus, Search, Trash } from 'lucide-react';
import { CollectionType, UserCollection } from '@/types/collection';
import { addDoc, collection, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebase';
import CreateModal from '../DocComponents/Create';
type Props = {}

const CollectionPage = (props: Props) => {
  const [docs, setDocs] = React.useState<CollectionType[]>([])
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  useEffect(() => {
    onSnapshot(collection(db,"products"), (snapshot) => {
      setDocs(snapshot.docs.map((doc) => {
        return {...doc.data(), id: doc.id} as CollectionType
      }))
    })
  },[])


  return (
    <div className='max-w-[1600px] mx-auto'>
    <Navbar  shouldHideOnScroll >
      <NavbarBrand>
        <p className="font-bold text-xl text-inherit">Products Page</p>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <Input
          type="text"
          placeholder="Search in products"
          labelPlacement="outside"
          className='w-full min-w-[400px]'
          startContent={
            <Search size={16}/>
          }
        />
        <Button isIconOnly><Filter size={16}/></Button>
      </NavbarContent>

      <NavbarContent justify="end">
        <Button onPress={onOpen} variant='shadow' color="primary"><Plus size={16}/> Create</Button>
        <Button variant='faded' color="primary"><Trash size={16}/> Trash</Button>
        <CreateModal collection={UserCollection} model={{isOpen, onOpen, onOpenChange}}/>
      </NavbarContent>
    </Navbar>
    <div className='p-4 grid gap-4 grid-cols-3 mt-12'>
      {
        docs.map((doc,index) => {
          return <Doc doc={doc} key={index}/>
        })
      }
    </div>
    </div>
  )
}

export default CollectionPage