import { db } from '@/firebase'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import React, {  useEffect } from 'react'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import {  Modal,   ModalContent,   ModalHeader,   ModalBody,   ModalFooter, Button, useDisclosure, Input, Textarea, Tabs, Tab} from "@nextui-org/react";
import { update } from 'firebase/database';
import useLanguages from '@/store/30mw/languages';
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
  


  const {languages} = useLanguages()
  const [selectedLanguage, setSelectedLanguage] = React.useState<any>(language);

  useEffect(() => {
    if (!languages) return
    if (!languages[language]) return
    if (!languages[language][id]) return
    setValue(languages[language][id] ?? "")
  }, [id, language, languages])


  return (
    <div onClick={(e)=>{e.stopPropagation()}}>
    <ContextMenu >
      <ContextMenuTrigger className='hover:text-gray-800'>{
      children ? children((value != "" ? value : defaultValue) ?? "no value") :
      ((value != "" ? value : defaultValue) ?? "no value")
      }</ContextMenuTrigger>
      <ContextMenuContent >
        <ContextMenuItem onClick={onOpen}>Edit content</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
        <Modal isDismissable={false} size='4xl'  isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Edit content</ModalHeader>
              <ModalBody>



              <Tabs color='primary' aria-label="Options" radius='full'>
                {
                  ["English","French","Arabic"].map((language:string) => (
                    <Tab key={language} title={language}>
                      <Textarea className="w-full " placeholder="Content" value={value} onChange={(e)=>setValue(e.target.value)}/>
                    </Tab>
                  ))
                }
              </Tabs>              
                


              </ModalBody>
              <ModalFooter>
                <Button  variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={()=>{
                    updateDoc(doc(db, "_30mw_languages", language), {
                      [id] : value
                    })
                  onClose()
                }}>
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}

export default Text