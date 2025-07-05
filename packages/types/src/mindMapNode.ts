export interface MapNode {
  nodeName: string;
  connection: string;
  insight: string;
  explorationMethods: string[];
  references: string[];
}

export interface MindMapData {
  centerNode: string;
  nodes: MapNode[];
}

export type { MindMapData as default };
