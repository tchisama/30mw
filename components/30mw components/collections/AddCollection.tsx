import { db } from '@/firebase'
import { CollectionType } from '@/types/collection'
import { addDoc, collection } from 'firebase/firestore'
import React, { useState } from 'react'
import {  Modal,   ModalContent,   ModalHeader,   ModalBody,   ModalFooter, Button, useDisclosure, Input} from "@nextui-org/react";
import { Plus } from 'lucide-react';
type Props = {}

function AddCollection({}: Props) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [coll,setColl]= useState({
    name:"",
    collection:"",
    id:"",
    subtitle:"",
    icon:"",
    structure:[],
    href:"",
  })
  const createCollection = ()=>{
    if(!coll.name || !coll.collection || !coll.icon || !coll.subtitle || !coll.href ) return
    addDoc(collection(db,"collections"),{...coll,structure:"[]"})
  }

  return (
    <>
      <Button onPress={onOpen} variant='shadow' color="primary"><Plus size={16}/>new</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Create new collection</ModalHeader>
              <ModalBody>
                <Input label="Name" value={coll.name} onInput={(e:any)=>setColl({...coll,name:e.target.value,collection:e.target.value,href:"/dashboard/"+e.target.value})}></Input>
                <Input label="Collection id" value={coll.collection} onInput={(e:any)=>setColl({...coll,collection:e.target.value})}></Input>
                <Input label="Collection subtitle" value={coll.subtitle} onInput={(e:any)=>setColl({...coll,subtitle:e.target.value})}></Input>
                <Input label="Collection icon" value={coll.icon} onInput={(e:any)=>setColl({...coll,icon:e.target.value})}></Input>
                <Input label="Collection href" value={coll.href} onInput={(e:any)=>setColl({...coll,href:e.target.value})}></Input>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={()=>{createCollection();onClose()}}>
                  create
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}


export default AddCollection