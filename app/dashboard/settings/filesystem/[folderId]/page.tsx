"use client"
import SideNavbar from '@/components/30mw components/SideNavbar'
import DashboardProvider from '@/components/30mw components/providers/DashboardProvider'
import { Button, Card, Divider } from '@nextui-org/react'
import { Divide, Upload } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Timestamp, addDoc, and, collection, doc, getDoc, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '@/firebase'
import FolderComp, { FileType } from './components/FolderComp'
import UploadImage from '@/components/30mw components/DocComponents/UploadImage'
import {motion} from "framer-motion"
type Props = {}


function Page({ }: Props) {
  const [selected , setSelected] = useState<number[]>([])
  const params = useParams()
  const [files, setFiles] = useState<FileType[]>([])
  const [selectedFile, setSelectedFile] = useState<FileType>()

  useEffect(
    () => {
      onSnapshot(
        query(collection(db, "_30mw_filesystem"), and( where("motherFolder", "==", params.folderId) , where("_30mw_deleted", "==", false) ) ),
        (snapshot) => {
          setFiles(
            snapshot.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,
            })) as FileType[]
          )
        }
      )
    },
    [params.folderId]
  )

  
  const createNewFolder = ()=>{

    const path = params.folderId == "home" || !selectedFile ? [{name: "home", id: "home"}] : [...selectedFile.path as {name: string, id: string}[], {name: selectedFile.name, id: selectedFile.id}]
    addDoc(collection(db, "_30mw_filesystem"), {
      _30mw_deleted: false,
      _30mw_createdAt: Timestamp.now(),
      _30mw_updatedAt: Timestamp.now(),
      motherFolder: params.folderId,
      name: "new folder",
      type: "folder",
      path: path
    })
  }
  useEffect(() => {
    if(!params.folderId) return
    if(params.folderId === "home") return
    getDoc(
      doc(db, "_30mw_filesystem", params.folderId as string)
    ).then((doc)=>{
      setSelectedFile({...doc.data(), id: doc.id} as FileType)
    })
  },[params.folderId])
  return (
    <DashboardProvider>
      <div className="flex gap-8">
        <SideNavbar />
        <div className="min-h-[110vh] pt-8 flex-1 p-4">
          <div className="flex justify-between gap-2 ">
          <div>
            <h1 className="text-4xl my-2"> 📂 File System</h1>
            <h2 className="text-xl ml-14 ">{
              // selectedFile?.path.map((path) => <Link href={`/dashboard/settings/filesystem/${path.id}`} key={path.id}>{path.name}</Link> ).map((path, i) => <span key={i}> / {path}</span>)
              // !params.folderId ? "/ home" : 
              selectedFile?.name || "home"
            }</h2>
          </div>
          <div className='flex gap-2'>
            <UploadImage defaultFolder={false} folder={params.folderId as string} returnImage={()=>{}}>{
              ({id,loading})=>{
                return (
                    <Button onPress={() => {
                      document.getElementById(id)?.click()
                    }} isLoading={loading} disabled={loading} variant='solid' color='primary'><Upload size={16}/>  Upload</Button>
                )
              }
              }
            </UploadImage>
            <Button onPress={createNewFolder} variant='bordered' >📁 new folder</Button>
          </div>

          </div>
              <div className='flex flex-wrap mt-12 gap-4'>
              {/* <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6 mt-12 gap-4'> */}

                  {
                    files.map((file, i) => {
                      return (
                        <motion.div transition={{ delay: i * 0.1 ,duration: 0.5 }} key={i} initial={{opacity: 0 , y : 10}} animate={{opacity: 1 , y : 0}} className='w-[300px]'>
                          <FolderComp key={i} file={file} />
                        </motion.div>
                      )
                    })
                  }
                  {
                    files.length === 0 && <div className='w-full h-full flex items-center justify-center min-h-[50vh] text-lg flex-col gap-3 text-center'>
                      <span className="text-4xl">🙃</span> 
                      no files yet
                    </div>
                  }
              </div>

        </div>
      </div>
    </DashboardProvider>
  )
}





export default Page