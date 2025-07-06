import { JSONParser } from '@streamparser/json';
import type { MapNode } from '@serendipity/types';

export async function* createMindMapStream(
  keyword: string
): AsyncGenerator<MapNode> {
  const parser = new JSONParser({
    emitPartialTokens: true,
    emitPartialValues: true,
    paths: ['$.nodes.*'], // Parse individual nodes in the array
  });

  // Create a queue to store parsed nodes
  const nodeQueue: MapNode[] = [];
  let isStreamComplete = false;
  let hasError = false;
  let resolveNext: (() => void) | null = null;

  // Set up parser callbacks
  parser.onValue = ({ value }) => {
    if (isCompleteMapNode(value)) {
      nodeQueue.push(value as unknown as MapNode);
    }
    // Notify waiting generator that new data is available
    if (resolveNext) {
      resolveNext();
      resolveNext = null;
    }
  };

  // Create EventSource for SSE
  const eventSource = new EventSource(
    `/api/mindMap?keyword=${encodeURIComponent(keyword)}`
  );

  eventSource.addEventListener('chunk', (event) => {
    try {
      parser.write(event.data);
    } catch (error) {
      console.error('Parser write error:', error);
      hasError = true;
    }
  });

  eventSource.addEventListener('complete', () => {
    isStreamComplete = true;
    eventSource.close();
    // Notify waiting generator that stream is complete
    if (resolveNext) {
      resolveNext();
      resolveNext = null;
    }
  });

  eventSource.addEventListener('error', (event) => {
    const errorMessage = (event as any).data || 'Stream error';
    console.error('EventSource error:', errorMessage);
    hasError = true;
    eventSource.close();
  });

  eventSource.onerror = () => {
    console.error('EventSource connection failed');
    hasError = true;
    eventSource.close();
  };

  // Elegantly yield nodes from the queue using event-driven approach
  let yieldedCount = 0;

  // Helper function to wait for next data or completion
  const waitForNext = (): Promise<void> => {
    return new Promise((resolve) => {
      resolveNext = resolve;
    });
  };

  // Event-driven yielding loop
  while (!hasError) {
    // Yield all available nodes
    while (yieldedCount < nodeQueue.length) {
      yield nodeQueue[yieldedCount];
      yieldedCount++;
    }

    // If stream is complete and all nodes yielded, break
    if (isStreamComplete && yieldedCount >= nodeQueue.length) {
      break;
    }

    // Wait for next event (new node or completion)
    await waitForNext();
  }

  // Clean up
  if (eventSource.readyState !== EventSource.CLOSED) {
    eventSource.close();
  }

  if (hasError) {
    throw new Error('Stream encountered an error');
  }
}

/**
 * Helper function to check if a MapNode object is complete
 * @param obj - The object to check
 * @returns boolean indicating if the node has all required properties
 */
export function isCompleteMapNode(obj: any): boolean {
  return !!(
    obj &&
    typeof obj === 'object' &&
    obj.nodeName &&
    obj.connection &&
    obj.insight &&
    obj.references
  );
}
