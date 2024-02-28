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
import { Timestamp } from 'firebase/firestore/lite'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '@/firebase'

type Props = {}

type FileType = {
  name:string,
  _30mw_createdAt : Timestamp
  _30mw_updatedAt : Timestamp
  _30mw_deleted : boolean
  id:string
} & (
  {
    type:"file",
    url:string
  }
  |
  {
    type:"folder",
    name:string,
  }
)

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
            <Button variant='bordered' >📁 new folder</Button>
          </div>

          </div>
            <ResizablePanelGroup direction="horizontal">
              <ResizablePanel className='p-6'>
                  {
                    files.map((file, i) => {
                      return (
                        <FolderComp key={i} />
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



const FolderComp = ()=>{
 return(
  <Link   href={`/dashboard/settings/filesystem/${i}`}>
    <Card shadow='sm' className='w-[200px] m-2 inline-block p-2 h-[150px] cursor-pointer' >
      <div className='w-full h-full flex flex-col justify-center items-center gap-2'>
        <div className='w-full h-fit text-7xl text-center my-auto'>📂</div>
        <div className='w-full h-fit text-center text-sm'>file {i}</div>
      </div>
    </Card>
  </Link>
 )
}

export default Page