export interface Reference {
  name: string;
  url: string;
}

export interface MapNode {
  nodeName: string;
  connection: string;
  insight: string;
  explorationMethod: string;
  references: Reference[];
}

export interface MindMapData {
  centerNode: string;
  nodes: MapNode[];
}

export type { MindMapData as default }