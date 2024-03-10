import { db } from '@/firebase'
import { doc, getDoc } from 'firebase/firestore'
import React, {  useEffect } from 'react'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import {  Modal,   ModalContent,   ModalHeader,   ModalBody,   ModalFooter, Button, useDisclosure, Input} from "@nextui-org/react";
type Props = {
  id: string
  language: string
  defaultValue?: string
  children?: (value:string)=>React.ReactNode
}

function Text({
  id,
  language,
  defaultValue,
  children
}: Props) {
  const [value,setValue] = React.useState<string>("")
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  useEffect(() => {
    getDoc(doc(db, "_30mw_languages", id)).then((doc) => {
      if (doc.exists()) {
        setValue(doc.data()[language])
      }
    })
  }, [id, language])


  return (
    <>
    <ContextMenu >
      <ContextMenuTrigger className='hover:text-gray-800'>{
      children ? children((value != "" ? value : defaultValue) ?? "no value") :
      ((value != "" ? value : defaultValue) ?? "no value")
      }</ContextMenuTrigger>
      <ContextMenuContent onClick={(e)=>{e.stopPropagation()}}>
        <ContextMenuItem onClick={onOpen}>Edit content</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
              <ModalBody>
                  <Input className="w-full" placeholder="Content" value={value} onChange={(e)=>setValue(e.target.value)}/>
              </ModalBody>
              <ModalFooter>
                <Button  variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default Text