"use client"
import useAction, { Action } from '@/store/30mw/actions';
import React, { useCallback, useEffect, useRef } from 'react'
import ReactFlow, { Background, Connection, Controls, Edge, addEdge, updateEdge, useEdgesState, useNodesState } from 'reactflow'
import Start from '../nodes/Start';
import Whatsapp from '../nodes/Whatsapp';
import { shallow } from 'zustand/shallow';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

import { Button } from '@nextui-org/react';
import DocumentNode from '../nodes/Document';
import StringEmbedding from '../nodes/StringEmbedding';
import Code from '../nodes/Code';
import UpdateDoc from '../nodes/UpdateDoc';
import ActionIcon from '../nodes/Icon';
import Confirm from '../nodes/Confirm';
import HtmlViewer from '../nodes/HtmlViewer';














const nodeTypes = {
    start: Start,
    whatsapp: Whatsapp,
    document: DocumentNode,
    embedding: StringEmbedding,
    code:Code,
    "update document":UpdateDoc,
    "action icon":ActionIcon,
    // confirm:Confirm
    "html viewer":HtmlViewer
}




type Props = {
  action: Action
}

function Playground({action }: Props) {

  const edgeUpdateSuccessful = useRef(true);
  const [nodes, setNodes, onNodesChange] = useNodesState(JSON.parse(action.nodes as any) as any );
  const [edges, setEdges, onEdgesChange] = useEdgesState(JSON.parse(action.edges as any) as any );

  const {nodes: actionNodes, edges: actionEdges, setNodes: setActionNodes, setEdges: setActionEdges} = useAction()



  const onConnect = useCallback((params:any) => setEdges((els) => addEdge(params, els)), [setEdges]);

  const onEdgeUpdateStart = useCallback(() => {
    edgeUpdateSuccessful.current = false;
  }, []);

  const onEdgeUpdate = useCallback((oldEdge:Edge, newConnection:Connection) => {
    edgeUpdateSuccessful.current = true;
    setEdges((els) => updateEdge(oldEdge, newConnection, els));
  }, [setEdges]);

  const onEdgeUpdateEnd = useCallback((_:any, edge:Edge) => {
    if (!edgeUpdateSuccessful.current) {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }

    edgeUpdateSuccessful.current = true;
  }, [setEdges]);




useEffect(() => {
  if (nodes.length > 0 && !isEqual(nodes, actionNodes)) {
    setActionNodes(nodes.map((node) => ({...node, data: { ...actionNodes.find((actionNode) => actionNode.id === node.id)?.data }})));
  }
}, [nodes, setActionNodes]);

useEffect(() => {
    setActionEdges(edges);
}, [edges, setActionEdges]);

// Define isEqual function
function isEqual(obj1:any, obj2:any) {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}


  const AddNode = (nodeType :string)=>{
    const id =  nodeType ==  "start" ? "Node : start" : nodeType == "action icon" ?  "Node : icon" : nodeType == "html viewer" ? "Node : card" : "Node: "+ Math.random().toString()
    if(nodes.length === 0) return setNodes([
      {
        id,
        type: nodeType,
        position: { x: 0, y: 0 },
        data: {},
      }
    ])
    setNodes([
      ...nodes,
      {
        id,
        type: nodeType,
        position: { x: 0, y: 0 },
        data: {},
      },
    ])
  }



  return (
    <ContextMenu >
      <ContextMenuTrigger className='flex-1'>
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            nodeTypes={nodeTypes}
            snapToGrid
            onEdgeUpdate={onEdgeUpdate}
            onEdgeUpdateStart={onEdgeUpdateStart}
            onEdgeUpdateEnd={onEdgeUpdateEnd}
            onConnect={onConnect}
            fitView
          className='border rounded-xl flex-1 bg-slate-50 '>
          <Background gap={12} size={1} />
          <Controls />
        </ReactFlow>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuSub>
          <ContextMenuSubTrigger >Add Node</ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48">
            {
              Object.keys(nodeTypes).map((nodeType) => (
                <ContextMenuItem
                  key={nodeType}
                  onClick={() => {
                    AddNode(nodeType)
                  }}
                >
                  {nodeType}
                </ContextMenuItem>
              ))
            }
          </ContextMenuSubContent>
        </ContextMenuSub>
      </ContextMenuContent>
    </ContextMenu>

  )
}

export default Playground