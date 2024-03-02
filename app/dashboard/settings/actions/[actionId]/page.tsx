"use client"
import SideNavbar from '@/components/30mw components/SideNavbar'
import DashboardProvider from '@/components/30mw components/providers/DashboardProvider'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import {Select, SelectSection, SelectItem, Button, Card, CardHeader, CardBody, Input, Textarea} from "@nextui-org/react";
import useCollections from '@/store/30mw/collections';
import { ChevronsUpDown } from 'lucide-react';
import { useEditor } from '@tiptap/react';
import { useDragControls,motion } from 'framer-motion';

import ReactFlow, { Background, Controls, Edge, Node, addEdge, applyEdgeChanges, applyNodeChanges, useEdgesState, useNodesState } from 'reactflow';
import 'reactflow/dist/style.css';
import Start from '../nodes/Start';
import Whatsapp from '../nodes/Whatsapp';




import { ActionEdge, ActionNode } from '../types';
import useAction, { Action } from '@/store/30mw/actions';
import Playground from '../components/Playground';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase';


type Props = {
  params: {
    actionId: string
  }
}







const Page = (props: Props) => {
  const {collections} = useCollections()
  const [selectedCollection, setSelectedCollection] = React.useState(new Set([]));
  // const [actions, setActions] = React.useState([])

  useEffect(() => {
    if(collections.length === 0) return
    setSelectedCollection(new Set([collections[0]?.id as string])as any)
  }, [collections])

  const {action,setAction} = useAction()
  useEffect(() => {
    setAction(null)
    getDoc(
      doc(db,"actions",props.params.actionId)
    ).then((doc)=>{
      setAction({...doc.data(), id: doc.id} as Action)
    })
  },[props.params.actionId,setAction])

  const {nodes, edges , setNodes, setEdges, name, setName, icon, setIcon } = useAction()



  useEffect(() => {
    setNodes([])
    setEdges([])
    setName("")
    setIcon("")

    if(action == null) return
    setNodes(JSON.parse(action.nodes as any) as Node[])
    setEdges(JSON.parse(action.edges as any) as Edge[])
    setName(action.name)
    setIcon(action.icon)
  }, [action,setNodes,setEdges , setName, setIcon])




  return (
    action &&
    <DashboardProvider>
      <div className='h-[calc(100vh-60px)] pt-8 w-full flex gap-4'>
        <SideNavbar />
        <div className='flex-1 flex flex-col gap-4'>
          <div className='flex gap-2'>
            <Input value={icon} onChange={
              (e)=>{
                setIcon(e.target.value)
              }
            }  placeholder="Icon" className='w-[60px]' size='sm'></Input>
            <Input value={name} 
            onChange={(e)=>{setName(e.target.value)}}  placeholder="Action Name" className=' w-fit' size='sm'></Input>
            <Button size='lg' variant='shadow' color='primary' className='w-fit ml-auto'
            onClick={()=>{
              updateDoc(
                doc(db,"actions",props.params.actionId),
                {
                  ...action,
                  name,
                  icon,
                  nodes: JSON.stringify(nodes),
                  edges: JSON.stringify(edges)
                }
              )
            }}
            >💾 Save</Button>
          </div>
          {
            action &&
            <Playground action={action} />
          }
        </div>
      </div>
    </DashboardProvider>

  )
}

export default Page