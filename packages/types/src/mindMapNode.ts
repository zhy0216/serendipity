export interface Reference {
  name: string;
  url: string;
}

export interface Connection {
  nodeName: string;
  connection: string;
  insight: string;
  explorationMethod: string;
  references: Reference[];
}

export interface MindMapData {
  centerNode: string;
  connections: Connection[];
}

export type { MindMapData as default }