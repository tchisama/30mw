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
import { Timestamp, addDoc, collection, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '@/firebase'
import FolderComp, { FileType } from './components/FolderComp'

type Props = {}


function Page({ }: Props) {
  const [selected , setSelected] = useState<number[]>([])
  const params = useParams()
  const [files, setFiles] = useState<FileType[]>([])


  useEffect(
    () => {
      onSnapshot(
        query(collection(db, "_30mw_filesystem"), where("motherFolder", "==", params.folderId)),
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
    addDoc(collection(db, "_30mw_filesystem"), {
      _30mw_deleted: false,
      _30mw_createdAt: Timestamp.now(),
      _30mw_updatedAt: Timestamp.now(),
      motherFolder: params.folderId,
      name: "new folder",
      type: "folder",
    })
  }

  return (
    <DashboardProvider>
      <div className="flex gap-8">
        <SideNavbar />
        <div className="min-h-[110vh] pt-8 flex-1 p-4">
          <div className="flex justify-between gap-2 ">
          <div>
            <h1 className="text-4xl my-2"> 📂 File System</h1>
            <h2 className="text-xl ml-14 ">{params.folderId}</h2>
          </div>
          <div className='flex gap-2'>
            <Button variant='solid' color='primary'><Upload size={16}/>  Upload</Button>
            <Button onPress={createNewFolder} variant='bordered' >📁 new folder</Button>
            {/* <CreateNewFile/> */}
          </div>

          </div>
            <ResizablePanelGroup direction="horizontal">
              <ResizablePanel className='p-6'>
                  {
                    files.map((file, i) => {
                      return (
                        <FolderComp key={i} file={file} />
                      )
                    })
                  }
              </ResizablePanel>
                {/* <ResizableHandle />
                <ResizablePanel className='p-6 w-[200px]'>
                  <Card className='w-full h-full'></Card>
                </ResizablePanel> */}
            </ResizablePanelGroup>


        </div>
      </div>
    </DashboardProvider>
  )
}





export default Page