
import React from "react";
import { Edge, Handle,Node as NodeType , Position } from "reactflow";
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
} from "@/components/ui/context-menu";
// import NodeType from "../components/Node";
import useAction from "@/store/30mw/actions";
import Node from "../components/Node";
import { cn } from "@/lib/utils";
import Field from "../components/Field";

type Props = {
  id:string,
	data: {
		phoneNumber: string
		message: string
	};
};

const handleStyle = {
	width: 10,
	height: 10,
	borderRadius: 20,
	zIndex: 100,
	backgroundColor: "#333",
};

const Whatsapp = ({ data , id }: Props) => {
	const { nodes, setNodes ,edges } = useAction();



  const UpdateValue = (_id:string,inputName:string,newValue:any)=>{
    setNodes(
      nodes.map((node:NodeType)=>{
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
    console.log(edges)
    return nodes.find((node:NodeType)=>node.id === _id)?.data[inputName]
    
  }



	return (
		<>
			<Handle type="source" style={handleStyle} position={Position.Top}  />
			<Handle
				type="target"
				id="3"
				style={handleStyle}
				position={Position.Bottom}
			/>

			<Node
				header={
					<>
						<h1 className="text-xs font-bold capitalize text-[#36974b]">
							whatsapp 💬
						</h1>
						<h1 className="text-sm ">Send Message </h1>
					</>
				}
			>
        {
          [
          {
            type:"input",
            name:"phone number",
            props:{
              type:"tel"
            }
          },
          {
            type:"textarea",
            name:"message",
          },
          ].map(({type,name,props})=> <Field key={name} type={type} name={name} id={id} props={props} />)
        }
			</Node>
		</>
	);
};

export default Whatsapp;
