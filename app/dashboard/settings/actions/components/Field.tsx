"use client"
import { cn } from '@/lib/utils'
import useAction from '@/store/30mw/actions'
import { Input, Select, SelectItem, Textarea } from '@nextui-org/react'
import { transform } from 'next/dist/build/swc'
import React, { useCallback, useEffect, useState } from 'react'
import { Edge, Handle, Node, Position } from 'reactflow'
import useNodesAndEdges from '../hooks/useNodesAndEdges'
import { updateDoc } from 'firebase/firestore'

type Props = {
  name:string
  id:string
  props?: any
} & ({
  type:"input"
}|{
  type:"textarea"
}|{
  type:"select"
  options:string[]
})



const handleStyle = {
	width: 10,
	height: 10,
	borderRadius: 20,
	zIndex: 100,
	backgroundColor: "#333",
  transform: "translate(3px,0px)",
};

function Field(props: Props) {
  const {
    type,name,id,props : _props 
  } = props
	const { nodes, setNodes ,edges } = useAction();

  const {getValue,UpdateValue} = useNodesAndEdges()

  const disabled = useCallback(()=>{
   return edges.find((edge:Edge)=>edge.target === id && edge.targetHandle === name ) ? true : false
  },[edges,name,id])
  return (
    		<div className="relative">



          {
            type === "input" &&(
            !disabled() ?
            <Input
              {..._props}
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
              {..._props}
              value={getValue(id,name) ?? ""}
              labelPlacement="outside"
   
              onChange={(e)=>{UpdateValue(id,name,e.target.value)}}
              className={cn("nodrag resize w-full ",disabled() ? "opacity-50" : "")}
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

          {
            type== "select" &&(
                  <Select 
                    label={"Select an "+name} 
                    className="max-w-xs"
                    selectedKeys={[getValue(id,name)]} // Converting Set to an array before passing to selectedKeys
                    onSelectionChange={(e)=>{console.log(e);UpdateValue(id,name,(e as any).currentKey)}}
                  >
                    {props.options.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </Select>
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