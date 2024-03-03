import { Action } from '@/store/30mw/actions'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { Edge, Node } from 'reactflow'

type Props = {}

function useRunAction() {
  const router = useRouter()

  // const [nodes,setNodes] = React.useState<Node[]>([])
  // const [edges,setEdges] = React.useState<Edge[]>([])


const fire = ( action:Action,doc:any)=>{

    const _nodes = JSON.parse(action.nodes as any) as Node[]
    const _edges = JSON.parse(action.edges as any) as Edge[]

    const getStart = () => {
      return _nodes.find((e) => e.id == "Node : start");
    };

    FireNode({node:getStart() as Node,nodes:_nodes,edges:_edges,doc})
}



  const getNode = (node:Node, sourceHandle:string, nodes:Node[], edges:Edge[]) => {
    if(!sourceHandle) return 
    if(!edges) return 
    const edge = edges.find((e) => e.target == node.id && e.targetHandle == sourceHandle);
    console.log(edge)
    if(!edge) return
    return nodes.find((n) => n.id == edge.source);
  };

  



  const FireNode = ({node,nodes,edges,doc}:{node:Node , nodes:Node[] , edges:Edge[],doc:any}):any =>{
    const data = {nodes,edges,doc}
    switch (node?.type) {
      case "start":
          FireNode({
            node:getNode(node,"start",nodes,edges) as Node,
            ...data
          })
          break;

      case "whatsapp":
        const phone = getNode(node,"phone number",nodes,edges)
        const message = getNode(node,"message",nodes,edges)
        window.open(`https://wa.me/${
          phone ?
          FireNode({node:phone as Node , ...data})
          : node.data["phone number"]
        }?text=${
          message ?
          encodeURIComponent(FireNode({node:message as Node , ...data}))
          : encodeURIComponent(node.data["message"])
        }`)
        break;
      case "document":
        return getValueFromIndexes(doc,node.data.indexes);

      case "embedding":
        let text = node.data.text
        node.data?.sources?.forEach((sources:{ id:string,name:string })=>{
          const getSourceNode = getNode(node,sources.id,nodes,edges)
          text = text.replace(`{{${sources.name}}}`,FireNode({node:getSourceNode as Node , ...data}))
        })
        return text
      case "code":
        let code = node.data.code
        node.data?.sources?.forEach((sources:{ id:string,name:string })=>{
          const getSourceNode = getNode(node,sources.id,nodes,edges)
          code = code.replace(`${sources.name}`,JSON.stringify(FireNode({node:getSourceNode as Node , ...data})) )
        })
        console.log(code)
        return eval(code)


      default:
        return null
  }
}


  return fire

}


function getValueFromIndexes(obj: any, indexes: string[]): any {
    let currentObj: any | undefined = obj;
    try {
        for (const index of indexes) {
            currentObj = currentObj[index];
        }
        return currentObj;
    } catch (error) {
        return undefined;
    }
}



export default useRunAction