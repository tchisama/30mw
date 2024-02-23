import { db } from '@/firebase'
import { CollectionType } from '@/types/collection'
import { addDoc, deleteDoc, doc } from 'firebase/firestore'
import React, { useState } from 'react'
import {  Modal,   ModalContent,   ModalHeader,   ModalBody,   ModalFooter, Button, useDisclosure, Input, Divider} from "@nextui-org/react";
import { Edit, Plus, Trash } from 'lucide-react';
type Props = {
  collection:CollectionType,
  setCollection:Function
}

function EditCollection({collection,setCollection}: Props) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [coll,setColl]= useState({
    name:collection.name,
    subtitle:collection.subtitle,
    icon:collection.icon,
  })
  const editCollection = ()=>{
    if(!coll.name || !coll.icon || !coll.subtitle) return
    setCollection({...collection,name:coll.name,icon:coll.icon,subtitle:coll.subtitle})
  }
  const deleteCollection = ()=>{
    if(!confirm("are you sure")) return
    deleteDoc(doc(db,"collections",collection.id))
   }
  return (
    <>
      <Button onPress={onOpen} variant='light' isIconOnly  color="primary"><Edit size={18}/></Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Create new collection</ModalHeader>
              <ModalBody>
                <Input label="Name" value={coll.name} onInput={(e:any)=>setColl({...coll,name:e.target.value})}></Input>
                <Input label="Collection subtitle" value={coll.subtitle} onInput={(e:any)=>setColl({...coll,subtitle:e.target.value})}></Input>
                <Input label="Collection icon" value={coll.icon} onInput={(e:any)=>setColl({...coll,icon:e.target.value})}></Input>
                <Divider />
                <Button onPress={()=>{deleteCollection();onClose()}} color="danger" className='w-fit' > <Trash size={16}/> Delete</Button>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={()=>{editCollection();onClose()}}>
                  save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}


export default EditCollection