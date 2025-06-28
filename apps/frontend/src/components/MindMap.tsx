import { useState, useEffect } from 'react';
import ReactFlow, {
  Node,
  NodeTypes,
  EdgeTypes,
  Controls,
  useNodesState,
  useEdgesState,
  Position,
  MarkerType,
  Handle,
  getStraightPath,
  EdgeProps,
  BaseEdge,
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

// Node dimensions and layout
const nodeWidth = 320;
const nodeHeight = 140;

// Dynamic radius calculation function
const calculateOptimalRadius = (nodeCount: number, nodeW: number, nodeH: number): number => {
  if (nodeCount === 0) return 250;
  
  // Calculate node diagonal (approximate space needed per node)
  const nodeDiagonal = Math.sqrt(nodeW * nodeW + nodeH * nodeH);
  
  // Add some padding between nodes (30% of diagonal)
  const nodeSpacing = nodeDiagonal * 1.3;
  
  // Calculate required radius: circumference = nodeCount * nodeSpacing
  // circumference = 2πr, so r = (nodeCount * nodeSpacing) / (2π)
  const calculatedRadius = (nodeCount * nodeSpacing) / (2 * Math.PI);
  
  // Ensure minimum radius for visual appeal
  const minRadius = Math.max(nodeW, nodeH) * 1.5;
  
  return Math.max(calculatedRadius, minRadius);
};

// Custom straight edge component
const CustomStraightEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  label,
  labelStyle,
}: EdgeProps) => {
  const [edgePath, labelX, labelY] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
      {label && (
        <text
          x={labelX}
          y={labelY}
          style={{
            ...labelStyle,
            textAnchor: 'middle',
            dominantBaseline: 'middle',
          }}
          className="react-flow__edge-text"
        >
          <tspan
            x={labelX}
            dy="0"
            style={{
              fontSize: labelStyle?.fontSize || 12,
              fill: labelStyle?.fill || '#4338CA',
              fontWeight: labelStyle?.fontWeight || 600,
            }}
          >
            {typeof label === 'string' && label.length > 50 ? `${label.slice(0, 50)}...` : label}
          </tspan>
        </text>
      )}
    </>
  );
};

