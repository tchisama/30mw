import {
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Input,
	Textarea,
} from "@nextui-org/react";
import React from "react";
import { useCallback } from "react";
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
				<div className="relative">
					<Input
						value={getValue(id,"phoneNumber") ?? ""}
						onChange={(e)=>{UpdateValue(id,"phoneNumber",e.target.value)}}
            className={cn("nodrag",edges.find((edge:Edge)=>edge.target === id && edge.targetHandle === "phoneNumber" ) ? "opacity-50" : "")}
						size="sm"
						label="phone number"
						placeholder="Enter phone number"
						type="tel"
            disabled={edges.find((edge)=>edge.target === id) ? true : false}
					/>
					<Handle
						type="target"
						style={handleStyle}
						position={Position.Right}
						id="phoneNumber"
					/>
				</div>
				<div className="relative">
					<Textarea
            className={cn("nodrag",edges.find((edge)=>edge.target === id && edge.targetHandle === "message" ) ? "opacity-50" : "")}
						value={getValue(id,"message") ?? ""}
						size="sm"
						label="message"
            disabled={edges.find((edge)=>edge.target === id) ? true : false}

						placeholder="Enter message"
            onChange={(e)=>{UpdateValue(id,"message",e.target.value)}}
					/>
					<Handle
						type="target"
						style={handleStyle}
						position={Position.Right}
						id="message"
					/>
				</div>
			</Node>
		</>
	);
};

export default Whatsapp;
