"use client"
import useAction from '@/store/30mw/actions';
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














const nodeTypes = {
    start: Start,
    whatsapp: Whatsapp
}




type Props = {}

function Playground({ }: Props) {

  const edgeUpdateSuccessful = useRef(true);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

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
  if (edges.length > 0 && !isEqual(edges, actionEdges)) {
    setActionEdges(edges);
  }
}, [edges, setActionEdges]);

// Define isEqual function
function isEqual(obj1:any, obj2:any) {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}


  const AddNode = (nodeType :string)=>{
    if(nodes.length === 0) return setNodes([
      {
        id: nodeType == "start" ? "Node : start" : "Node: "+ Math.random().toString(),
        type: nodeType,
        position: { x: 0, y: 0 },
        data: {},
      }
    ])
    setNodes([
      ...nodes,
      {
        id: nodeType == "start" ? "Node : start" : "Node: "+ Math.random().toString(),
        type: nodeType,
        position: { x: 0, y: 0 },
        data: {},
      },
    ])
  }



  return (
    <ContextMenu>
      <ContextMenuTrigger>
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

          className='border rounded-xl flex-1 mt-8 bg-slate-50 max-h-[calc(100vh-150px)]'>
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