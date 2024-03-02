"use client"
import { cn } from '@/lib/utils'
import useAction from '@/store/30mw/actions'
import { Input, Textarea } from '@nextui-org/react'
import { transform } from 'next/dist/build/swc'
import React, { useCallback } from 'react'
import { Edge, Handle, Node, Position } from 'reactflow'

type Props = {
  type:string
  name:string
  id:string
  props: any
}



const handleStyle = {
	width: 10,
	height: 10,
	borderRadius: 20,
	zIndex: 100,
	backgroundColor: "#333",
  transform: "translate(3px,0px)",
};

function Field({
  type,name,id,props
}: Props) {
	const { nodes, setNodes ,edges } = useAction();



  const UpdateValue = (_id:string,inputName:string,newValue:any)=>{
    setNodes(
      nodes.map((node:Node)=>{
        if(node.id === _id) {
          return {
            ...node,
            data: {
              ...node.data,
              [inputName]:  newValue
            }
          }
        }
        return node
      })
    )
  }

  const getValue = (_id:string,inputName:string)=>{
    return nodes.find((node:Node)=>node.id === _id)?.data[inputName]
    
  }


  const disabled = useCallback(()=>{
   return edges.find((edge:Edge)=>edge.target === id && edge.targetHandle === name ) ? true : false
  },[edges,name,id])
  return (
    		<div className="relative">



          {
            type === "input" &&(
            !disabled() ?
            <Input
              {...props}
              value={getValue(id,name) ?? ""}
              onChange={(e)=>{UpdateValue(id,name,e.target.value)}}
              className={cn("nodrag",disabled() ? "opacity-50" : "")}
              size="sm"
              label={name}
              labelPlacement="outside"
              placeholder={`Enter ${name}`}
              // type="text"
              disabled={disabled()}
            />
            :
            <h1 className='font-medium text-sm text-end pr-4  pt-2'>{name}</h1>
            )
          }



          {
            type === "textarea" &&(

            !disabled() ?
            <Textarea
              {...props}
              value={getValue(id,name) ?? ""}
              labelPlacement="outside"

              onChange={(e)=>{UpdateValue(id,name,e.target.value)}}
              className={cn("nodrag",disabled() ? "opacity-50" : "")}
              size="sm"
              label={name}
              placeholder={`Enter ${name}`}
              // type="text"
              disabled={disabled()}
            />
            :
            <h1 className='font-medium text-sm text-end pr-4  pt-2'>{name}</h1>
            )
          }


					<Handle
						type="target"
						style={handleStyle}
						position={Position.Right}
						id={name}
					/>
				</div>
  )
}

export default Field