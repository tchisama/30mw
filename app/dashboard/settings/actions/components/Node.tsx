import { Card, CardBody, CardFooter, CardHeader, Input, Textarea } from '@nextui-org/react';
import React from 'react'
import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';
 import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

type Props = {
  children?: React.ReactNode
  header: React.ReactNode
}

const handleStyle = { 
  width: 10, height: 10 , borderRadius: 20 ,zIndex:100 , backgroundColor: '#333'
}


;
 
const Node = ({children,header}: Props) => {
  const onChange = useCallback((evt:any) => {
    console.log(evt.target.value);
  }, []);



  
 
  return (
    <>

<ContextMenu>
  <ContextMenuTrigger>
    <Card className='overflow-visible min-w-[150px]'>
      <CardHeader className='flex flex-col items-start'>
        {header}
      </CardHeader>
      {
        children &&
      <CardBody className='flex flex-col min-w-[300px] gap-2'>
        {children}
      </CardBody>
      }
    </Card>
  </ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>delete</ContextMenuItem>
    <ContextMenuItem>duplicate</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>


    </>
  )
}

export default Node