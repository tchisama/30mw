import React from 'react'
import {  Modal,   ModalContent,   ModalHeader,   ModalBody,   ModalFooter, useDisclosure, Button, DropdownItem} from "@nextui-org/react";
import { Edit } from 'lucide-react';
import { CollectionType, Field } from '@/types/collection';
import ViewField from './ViewField';
import EditField from './EditField';
import { Timestamp, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase';
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

function EditModal({document,setDocument,collection,model:{isOpen, onOpen, onOpenChange}}: Props) {
  const [newDocument, setNewDocument] = React.useState<any>(document);
  const updateDocument = () => {
    updateDoc(doc(db,collection.collection,newDocument.id),{
      ...newDocument,
      _30mw_updatedAt : Timestamp.now()
    }).then(() => {
      setDocument(newDocument)
    })
  }
  return(
    <>
      <Modal  scrollBehavior='inside' size='3xl' isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent >
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Edit Document</ModalHeader>
              <ModalBody className='max-h-[70vh] overflow-auto'>
                {
                  collection.structure.map((field: Field, index) => {
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