import { JSONParser } from '@streamparser/json';
import type { MapNode } from '@serendipity/types';

export async function* createMindMapStream(
  keyword: string,
): AsyncGenerator<MapNode> {
  
  const parser = new JSONParser({
    emitPartialTokens: true,
    emitPartialValues: true,
    paths: ['$.nodes.*'] // Parse individual nodes in the array
  });
  
  // Create a queue to store parsed nodes
  const nodeQueue: MapNode[] = [];
  
  // Set up parser callbacks
  parser.onValue = ({ value }) => {
    nodeQueue.push(value as unknown as MapNode);
  };
  
  // Create EventSource for SSE
  const eventSource = new EventSource(`/api/mindMap?keyword=${encodeURIComponent(keyword)}`);
  
  eventSource.addEventListener('chunk', (event) => {
    try {
      parser.write(event.data);
    } catch (error) {
      console.error('Parser write error:', error);
    }
  });
  
  eventSource.addEventListener('complete', () => {
    eventSource.close();
  });
  
  eventSource.addEventListener('error', (event) => {
    const errorMessage = (event as any).data || 'Stream error';
    console.error('EventSource error:', errorMessage);
    eventSource.close();
  });
  
  eventSource.onerror = () => {
    console.error('EventSource connection failed');
    eventSource.close();
  };
}

/**
 * Helper function to check if a MapNode object is complete
 * @param obj - The object to check
 * @returns boolean indicating if the node has all required properties
 */
export function isCompleteMapNode(obj: any): boolean {
  return !!(obj && 
         typeof obj === 'object' &&
         obj.nodeName && 
         obj.connection && 
         obj.insight && 
         obj.explorationMethods && 
         obj.references);
}
