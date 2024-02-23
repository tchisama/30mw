import React from 'react'
import {  Modal,   ModalContent,   ModalHeader,   ModalBody,   ModalFooter, useDisclosure, Image} from "@nextui-org/react";
type Props = { 
  children: React.ReactNode
  src: string
}

function ImageViewer({children,src}: Props) {
   const {isOpen, onOpen, onOpenChange} = useDisclosure();
  return (
    <>
      <div className='cursor-pointer hover:scale-[1.02] duration-150' onClick={onOpen}>{children}</div>
      <Modal size='xl' isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className='max-h-[80vh] p-12'>
          {(onClose) => (
            <>
              <ModalBody>
                <Image src={src} width={800} height={800} className='w-full rounded-xl h-full max-h-[80vh] object-contain' alt=''/>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default ImageViewer