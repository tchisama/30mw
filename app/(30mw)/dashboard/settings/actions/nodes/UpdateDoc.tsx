import { Card, CardBody, CardHeader, Input } from '@nextui-org/react';
import React from 'react'
import { Handle, Position } from 'reactflow';
import Node from '../components/Node';
import useAction from '@/store/30mw/actions';
import Field from '../components/Field';
import useCollections from '@/store/30mw/collections';
import { CollectionType } from '@/types/collection';
 
type Props = {
  id:string
}
const handleStyle = {
	width: 10,
	height: 10,
	borderRadius: 20,
	zIndex: 100,
	backgroundColor: "#333",
};

const UpdateDoc = ({id}: Props) => {
  const {name , icon} = useAction()
  const {collections} = useCollections()
  return (
    name &&
    <>
     <Handle type="source" style={{width: 10, height: 10 , borderRadius: 20 ,zIndex:100 }} position={Position.Top} />
    <Handle
				type="target"
				id="next"
				style={handleStyle}
				position={Position.Bottom}
			/>
      <Node
        header={
          <>
            <h1 className="text-xs font-bold text-blue-400">Update Document  ✏️</h1>
          </>
        }
      >
        <Field id={id} name='collection' type='select' options={collections.map((collection:CollectionType)=>collection.collection)} ></Field>
        <Field id={id} name='document id' type='input' ></Field>
        <Field id={id} name='new updated fields' type='textarea' ></Field>
      </Node>
    </>
  )
}

export default UpdateDoc