const MindMapNode = ({ data }: { data: MindMapNodeData }) => {
  const isCenter = data.type === 'center';
  
  return (
    <>
      {/* Handles for connections */}
      {isCenter ? (
        <Handle
          type="source"
          position={Position.Bottom}
          id="bottom"
          style={{ background: '#6366F1', width: 10, height: 10 }}
        />
      ) : (
        <Handle
          type="target"
          position={Position.Top}
          id="top"
          style={{ background: '#6366F1', width: 10, height: 10 }}
        />
      )}
      
      <div 
        className={`relative p-5 rounded-2xl border-2 transition-all duration-300 hover:scale-105 flex items-center justify-center ${
          isCenter 
            ? 'bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 border-transparent text-white shadow-2xl'
            : 'bg-gradient-to-br from-white via-blue-50 to-indigo-50 border-indigo-200 hover:border-indigo-300 text-gray-800 shadow-lg hover:shadow-xl'
        }`}
        style={{
          width: nodeWidth,
          minHeight: nodeHeight,
        }}
      >
        {/* Decorative elements */}
        <div className={`absolute top-2 right-2 w-3 h-3 rounded-full ${
          isCenter ? 'bg-white/30' : 'bg-indigo-300'
        }`} />
        <div className={`absolute top-4 right-4 w-2 h-2 rounded-full ${
          isCenter ? 'bg-white/20' : 'bg-indigo-200'
        }`} />
        
        {/* Node content - centered */}
        <div className={isCenter ? "text-center" : "text-left"}>
          {/* Node icon */}
          <div className={`flex items-center ${isCenter ? 'justify-center' : 'justify-start'} mb-2 ${
            isCenter ? 'text-white' : 'text-indigo-600'
          }`}>
            {isCenter ? (
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            
            {/* Node title - inline with icon for connection nodes */}
            {!isCenter && (
              <div className="font-bold text-base break-words leading-tight text-gray-900 flex-1">
                {data.label}
              </div>
            )}
          </div>
          
          {/* Center node title - separate line */}
          {isCenter && (
            <div className="font-bold text-xl break-words leading-tight text-white mb-2">
              {data.label}
            </div>
          )}
          
          {/* Show connection text for connection nodes */}
          {!isCenter && data.connection && (
            <div className="text-xs text-gray-600 mb-2 leading-relaxed">
              {data.connection.slice(0, 120)}...
            </div>
          )}
          
          {/* Show insight for connection nodes */}
          {!isCenter && data.insight && (
            <div className="text-xs text-amber-700 bg-gradient-to-r from-yellow-50 to-amber-50 p-2 rounded border-l-2 border-amber-300">
              💡 {data.insight.slice(0, 100)}...
            </div>
          )}
        </div>
        
        {/* Glow effect for center node */}
        {isCenter && (
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 opacity-20 blur-lg -z-10" />
        )}
      </div>
    </>
  );
};

const nodeTypes: NodeTypes = {
  mindmap: MindMapNode,
};

const edgeTypes: EdgeTypes = {
  straight: CustomStraightEdge,
};

export const MindMap = ({ data }: { data: MindMapData }) => {
  const { centerNode, connections } = data;
  
  // State for hover highlighting
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // Dynamic circular/radial layout calculation
  const optimalRadius = calculateOptimalRadius(connections.length, nodeWidth, nodeHeight);
  
  // Center position - adjust based on radius to ensure all nodes fit in view
  const centerX = Math.max(600, optimalRadius + nodeWidth / 2 + 50);
  const centerY = Math.max(400, optimalRadius + nodeHeight / 2 + 50);
  
  const initialNodes: Node<MindMapNodeData>[] = [
    {
      id: 'center',
      type: 'mindmap',
      data: { label: centerNode, type: 'center' },
      position: { x: centerX - nodeWidth / 2, y: centerY - nodeHeight / 2 },
    } as Node<MindMapNodeData>,
    ...connections.map((conn: Connection, index: number) => {
      // Calculate angle for circular arrangement
      const angle = (index / connections.length) * 2 * Math.PI - Math.PI / 2; // Start from top
      const x = centerX + optimalRadius * Math.cos(angle) - nodeWidth / 2;
      const y = centerY + optimalRadius * Math.sin(angle) - nodeHeight / 2;
      
      return {
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
        position: { x, y },
      } as Node<MindMapNodeData>;
    }),
  ];

  // Create edges with dynamic styling based on hover state
  const createEdges = () => connections.map((conn: Connection, index: number) => {
    const edgeId = `edge-${index}`;
    const targetNodeId = `connection-${index}`;
    const isHighlighted = hoveredNode === 'center' || hoveredNode === targetNodeId;
    const isOtherHovered = hoveredNode !== null && !isHighlighted;
    
    return {
      id: edgeId,
      source: 'center',
      sourceHandle: 'bottom',
      target: targetNodeId,
      targetHandle: 'top',
      type: 'straight',
      animated: isHighlighted,
      label: isHighlighted ? conn.connection : '',
      labelStyle: {
        fontSize: isHighlighted ? 14 : 12,
        fontWeight: 600,
        fill: isHighlighted ? '#1E40AF' : '#4338CA',
        background: isHighlighted ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.8)',
        padding: isHighlighted ? '6px 12px' : '4px 8px',
        borderRadius: '8px',
        border: isHighlighted ? '2px solid #3B82F6' : '1px solid #E0E7FF',
        boxShadow: isHighlighted ? '0 4px 12px rgba(59, 130, 246, 0.3)' : 'none',
      },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: isHighlighted ? '#3B82F6' : '#6366F1',
        width: isHighlighted ? 25 : 20,
        height: isHighlighted ? 25 : 20,
      },
      style: {
        stroke: isHighlighted ? '#3B82F6' : '#6366F1',
        strokeWidth: isHighlighted ? 4 : 2,
        opacity: isOtherHovered ? 0.3 : 1,
        filter: isHighlighted ? 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.4))' : 'none',
      },
    };
  });
  
  const initialEdges = createEdges();

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  
  // Update edges when hover state changes
  useEffect(() => {
    setEdges(createEdges());
  }, [hoveredNode]);
  
  // Handle node hover events
  const onNodeMouseEnter = (_: React.MouseEvent, node: Node) => {
    setHoveredNode(node.id);
  };
  
  const onNodeMouseLeave = () => {
    setHoveredNode(null);
  };

  return (
    <div className="w-full h-[800px] bg-gradient-to-br from-slate-50 to-blue-50 rounded-lg border border-slate-200">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeMouseEnter={onNodeMouseEnter}
        onNodeMouseLeave={onNodeMouseLeave}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        className="rounded-lg"
        defaultViewport={{ x: -centerX / 2, y: -centerY / 2, zoom: 0.6 }}
        minZoom={0.3}
        maxZoom={1.5}
        attributionPosition="bottom-left"
        fitView
        fitViewOptions={{ padding: 0.1 }}
      >
        <Controls 
          className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-lg shadow-lg" 
          showZoom={true}
          showFitView={true}
          showInteractive={false}
        />
      </ReactFlow>
    </div>
  );
};

export default MindMap;
