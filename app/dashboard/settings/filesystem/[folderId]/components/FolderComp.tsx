import { Button, Card } from '@nextui-org/react'
import { Timestamp } from 'firebase/firestore/lite'
import { Check, MoreHorizontal, X } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem } from "@nextui-org/react";
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import { cn } from '@/lib/utils'
type Props = {}
export type FileType = {
  name: string,
  _30mw_createdAt: Timestamp
  _30mw_updatedAt: Timestamp
  _30mw_deleted: boolean
  id: string
} & (
    {
      type: "file",
      url: string
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
  return (
    file.type === "folder" &&
    <div className='w-[200px] group m-2 inline-block h-[160px] relative cursor-pointer' onClick={() => !editMode &&  route.push(`/dashboard/settings/filesystem/${file.id}`)}>
      <Card shadow='sm' className='w-full h-full p-2' >
        <div className='w-full h-[160px] flex flex-col justify-center items-center gap-2'>
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
              <DropdownItem key="new">Open Folder</DropdownItem>
              <DropdownItem key="copy" onClick={() => setEditMode(true)}>Rename Folder</DropdownItem>
              <DropdownItem className="text-danger" color="danger" key="edit">Delete Folder</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          }
        </div>
      </Card>
    </div>
  )
}

export default FolderComp