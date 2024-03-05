import { create } from 'zustand';
import {
  Edge,
  Node,
} from 'reactflow';



export type Action = {
  name: string
  icon: string
  nodes: Node[]
  edges: Edge[]
  type: "button" | "value" | "select" | "card"
  id: string
  description: string
  collection: string
}


type RFState = {
  nodes: Node[];
  setNodes: (node: Node[]) => void;
  edges: Edge[];
  setEdges: (edge: Edge[]) => void;

  action: Action | null
  setAction: (action: Action | null) => void

  name: string
  setName: (name: string) => void
  icon: string
  setIcon: (icon: string) => void
  type : "button" | "value" | "select" | "card",
  setType: (type: "button" | "value" | "select" |  "card") => void
};

// this is our useStore hook that we can use in our components to get parts of the store and call actions
const useAction = create<RFState>((set) => ({
  nodes: [],
  setNodes: (nodes: Node[]) => set({ nodes }),
  edges: [],
  setEdges: (edges: Edge[]) => set({ edges }),
  action:null,
  setAction: (action: Action | null) => set({ action }),
  name: '',
  setName: (name: string) => set({ name }),
  icon: '',
  setIcon: (icon: string) => set({ icon }),
  type : "button",
  setType: (type: "button" | "value" | "select" |  "card") => set({ type }),
}));

export default useAction;