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
  let streamEnded = false;
  let streamError: Error | null = null;
  
  // Set up parser callbacks
  parser.onValue = ({ value, key, parent, stack, partial }) => {
    // Check if this is a complete node from the nodes array
    if (stack.length === 2 && String(stack[0]) === 'nodes' && typeof stack[1] === 'number') {
      const node = value as unknown as MapNode;
      if (isCompleteMapNode(node)) {
        nodeQueue.push(node);
      }
    }
  };
  
  // Create EventSource for SSE
  const eventSource = new EventSource(`/api/mindMap?keyword=${encodeURIComponent(keyword)}`);
  
  eventSource.addEventListener('chunk', (event) => {
    try {
      parser.write(event.data);
    } catch (error) {
      console.error('Parser write error:', error);
      streamError = error as Error;
    }
  });
  
  eventSource.addEventListener('complete', () => {
    streamEnded = true;
    eventSource.close();
  });
  
  eventSource.addEventListener('error', (event) => {
    const errorMessage = (event as any).data || 'Stream error';
    console.error('EventSource error:', errorMessage);
    streamError = new Error(errorMessage);
    streamEnded = true;
    eventSource.close();
  });
  
  eventSource.onerror = () => {
    console.error('EventSource connection failed');
    streamError = new Error('EventSource connection failed');
    streamEnded = true;
    eventSource.close();
  };
  
  // Yield nodes as they become available
  while (!streamEnded || nodeQueue.length > 0) {
    if (streamError) {
      throw streamError;
    }
    
    if (nodeQueue.length > 0) {
      yield nodeQueue.shift()!;
    } else {
      // Wait a bit before checking again
      await new Promise(resolve => setTimeout(resolve, 50));
    }
  }
  
  // Clean up
  eventSource.close();
}

/**
 * Helper function to check if a MapNode object is complete
 * @param obj - The object to check
 * @returns boolean indicating if the node has all required properties
 */
export function isCompleteMapNode(obj: any): boolean {
  return obj && 
         typeof obj === 'object' &&
         obj.nodeName && 
         obj.connection && 
         obj.insight && 
         obj.explorationMethods && 
         obj.references;
}
