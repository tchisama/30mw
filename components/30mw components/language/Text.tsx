import { db } from '@/firebase'
import { doc, getDoc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore'
import React, {  useEffect } from 'react'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import {  Modal,   ModalContent,   ModalHeader,   ModalBody,   ModalFooter, Button, useDisclosure, Input, Textarea, Tabs, Tab, Select, SelectItem} from "@nextui-org/react";
import { update } from 'firebase/database';
import useLanguages from '@/store/30mw/languages';
import { Check, X } from 'lucide-react';
type Props = {
  id: string
  language: keyof typeof flags
  defaultValue?: string
  children?: (value:string)=>React.ReactNode
}


export const flags ={
  "English":"gb",
  "French":"fr",
  "Arabic":"sa",
  "Portuguese":"br",
  "Spanish":"es",
  "German":"de",
  "Japanese":"jp",
  "Chinese":"cn",
  "Russian":"ru"
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


  useEffect(() => {
    if (!languages) return setValue("")
    if (!languages[selectedLanguage]) return setValue("")
    if (!languages[selectedLanguage][id]) return setValue("")
    setValue(languages[selectedLanguage][id] ?? "")
  }, [selectedLanguage,languages,id])


  const [langsList, setLangsList] = React.useState<string[]>([])

  useEffect(() => {
    onSnapshot(doc(db, "config", "languages"), (d) => {
      setLangsList(["English",...d.data()?.langList])
    })
  },[])
  return (
    <div onClick={(e)=>{e.stopPropagation()}}>
    <ContextMenu >
      <ContextMenuTrigger className='hover:text-gray-800 hover:bg-primary-200 duration-100 cursor-pointer '>{
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



        <Select
        // label="select a language"
        placeholder="Select an language"
        className="max-w-xs"
        selectedKeys={[selectedLanguage]}
        onChange={(e)=>setSelectedLanguage(e.target.value)}
        startContent={<span className={`fi fi-${flags[selectedLanguage as keyof typeof flags]}`}></span>}
      >
        {langsList.map((lang) => (
          <SelectItem key={lang} value={lang} endContent={
            (
            languages[lang] &&
            id in languages[lang] 
            &&
            languages[lang][id] &&  <Check size={14} className='text-green-500 ' /> 
            ) ?? <X className='text-red-500 ' size={14}/>
            } startContent={<span className={`fi fi-${flags[lang as keyof typeof flags]}`}></span>}>
            {lang}
          </SelectItem>
        ))}
      </Select>
              <Textarea className="w-full " placeholder="Content" value={value ?? ""} onChange={(e)=>setValue(e.target.value)}/>


              </ModalBody>
              <ModalFooter>
                <Button  variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={()=>{
                    if(!(selectedLanguage in languages)) {
                      setDoc(doc(db, "_30mw_languages", selectedLanguage), {[id] : value})
                    }else{
                      updateDoc(doc(db, "_30mw_languages", selectedLanguage), {
                        [id] : value
                      })
                    }
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