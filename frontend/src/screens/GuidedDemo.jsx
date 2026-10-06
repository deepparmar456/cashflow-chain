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
  CheckCircle2,
  AlertTriangle,
  Calculator,
  Award,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  ShieldCheck
} from 'lucide-react';

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
    metrics
  } = useSimulation();

  const [showPredictDetails, setShowPredictDetails] = useState(false);
  const [showTraceDetails, setShowTraceDetails] = useState(false);
  const [showCompareDetails, setShowCompareDetails] = useState(false);
  const [showPreventDetails, setShowPreventDetails] = useState(false);

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

  const currentStageObj = GUIDED_STAGES.find(s => s.id === guidedStep) || GUIDED_STAGES[0];

  return (
    <div className="min-h-[calc(100vh-65px)] bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* 1. TOP PROGRESS NAVIGATION BAR */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-slate-200 shadow-xs">
        <div className="max-w-[1640px] mx-auto px-4 sm:px-6 py-2.5 flex flex-wrap xl:flex-nowrap items-center justify-between gap-2.5">
          {/* Progress Steps: 01 Predict -> 02 Trace -> 03 Compare -> 04 Prevent -> 05 Verdict */}
          <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap sm:flex-nowrap w-full xl:w-auto justify-center xl:justify-start">
            {GUIDED_STAGES.map((stg, idx) => {
              const isActive = guidedStep === stg.id;
              const isPast = guidedStep > stg.id;
              return (
                <React.Fragment key={stg.id}>
                  <button
                    onClick={() => setGuidedStep(stg.id)}
                    className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer shrink-0 whitespace-nowrap ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-xs ring-2 ring-blue-500/20'
                        : isPast
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                      isActive
                        ? 'bg-white text-blue-600'
                        : isPast
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-200 text-slate-600'
                    }`}>
                      {isPast ? '✓' : stg.id}
                    </span>
                    <span className="whitespace-nowrap">{stg.title}</span>
                  </button>
                  {idx < GUIDED_STAGES.length - 1 && (
                    <span className="text-slate-300 font-bold text-xs px-0.5 hidden sm:inline">→</span>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Current Step Indicator + Obvious Back / Next Controls */}
          <div className="flex items-center justify-between xl:justify-end gap-2 w-full xl:w-auto shrink-0">
            <span className="text-xs font-mono font-semibold text-slate-500 hidden md:inline px-2.5 py-1 rounded bg-slate-100 border border-slate-200 whitespace-nowrap">
              Step {guidedStep} of 5 <span className="hidden 2xl:inline">• {currentStageObj.story}</span>
            </span>

            <div className="flex items-center gap-1.5 ml-auto xl:ml-0">
              <button
                onClick={prevGuidedStep}
                disabled={guidedStep === 1}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 disabled:opacity-35 disabled:pointer-events-none transition-colors cursor-pointer shadow-2xs"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>

              <button
                onClick={nextGuidedStep}
                disabled={guidedStep === 5}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xs disabled:opacity-35 disabled:pointer-events-none transition-colors cursor-pointer"
              >
                <span>Next</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={resetGuidedDemo}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer"
                title="Restart Demo from Step 1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Restart</span>
              </button>

              <button
                onClick={() => exitGuidedDemo(SCREENS.COMMAND_CENTER)}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer"
                title="Explore Full Platform"
              >
                <X className="w-3.5 h-3.5" />
                <span className="hidden xl:inline">Explore Full Platform</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 2. DYNAMIC STORY CONTENT */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col justify-between">
        {/* ============================================================ */}
        {/* STEP 1: 01 PREDICT — "Something might go wrong."             */}
        {/* ============================================================ */}
        {guidedStep === 1 && (
          <div className="space-y-6 animate-in fade-in duration-200 max-w-5xl mx-auto w-full">
            {/* Story Header */}
            <div className="space-y-2 text-center sm:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
                <span>STEP 01 OF 05 • PREDICT</span>
                <span>•</span>
                <span>&ldquo;Something might go wrong.&rdquo;</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                {focalCustomer} may receive {focalOutstanding} late.
              </h2>
              <p className="text-lg sm:text-xl font-bold text-rose-600">
                → Expected payment delay: {predictedDelay} days
              </p>
              <p className="text-sm text-slate-600 max-w-2xl">
                Before the invoice even becomes overdue, CashFlow Chain spots a consistent upward payment-delay trend across the last 3 settled invoices from {focalCustomer}.
              </p>
            </div>

            {/* 4 Key Cards in Plain Business Language */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Customer</span>
                <div className="mt-1 text-xl font-bold text-slate-900 truncate">{focalCustomer}</div>
                <span className="text-xs text-blue-600 font-medium mt-0.5 block">Key Account (48% of month&apos;s cash)</span>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Payment Amount</span>
                <div className="mt-1 text-2xl font-bold font-mono text-slate-900">{focalOutstanding}</div>
                <span className="text-xs text-slate-500 font-mono mt-0.5 block">Due Date: 08 Oct 2026</span>
              </div>

              <div className="p-5 rounded-2xl bg-rose-50 border-2 border-rose-300 shadow-xs">
                <span className="text-xs font-bold text-rose-800 uppercase tracking-wider block">Expected Payment Delay</span>
                <div className="mt-1 text-3xl font-extrabold font-mono text-rose-600">+{predictedDelay} Days</div>
                <span className="text-xs text-rose-700 font-mono mt-0.5 block">Expected Arrival: 29 Oct 2026</span>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Risk Confidence</span>
                <div className="mt-1 text-2xl font-bold font-mono text-blue-600">{confidence}</div>
                <span className="text-xs text-slate-500 mt-0.5 block">Based on last 3 settled invoices</span>
              </div>
            </div>

            {/* Historical Payment Pattern */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                    Why We Expect This Delay (Recent Payment History)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Based on a clear upward payment-delay trend across the last 3 settled invoices.
                  </p>
                </div>
                <span className="text-xs font-mono font-semibold text-rose-700 bg-rose-50 px-2.5 py-1 rounded border border-rose-200 self-start sm:self-auto">
                  Upward Delay Trend: 6d → 11d → 16d → 21d
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                  <span className="text-xs text-slate-500 font-medium block">July Invoice (₹18.0L)</span>
                  <div className="text-lg font-bold font-mono text-slate-800 mt-1">6 days late</div>
                  <span className="text-[11px] text-emerald-700 font-medium">Paid</span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                  <span className="text-xs text-slate-500 font-medium block">August Invoice (₹21.0L)</span>
                  <div className="text-lg font-bold font-mono text-slate-800 mt-1">11 days late</div>
                  <span className="text-[11px] text-emerald-700 font-medium">Paid</span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                  <span className="text-xs text-slate-500 font-medium block">September Invoice (₹22.5L)</span>
                  <div className="text-lg font-bold font-mono text-slate-800 mt-1">16 days late</div>
                  <span className="text-[11px] text-emerald-700 font-medium">Paid</span>
                </div>

                <div className="p-3.5 rounded-xl bg-rose-50 border-2 border-rose-300 text-center">
                  <span className="text-xs text-rose-800 font-semibold block">October Invoice (₹24.0L)</span>
                  <div className="text-xl font-extrabold font-mono text-rose-600 mt-1">{predictedDelay} days late</div>
                  <span className="text-[11px] text-rose-700 font-bold uppercase tracking-wider">Expected Delay</span>
                </div>
              </div>

              {/* Expandable "Why? / Technical Details" */}
              <div className="pt-2 border-t border-slate-100">
                <button
                  onClick={() => setShowPredictDetails(!showPredictDetails)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 cursor-pointer"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>{showPredictDetails ? 'Hide Methodology Details' : 'Why? / View Trend Methodology'}</span>
                  {showPredictDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
                {showPredictDetails && (
                  <div className="mt-2 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-700 space-y-1">
                    <div><strong>Basis:</strong> Based on a clear upward payment-delay trend across the last 3 settled invoices.</div>
                    <div><strong>Methodology:</strong> Linear regression → +5 days/cycle → projected +21 days (<code>Delay(t) = 5.0 * t + 1.0</code>)</div>
                    <div><strong>Risk Confidence:</strong> 87% (consistent +5d/cycle escalation combined with 48.2% monthly cash inflow concentration)</div>
                  </div>
                )}
              </div>
            </div>

            {/* Story Transition Banner */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-50 via-white to-amber-50 border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs">
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
                  Why This Matters
                </span>
                <p className="text-base font-bold text-slate-900">
                  &ldquo;The late payment itself isn&apos;t the biggest problem. What it breaks next is.&rdquo;
                </p>
                <p className="text-xs text-slate-600">
                  Next, see how this 21-day delay spreads across cash, suppliers, inventory, and customer orders.
                </p>
              </div>

              <button
                onClick={() => setGuidedStep(2)}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all shrink-0 cursor-pointer"
              >
                <span>02 TRACE: WHAT HAPPENS NEXT</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* STEP 2: 02 TRACE — "Here's what it could break."             */}
        {/* ============================================================ */}
        {guidedStep === 2 && (
          <div className="space-y-4 animate-in fade-in duration-200 flex-1 flex flex-col">
            {/* Header Row */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200">
                  <span>STEP 02 OF 05 • TRACE</span>
                  <span>•</span>
                  <span>&ldquo;Here&apos;s what it could break.&rdquo;</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
                  What happens next?
                </h2>
                <p className="text-sm text-slate-600">
                  One ₹24.0L delayed payment triggers a 6-step chain reaction that puts <strong>₹31.0L of customer orders at risk</strong>.
                </p>
              </div>

              <button
                onClick={() => setGuidedStep(3)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all self-start md:self-auto cursor-pointer shrink-0"
              >
                <span>03 COMPARE: HOW TO RESPOND</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Plain-Language Chain Strip requested by prompt */}
            <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 font-semibold">
                  <span className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-700 border border-rose-200">
                    1. Late payment (₹24L)
                  </span>
                  <span className="text-slate-400">→</span>
                  <span className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 border border-amber-200">
                    2. Cash gap (₹6.6L min)
                  </span>
                  <span className="text-slate-400">→</span>
                  <span className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-700 border border-rose-200">
                    3. Supplier pressure (₹12L hold)
                  </span>
                  <span className="text-slate-400">→</span>
                  <span className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 border border-amber-200">
                    4. Inventory impact (12d stockout)
                  </span>
                  <span className="text-slate-400">→</span>
                  <span className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-700 border border-rose-200">
                    5. Orders at risk (2 orders)
                  </span>
                  <span className="text-slate-400">→</span>
                  <span className="px-2.5 py-1 rounded-lg bg-rose-600 text-white font-bold">
                    6. Revenue exposed (₹31.0L)
                  </span>
                </div>

                <button
                  onClick={() => setShowTraceDetails(!showTraceDetails)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800 cursor-pointer shrink-0"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>{showTraceDetails ? 'Hide Math' : 'Why? / Details'}</span>
                </button>
              </div>

              {showTraceDetails && (
                <div className="pt-2 border-t border-slate-100 text-xs font-mono text-slate-600 grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div>• <strong>Cash Gap:</strong> Cash drops to ₹6.6L on Oct 14 (₹8.4L below the ₹15.0L safety floor).</div>
                  <div>• <strong>Inventory Math:</strong> 14d lead time + 16d supplier hold − 18d stock buffer = 12 days stockout.</div>
                  <div>• <strong>Orders Exposed:</strong> 120 unbuilt units breach Orders SO-4021 &amp; SO-4029 = ₹31.0L revenue.</div>
                </div>
              )}
            </div>

            {/* Embedded Live React Flow Canvas */}
            <div className="relative w-full h-[520px] min-h-[520px] rounded-2xl border-2 border-slate-200 bg-white overflow-hidden shadow-sm">
              <div className="absolute top-3 left-4 z-10 px-3 py-1 rounded-full bg-white/90 backdrop-blur border border-slate-200 text-[11px] font-medium text-slate-600 shadow-2xs">
                💡 Click any card in the chain to inspect its exact numbers and formula
              </div>
              <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                nodeTypes={nodeTypes}
                fitView
                fitViewOptions={{ padding: 0.03 }}
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
        {/* STEP 3: 03 COMPARE — "Here are the options."                 */}
        {/* ============================================================ */}
        {guidedStep === 3 && (
          <div className="space-y-6 animate-in fade-in duration-200 max-w-5xl mx-auto w-full">
            {/* Header */}
            <div className="space-y-2 text-center sm:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
                <span>STEP 03 OF 05 • COMPARE</span>
                <span>•</span>
                <span>&ldquo;Here are the options.&rdquo;</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                How should ABC respond?
              </h2>
              <p className="text-base text-slate-600 max-w-2xl">
                We compare the 3 available actions side-by-side to find the lowest-cost way to protect all <strong>₹31.0L</strong> of exposed customer orders in this scenario.
              </p>
            </div>

            {/* The 3 Intervention Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Option A: Recommended */}
              <div className="rounded-2xl border-2 border-emerald-500 bg-white p-6 shadow-md flex flex-col justify-between relative">
                <span className="absolute -top-3 left-6 inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-xs font-bold bg-emerald-600 text-white shadow-xs">
                  <Award className="w-3.5 h-3.5" />
                  <span>BEST ACTION • RECOMMENDED</span>
                </span>

                <div className="space-y-4 pt-1">
                  <div>
                    <span className="text-xs font-mono font-bold text-emerald-700 uppercase">OPTION A</span>
                    <h3 className="text-lg font-bold text-slate-900 mt-0.5">Early Payment Incentive</h3>
                    <p className="text-xs text-slate-600 mt-1">
                      Offer {focalCustomer} a small 2% discount to pay early on Oct 10 instead of Oct 29.
                    </p>
                  </div>

                  <div className="space-y-2.5 py-3 border-y border-slate-100 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Action Cost:</span>
                      <span className="font-bold font-mono text-emerald-700 text-sm">₹48,000 (2%)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Orders Protected:</span>
                      <span className="font-bold font-mono text-emerald-700 text-sm">₹31.0L (100% in scenario)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Inventory Stockout:</span>
                      <span className="font-bold font-mono text-emerald-700">0 Days (None)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Net Value Protected:</span>
                      <span className="font-bold font-mono text-emerald-800">₹30.52L net value protected</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => {
                      applyIntervention('OPTION_A');
                      setGuidedStep(4);
                    }}
                    className="w-full py-3.5 px-4 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>CHOOSE BEST ACTION (OPTION A)</span>
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
                      Ask Supplier X for more time to pay. Delays raw materials by 9 days and still leaves a stockout.
                    </p>
                  </div>

                  <div className="space-y-2.5 py-3 border-y border-slate-100 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Action Cost:</span>
                      <span className="font-bold font-mono text-slate-900 text-sm">₹0</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Orders Protected:</span>
                      <span className="font-bold font-mono text-amber-600 text-sm">₹18.0L (Only 58%)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Inventory Stockout:</span>
                      <span className="font-bold font-mono text-rose-600">5 Days Stockout</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Unprotected Risk:</span>
                      <span className="font-bold font-mono text-rose-600">₹13.0L still exposed</span>
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
                    Test Option B (Partial Fix)
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
                      Borrow short-term credit against the invoice. Protects orders, but costs 2.3x more than Option A.
                    </p>
                  </div>

                  <div className="space-y-2.5 py-3 border-y border-slate-100 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Action Cost:</span>
                      <span className="font-bold font-mono text-rose-600 text-sm">₹1.10L (Interest + Fee)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Orders Protected:</span>
                      <span className="font-bold font-mono text-emerald-700 text-sm">₹31.0L (100% in scenario)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Inventory Stockout:</span>
                      <span className="font-bold font-mono text-emerald-700">0 Days (None)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Net Value Protected:</span>
                      <span className="font-bold font-mono text-slate-600">₹29.90L (2.3x higher cost)</span>
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
                    Test Option C (Higher Cost)
                  </button>
                </div>
              </div>
            </div>

            {/* Expandable "Why? / Details" for Optimization Rule */}
            <div className="p-4 rounded-xl bg-white border border-slate-200">
              <button
                onClick={() => setShowCompareDetails(!showCompareDetails)}
                className="w-full flex items-center justify-between text-left text-xs font-semibold text-blue-600 hover:text-blue-800 cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4" />
                  <span>Why does CashFlow Chain recommend Option A? (View Math &amp; Selection Rule)</span>
                </span>
                {showCompareDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {showCompareDetails && (
                <div className="mt-3 pt-3 border-t border-slate-100 text-xs font-mono text-slate-700 space-y-1.5">
                  <div><strong>Selection Rule:</strong> <code>Minimize Action Cost(a) subject to Revenue Protected(a) == ₹31.0L (100%)</code></div>
                  <div>• <strong>Option B</strong> is rejected because it only protects 58% of revenue (leaving ₹13.0L of orders exposed).</div>
                  <div>• <strong>Option A (₹48,000)</strong> beats <strong>Option C (₹1,10,000)</strong> because both protect 100% of exposed orders in this scenario, while Option A delivers <strong>₹30.52L net value protected</strong> (saving ₹62,000 in financing fees).</div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* STEP 4: 04 PREVENT — "Here's the best response."             */}
        {/* ============================================================ */}
        {guidedStep === 4 && (
          <div className="space-y-6 animate-in fade-in duration-200 max-w-5xl mx-auto w-full">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>STEP 04 OF 05 • PREVENT</span>
                  <span>•</span>
                  <span>&ldquo;Here&apos;s the best response.&rdquo;</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  Choose the best action.
                </h2>
                <p className="text-sm sm:text-base text-slate-600 max-w-2xl">
                  Applying <strong>Option A (Early Payment Incentive)</strong> brings in the ₹24.0L payment on Oct 10—keeping cash healthy, paying Supplier X on time, and protecting all ₹31.0L of exposed customer orders in this scenario.
                </p>
              </div>

              {activeIntervention !== 'OPTION_A' && (
                <button
                  onClick={() => applyIntervention('OPTION_A')}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs cursor-pointer shrink-0"
                >
                  Switch to Recommended Option A
                </button>
              )}
            </div>

            {/* The Before vs Action vs After Comparison Card */}
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 text-white shadow-lg space-y-6">
              <div className="text-center sm:text-left">
                <span className="text-xs font-bold tracking-widest text-emerald-100 uppercase">
                  RECOMMENDED ACTION APPLIED (OPTION A)
                </span>
                <div className="text-2xl sm:text-4xl font-black tracking-tight mt-1">
                  ₹48,000 ACTION PROTECTS ₹31L OF EXPOSED ORDERS
                </div>
                <p className="text-emerald-100 text-sm mt-1">
                  ₹30.52L net value protected • 100% protected in this scenario.
                </p>
              </div>

              {/* Before -> Best Action -> After Strip */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
                <div className="p-4 rounded-xl bg-black/15 border border-white/20 backdrop-blur-sm">
                  <span className="text-xs font-bold tracking-wider text-rose-200 uppercase block">1. WITHOUT ACTION</span>
                  <div className="text-2xl font-bold font-mono mt-1 text-white">₹31.0L Exposed</div>
                  <p className="text-xs text-emerald-100 mt-1">Cash drops to ₹6.6L • 12-day stockout.</p>
                </div>

                <div className="p-4 rounded-xl bg-white/20 border border-white/30 backdrop-blur-sm">
                  <span className="text-xs font-bold tracking-wider text-white uppercase block">2. BEST ACTION (OPTION A)</span>
                  <div className="text-2xl font-bold font-mono mt-1 text-white">₹48,000 Cost</div>
                  <p className="text-xs text-emerald-100 mt-1">2% early-payment discount to {focalCustomer}.</p>
                </div>

                <div className="p-4 rounded-xl bg-black/15 border border-white/20 backdrop-blur-sm">
                  <span className="text-xs font-bold tracking-wider text-emerald-200 uppercase block">3. AFTER ACTION</span>
                  <div className="text-2xl font-bold font-mono mt-1 text-white">₹30.52L Net Protected</div>
                  <p className="text-xs text-emerald-100 mt-1">100% protected in this scenario • Cash &ge; ₹20.7L.</p>
                </div>
              </div>
            </div>

            {/* Embedded Live React Flow in Green/Healthy State */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-600 px-1">
                <span className="font-bold text-slate-900 uppercase">All 6 Steps in the Chain Now Protected:</span>
                <span className="text-emerald-700 font-bold font-mono">STATUS: HEALTHY (100% PROTECTED IN THIS SCENARIO)</span>
              </div>
              <div className="relative w-full h-[360px] min-h-[360px] rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs">
                <ReactFlow
                  nodes={nodes}
                  edges={edges}
                  nodeTypes={nodeTypes}
                  fitView
                  fitViewOptions={{ padding: 0.04 }}
                  minZoom={0.3}
                  maxZoom={1.5}
                  className="bg-slate-50"
                  style={{ width: '100%', height: '100%' }}
                >
                  <Background color="#cbd5e1" gap={20} size={1} />
                </ReactFlow>
              </div>
            </div>

            {/* Expandable Details + Next Button */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <button
                onClick={() => setShowPreventDetails(!showPreventDetails)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 cursor-pointer"
              >
                <HelpCircle className="w-4 h-4" />
                <span>{showPreventDetails ? 'Hide Ledger Proof' : 'Why? / View Cash Buffer Recovery Numbers'}</span>
              </button>

              <button
                onClick={() => setGuidedStep(5)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all cursor-pointer"
              >
                <span>05 VERDICT: SEE FINAL OUTCOME</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {showPreventDetails && (
              <div className="p-4 rounded-xl bg-white border border-slate-200 text-xs font-mono text-slate-700 space-y-1">
                <div>• <strong>Unmitigated Lowest Cash:</strong> ₹6.6L on Oct 14 (Breaches ₹15.0L safety floor by ₹8.4L).</div>
                <div>• <strong>With Option A (Early Payment Discount):</strong> ₹23.52L arrives on Oct 10 (₹24.0L minus ₹48K discount).</div>
                <div>• <strong>New Lowest Projected Cash:</strong> ₹20.72L on Oct 30 — safely above the ₹15.0L floor every single day.</div>
              </div>
            )}
          </div>
        )}

        {/* ============================================================ */}
        {/* STEP 5: 05 VERDICT — "Here's the outcome."                   */}
        {/* ============================================================ */}
        {guidedStep === 5 && (
          <div className="space-y-8 animate-in fade-in duration-200 max-w-4xl mx-auto w-full my-auto py-4">
            {/* Header */}
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>STEP 05 OF 05 • VERDICT • &ldquo;Here&apos;s the outcome.&rdquo;</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                CashFlow Chain helps businesses see what could break next — and act before the damage spreads.
              </h2>
              <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
                Instead of finding out after a payment is missed and suppliers freeze orders, finance teams get early warning and the lowest-cost fix.
              </p>
            </div>

            {/* Three Big Number Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm text-center">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                  Best Action Cost
                </span>
                <div className="text-4xl font-black font-mono text-slate-900 mt-2">
                  ₹48,000
                </div>
                <span className="text-xs text-slate-500 mt-1 block">2% Early Payment Discount</span>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm text-center">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                  Exposed Orders Protected
                </span>
                <div className="text-4xl font-black font-mono text-emerald-600 mt-2">
                  ₹31.0L
                </div>
                <span className="text-xs text-slate-500 mt-1 block">100% protected in this scenario</span>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm text-center">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                  Net Value Protected
                </span>
                <div className="text-4xl font-black font-mono text-blue-600 mt-2">
                  ₹30.52L
                </div>
                <span className="text-xs text-slate-500 mt-1 block">₹30.52L net value protected</span>
              </div>
            </div>

            {/* 5-Part Story Summary Strip */}
            <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-3 shadow-sm">
              <div className="flex items-center justify-between text-xs font-mono text-blue-400 uppercase tracking-wider">
                <span>The Complete Story in One View</span>
                <span className="text-emerald-400 font-bold">✓ Problem Prevented</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-xs">
                <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">
                  <span className="text-blue-400 font-bold block">01 Predict</span>
                  <span className="text-slate-300">&ldquo;Something might go wrong.&rdquo;</span>
                </div>
                <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">
                  <span className="text-amber-400 font-bold block">02 Trace</span>
                  <span className="text-slate-300">&ldquo;Here&apos;s what it could break.&rdquo;</span>
                </div>
                <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">
                  <span className="text-blue-300 font-bold block">03 Compare</span>
                  <span className="text-slate-300">&ldquo;Here are the options.&rdquo;</span>
                </div>
                <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">
                  <span className="text-emerald-400 font-bold block">04 Prevent</span>
                  <span className="text-slate-300">&ldquo;Here&apos;s the best response.&rdquo;</span>
                </div>
                <div className="p-2.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40">
                  <span className="text-emerald-300 font-bold block">05 Verdict</span>
                  <span className="text-white font-semibold">&ldquo;Here&apos;s the outcome.&rdquo;</span>
                </div>
              </div>
            </div>

            {/* Final Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <button
                onClick={resetGuidedDemo}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 shadow-xs transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>RESTART GUIDED DEMO</span>
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

        {/* 3. BOTTOM PERSISTENT STEP NAVIGATION FOOTER */}
        <footer className="mt-8 pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <button
            onClick={prevGuidedStep}
            disabled={guidedStep === 1}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 disabled:opacity-35 disabled:pointer-events-none cursor-pointer shadow-2xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Previous Step</span>
          </button>

          <span className="font-mono font-semibold text-slate-600">
            Guided Demo • Step {guidedStep} of 5 ({currentStageObj.title})
          </span>

          {guidedStep < 5 ? (
            <button
              onClick={nextGuidedStep}
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-lg font-bold text-white bg-blue-600 hover:bg-blue-700 cursor-pointer shadow-xs"
            >
              <span>Next Step</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={() => exitGuidedDemo(SCREENS.COMMAND_CENTER)}
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-lg font-bold text-white bg-slate-900 hover:bg-slate-800 cursor-pointer shadow-xs"
            >
              <span>Explore Full Platform</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </footer>
      </main>
    </div>
  );
}
