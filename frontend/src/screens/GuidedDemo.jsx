import React, { useMemo, useState, useEffect } from 'react';
import { useSimulation, SCREENS, GUIDED_STAGES } from '../context/SimulationContext';
import {
  ReactFlow,
  Background,
  Controls,
  useNodesState,
  useEdgesState
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import CustomFinancialNode from '../components/flow/CustomFinancialNode';
import NodeDetailsDrawer from '../components/flow/NodeDetailsDrawer';
import {
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  X,
  Play,
  CheckCircle2,
  AlertTriangle,
  TrendingDown,
  TrendingUp,
  Layers,
  Calculator,
  ShieldCheck,
  ShieldAlert,
  Award,
  Zap,
  DollarSign,
  Clock,
  Sparkles
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine, CartesianGrid
} from 'recharts';

export default function GuidedDemo() {
  const {
    guidedStep,
    setGuidedStep,
    nextGuidedStep,
    prevGuidedStep,
    resetGuidedDemo,
    exitGuidedDemo,
    activeIntervention,
    applyIntervention,
    customerRisk,
    impactChain,
    interventionsData,
    metrics,
    timeline
  } = useSimulation();

  const nodeTypes = useMemo(() => ({
    customFinancialNode: CustomFinancialNode
  }), []);

  const [nodes, setNodes, onNodesChange] = useNodesState(impactChain.nodes || []);
  const [edges, setEdges, onEdgesChange] = useEdgesState(impactChain.edges || []);

  useEffect(() => {
    if (impactChain.nodes) setNodes(impactChain.nodes);
    if (impactChain.edges) setEdges(impactChain.edges);
  }, [impactChain, setNodes, setEdges]);

  const focalCustomer = customerRisk?.name || 'ABC Industries';
  const focalOutstanding = customerRisk?.outstanding_formatted || '₹24.0L';
  const predictedDelay = customerRisk?.predicted_delay_days || 21;
  const confidence = customerRisk?.confidence_formatted || '87%';
  const invoices = customerRisk?.historical_invoices || customerRisk?.invoices || [];

  return (
    <div className="min-h-[calc(100vh-65px)] bg-slate-50 text-slate-900 flex flex-col">
      {/* 1. TOP PROGRESS NAVIGATION BAR */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-slate-200 shadow-xs">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Progress Steps */}
          <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto w-full sm:w-auto">
            {GUIDED_STAGES.map((stg) => {
              const isActive = guidedStep === stg.id;
              const isPast = guidedStep > stg.id;
              return (
                <button
                  key={stg.id}
                  onClick={() => setGuidedStep(stg.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-xs'
                      : isPast
                      ? 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                      : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${
                    isActive
                      ? 'bg-white text-blue-600'
                      : isPast
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-200 text-slate-600'
                  }`}>
                    {isPast ? '✓' : stg.id}
                  </span>
                  <span>{stg.title}</span>
                </button>
              );
            })}
          </div>

          {/* Stepper Controls */}
          <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
            <button
              onClick={resetGuidedDemo}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer"
              title="Restart Demo from Step 1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Restart</span>
            </button>

            <button
              onClick={prevGuidedStep}
              disabled={guidedStep === 1}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-100 border border-slate-200 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>

            <button
              onClick={nextGuidedStep}
              disabled={guidedStep === 5}
              className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-xs disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
            >
              <span>Next</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => exitGuidedDemo(SCREENS.COMMAND_CENTER)}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-500 hover:text-slate-800 hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer"
              title="Exit to Platform"
            >
              <X className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Explore Platform</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. DYNAMIC CHAPTER CONTENT */}
      <main className="flex-1 max-w-[1400px] w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col">
        {/* ============================================================ */}
        {/* CHAPTER 1: PREDICT                                           */}
        {/* ============================================================ */}
        {guidedStep === 1 && (
          <div className="space-y-8 animate-in fade-in duration-200 max-w-5xl mx-auto w-full">
            {/* Header */}
            <div className="space-y-2 text-center sm:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200">
                <span>STAGE 01</span>
                <span>•</span>
                <span>EARLY PREDICTION</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                One customer starts paying later.
              </h2>
              <p className="text-base text-slate-600 max-w-2xl">
                {focalCustomer}&apos;s recent settlement behaviour reveals an escalating payment delay trend.
              </p>
            </div>

            {/* Account Card & Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Customer</span>
                <div className="mt-1 text-xl font-bold text-slate-900 truncate">{focalCustomer}</div>
                <span className="text-xs text-blue-600 font-mono mt-0.5 block">Tier-1 Strategic Buyer</span>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Receivable Balance</span>
                <div className="mt-1 text-2xl font-bold font-mono text-slate-900">{focalOutstanding}</div>
                <span className="text-xs text-slate-500 font-mono mt-0.5 block">Due: 08 Oct 2026</span>
              </div>

              <div className="p-5 rounded-2xl bg-rose-50 border border-rose-200 shadow-xs">
                <span className="text-xs font-semibold text-rose-700 uppercase tracking-wider block">Predicted Delay</span>
                <div className="mt-1 text-3xl font-extrabold font-mono text-rose-600">+{predictedDelay} Days</div>
                <span className="text-xs text-rose-700 font-mono mt-0.5 block">Est. Pay: 29 Oct 2026</span>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Model Confidence</span>
                <div className="mt-1 text-2xl font-bold font-mono text-blue-600">{confidence}</div>
                <span className="text-xs text-slate-500 font-mono mt-0.5 block">Linear Delay Trend Model</span>
              </div>
            </div>

            {/* Historical Payment Escalation Visual */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                    Payment Escalation Pattern (Last 4 Cycles)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Delay regression: <code className="text-blue-600 bg-slate-100 px-1.5 py-0.5 rounded font-mono">Delay(t) = 5.0·t + 1.0</code> (+5 days per period)
                  </p>
                </div>
                <span className="text-xs font-mono font-semibold text-rose-700 bg-rose-50 px-2.5 py-1 rounded border border-rose-200 self-start sm:self-auto">
                  Deteriorating Trend: 6d → 11d → 16d → 21d
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                  <span className="text-xs text-slate-500 font-medium block">Period 1 (July)</span>
                  <div className="text-lg font-bold font-mono text-slate-800 mt-1">+6 Days</div>
                  <span className="text-[11px] text-emerald-700 font-medium">Settled</span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                  <span className="text-xs text-slate-500 font-medium block">Period 2 (August)</span>
                  <div className="text-lg font-bold font-mono text-slate-800 mt-1">+11 Days</div>
                  <span className="text-[11px] text-emerald-700 font-medium">Settled</span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                  <span className="text-xs text-slate-500 font-medium block">Period 3 (September)</span>
                  <div className="text-lg font-bold font-mono text-slate-800 mt-1">+16 Days</div>
                  <span className="text-[11px] text-emerald-700 font-medium">Settled</span>
                </div>

                <div className="p-3.5 rounded-xl bg-rose-50 border-2 border-rose-300 text-center">
                  <span className="text-xs text-rose-800 font-semibold block">Period 4 (October)</span>
                  <div className="text-xl font-extrabold font-mono text-rose-600 mt-1">+{predictedDelay} Days</div>
                  <span className="text-[11px] text-rose-700 font-bold uppercase tracking-wider">Projected Shock</span>
                </div>
              </div>
            </div>

            {/* The Climax Thought & Stage CTA */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-50 via-slate-50 to-amber-50 border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                  The Critical Insight
                </span>
                <p className="text-base font-bold text-slate-900">
                  &ldquo;The late payment itself isn&apos;t the biggest problem. What breaks next is.&rdquo;
                </p>
                <p className="text-xs text-slate-600">
                  Now trace how this 21-day delay cascades through the cash buffer, supplier payables, and production floor.
                </p>
              </div>

              <button
                onClick={() => setGuidedStep(2)}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all shrink-0 cursor-pointer"
              >
                <span>TRACE THE IMPACT</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* CHAPTER 2: TRACE (THE 6-NODE HERO GRAPH)                     */}
        {/* ============================================================ */}
        {guidedStep === 2 && (
          <div className="space-y-4 animate-in fade-in duration-200 flex-1 flex flex-col">
            {/* Header Row */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200">
                  <span>STAGE 02</span>
                  <span>•</span>
                  <span>DEPENDENCY CASCADE</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
                  One delayed payment. Six downstream consequences.
                </h2>
                <p className="text-sm text-slate-600">
                  CashFlow Chain doesn&apos;t stop at identifying the late payment. It follows the dependency chain to determine what that delay breaks next.
                </p>
              </div>

              <button
                onClick={() => setGuidedStep(3)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all self-start md:self-auto cursor-pointer shrink-0"
              >
                <span>SIMULATE A RESPONSE</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Quick 6-Node Flow Legend */}
            <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 font-mono">
                <span className="font-bold text-slate-900">THE 6 HOPS:</span>
                <span className="text-rose-600 font-semibold">1. ABC Industries (₹24L delay)</span>
                <span>→</span>
                <span className="text-amber-600 font-semibold">2. Cash Buffer (&lt; ₹15L floor)</span>
                <span>→</span>
                <span className="text-rose-600 font-semibold">3. Supplier X (₹12L hold)</span>
                <span>→</span>
                <span className="text-amber-600 font-semibold">4. Raw Material (frozen)</span>
                <span>→</span>
                <span className="text-rose-600 font-semibold">5. Inventory (12d stockout)</span>
                <span>→</span>
                <span className="text-rose-700 font-bold">6. Revenue (₹31L canceled)</span>
              </div>
              <span className="text-slate-400 font-mono text-[11px]">Click any node card for ledger proof</span>
            </div>

            {/* Embedded Live React Flow Canvas */}
            <div className="relative w-full h-[520px] min-h-[520px] rounded-2xl border-2 border-slate-200 bg-white overflow-hidden shadow-sm">
              <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                nodeTypes={nodeTypes}
                fitView
                fitViewOptions={{ padding: 0.12 }}
                minZoom={0.3}
                maxZoom={1.5}
                className="bg-slate-50"
                style={{ width: '100%', height: '100%' }}
              >
                <Background color="#cbd5e1" gap={20} size={1} />
                <Controls
                  className="!bg-white !border-slate-200 !text-slate-700 !rounded-lg !shadow-sm"
                  showInteractive={false}
                />
              </ReactFlow>
              <NodeDetailsDrawer />
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* CHAPTER 3: SIMULATE (TEST THE AVAILABLE RESPONSES)           */}
        {/* ============================================================ */}
        {guidedStep === 3 && (
          <div className="space-y-6 animate-in fade-in duration-200 max-w-5xl mx-auto w-full">
            {/* Header */}
            <div className="space-y-2 text-center sm:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200">
                <span>STAGE 03</span>
                <span>•</span>
                <span>PRESCRIBED INTERVENTIONS</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Now test the available responses.
              </h2>
              <p className="text-base text-slate-600 max-w-2xl">
                CashFlow Chain evaluates the mathematical cost-benefit of every operational countermeasure and recommends the lowest-cost intervention that protects 100% of revenue.
              </p>
            </div>

            {/* Objective Function Formulation Callout */}
            <div className="p-4 rounded-xl bg-white border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono">
              <div className="flex items-center gap-2 text-blue-800">
                <span className="font-bold text-slate-900">Optimization Goal:</span>
                <code className="bg-slate-100 text-blue-700 px-2.5 py-1 rounded border border-slate-200">
                  min Cost(a) subject to RevenueProtected(a) == ₹31.0L
                </code>
              </div>
              <span className="text-slate-500">
                Option A strictly dominates Options B &amp; C on cost and speed.
              </span>
            </div>

            {/* The 3 Intervention Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Option A: Recommended */}
              <div className="rounded-2xl border-2 border-emerald-500 bg-white p-6 shadow-md flex flex-col justify-between relative">
                <span className="absolute -top-3 left-6 inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-xs font-bold bg-emerald-600 text-white shadow-xs">
                  <Award className="w-3.5 h-3.5" />
                  <span>RECOMMENDED ACTION</span>
                </span>

                <div className="space-y-4 pt-1">
                  <div>
                    <span className="text-xs font-mono font-bold text-emerald-700 uppercase">OPTION A</span>
                    <h3 className="text-lg font-bold text-slate-900 mt-0.5">Early Payment Incentive</h3>
                    <p className="text-xs text-slate-600 mt-1">
                      Offer ABC Industries a 2% settlement discount to pay on Day 10 (Oct 10).
                    </p>
                  </div>

                  <div className="space-y-2 py-3 border-y border-slate-100 font-mono text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Intervention Cost:</span>
                      <span className="font-bold text-emerald-700 text-sm">₹48,000 (2%)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Revenue Protected:</span>
                      <span className="font-bold text-emerald-700 text-sm">₹31.0L (100%)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Factory Outage:</span>
                      <span className="font-bold text-emerald-700">0 Days (None)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Net Economic Gain:</span>
                      <span className="font-bold text-emerald-800">+₹30.52L (64.6x ROI)</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => {
                      applyIntervention('OPTION_A');
                      setGuidedStep(4);
                    }}
                    className="w-full py-3 px-4 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>APPLY RECOMMENDED INTERVENTION</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Option B */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-between">
                <div className="space-y-4">
                  <div>
                    <span className="text-xs font-mono font-bold text-slate-500 uppercase">OPTION B</span>
                    <h3 className="text-lg font-bold text-slate-900 mt-0.5">Supplier Payment Rescheduling</h3>
                    <p className="text-xs text-slate-600 mt-1">
                      Negotiate 9-day extension with PolyPlast Polymers with 1.5% late fee.
                    </p>
                  </div>

                  <div className="space-y-2 py-3 border-y border-slate-100 font-mono text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Intervention Cost:</span>
                      <span className="font-bold text-slate-900 text-sm">₹0 Direct</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Revenue Protected:</span>
                      <span className="font-bold text-amber-600 text-sm">₹18.0L (58%)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Factory Outage:</span>
                      <span className="font-bold text-rose-600">5 Days Outage</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Order SO-4029:</span>
                      <span className="font-bold text-rose-600">Breached SLA</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => {
                      applyIntervention('OPTION_B');
                      setGuidedStep(4);
                    }}
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors cursor-pointer"
                  >
                    Simulate Option B (Partial)
                  </button>
                </div>
              </div>

              {/* Option C */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-between">
                <div className="space-y-4">
                  <div>
                    <span className="text-xs font-mono font-bold text-slate-500 uppercase">OPTION C</span>
                    <h3 className="text-lg font-bold text-slate-900 mt-0.5">Short-Term Invoice Financing</h3>
                    <p className="text-xs text-slate-600 mt-1">
                      Emergency debt facility against invoices at 15% APR + origination fee.
                    </p>
                  </div>

                  <div className="space-y-2 py-3 border-y border-slate-100 font-mono text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Intervention Cost:</span>
                      <span className="font-bold text-rose-600 text-sm">₹1.10L Fee</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Revenue Protected:</span>
                      <span className="font-bold text-emerald-700 text-sm">₹31.0L (100%)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Factory Outage:</span>
                      <span className="font-bold text-emerald-700">0 Days (None)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Economic Inefficiency:</span>
                      <span className="font-bold text-slate-600">2.3x more costly</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => {
                      applyIntervention('OPTION_C');
                      setGuidedStep(4);
                    }}
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors cursor-pointer"
                  >
                    Simulate Option C (Costly)
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* CHAPTER 4: PREVENT (CASCADE FULLY NEUTRALIZED)               */}
        {/* ============================================================ */}
        {guidedStep === 4 && (
          <div className="space-y-6 animate-in fade-in duration-200 max-w-5xl mx-auto w-full">
            {/* Header */}
            <div className="space-y-2 text-center sm:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>STAGE 04</span>
                <span>•</span>
                <span>COUNTERMEASURE APPLIED</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Watch the cascade neutralize in real time.
              </h2>
              <p className="text-base text-slate-600 max-w-2xl">
                By securing the ₹24.0L inflow on Day 10, cash never dips below the safety buffer. Supplier obligations are met on schedule, eliminating factory stockouts.
              </p>
            </div>

            {/* The Before vs After Comparison Card (The Wow Factor) */}
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-600 to-emerald-600 text-white shadow-lg space-y-6">
              <div className="text-center sm:text-left">
                <span className="text-xs font-bold tracking-widest text-emerald-100 uppercase">
                  THE MEASURABLE RESULT
                </span>
                <div className="text-3xl sm:text-4xl font-black tracking-tight mt-1">
                  ₹48,000 INTERVENTION PREVENTS ₹31,00,000 OF DOWNSTREAM EXPOSURE
                </div>
                <p className="text-emerald-100 text-sm mt-1">
                  64.6x Return on Capital • 100% of committed sales orders delivered on time.
                </p>
              </div>

              {/* Before -> Intervention -> After Strip */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-black/15 border border-white/20 backdrop-blur-sm">
                  <span className="text-xs font-bold tracking-wider text-rose-200 uppercase block">1. BEFORE INTERVENTION</span>
                  <div className="text-2xl font-bold font-mono mt-1 text-white">₹31.0L Exposure</div>
                  <p className="text-xs text-emerald-100 mt-1">12-day shutdown, ₹6.6L cash breach.</p>
                </div>

                <div className="p-4 rounded-xl bg-white/20 border border-white/30 backdrop-blur-sm">
                  <span className="text-xs font-bold tracking-wider text-white uppercase block">2. APPLIED ACTION</span>
                  <div className="text-2xl font-bold font-mono mt-1 text-white">₹48K Incentive</div>
                  <p className="text-xs text-emerald-100 mt-1">2% early settlement discount to ABC.</p>
                </div>

                <div className="p-4 rounded-xl bg-black/15 border border-white/20 backdrop-blur-sm">
                  <span className="text-xs font-bold tracking-wider text-emerald-200 uppercase block">3. AFTER INTERVENTION</span>
                  <div className="text-2xl font-bold font-mono mt-1 text-white">₹0.0L Exposure</div>
                  <p className="text-xs text-emerald-100 mt-1">0-day outage, ₹18.2L minimum cash floor.</p>
                </div>
              </div>
            </div>

            {/* Embedded Live React Flow in Green/Healthy State */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-600 px-1">
                <span className="font-bold text-slate-900 uppercase">Live Dependency Chain Status:</span>
                <span className="text-emerald-600 font-semibold font-mono">ALL 6 HOPS SECURED (HEALTHY)</span>
              </div>
              <div className="relative w-full h-[360px] min-h-[360px] rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs">
                <ReactFlow
                  nodes={nodes}
                  edges={edges}
                  nodeTypes={nodeTypes}
                  fitView
                  fitViewOptions={{ padding: 0.15 }}
                  minZoom={0.3}
                  maxZoom={1.5}
                  className="bg-slate-50"
                  style={{ width: '100%', height: '100%' }}
                >
                  <Background color="#cbd5e1" gap={20} size={1} />
                </ReactFlow>
              </div>
            </div>

            {/* Advance to Verdict */}
            <div className="flex justify-end pt-2">
              <button
                onClick={() => setGuidedStep(5)}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all cursor-pointer"
              >
                <span>VIEW EXECUTIVE VERDICT</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* CHAPTER 5: VERDICT (EXECUTIVE SUMMARY & PLATFORM ACCESS)     */}
        {/* ============================================================ */}
        {guidedStep === 5 && (
          <div className="space-y-8 animate-in fade-in duration-200 max-w-4xl mx-auto w-full my-auto py-4">
            {/* Header */}
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200 shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>EXECUTIVE VERDICT • DECISION COMPLETED</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
                Prevent the cascade. Don&apos;t just report it.
              </h2>
              <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
                CashFlow Chain doesn&apos;t just tell finance teams that cash is at risk. It shows them what the risk will break — and what it will cost to stop it.
              </p>
            </div>

            {/* Three Big Number Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm text-center">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                  Intervention Cost
                </span>
                <div className="text-4xl font-black font-mono text-slate-900 mt-2">
                  ₹48K
                </div>
                <span className="text-xs text-slate-500 mt-1 block">2% Early Settlement Discount</span>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm text-center">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                  Exposure Protected
                </span>
                <div className="text-4xl font-black font-mono text-emerald-600 mt-2">
                  ₹31L
                </div>
                <span className="text-xs text-slate-500 mt-1 block">Committed Order Revenue</span>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm text-center">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                  Cascade Protection
                </span>
                <div className="text-4xl font-black font-mono text-blue-600 mt-2">
                  100%
                </div>
                <span className="text-xs text-slate-500 mt-1 block">0 Days Factory Outage</span>
              </div>
            </div>

            {/* Loop Summary Banner */}
            <div className="p-5 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center font-bold">
                  ✓
                </div>
                <div>
                  <h4 className="text-sm font-bold">The Complete Second-Order Loop</h4>
                  <p className="text-xs text-slate-300 font-mono">
                    PREDICT → TRACE → SIMULATE → PREVENT
                  </p>
                </div>
              </div>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded border border-emerald-500/30 font-semibold">
                64.6x Net Economic Value (₹30.52L Saved)
              </span>
            </div>

            {/* Final Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <button
                onClick={resetGuidedDemo}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 shadow-xs transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>RESTART DEMO</span>
              </button>

              <button
                onClick={() => exitGuidedDemo(SCREENS.COMMAND_CENTER)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-colors cursor-pointer"
              >
                <span>EXPLORE FULL PLATFORM</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
