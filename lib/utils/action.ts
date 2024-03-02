import { Action } from '@/store/30mw/actions'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Edge, Node } from 'reactflow'

type Props = {}

function useRunAction() {
  const router = useRouter()
  const fire = (action:Action)=>{
    const _nodes = JSON.parse(action.nodes as any) as Node[]
    const _edges = JSON.parse(action.edges as any) as Edge[]
    FireNode({edges:_edges,nodes:_nodes,node:_nodes.find((node)=>node.id === "Node : start") as Node})
    console.log({_edges,_nodes})
  }



  const FireNode = ({node,nodes,edges}:{node:Node , nodes:Node[] , edges:Edge[]}):any =>{
    const nextNode = getNode(edges.find((edge)=>edge.target === node.id)?.source as string,nodes)
    
    
    
    /// if node == start
    if(node.type === "start" && nextNode) return FireNode({node:nextNode,nodes,edges})

    if(node.type === "whatsapp") return window.open(`https://wa.me/${node.data["phone number"]}?text=${node.data.message}`)

    console.log(nextNode)
  }




  return fire
}








const getNode = (id:string,nodes:Node[])=>{
  return nodes.find((node)=>node.id === id)
}
export default useRunAction