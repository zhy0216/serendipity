import { useCallback } from 'react';
import ReactFlow, {
  Node,
  NodeTypes,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  Position,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { MindMapData, Connection } from '@serendipity/types';

interface MindMapNodeData {
  label: string;
  type: 'center' | 'connection';
  connection?: string;
  insight?: string;
  explorationMethod?: string;
  references?: Array<{ name: string; url: string }>;
}

const nodeWidth = 200;
const nodeHeight = 100;
const nodeGapX = 300;
const nodeGapY = 100;

const MindMapNode = ({ data }: { data: MindMapNodeData }) => {
  const isCenter = data.type === 'center';
  
  return (
    <div 
      className={`p-4 rounded-lg border-2 ${
        isCenter 
          ? 'bg-blue-50 border-blue-300' 
          : 'bg-white border-gray-200 hover:border-blue-200'
      } shadow-sm transition-all`}
      style={{
        width: nodeWidth,
        minHeight: nodeHeight,
      }}
    >
      <div className="font-medium text-gray-900 break-words">{data.label}</div>
      {!isCenter && data.connection && (
        <div className="mt-2 text-sm text-gray-600">
          <div className="font-medium">Connection:</div>
          <div className="break-words">{data.connection}</div>
        </div>
      )}
    </div>
  );
};

const nodeTypes: NodeTypes = {
  mindmap: MindMapNode,
};

export const MindMap = ({ data }: { data: MindMapData }) => {
  const { centerNode, connections } = data;

  const initialNodes: Node<MindMapNodeData>[] = [
    {
      id: 'center',
      type: 'mindmap',
      data: { label: centerNode, type: 'center' },
      position: { x: 50, y: 300 },
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
      style: { width: nodeWidth },
    } as Node<MindMapNodeData>,
    ...connections.map((conn: Connection, index: number) => ({
      id: `connection-${index}`,
      type: 'mindmap',
      data: {
        label: conn.nodeName,
        type: 'connection' as const,
        connection: conn.connection,
        insight: conn.insight,
        explorationMethod: conn.explorationMethod,
        references: conn.references,
      },
      position: {
        x: 50 + nodeGapX,
        y: 100 + index * (nodeHeight + nodeGapY),
      },
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
      style: { width: nodeWidth },
    } as Node<MindMapNodeData>)),
  ];

  const initialEdges = connections.map((_: Connection, index: number) => ({
    id: `edge-${index}`,
    source: 'center',
    target: `connection-${index}`,
    type: 'smoothstep',
    label: connections[index].connection,
    labelStyle: { 
      fontSize: 12,
      fill: '#4B5563',
      background: 'white',
      padding: 4,
      borderRadius: 4,
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#9CA3AF',
    },
    style: {
      stroke: '#9CA3AF',
      strokeWidth: 2,
    },
  }));

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: any) => {
      return {
        ...params,
        type: 'smoothstep',
        animated: true,
      };
    },
    []
  );

  return (
    <div className="w-full h-[600px] bg-gray-50 rounded-lg overflow-hidden">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default MindMap;
