import { create } from 'zustand';
import { MindMapData, MapNode } from '@serendipity/types';
import { createMindMapStream } from '../utils/streamingJsonParser';


interface AppState {
  keywords: string[];
  // Mind map data
  mindMapData: MindMapData | null;
  streamingNodes: Map<number, { node: Partial<MapNode>; isComplete: boolean }>;
  isLoading: boolean;
  error: string | null;
  
  // Search functionality
  searchQuery: string;
  isSearching: boolean;
  
  // Navigation state
  selectedKeyword: string | null;
  
  // Actions
  setMindMapData: (data: MindMapData | null) => void;
  addStreamingNode: (index: number, node: Partial<MapNode>, isComplete: boolean) => void;
  clearStreamingNodes: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSearchQuery: (query: string) => void;
  setSearching: (searching: boolean) => void;
  setSelectedKeyword: (keyword: string | null) => void;
  loadMindMapDataStreaming: (keyword: string) => Promise<void>;
}

export const useAppStore = create<AppState>((set, get) => ({
  // Initial state
  mindMapData: null,
  keywords: localStorage.getItem('keywords') ? JSON.parse(localStorage.getItem('keywords') as string) : [],
  streamingNodes: new Map(),
  isLoading: false,
  error: null,
  searchQuery: '',
  isSearching: false,
  selectedKeyword: null,
  
  // Actions
  setMindMapData: (data) => set({ mindMapData: data }),
  addStreamingNode: (index, node, isComplete) => {
    const currentNodes = get().streamingNodes;
    const newNodes = new Map(currentNodes);
    newNodes.set(index, { node, isComplete });
    set({ streamingNodes: newNodes });
  },
  clearStreamingNodes: () => set({ streamingNodes: new Map() }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSearching: (searching) => set({ isSearching: searching }),
  setSelectedKeyword: (keyword) => set({ selectedKeyword: keyword }),
  
  loadMindMapDataStreaming: async (keyword: string) => {
    try {
      set({ isLoading: true, error: null });
      get().clearStreamingNodes();
      
      // Check localStorage first
      const cacheKey = `mindmap_${keyword.toLowerCase().replace(/\s+/g, '_')}`;
      const cachedData = localStorage.getItem(cacheKey);
      
      if (cachedData) {
        try {
          const parsedData: MindMapData = JSON.parse(cachedData);
          // Load cached data immediately
          parsedData.nodes.forEach((node, index) => {
            get().addStreamingNode(index, node, true);
          });
          set({ mindMapData: parsedData, isLoading: false });
          return;
        } catch (parseError) {
          console.warn('Failed to parse cached data, fetching from API:', parseError);
          // Remove corrupted cache
          localStorage.removeItem(cacheKey);
        }
      }
      
      // Fetch from API if no cache or cache is invalid
      let nodeIndex = 0;
      for await (const node of createMindMapStream(keyword)) {
        get().addStreamingNode(nodeIndex, node, true);
        nodeIndex++;
      }
      
      // Convert streaming nodes to final mind map data
      const streamingNodes = get().streamingNodes;
      const nodes = Array.from(streamingNodes.values()).map(item => item.node as MapNode);
      const mindMapData: MindMapData = {
        centerNode: keyword,
        nodes
      };

      const keywords = [...get().keywords];
      keywords.push(keyword);
      
      // Cache the data in localStorage
      try {
        localStorage.setItem(cacheKey, JSON.stringify(mindMapData));
        localStorage.setItem('keywords', JSON.stringify(keywords));
      } catch (storageError) {
        console.warn('Failed to cache data in localStorage:', storageError);
      }
      
      set({ keywords, mindMapData, isLoading: false });
    } catch (error) {
      console.error('Error loading mind map data:', error);
      set({ 
        error: error instanceof Error ? error.message : 'Failed to load mind map data', 
        isLoading: false 
      });
    }
  },
  
}));
