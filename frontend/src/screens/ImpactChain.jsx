import React, { useMemo, useState } from 'react';
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
import { ShieldAlert, ShieldCheck, ArrowRight, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export default function ImpactChain() {
  const { impactChain, activeIntervention, setActiveScreen } = useSimulation();
  const [showHowItSpreads, setShowHowItSpreads] = useState(false);

  const isProtected = activeIntervention === 'OPTION_A' || activeIntervention === 'OPTION_C';

  const nodeTypes = useMemo(() => ({
    customFinancialNode: CustomFinancialNode
  }), []);

  const [nodes, setNodes, onNodesChange] = useNodesState(impactChain.nodes || []);
  const [edges, setEdges, onEdgesChange] = useEdgesState(impactChain.edges || []);

  React.useEffect(() => {
    if (impactChain.nodes) setNodes(impactChain.nodes);
    if (impactChain.edges) setEdges(impactChain.edges);
  }, [impactChain, setNodes, setEdges]);

  return (
    <div className="relative w-full h-[calc(100vh-140px)] bg-slate-50 overflow-hidden flex flex-col font-sans">
      {/* 1. TOP STATUS BAR (PLAIN BUSINESS LANGUAGE) */}
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
              <h2 className="text-sm sm:text-base font-extrabold text-slate-900">
                WHAT HAPPENS NEXT: HOW THE PROBLEM SPREADS
              </h2>
              <span className="text-[10px] px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 font-bold">
                02 Trace • “Here’s what it could break.”
              </span>
            </div>
            <p className="text-xs text-slate-600">
              Late payment → Cash gap → Supplier pressure → Inventory impact → Orders at risk → Revenue exposed
            </p>
          </div>
        </div>

        {/* Right: Summary & Best Action CTA */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowHowItSpreads(!showHowItSpreads)}
            className="hidden lg:inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800 cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{showHowItSpreads ? 'Hide Details' : 'Why? / Details'}</span>
            {showHowItSpreads ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          <div className="text-right">
            <span className="text-[10px] font-semibold text-slate-500 block uppercase">
              {isProtected ? 'Revenue Protected' : 'Orders at Risk (Revenue Exposed)'}
            </span>
            <span className={`text-lg font-black font-mono tracking-tight ${
              isProtected ? 'text-emerald-600' : 'text-rose-600'
            }`}>
              {isProtected ? '₹31.0L (100% Protected in This Scenario)' : '₹31.0L Exposed'}
            </span>
          </div>

          <button
            onClick={() => setActiveScreen(SCREENS.INTERVENTIONS)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-all shrink-0 cursor-pointer"
          >
            <span>Compare Best Actions</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Expandable Details Bar */}
      {showHowItSpreads && (
        <div className="z-10 px-6 py-2.5 bg-blue-50/80 border-b border-blue-200 text-xs font-mono text-slate-700 flex flex-wrap items-center justify-between gap-2">
          <span><strong>Step-by-Step Math:</strong> ₹24.0L delayed (+21d) → Cash drops to ₹6.6L (Oct 14) → ₹12.0L Supplier X bill unpaid → 300kg raw material held (+16d) → 12-day stockout → ₹31.0L orders at risk.</span>
          <span className="text-blue-700 font-semibold">Click any card below to inspect its exact formula</span>
        </div>
      )}

      {/* 2. INTERACTIVE REACT FLOW CANVAS */}
      <div className="relative flex-1 w-full h-full bg-slate-50">
        <div className="absolute top-3 left-4 z-10 px-3 py-1 rounded-full bg-white/90 backdrop-blur border border-slate-200 text-[11px] font-medium text-slate-600 shadow-2xs">
          💡 Click any card to view its plain explanation and underlying math
        </div>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.03 }}
          minZoom={0.25}
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
