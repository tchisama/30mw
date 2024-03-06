
import React from "react";
import { Edge, Handle,Node as NodeType , Position } from "reactflow";
import useAction from "@/store/30mw/actions";
import Node from "../components/Node";
import { Button, Select, SelectItem } from "@nextui-org/react";
import useCollections from "@/store/30mw/collections";
import { Field } from "@/types/collection";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import useNodesAndEdges from "../hooks/useNodesAndEdges";

type Props = {
  id:string,
	data: {
		indexes: (string | number)[]
	};
};

const handleStyle = {
	width: 10,
	height: 10,
	borderRadius: 20,
	zIndex: 100,
	backgroundColor: "#333",
};

const DocumentNode = ({ data , id }: Props) => {
	const { nodes, setNodes ,edges ,action } = useAction();
	const {collections} = useCollections()
  const {getValue,UpdateValue} = useNodesAndEdges()


	return (
		action && collections &&
		<>
			<Handle type="source" style={handleStyle} position={Position.Left}  />
			<Node
				header={
					<>
						<h1 className="text-xs font-bold capitalize text-[#36974b]">
							Document 📄
						</h1>
						{/* <h1 className="text-sm ">Get Field Value </h1> */}
					</>
				}
			>


				<DropdownMenu>
					<DropdownMenuTrigger>
						<div className="text-sm text-left bg-slate-100 px-4 py-2 rounded-xl border ">
							{(getValue(id,"indexes")??[" select field "]).join(" / ")}
						</div>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
    {collections
      .find((collection) => collection.id === action.collection)
      ?.structure.concat([
        {
          name: "id"
        },
        {
          name: "_30mw_createdAt"
        },
        {
          name: "_30mw_updatedAt"
        }
      ] as Field[]).map((field: Field) => {
        // if(field.type === "array") return null

        const getFields = (f: Field,indexes:(string | number)[]): JSX.Element | null => {
          return f.type === "object" ? (
            <DropdownMenuSub key={f.name}>
              <DropdownMenuSubTrigger>{f.name}</DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  {f.structure.map((f2: Field) => {
                    return getFields(f2,[...indexes,f2.name]);
                  })}
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          ) : (
            <DropdownMenuItem
              onClick={() => {
                UpdateValue(id, "indexes", indexes);
              }}
              key={f.name}
            >
              {f.name}
            </DropdownMenuItem>
          );
        };

        return getFields(field,[field.name]);
      })}
					</DropdownMenuContent>
				</DropdownMenu>

			</Node>
		</>
	);
};

export default DocumentNode;
