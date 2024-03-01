import useAction from '@/store/30mw/actions';
import React from 'react'
import { Node } from 'reactflow';

type Props = {}

const useNodesAndEdges = () => {
  const { nodes, setNodes ,edges , setEdges } = useAction();
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
  return {
    UpdateValue,
    getValue
  }
}

export default useNodesAndEdges