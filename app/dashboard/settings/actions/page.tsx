"use client"
import SideNavbar from '@/components/30mw components/SideNavbar'
import DashboardProvider from '@/components/30mw components/providers/DashboardProvider'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import {Select, SelectSection, SelectItem, Button, Card, CardHeader, CardBody, Input, Textarea} from "@nextui-org/react";
import useCollections from '@/store/30mw/collections';
import { ChevronsUpDown } from 'lucide-react';
import { useEditor } from '@tiptap/react';
import { useDragControls,motion } from 'framer-motion';

import ReactFlow, { Background, Controls, Edge, addEdge, applyEdgeChanges, applyNodeChanges, useEdgesState, useNodesState } from 'reactflow';
import 'reactflow/dist/style.css';
import Start from './nodes/Start';
import Whatsapp from './nodes/Whatsapp';




import { ActionEdge, ActionNode } from './types';
import useAction from '@/store/30mw/actions';
import Playground from './components/Playground';


type Props = {}







const Page = (props: Props) => {
  const {collections} = useCollections()
  const [selectedCollection, setSelectedCollection] = React.useState(new Set([]));
  // const [actions, setActions] = React.useState([])

  useEffect(() => {
    if(collections.length === 0) return
    setSelectedCollection(new Set([collections[0]?.id as string])as any)
  }, [collections])








  return (
    <DashboardProvider>
        {
          collections.length > 0 &&
          selectedCollection &&
      <div className="flex gap-8">
        <SideNavbar />
        <div className="min-h-[100vh] pt-8 flex-1 p-4">
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
                <Playground />
        </div>
      </div>
              }
    </DashboardProvider>
  )
}

export default Page