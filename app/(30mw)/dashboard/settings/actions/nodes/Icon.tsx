import { Card, CardBody, CardHeader, Input } from '@nextui-org/react';
import React from 'react'
import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import Node from '../components/Node';
import useAction from '@/store/30mw/actions';
import Field from '../components/Field';
 
type Props = {
  id:string
}
const handleStyle = {  };
 
const ActionIcon = ({id}: Props) => {
  const {name , icon} = useAction()
  return (
    name &&
    <>
      <Node
        header={
          <>
            <h1 className="text-xs font-bold text-[#ff6723]">Action Icon </h1>
          </>
        }
      >
        <Field id={id} name='icon' type='input' ></Field>
      </Node>
    </>
  )
}

export default ActionIcon