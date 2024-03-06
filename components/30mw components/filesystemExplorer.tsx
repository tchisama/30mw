"use client"
import React, { useEffect, useState } from 'react'
import {  Modal,   ModalContent,   ModalHeader,   ModalBody,   ModalFooter, Button} from "@nextui-org/react";
import { and, collection, doc, getDoc, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '@/firebase';
import {motion} from "framer-motion"
import FolderComp, { FileType } from '@/app/(30mw)/dashboard/settings/filesystem/[folderId]/components/FolderComp';
import { ArrowLeft } from 'lucide-react';
type Props = {
  model: {
    isOpen: boolean
    onOpen: () => void
    onOpenChange: (isOpen: boolean) => void
  }
  retrunImage: (url: string) => void
}

const FilesystemExplorer = ({model:{isOpen,onOpen,onOpenChange},retrunImage}: Props) => {
  const [selectedFolder , setSelectedFolder] = React.useState<string>("home")
  const [selectedFolderFull , setSelectedFolderFull] = React.useState<FileType | null>(null)
  const [files, setFiles] = useState<FileType[]>([])
  
  useEffect(
    () => {
      onSnapshot(
        query(collection(db, "_30mw_filesystem"), and( where("motherFolder", "==", selectedFolder) , where("_30mw_deleted", "==", false) ) ),
        (snapshot) => {
          setFiles(
            snapshot.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,
            })) as FileType[]
          )
        }
      )
      if(selectedFolder == "home"){
        setSelectedFolderFull(null)
      }else{
        getDoc(
          doc(db, "_30mw_filesystem", selectedFolder)
        ).then((doc)=>{
          setSelectedFolderFull(doc.data() as FileType)
        })
      }
    },
    [selectedFolder]
  )

  
  
  
  return (
      <Modal size='5xl' isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">📂 Filesystem</ModalHeader>
              <ModalBody>
              <div className='flex justify-start flex-col h-[calc(100vh-200px)] overflow-y-auto gap-4 bg-slate-50 p-2 rounded-xl border'>
                {
                selectedFolderFull &&
                <div className='w-full'>
                <Button variant='bordered' onPress={() => setSelectedFolder(selectedFolderFull?.motherFolder || "home")} ><ArrowLeft size={16}/> Go Back</Button>
                </div>
                }
              {/* <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6 mt-12 gap-4'> */}
              {
                files.length > 0 &&
                  <div className='grid grid-cols-3 flex-1'>
                  {
                    files.map((file, i) => {
                      return (
                        <motion.div transition={{ delay: i * 0.1 ,duration: 0.5 }} key={i} initial={{opacity: 0 , y : 10}} animate={{opacity: 1 , y : 0}} className='w-[300px]' onClick={
                          ()=>{
                            if(file.type === "folder"){
                              setSelectedFolder(file.id)
                              setSelectedFolderFull(file)
                            }else{
                              retrunImage(file.url)
                              onClose()
                            }
                          }
                        }>
                          <FolderComp nolink key={i} file={file} />
                        </motion.div>
                      )
                    })
                  }
                  </div>
              }
                  {
                    files.length === 0 && <div className='w-full flex-1 h-full flex items-center justify-center text-lg flex-col gap-3 text-center'>
                      <span className="text-4xl">🙃</span> 
                      no files yet
                    </div>
                  }
              </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
  )
}

export default FilesystemExplorer