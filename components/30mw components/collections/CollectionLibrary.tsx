import React from 'react'
import {  Modal,   ModalContent,   ModalHeader,   ModalBody,   ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import { cn } from '@/lib/utils';
type Props = {}

function CollectionLibrary({}: Props) {
   const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [selectedColls, setSelectedColls] = React.useState<number[]>([])
  return (
    <>
      <Button onPress={onOpen}>📚 Library</Button>
      <Modal size="xl" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
              <ModalBody>
                    {
                      [
                        {
                          name:"products",
                          description:"products collection good for ecommerce dashboards",
                          icon:"🛍️",
                        }
                      ].map((c,i)=>{
                        return (
                          <div  onClick={()=>{ selectedColls.includes(i) ? setSelectedColls(selectedColls.filter((s)=>s!=i)) : setSelectedColls([...selectedColls,i])}} key={i} className={cn('flex gap-3 cursor-pointer border-2  p-4  rounded-xl',selectedColls.includes(i) && 'border-blue-500 bg-blue-50')}>
                            <div className='text-4xl'>{c.icon}</div>
                            <div>
                            <h1 className='text-lg font-medium'>{c.name}</h1>
                            <p className='text-sm'>{c.description}</p>
                            </div>
                          </div>
                        )
                      })
                    }
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Add
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default CollectionLibrary