import { db } from '@/firebase'
import { CollectionType } from '@/types/collection'
import { addDoc, deleteDoc, doc } from 'firebase/firestore'
import React, { useState } from 'react'
import {  Modal,   ModalContent,   ModalHeader,   ModalBody,   ModalFooter, Button, useDisclosure, Input, Divider, Switch} from "@nextui-org/react";
import { Edit, Leaf, Plus, Trash } from 'lucide-react';
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
    motherCollection:collection.motherCollection,
    addAsField:collection.addAsField
  })



  const [addAsField,setAddAsField] = useState(!!collection.addAsField)
  const [motherCollection,setMotherCollection] = useState(!!collection.motherCollection)
  
  
  
  const editCollection = ()=>{
    if(!coll.name || !coll.icon || !coll.subtitle) return
    setCollection({...collection,name:coll.name,icon:coll.icon,subtitle:coll.subtitle,motherCollection:motherCollection? coll.motherCollection : "",addAsField: addAsField ? coll.addAsField : ""})
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
               
                <div className='flex items-center gap-2'>
                  <Switch isSelected={motherCollection} name='motherCollection' aria-label="Add as field" checked={motherCollection} onChange={(e)=>setMotherCollection(e.target.checked)} ></Switch>
                <label htmlFor='motherCollection'>Mother Collection</label>
                </div>
                {
                  motherCollection &&
                <Input  label="Mother Collection" value={coll.motherCollection} onInput={(e:any)=>setColl({...coll,motherCollection:e.target.value})}></Input>
                }

                <div className='flex items-center gap-2'>
                <Switch name='addAsField' aria-label="Add as field" isSelected={addAsField} onChange={(e)=>setAddAsField(e.target.checked)} ></Switch>
                <label htmlFor='addAsField'>Add as field</label>
                </div>
                {
                  addAsField &&
                <Input label="Add as field" value={coll.addAsField} onInput={(e:any)=>setColl({...coll,addAsField:e.target.value})}></Input>
                }



                <Divider />
                <Button onPress={()=>{deleteCollection();onClose()}} color="danger" className='w-fit' > <Trash size={16}/> Delete Collection</Button>
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