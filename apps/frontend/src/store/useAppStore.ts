import { create } from 'zustand';
import { MindMapData, MapNode } from '@serendipity/types';
import { createMindMapStream } from '../utils/streamingJsonParser';


interface AppState {
  keywords: string[];
  keywordsLoading: Record<string, boolean>
  // Mind map data
  mindMapData: MindMapData | null;
  error: string | null;
  
  // Navigation state
  selectedKeyword: string | null;
  
  // Actions
  addMapNode: (node: MapNode) => void;
  addKeyword: (keyword: string) => void;
  hasKeyword: (keyword: string) => boolean;
  removeKeyword: (keyword: string) => void;
  setKeywordsLoading: (keyword: string, loading: boolean) => void;
  setError: (error: string | null) => void;
  setSelectedKeyword: (keyword: string | null) => void;
  loadMindMapDataStreaming: (keyword: string) => Promise<void>;
}

export const useAppStore = create<AppState>((set, get) => ({
  // Initial state
  mindMapData: null,
  keywords: localStorage.getItem('keywords') ? JSON.parse(localStorage.getItem('keywords') as string) : [],
  keywordsLoading: {},
  streamingNodes: new Map(),
  error: null,
  selectedKeyword: null,
  
  // Actions
  addMapNode: (node) => {
    const mindMapData = get().mindMapData;
    if (mindMapData) {
      const nodes = [...mindMapData.nodes];
      nodes.push(node);
      set({ mindMapData: { ...mindMapData, nodes } });
    } else {
      const currentKeyword = get().selectedKeyword ?? "";
      set({ mindMapData: { centerNode: currentKeyword, nodes: [node] } });
    }
  },
  addKeyword: (keyword) => {
    const currentKeywords = get().keywords;
    const newKeywords = [...currentKeywords, keyword];
    set({ keywords: newKeywords });
  },
  hasKeyword: (keyword) => get().keywords.includes(keyword),
  removeKeyword: (keyword) => {
    const currentKeywords = get().keywords;
    const newKeywords = currentKeywords.filter(k => k !== keyword);
    set({ keywords: newKeywords });
  },
  setKeywordsLoading: (keyword: string, loading: boolean) => set({ keywordsLoading: { ...get().keywordsLoading, [keyword]: loading } }),
  setError: (error) => set({ error }),
  setSelectedKeyword: (keyword) => set({ selectedKeyword: keyword }),
  
  loadMindMapDataStreaming: async (keyword: string) => {
    const { setKeywordsLoading, addMapNode } = get()
    try {
      setKeywordsLoading(keyword, true);
      
      // Check localStorage first
      const cacheKey = `mindmap_${keyword.toLowerCase().replace(/\s+/g, '_')}`;
      const cachedData = localStorage.getItem(cacheKey);
      
      if (cachedData) {
        try {
          const parsedData: MindMapData = JSON.parse(cachedData);
          // Load cached data immediately
          parsedData.nodes.forEach((node, index) => {
            addMapNode(node);
          });
          setKeywordsLoading(keyword, false);
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
        addMapNode(node);
        nodeIndex++;
      }
      
      const mindMapData = get().mindMapData;
      const keywords = [...get().keywords];
      keywords.push(keyword);
      
      // Cache the data in localStorage
      try {
        localStorage.setItem(cacheKey, JSON.stringify(mindMapData));
        localStorage.setItem('keywords', JSON.stringify(keywords));
      } catch (storageError) {
        console.warn('Failed to cache data in localStorage:', storageError);
      }
      
      setKeywordsLoading(keyword, false);
    } catch (error) {
      console.error('Error loading mind map data:', error);
      set({ 
        error: error instanceof Error ? error.message : 'Failed to load mind map data', 
      });
      setKeywordsLoading(keyword, false);
    }
  },
  
}));
