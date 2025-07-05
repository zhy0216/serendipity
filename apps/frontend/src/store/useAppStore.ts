import { create } from 'zustand';
import { MindMapData, MapNode } from '@serendipity/types';
import { createMindMapStream } from '../utils/streamingJsonParser';


interface AppState {
  keywords: string[];
  keywordsLoading: Record<string, boolean>
  // Mind map data
  mindMapDataRecord: Record<string, MindMapData>;
  error: string | null;
  
  // Navigation state
  selectedKeyword: string | null;
  
  // Actions
  addMapNode: (keyword: string, node: MapNode) => void;
  addKeyword: (keyword: string) => void;
  hasKeyword: (keyword: string) => boolean;
  removeKeyword: (keyword: string) => void;
  setKeywordsLoading: (keyword: string, loading: boolean) => void;
  setError: (error: string | null) => void;
  setSelectedKeyword: (keyword: string) => void;
  loadMindMapDataStreaming: (keyword: string) => Promise<void>;
}

export const useAppStore = create<AppState>((set, get) => ({
  // Initial state
  mindMapDataRecord: {},
  keywords: localStorage.getItem('keywords') ? JSON.parse(localStorage.getItem('keywords') as string) : [],
  keywordsLoading: {},
  streamingNodes: new Map(),
  error: null,
  selectedKeyword: null,
  
  // Actions
  addMapNode: (keyword: string, node: MapNode) => {
    const mindMapDataRecord = get().mindMapDataRecord;
    const mindMapData = mindMapDataRecord[keyword];
    if (mindMapData) {
      const nodes = [...mindMapData.nodes];
      nodes.push(node);
      set({ mindMapDataRecord: { ...mindMapDataRecord, [keyword]: { ...mindMapData, nodes } } });
    } else {
      const currentKeyword = get().selectedKeyword ?? "";
      set({ mindMapDataRecord: { ...mindMapDataRecord, [keyword]: { centerNode: currentKeyword, nodes: [node] } } });
    }
  },
  addKeyword: (keyword) => {
    const currentKeywords = get().keywords;
    if (currentKeywords.includes(keyword)) {
      return;
    }
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
  setSelectedKeyword: (keyword) => {
    set({ selectedKeyword: keyword })
    get().addKeyword(keyword);
  },
  
  loadMindMapDataStreaming: async (keyword: string) => {
    const { setKeywordsLoading, keywordsLoading, addMapNode, mindMapDataRecord } = get()
    
    try {
      // Check localStorage first
      const cacheKey = `mindmap_${keyword.toLowerCase().replace(/\s+/g, '_')}`;
      const cachedData = localStorage.getItem(cacheKey);
      
      if (cachedData) {
        try {
          const parsedData: MindMapData = JSON.parse(cachedData);
          // Load cached data immediately
          parsedData.nodes.forEach((node, index) => {
            addMapNode(keyword, node);
          });
          setKeywordsLoading(keyword, false);
          return;
        } catch (parseError) {
          console.warn('Failed to parse cached data, fetching from API:', parseError);
          // Remove corrupted cache
          localStorage.removeItem(cacheKey);
        }
      }

      if(keywordsLoading[keyword]) {
        return;
      }
      setKeywordsLoading(keyword, true);
      // Fetch from API if no cache or cache is invalid
      let nodeIndex = 0;
      for await (const node of createMindMapStream(keyword)) {
        addMapNode(keyword, node);
        nodeIndex++;
      }
      
      const mindMapData = mindMapDataRecord[keyword];
      const keywords = [...get().keywords];
      if(!keywords.includes(keyword)) {
        keywords.push(keyword);
      }
      
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
