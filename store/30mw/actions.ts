import { create } from 'zustand';
import {
  Edge,
  Node,
} from 'reactflow';




type RFState = {
  nodes: Node[];
  setNodes: (node: Node[]) => void;
  edges: Edge[];
  setEdges: (edge: Edge[]) => void;

};

// this is our useStore hook that we can use in our components to get parts of the store and call actions
const useAction = create<RFState>((set) => ({
  nodes: [],
  setNodes: (nodes: Node[]) => set({ nodes }),
  edges: [],
  setEdges: (edges: Edge[]) => set({ edges }),
}));

export default useAction;