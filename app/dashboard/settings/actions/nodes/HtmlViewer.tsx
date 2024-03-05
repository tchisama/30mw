import { Button, Card, CardBody, CardHeader, Input } from '@nextui-org/react';
import React, { useEffect, useState } from 'react'
import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import Node from '../components/Node';
import useAction, { Action } from '@/store/30mw/actions';
import Field from '../components/Field';
import { RefreshCw } from 'lucide-react';
import useRunAction from '@/lib/hooks/action';
 
type Props = {
  id:string
}
const handleStyle = {  };
 
const HtmlViewer = ({id}: Props) => {
  const {name , icon} = useAction()
  const { nodes , edges, action } = useAction()
  const [html,setHtml] = useState('')
  const fire = useRunAction()
  useEffect(()=>{
    const getHtml = ()=>{
      try {
        return fire({...action,nodes:JSON.stringify(nodes),edges:JSON.stringify(edges)} as any,"test",()=>{},"card")
      }catch (error) {
        return "<div class='text-red-500 p-2 bg-red-100 rounded-xl '>"+error+"</div>"
      }
    }
    setHtml(getHtml())
  },[nodes,edges,setHtml,action,fire])
  return (
    name &&
    <>
     {/* <Handle id="start" type="target" style={{width: 10, height: 10 , borderRadius: 20 ,zIndex:100 }} position={Position.Bottom} /> */}
      <Node
        header={
          <>
            <h1 className="text-xs font-bold text-[#af8a3a]">Html Viewer ✨</h1>
            {/* <h1 className="text-md pr-4">{name}</h1> */}
            {/* <h3 className="text-xs font-medium">Document</h3> */}
          </>
        }
      >

        <div  className='bg-slate-100 border p-4 min-w-[400px] rounded-xl '>
          <Card >
              <CardBody>
                <div dangerouslySetInnerHTML={{ __html: html }}></div>
              </CardBody>
          </Card>
        </div>
        <Field id={id} name='html' type='textarea' ></Field>
      </Node>
    </>
  )
}

export default HtmlViewer