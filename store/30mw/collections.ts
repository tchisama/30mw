import { CollectionType } from '@/types/collection';
import {create} from 'zustand';

// Define the type for your store state
interface CollectionState {
  collections: CollectionType[]
  setCollections: (collections: CollectionType[]) => void
  selectedCollection: CollectionType
  setSelectedCollection: (collection: CollectionType) => void
}

// Create your store
const useCollections = create<CollectionState>((set) => ({
  collections: [],
  setCollections: (collections: CollectionType[]) => set({collections}),
  selectedCollection: {} as CollectionType,
  setSelectedCollection: (collection: CollectionType) => set({selectedCollection: collection}),
}));

export default useCollections;
