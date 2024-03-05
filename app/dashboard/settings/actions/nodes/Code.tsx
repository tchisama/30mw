import React from 'react'
import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import Node from '../components/Node';
import useAction from '@/store/30mw/actions';
import { Button, Input, Textarea } from '@nextui-org/react';
import { Code2, Plus, X } from 'lucide-react';
import useNodesAndEdges from '../hooks/useNodesAndEdges';
import { EditorContent, useEditor } from '@tiptap/react';
 


type Props = {
  data:{
    sources:{
      id:string,
      name:string,
    }[],
    code:string
  },
  id:string
}
const handleStyle = {  };
const Code = ({data,id}: Props) => {
 const {nodes,setNodes} = useAction()
 const {UpdateValue,getValue} = useNodesAndEdges()


 
  return (
    <div className='min-w-[600px]'>
     <Handle  type="source" style={{width: 10, height: 10 , borderRadius: 20 ,zIndex:100 }} position={Position.Left} />
      <Node
        header={
          <>
            <h1 className="text-xs font-bold text-[#457044] flex items-center gap-2">Code <Code2 size={18} /></h1>
            {/* <h3 className="text-xs font-medium">Document</h3> */}
          </>
        }
      >
        <div className='ml-auto'><Button size='sm'  color='primary' isIconOnly 
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
        <Textarea       classNames={{
        input: "resize-y min-h-[40px]",
      }}  value={getValue(id,"code")} onChange={(e)=>{UpdateValue(id,"code",e.target.value)}} label="javascript code" className='nodrag w-[600px] dark font-mono text-sm' color='primary' >
        </Textarea>

      </Node>
    </div>
  )
}

export default Code