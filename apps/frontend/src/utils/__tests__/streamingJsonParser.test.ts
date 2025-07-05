import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createMindMapStream, isCompleteMapNode } from '../streamingJsonParser';
import type { MapNode } from '@serendipity/types';

// Mock EventSource
class MockEventSource {
  public url: string;
  public onmessage: ((event: MessageEvent) => void) | null = null;
  public onerror: ((event: Event) => void) | null = null;
  public onopen: ((event: Event) => void) | null = null;
  public readyState: number = 1;
  public CONNECTING = 0;
  public OPEN = 1;
  public CLOSED = 2;

  private listeners: { [key: string]: ((event: Event) => void)[] } = {};

  constructor(url: string) {
    this.url = url;
  }

  addEventListener(type: string, listener: (event: Event) => void) {
    if (!this.listeners[type]) {
      this.listeners[type] = [];
    }
    this.listeners[type].push(listener);
  }

  removeEventListener(type: string, listener: (event: Event) => void) {
    if (this.listeners[type]) {
      this.listeners[type] = this.listeners[type].filter((l) => l !== listener);
    }
  }

  dispatchEvent(event: Event): boolean {
    const type = event.type;
    if (this.listeners[type]) {
      this.listeners[type].forEach((listener) => listener(event));
    }
    return true;
  }

  close() {
    this.readyState = this.CLOSED;
  }

  // Helper method to simulate streaming data
  simulateChunk(data: string) {
    const event = new CustomEvent('chunk', { detail: data }) as any;
    event.data = data;
    this.dispatchEvent(event);
  }

  simulateComplete() {
    const event = new CustomEvent('complete');
    this.dispatchEvent(event);
  }

  simulateError(errorData?: string) {
    const event = new CustomEvent('error') as any;
    if (errorData) {
      event.data = errorData;
    }
    this.dispatchEvent(event);
  }
}

// Mock the global EventSource
const originalEventSource = global.EventSource;
let mockEventSourceSpy: any;

beforeEach(() => {
  mockEventSourceSpy = vi
    .fn()
    .mockImplementation((url: string) => new MockEventSource(url));
  global.EventSource = mockEventSourceSpy;
});

afterEach(() => {
  global.EventSource = originalEventSource;
  vi.clearAllMocks();
});

describe.skip('streamingJsonParser', () => {
  describe('isCompleteMapNode', () => {
    it('should return true for a complete MapNode', () => {
      const completeNode: MapNode = {
        nodeName: 'Test Node',
        connection: 'Test connection',
        insight: 'Test insight',
        explorationMethods: ['method1', 'method2'],
        references: ['ref1', 'ref2'],
      };

      expect(isCompleteMapNode(completeNode)).toBe(true);
    });

    it('should return true when all required fields are present with correct types', () => {
      const validNode = {
        nodeName: 'Valid Node',
        connection: 'Valid connection',
        insight: 'Valid insight',
        explorationMethods: [],
        references: [],
      };

      expect(isCompleteMapNode(validNode)).toBe(true);
    });
  });

  describe('createMindMapStream', () => {
    it('should create EventSource with correct URL', async () => {
      const keyword = 'test keyword';
      const generator = createMindMapStream(keyword);

      const iterator = generator[Symbol.asyncIterator]();
      // Start the generator execution
      try {
        await iterator.next();
      } catch (error) {
        // Expected to fail since we're mocking EventSource
      }

      expect(mockEventSourceSpy).toHaveBeenCalledWith(
        `/api/mindMap?keyword=${encodeURIComponent(keyword)}`
      );
    });

    it('should handle URL encoding properly', async () => {
      const keyword = 'test with spaces & symbols';
      const generator = createMindMapStream(keyword);

      const iterator = generator[Symbol.asyncIterator]();
      // Start the generator execution
      try {
        await iterator.next();
      } catch (error) {
        // Expected to fail since we're mocking EventSource
      }

      expect(mockEventSourceSpy).toHaveBeenCalledWith(
        `/api/mindMap?keyword=${encodeURIComponent(keyword)}`
      );
    });
  });
});
