"use client"
import SideNavbar from '@/components/30mw components/SideNavbar'
import DashboardProvider from '@/components/30mw components/providers/DashboardProvider'
import React, { useEffect } from 'react'
import {Select, SelectSection, SelectItem, Button, Card, CardHeader, CardBody, Input, Textarea} from "@nextui-org/react";
import useCollections from '@/store/30mw/collections';
import { ChevronsUpDown } from 'lucide-react';
import { useEditor } from '@tiptap/react';
import { useDragControls,motion } from 'framer-motion';


import ReactFlow from 'reactflow';
import 'reactflow/dist/style.css';


type Props = {}






const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
  { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];






const Page = (props: Props) => {
  const {collections} = useCollections()
  const [selectedCollection, setSelectedCollection] = React.useState(new Set([]));
  const [actions, setActions] = React.useState([])

  useEffect(() => {
    if(collections.length === 0) return
    setSelectedCollection(new Set([collections[0]?.id as string])as any)
  }, [collections])


const controls = useDragControls()

  return (
    <DashboardProvider>
        {
          collections.length > 0 &&
          selectedCollection &&
      <div className="flex gap-8">
        <SideNavbar />
        <div className="min-h-[110vh] pt-8 flex-1 p-4">
          <div className="flex justify-between items-center relative gap-2 bg-white z-40">
            <div className='flex gap-4 flex-1 items-center'>
              <h1 className="text-4xl my-2 font-bold">🔥  Actions</h1>

              <Select

                size='sm'
                label="Select a collection" 
                className="max-w-xs" 
                disableSelectorIconRotation
                selectedKeys={selectedCollection}
                onSelectionChange={setSelectedCollection as any}
                selectorIcon={<ChevronsUpDown size={14} />}
              >
                {collections.map((collection) => (
                  <SelectItem startContent={<span className='text-xl'>{collection.icon}</span>} key={collection.id} value={collection.id}>
                    {collection.name}
                  </SelectItem>
                ))}
              </Select>
            </div>
            <Button color="primary" variant='shadow' size='lg'>
              ✨ Create
            </Button>
          </div>


          <div className='mt-8 w-full flex-1'>

<ReactFlow nodes={initialNodes} edges={initialEdges} />


            {/* {
              new Array(5).fill(null).map((_,i)=>(
            <motion.div key={i} className='w-fit z-0'  drag dragControls={controls}>
            <Card className='w-fit min-w-[500px]'>
              <CardHeader className='flex flex-col items-start'>
                <h1 className='text-sm text-green-600 font-medium'>
                  Whatsapp
                </h1>
                <h1 className='text-xl font-medium'>
                  Confirm Whatsapp
                </h1>
              </CardHeader>
              <CardBody className='flex flex-col gap-2'>
                <Input type='tel' label='Phone number' placeholder='Enter phone number'  />
                <Textarea label='Message' placeholder='Enter message' />
              </CardBody>
            </Card>
            </motion.div>
              ))
            } */}

          </div>
        </div>
      </div>
              }
    </DashboardProvider>
  )
}

export default Page