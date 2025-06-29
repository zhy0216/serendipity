import { create } from 'zustand';
import { MindMapData } from '@serendipity/types';


interface AppState {
  // Mind map data
  mindMapData: MindMapData | null;
  isLoading: boolean;
  error: string | null;
  
  // Search functionality
  searchQuery: string;
  isSearching: boolean;
  
  // Navigation state
  selectedKeyword: string | null;
  
  // Actions
  setMindMapData: (data: MindMapData | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSearchQuery: (query: string) => void;
  setSearching: (searching: boolean) => void;
  setSelectedKeyword: (keyword: string | null) => void;
  
  // Async actions
  loadMindMapData: () => Promise<void>;
}

export const useAppStore = create<AppState>((set, get) => ({
  // Initial state
  mindMapData: null,
  isLoading: false,
  error: null,
  searchQuery: '',
  searchResults: [],
  isSearching: false,
  selectedKeyword: null,
  
  // Actions
  setMindMapData: (data) => set({ mindMapData: data }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSearching: (searching) => set({ isSearching: searching }),
  setSelectedKeyword: (keyword) => set({ selectedKeyword: keyword }),
  
  // Async actions
  loadMindMapData: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch('/1.json');
      if (!response.ok) {
        throw new Error('Failed to load mind map data');
      }
      const data: MindMapData = await response.json();
      set({ mindMapData: data, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        isLoading: false 
      });
    }
  },
  
}));
