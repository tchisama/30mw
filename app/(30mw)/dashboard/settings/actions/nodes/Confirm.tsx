import { Card, CardBody, CardHeader, Input } from '@nextui-org/react';
import React from 'react'
import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import Node from '../components/Node';
import useAction from '@/store/30mw/actions';
import Field from '../components/Field';
 
type Props = {
  id: string
}
const handleStyle = {  };
 
const Confirm = ({id}: Props) => {
  const {name , icon} = useAction()
  return (
    name &&
    <>
     <Handle id="start" type="source" style={{width: 10, height: 10 , borderRadius: 20 ,zIndex:100 }} position={Position.Left} />
      <Node
        header={
          <>
            <h1 className="text-xs font-bold text-[#339458]">Confirm dialog ✅</h1>
            <h1 className="text-md pr-4">{name}</h1>
            {/* <h3 className="text-xs font-medium">Document</h3> */}
          </>
        }
      >
        <Field id={id} name='title' type='input'></Field>
        <div className='flex justify-end items-center relative pr-4 font-medium'>
          confirmed
            <Handle id="true" type="target" style={{width: 10, height: 10 , borderRadius: 20 ,zIndex:100 }} position={Position.Right} />
        </div>
        <div className='flex justify-end items-center relative pr-4 font-medium'>
          canceled
            <Handle id="false" type="target" style={{width: 10, height: 10 , borderRadius: 20 ,zIndex:100 }} position={Position.Right} />
        </div>
      </Node>
    </>
  )
}

export default Confirm