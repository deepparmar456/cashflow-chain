import React from 'react';
import { useSimulation, SCREENS } from '../context/SimulationContext';
import {
  CheckCircle2, AlertCircle, TrendingUp, ArrowRight, ShieldCheck, DollarSign,
  Zap, HelpCircle, Layers, Award, RotateCcw, Target, Sparkles
} from 'lucide-react';

export default function InterventionSimulator() {
  const {
    interventionsData,
    activeIntervention,
    applyIntervention,
    metrics,
    setActiveScreen
  } = useSimulation();

  if (!interventionsData) return null;

  return (
    <div className="max-w-[1720px] mx-auto px-4 sm:px-6 py-6 space-y-6 font-sans">
      {/* 1. SCENARIO CONTEXT BANNER */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold uppercase bg-blue-50 text-blue-700 border border-blue-200">
              Countermeasure Optimization Engine
            </span>
            <span className="text-xs font-mono text-slate-500">Target Exposure: ₹31.0L</span>
          </div>
          <h2 className="mt-1.5 text-2xl font-extrabold text-slate-900 tracking-tight">
            SCENARIO: {interventionsData.scenario}
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Formulating constrained cost minimization to evaluate which operational intervention halts the second-order cascade.
          </p>
        </div>

        {/* Dynamic Net ROI Indicator */}
        <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 shrink-0">
          <div>
            <span className="text-[10px] font-semibold text-slate-500 block uppercase">Active Protection Net Gain</span>
            <span className={`text-xl font-bold font-mono ${
              activeIntervention === 'OPTION_A' ? 'text-emerald-700' : (activeIntervention === 'OPTION_C' ? 'text-blue-700' : (activeIntervention === 'OPTION_B' ? 'text-amber-700' : 'text-slate-500'))
            }`}>
              {metrics ? metrics.net_savings_formatted : '₹0.00L'}
            </span>
          </div>
          <button
            onClick={() => applyIntervention('NONE')}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 border border-slate-200 transition-colors cursor-pointer"
            title="Clear Applied Intervention"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. MATHEMATICAL OPTIMIZATION OBJECTIVE CALLOUT */}
      <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200/80 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2 text-blue-900">
          <Target className="w-4 h-4 text-blue-600 shrink-0" />
          <span>
            <strong className="text-slate-900">Optimization Objective:</strong> <code className="bg-white text-blue-700 px-2 py-0.5 rounded border border-blue-200 font-bold">min Cost(a) subject to ExposureProtected(a) == ₹31.0L</code>
          </span>
        </div>
        <span className="text-slate-600 text-[11px]">
          Linear programming selection strictly dominates sub-optimal alternatives.
        </span>
      </div>

      {/* 3. THE THREE INTERVENTION CARDS (OPTIONS A, B, C) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {interventionsData.options.map((opt) => {
          const isSelected = activeIntervention === opt.id;
          const isRec = opt.is_recommended;

          return (
            <div
              key={opt.id}
              className={`relative rounded-2xl border-2 p-6 flex flex-col justify-between transition-all bg-white shadow-sm ${
                isSelected
                  ? 'border-blue-600 ring-4 ring-blue-500/20 shadow-md'
                  : isRec
                  ? 'border-emerald-400 hover:border-emerald-500'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              {/* Header Badges */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                    Option {opt.id.replace('OPTION_', '')}
                  </span>
                  
                  {isRec && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-2xs">
                      <Award className="w-3.5 h-3.5 text-emerald-700" />
                      <span>RECOMMENDED ACTION</span>
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-slate-900">
                  {opt.title}
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {opt.description}
                </p>

                {/* Primary Financial Trade-off Metrics */}
                <div className="mt-4 pt-4 border-t border-slate-100 space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Intervention Cost:</span>
                    <span className={`font-bold text-sm ${opt.cost === 0 ? 'text-slate-700' : 'text-slate-900'}`}>
                      {opt.cost_formatted}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Revenue Protected:</span>
                    <span className="font-bold text-emerald-700 text-sm">
                      {opt.revenue_protected_formatted || opt.exposure_protected_formatted} ({opt.protection_pct ?? opt.coverage_pct ?? 100}%)
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Remaining Outage:</span>
                    <span className={`font-bold ${(opt.outage_days ?? (opt.id === 'OPTION_B' ? 5 : 0)) === 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
                      {opt.outage_days ?? (opt.id === 'OPTION_B' ? 5 : 0)} Days
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-1">
                    <span className="text-slate-500">Net Economic Gain:</span>
                    <span className="font-bold text-emerald-800">
                      {opt.net_benefit_formatted}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6 pt-4 border-t border-slate-100">
                <button
                  onClick={() => applyIntervention(opt.id)}
                  className={`w-full py-3 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-xs'
                      : isRec
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200'
                  }`}
                >
                  {isSelected ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>SIMULATION ACTIVE</span>
                    </>
                  ) : (
                    <>
                      <span>Apply {opt.title}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. FOOTER CALLOUT TO IMPACT CHAIN */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-0.5 text-center sm:text-left">
          <h4 className="text-sm font-bold text-slate-900">
            Verify Ripple Effect in the Live Graph
          </h4>
          <p className="text-xs text-slate-500">
            Switch to the Impact Chain to watch all 6 nodes transition from Critical to Protected.
          </p>
        </div>

        <button
          onClick={() => setActiveScreen(SCREENS.IMPACT_CHAIN)}
          className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white transition-colors cursor-pointer shrink-0"
        >
          <span>Open Impact Chain</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
