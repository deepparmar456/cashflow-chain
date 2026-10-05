import React, { useMemo } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  useNodesState,
  useEdgesState
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useSimulation, SCREENS } from '../context/SimulationContext';
import CustomFinancialNode from '../components/flow/CustomFinancialNode';
import NodeDetailsDrawer from '../components/flow/NodeDetailsDrawer';
import { ShieldAlert, ShieldCheck, ArrowRight, Layers, HelpCircle, Sparkles } from 'lucide-react';

export default function ImpactChain() {
  const { impactChain, activeIntervention, setActiveScreen } = useSimulation();

  const isProtected = activeIntervention === 'OPTION_A' || activeIntervention === 'OPTION_C';
  const isPartial = activeIntervention === 'OPTION_B';

  const nodeTypes = useMemo(() => ({
    customFinancialNode: CustomFinancialNode
  }), []);

  // Sync nodes and edges from simulation context
  const [nodes, setNodes, onNodesChange] = useNodesState(impactChain.nodes || []);
  const [edges, setEdges, onEdgesChange] = useEdgesState(impactChain.edges || []);

  React.useEffect(() => {
    if (impactChain.nodes) setNodes(impactChain.nodes);
    if (impactChain.edges) setEdges(impactChain.edges);
  }, [impactChain, setNodes, setEdges]);

  return (
    <div className="relative w-full h-[calc(100vh-140px)] bg-slate-50 overflow-hidden flex flex-col font-sans">
      {/* 1. HERO TOP STATUS BAR */}
      <div className="z-10 px-6 py-3.5 bg-white/95 backdrop-blur-md border-b border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-3">
          <div className={`flex items-center justify-center w-9 h-9 rounded-xl border ${
            isProtected
              ? 'bg-emerald-50 border-emerald-200 text-emerald-600'
              : 'bg-rose-50 border-rose-200 text-rose-600'
          }`}>
            {isProtected ? <ShieldCheck className="w-5 h-5" /> : <ShieldAlert className="w-5 h-5" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm sm:text-base font-bold text-slate-900">
                IMPACT CHAIN: SECOND-ORDER DEPENDENCY GRAPH
              </h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 font-semibold">
                Interactive DAG
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Click any node card to inspect underlying mathematical derivation and invoice parameters.
            </p>
          </div>
        </div>

        {/* Quick Exposure Summary & Action */}
        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="text-[10px] font-semibold text-slate-500 block uppercase">Systemic Revenue at Stake</span>
            <span className={`text-lg font-black font-mono tracking-tight ${
              isProtected ? 'text-emerald-600' : 'text-rose-600'
            }`}>
              {isProtected ? '₹0.0L (Protected)' : '₹31.0L Exposure'}
            </span>
          </div>

          <button
            onClick={() => setActiveScreen(SCREENS.INTERVENTIONS)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-all shrink-0 cursor-pointer"
          >
            <span>Intervention Simulator</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 2. INTERACTIVE REACT FLOW CANVAS */}
      <div className="relative flex-1 w-full h-full bg-slate-50">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.1 }}
          minZoom={0.3}
          maxZoom={1.5}
          className="bg-slate-50"
          style={{ width: '100%', height: '100%' }}
        >
          <Background color="#cbd5e1" gap={24} size={1} />
          <Controls
            className="!bg-white !border-slate-200 !text-slate-700 !rounded-lg !shadow-sm"
            showInteractive={false}
          />
        </ReactFlow>

        <NodeDetailsDrawer />
      </div>
    </div>
  );
}
