import React from 'react'
import {  Modal,   ModalContent,   ModalHeader,   ModalBody,   ModalFooter, useDisclosure, Button, DropdownItem} from "@nextui-org/react";
import { Edit, Expand, Phone, X } from 'lucide-react';
import { CollectionType, Field } from '@/types/collection';
import ViewField from './ViewField';
import EditField from './EditField';
import { Timestamp, addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import { useAdminStore } from '@/store/30mw/admin';
type Props = {
  model:{
    isOpen: boolean,
    onOpen: () => void,
    onOpenChange: () => void
  }
  document: any
  setDocument: Function
  collection: CollectionType
}

function EditModal({document,setDocument,collection:_collection,model:{isOpen, onOpen, onOpenChange}}: Props) {
  const [newDocument, setNewDocument] = React.useState<any>(document);
  const {admin} = useAdminStore()
  const updateDocument = () => {
    if(newDocument==document) return


    addDoc(collection(db,"_30mw_notifications"),{
      collection : _collection.collection,
      document : newDocument.id,
      type:"system",
      action:"update",
      _30mw_createdAt : Timestamp.now(),
      _30mw_updatedAt : Timestamp.now(),
      _30mw_deleted : false,
      seenBy:[admin?.fullName],
      maker:{
        fullName:admin?.fullName,
        id:admin?.id,
        photo: admin?.photo
      },
      data:{
        document,
        newDocument
      }
    })



    updateDoc(doc(db,_collection.collection,newDocument.id),{
      ...newDocument,
      _30mw_updatedAt : Timestamp.now()
    }).then(() => {
      setDocument(newDocument)
    })
  }
  return(
    <>
      <Modal className='relative'  size={"5xl"} isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className='relative'>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Edit Document</ModalHeader>
              <ModalBody className='max-h-[70vh] overflow-auto'>
                {
                  _collection.structure.map((field: Field, index) => {
                    return (
                      <EditField key={field.name} field={field} index={[field.name]} document={newDocument} setDocument={setNewDocument} />
                    );
                  })
                }
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={()=>{updateDocument();onClose()}}>
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default EditModal