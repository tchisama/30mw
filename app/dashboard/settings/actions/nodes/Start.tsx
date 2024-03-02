import { Card, CardBody, CardHeader, Input } from '@nextui-org/react';
import React from 'react'
import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import Node from '../components/Node';
 
type Props = {}
const handleStyle = {  };
 
const Start = (props: Props) => {
  const onChange = useCallback((evt:any) => {
    console.log(evt.target.value);
  }, []);
  return (
    <>
     <Handle type="target" style={{width: 10, height: 10 , borderRadius: 20 ,zIndex:100 }} position={Position.Bottom} />
      <Node
        header={
          <>
            <h1 className="text-xs font-bold text-[#ff6723]">On Run 🔥</h1>
            <h1 className="text-md ">Action  Name</h1>
            {/* <h3 className="text-xs font-medium">Document</h3> */}
          </>
        }
      >
      </Node>

    </>
  )
}

export default Start