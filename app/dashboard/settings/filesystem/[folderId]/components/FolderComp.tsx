import { Button, Card, Skeleton } from '@nextui-org/react'
import { Timestamp } from 'firebase/firestore/lite'
import { Check, MoreHorizontal, X } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem } from "@nextui-org/react";
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import { cn } from '@/lib/utils'
import LoadingTiming from '@/components/30mw components/LoadingTiming'
import {motion } from "framer-motion"
import Image from 'next/image'
import ImageViewer from '@/components/30mw components/ImageViewer'
type Props = {}
export type FileType = {
  name: string,
  _30mw_createdAt: Timestamp
  _30mw_updatedAt: Timestamp
  _30mw_deleted: boolean
  id: string
  path: {
    name: string
    id: string
  }[]
} & (
    {
      type: "file",
      url: string,
      name:string
    }
    |
    {
      type: "folder",
      name: string,
    }
  )

const FolderComp = ({ file }: { file: FileType }) => {
  const route = useRouter()
  const [editMode , setEditMode] = React.useState(false)
  const [name, setName] = React.useState(file.name)
  const [loading, setLoading] = React.useState(false)
  const updateFolder = () => {
    setLoading(true)
    updateDoc(
      doc(db, "_30mw_filesystem", file.id),
      {
        name: name
      }
    ).then(() => {
      setTimeout(() => {
        setLoading(false)
        setEditMode(false)
      },1000)
    })
  }
  const deleteFolder = () => {
    updateDoc(
      doc(db, "_30mw_filesystem", file.id),
      {
        _30mw_deleted: true
      }
    )
  }
  return (
    file.type === "folder" ?

                <motion.div className='w-full group m-2 inline-block  aspect-[5/4] relative cursor-pointer' onClick={() => !editMode &&  route.push(`/dashboard/settings/filesystem/${file.id}`)}>
                  <Card shadow='sm' className='w-full h-full p-2' >
                    <div className='w-full h-full flex flex-col justify-center items-center gap-2'>
                      <div className={cn('w-full h-fit text-7xl text-center my-auto flex-1 flex items-center border bg-slate-50 rounded-xl justify-center duration-200', editMode && 'scale-[0.95]')}>📂</div>
                      {
                        editMode ?
                          <input className='w-full h-[30px] border rounded-lg mx-1 text-center text-sm' value={name} onChange={(e) => setName(e.target.value)} />
                          :
                          <div className='w-full flex items-center justify-center h-[30px] text-center text-sm'>{file.name}</div>
                      }
                      {
                        editMode ?
                        (name !== file.name || loading) ?
                        <Button disabled={loading} isLoading={loading} isIconOnly onClick={updateFolder} className='absolute opacity-100 top-3 right-3'><Check size={16} /></Button>
                        :
                        <Button  isIconOnly onClick={() => setEditMode(false)} className='absolute opacity-100 top-3 right-3'><X size={16} /></Button>
                      :
                      <Dropdown>
                        <DropdownTrigger>
                          <Button isIconOnly className='absolute opacity-30 group-hover:opacity-100 top-3 right-3'><MoreHorizontal size={16} /></Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Static Actions">
                          <DropdownItem key="new" onClick={()=>route.push(`/dashboard/settings/filesystem/${file.id}`)}>Open Folder</DropdownItem>
                          <DropdownItem key="copy" onClick={() => setEditMode(true)}>Rename Folder</DropdownItem>
                          <DropdownItem onClick={deleteFolder} className="text-danger" color="danger" key="edit">Delete Folder</DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                      }
                    </div>
                  </Card>
                </motion.div>
                :
                <motion.div  className='w-full aspect-[5/4] group m-2 inline-block  relative cursor-pointer'>
                    <Card className='w-full h-full flex items-center justify-center p-6'>
                      {/* <ImageViewer src={file.url}> */}
                        <Image  src={file.url} width={200} height={200} alt={file.name} className='w-full rounded-xl border bg-slate-50 h-full object-contain ' />
                      {/* </ImageViewer> */}
                      <Dropdown>
                        <DropdownTrigger>
                          <Button isIconOnly className='absolute opacity-30 group-hover:opacity-100 top-3 right-3'><MoreHorizontal size={16} /></Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Static Actions">
                          <DropdownItem onClick={deleteFolder} className="text-danger" color="danger" key="edit">Delete Folder</DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </Card>
                </motion.div>

  )
}

export default FolderComp