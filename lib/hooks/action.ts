import { Action } from '@/store/30mw/actions'
import { getDoc, getDocs, increment, updateDoc ,collection } from 'firebase/firestore'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { Edge, Node } from 'reactflow'
import {doc as docFirebase} from "firebase/firestore"
import { db } from '@/firebase'
import { getValueFromIndexes } from '../utils/index'
import {  Modal,   ModalContent,   ModalHeader,   ModalBody,   ModalFooter} from "@nextui-org/react";
type Props = {}

function useRunAction() {
  const router = useRouter()
 
  // const [nodes,setNodes] = React.useState<Node[]>([])
  // const [edges,setEdges] = React.useState<Edge[]>([])


const fire = ( action:Action,doc:any,setDoc:any,type?:string)=>{

    const _nodes = JSON.parse(action.nodes as any) as Node[]
    const _edges = JSON.parse(action.edges as any) as Edge[]



    const getStart = () => {
      return _nodes.find((e) => e.id == "Node : start");
    };
    const getIcon = () => {
      return _nodes.find((e) => e.id == "Node : icon");
    }

    if(type=="icon") {
      console.log(getIcon())
      return FireNode({node:getIcon() as Node,nodes:_nodes,edges:_edges,doc,setDoc,action})
    }
    FireNode({node:getStart() as Node,nodes:_nodes,edges:_edges,doc,setDoc,action})
}



  const getNode = (node:Node, sourceHandle:string, nodes:Node[], edges:Edge[]) => {
    if(!sourceHandle) return 
    if(!edges) return 
    const edge = edges.find((e) => e.target == node.id && e.targetHandle == sourceHandle);
    if(!edge) return
    return nodes.find((n) => n.id == edge.source);
  };

  



  const FireNode = ({node,nodes,edges,doc ,setDoc ,action }:{node:Node , nodes:Node[] , edges:Edge[],doc:any,setDoc:Function ,action:Action}):any =>{
    const data = {nodes,edges,doc,setDoc ,action}
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
        FireNode({node:getNode(node,"next",nodes,edges) as Node , ...data})
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

let code =`(()=>{
${node.data?.sources?.map((source:{ id:string,name:string })=>`const ${source.name} = ${JSON.stringify(FireNode({node:getNode(node,source.id,nodes,edges) as Node , ...data}))}`).join("; \n")} ;
return (${node.data.code})
})()
`
        // node.data?.sources?.forEach((sources:{ id:string,name:string })=>{
        //   const getSourceNode = getNode(node,sources.id,nodes,edges)
        //   code = code.replace(`{{${sources.name}}}`,JSON.stringify(FireNode({node:getSourceNode as Node , ...data})) )
        // })
        console.log(code)
        return eval(code)
      case "update document":
        const collValue = FireNode({node:getNode(node,"collection",nodes,edges) as Node , ...data}) ?? node.data["collection"]
        const docIdValue = FireNode({node:getNode(node,"document id",nodes,edges) as Node , ...data}) ?? node.data["document id"]
        const newDocValue= JSON.parse(FireNode({node:getNode(node,"new updated fields",nodes,edges) as Node , ...data}) ?? node.data["new updated fields"])
        console.log(newDocValue)
        if(!collValue || !docIdValue || !newDocValue) return
        try {
          updateDoc(docFirebase(
            db,
            collValue,
            docIdValue,
          ),
          newDocValue).then(()=>{
            // window.location.reload()
          //   // console.log(doc,newDocValue)
            setDoc({
              ...doc as any,
              ...newDocValue
            })
          })
        } catch (error) {
          console.log(error)
          return 
        }
        FireNode({node:getNode(node,"next",nodes,edges) as Node , ...data})
        break;
      case "action icon":
        const icon = FireNode({node:getNode(node,"icon",nodes,edges) as Node , ...data}) ?? node.data["icon"]
        return icon

      case "confirm":
        // const confirmed = FireNode({node:getNode(node,"true",nodes,edges) as Node , ...data}) 
        // const canceled = FireNode({node:getNode(node,"true",nodes,edges) as Node , ...data}) 
        
      default:
        return null
  }
}


  return fire

}








const updateDocument = (collection:string,document:string,newValue:any)=>{
  updateDoc(docFirebase(db,collection,document),{
    ...newValue
  })
}
const getDocument = async (collection:string,document:string,newValue:any)=>{
  return await getDoc(docFirebase(db,collection,document)).then((doc)=>{
    return ({
      ...doc.data(),
      id:doc.id
    })
  })
}

const getDocuments = async (coll:string)=>{
  return await getDocs(collection(db,coll)).then((docs)=>{
    return docs.docs.map((doc)=>{
      return ({
        ...doc.data(),
        id:doc.id
      })
    })
  })
}





// components 

























export default useRunAction