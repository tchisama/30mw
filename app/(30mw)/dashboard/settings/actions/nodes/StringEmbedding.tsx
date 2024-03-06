import React from 'react'
import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import Node from '../components/Node';
import useAction from '@/store/30mw/actions';
import { Button, Input, Textarea } from '@nextui-org/react';
import { Plus, X } from 'lucide-react';
import useNodesAndEdges from '../hooks/useNodesAndEdges';
 
type Props = {
  data:{
    sources:{
      id:string,
      name:string,
    }[],
    text:string
  },
  id:string
}
const handleStyle = {  };
const StringEmbedding = ({data,id}: Props) => {
 const {nodes,setNodes} = useAction()
 const {UpdateValue,getValue} = useNodesAndEdges()
  return (
    <div className='w-[500px]'>
     <Handle  type="source" style={{width: 10, height: 10 , borderRadius: 20 ,zIndex:100 }} position={Position.Left} />
      <Node
        header={
          <>
            <h1 className="text-xs font-bold text-[#457044]">String Embedding 🌱</h1>
            {/* <h3 className="text-xs font-medium">Document</h3> */}
          </>
        }
      >
        <div className='ml-auto '><Button size='sm'  color='primary' isIconOnly 
          onClick={()=>{
            // alert("hello world")
            UpdateValue(id,"sources",[
              ...(getValue(id,"sources")??[]) ,
              {
                id:Math.random().toString(),
                name:""
              }
            ])
          }}
        ><Plus size={15} /></Button></div>
        <div className=' flex flex-col gap-2 items-end rounded-xl '>
            {
              getValue(id,"sources")?.map((source:{id:string,name:string})=>{
                return(
                  <div key={source.id} className='flex items-center gap-2 relative'>
                    <Button 
                    onClick={()=>{
                      UpdateValue(id,"sources",getValue(id,"sources").filter((_source:{id:string})=>_source.id !== source.id))
                    }}
                    size='sm' isIconOnly><X size={15} /></Button>
                    <Input size='sm' className='nodrag' value={source.name} onChange={(e)=>{
                      UpdateValue(id,"sources",getValue(id,"sources").map((_source:{id:string,name:string})=>_source.id === source.id ? {...source,name:e.target.value} : _source))
                    }} />
                    <Handle  id={source.id} type="target" style={{width: 10, height: 10 , borderRadius: 20 ,zIndex:100 }} position={Position.Right} />
                  </div>
                )
              })
            }
        </div>
        <Textarea  value={getValue(id,"text")}  onChange={(e)=>{UpdateValue(id,"text",e.target.value)}} label="Embedding text" className='nodrag w-[475px] resize' >

        </Textarea>
      </Node>
    </div>
  )
}

export default StringEmbedding