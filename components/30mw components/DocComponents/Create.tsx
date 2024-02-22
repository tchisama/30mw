import React, { useEffect } from 'react'
import {  Modal,   ModalContent,   ModalHeader,   ModalBody,   ModalFooter, useDisclosure, Button, DropdownItem} from "@nextui-org/react";
import { Edit } from 'lucide-react';
import { CollectionType, Field } from '@/types/collection';
import ViewField from './ViewField';
import EditField from './EditField';
import { createEmptyObject } from '@/lib/utils/index';
import { Timestamp, addDoc, collection } from 'firebase/firestore';
import { db } from '@/firebase';
type Props = {
  model:{
    isOpen: boolean,
    onOpen: () => void,
    onOpenChange: () => void
  }
  collection: CollectionType
}

function CreateModal({collection:_collection,model:{isOpen, onOpen, onOpenChange}}: Props) {
  const [document, setDocument] = React.useState<any>(createEmptyObject(_collection.structure));
  const createDocument = () => {
    console.log(document)
    addDoc(
      collection(db, _collection.collection),{
        ...document,
        _30mw_createdAt: Timestamp.now(),
        _30mw_updatedAt: Timestamp.now(),
        _30mw_deleted: false
      }
    ).then(() => {
      setDocument(createEmptyObject(_collection.structure))
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
                  _collection.structure.map((field: Field, index) => {
                    return (
                      <EditField key={field.name} field={field} index={[field.name]} document={document} setDocument={setDocument} />
                    );
                  })
                }
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={()=>{createDocument();onClose()}}>
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

export default CreateModal