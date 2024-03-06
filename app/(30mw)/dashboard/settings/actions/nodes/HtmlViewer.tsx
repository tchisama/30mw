
import { Button, Card, CardBody, CardHeader, Input } from '@nextui-org/react';
import React, { useEffect, useState } from 'react'
import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import Node from '../components/Node';
import useAction, { Action } from '@/store/30mw/actions';
import Field from '../components/Field';
import { RefreshCw } from 'lucide-react';
import useRunAction from '@/lib/hooks/action';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/firebase';
import useCollections from '@/store/30mw/collections';

type Props = {
  id:string
}
const handleStyle = {  };
 
const HtmlViewer = ({id}: Props) => {
  const {name , icon} = useAction()
  const { nodes , edges, action } = useAction()
  const [html,setHtml] = useState('')
  const {collections} = useCollections()
  const [docs,setDocs] = useState([])
  const [counter,setCounter] = useState(0)
  useEffect(()=>{
    console.log(action)
    if(!action?.collection) return
    if(!collections.find((c)=>c.id==action.collection)) return
    getDocs(
      query(
        collection(db,collections.find((c)=>c.id==action.collection)?.collection??""),
        where("_30mw_deleted", "==", false),
      )
    ).then((snap)=>{
      setDocs(snap.docs.map((doc)=>({...doc.data(), id: doc.id} as any))  as any )
    })
  },[action,collections])
  const fire = useRunAction()
  useEffect(()=>{
    const getHtml = ()=>{
      try {
        return fire({...action,nodes:JSON.stringify(nodes),edges:JSON.stringify(edges)} as any,docs,()=>{},"card")
      }catch (error) {
        return "<div class='text-red-500 p-2 bg-red-100 rounded-xl '>"+error+"</div>"
      }
    }
      setCounter(p=>p+1)
    setHtml( getHtml())
  },[])
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
        {/* {counter} */}
        <Button isIconOnly size='sm' color="primary" onClick={() => {
          setHtml(()=>{
            try {
              return fire({...action,nodes:JSON.stringify(nodes),edges:JSON.stringify(edges)} as any,docs,()=>{},"card")
            }catch (error) {
              return "<div class='text-red-500 p-2 bg-red-100 rounded-xl '>"+error+"</div>"
            }
          } 
          )
           }}><RefreshCw size={15}/></Button>
        <div  className='bg-slate-100 border p-4 min-w-[500px] rounded-xl '>
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