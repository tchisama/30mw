import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, cn, useDisclosure} from "@nextui-org/react";
import { Copy, Edit, Menu, MoreHorizontal, Trash } from "lucide-react";
import React from 'react'
import EditModal from "./Edit";
import { CollectionType } from "@/types/collection";
import { Timestamp, addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";

type Props = {
  document: any,
  setDocument: Function
  collection: CollectionType
}

function Controllers({
  document:_document,
  setDocument,
  collection:_collection
}: Props) {
  const iconClasses = "text-xl w-5 h-5 mr-2 text-default-500 pointer-events-none flex-shrink-0";
  const {isOpen, onOpen, onOpenChange} = useDisclosure();


  const deleteDocument = () => {
    if(!_document) return
    updateDoc(doc(db,_collection.collection,_document.id),{
      _30mw_deleted : true
    })
  }
  const copyDocument = () => {
    if(!_document) return
    addDoc(collection(db,_collection.collection),
    {..._document,_30mw_createdAt : Timestamp.now(),_30mw_updatedAt : Timestamp.now()})
  }
  console.log(_document)
  return (
    <>
    <EditModal document={_document} setDocument={setDocument} collection={_collection} model={{isOpen, onOpen, onOpenChange}} />
    <Dropdown>
      <DropdownTrigger>
        <Button 
          variant="ghost" 
          isIconOnly

        >
          <MoreHorizontal size={16} className={cn(iconClasses,"mx-2")}/>
        </Button>
      </DropdownTrigger>
      <DropdownMenu variant="faded" aria-label="Dropdown menu with description">
        <DropdownItem
          key="edit"
          showDivider
          onClick={onOpen}
          description="Allows you to edit the file"
          startContent={<Edit className={iconClasses} />}
        >
          Edit 
        </DropdownItem>
        <DropdownItem
          key="copy"
          description="duplicate the document link"
          onClick={copyDocument}
          startContent={<Copy className={iconClasses} />}
        >
          Duplicate
        </DropdownItem>
        <DropdownItem
          key="delete"
          className="text-danger"
          color="danger"
          description="Permanently delete the file"
          onClick={deleteDocument}
          startContent={<Trash className={cn(iconClasses)} />}
        >
          Delete 
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
    </>
  )
}

export default Controllers