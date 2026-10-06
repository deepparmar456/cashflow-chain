import React, { useState } from 'react';
import { useSimulation, SCREENS } from '../context/SimulationContext';
import {
  FileText, Copy, Check, ShieldAlert, CheckCircle2,
  ArrowRight, Building2, Calendar
} from 'lucide-react';

export default function ExecutiveMemo() {
  const {
    executiveMemo,
    metrics,
    customerRisk,
    interventionsData,
    activeIntervention,
    setActiveScreen
  } = useSimulation();
  const [copied, setCopied] = useState(false);

  if (!executiveMemo) return null;

  const math = executiveMemo.math_summary || {};
  const inflowAtRisk = math.inflow_at_risk || customerRisk?.outstanding_formatted || '₹24.0L';
  const stressMinFloor = math.breach_minimum_cash || metrics?.projected_min_cash_formatted || '₹6.6L';
  const supplierAtRisk = math.supplier_obligation || '₹12.0L';
  const assemblyOutage = math.stockout_duration || '12 Days';
  const revenueAtRisk = math.revenue_exposure || metrics?.revenue_exposure_formatted || '₹31.0L';
  const incentiveCost = math.recommended_cost || (interventionsData?.options?.find(o => o.id === 'OPTION_A')?.cost_formatted) || '₹48,000';
  const netSavedValue = math.net_protected_value || (interventionsData?.options?.find(o => o.id === 'OPTION_A')?.net_benefit_formatted) || '₹30.52L';

  const copyMemoToClipboard = () => {
    const text = `
${executiveMemo.title}
Date: ${executiveMemo.date}
Risk Level: ${executiveMemo.classification}

SUMMARY:
${executiveMemo.executive_summary}

1. WHAT MIGHT GO WRONG (EXPECTED PAYMENT DELAY):
${executiveMemo.evidence.map(e => `• ${e}`).join('\n')}

2. WHAT HAPPENS NEXT (HOW THE PROBLEM SPREADS):
${executiveMemo.impact.map(i => `• ${i}`).join('\n')}

3. BEST ACTION & OUTCOME:
${executiveMemo.action.map(a => `• ${a}`).join('\n')}

KEY NUMBERS:
• Late Payment Amount: ${inflowAtRisk}
• Lowest Projected Cash: ${stressMinFloor}
• Supplier Payment at Risk: ${supplierAtRisk}
• Inventory Stockout: ${assemblyOutage}
• Revenue Exposed: ${revenueAtRisk}
• Best Action Cost: ${incentiveCost}
• Net Value Protected: ${netSavedValue}
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const isProtected = activeIntervention === 'OPTION_A' || activeIntervention === 'OPTION_C';

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-6 space-y-6 font-sans">
      {/* 1. TOP BAR WITH EXPORT ACTIONS */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-white border border-slate-200/80 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-blue-50 text-blue-600 border border-blue-200">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              05 VERDICT • SUMMARY REPORT &amp; OUTCOME
            </h3>
            <p className="text-xs text-slate-500">
              “CashFlow Chain helps businesses see what could break next — and act before the damage spreads.”
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={copyMemoToClipboard}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 transition-colors shadow-2xs cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Copied Summary</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-500" />
                <span>Copy Report</span>
              </>
            )}
          </button>

          <button
            onClick={() => setActiveScreen(SCREENS.INTERVENTIONS)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white transition-colors shadow-2xs cursor-pointer"
          >
            <span>Compare Best Actions</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 2. THE SUMMARY REPORT CARD */}
      <div className="p-8 sm:p-10 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-8 text-slate-800">
        {/* Formal Header */}
        <div className="border-b border-slate-200 pb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
              <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 font-bold uppercase text-slate-700">
                RISK LEVEL: {isProtected ? 'PROTECTED' : 'HIGH PRIORITY'}
              </span>
              <span>•</span>
              <span>Ref: CFM-2026-Q4-01</span>
            </div>
            <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {executiveMemo.title}
            </h2>
            <div className="mt-2 flex items-center gap-4 text-xs font-mono text-slate-500">
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {executiveMemo.date}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Building2 className="w-3.5 h-3.5" /> Finance &amp; Operations Summary</span>
            </div>
          </div>

          <div className="text-right self-start sm:self-auto">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase border ${
              isProtected
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                : 'bg-rose-50 text-rose-800 border-rose-300'
            }`}>
              {isProtected ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />}
              <span>{isProtected ? 'All Orders Protected' : 'Action Recommended'}</span>
            </span>
          </div>
        </div>

        {/* Plain Overview */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
            Bottom-Line Summary
          </span>
          <p className="text-sm font-medium text-slate-800 leading-relaxed">
            {executiveMemo.executive_summary}
          </p>
        </div>

        {/* 1. Something might go wrong */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-blue-700 border-b border-slate-100 pb-1">
            1. Predict — “Something might go wrong” (Expected Payment Delay)
          </h4>
          <ul className="space-y-2 text-sm text-slate-700">
            {executiveMemo.evidence.map((point, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 2. Here's what it could break */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-rose-700 border-b border-slate-100 pb-1">
            2. Trace — “Here’s what it could break” (What Happens Next)
          </h4>
          <ul className="space-y-2 text-sm text-slate-700">
            {executiveMemo.impact.map((point, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-600 mt-2 shrink-0" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 3. Here's the best response */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-700 border-b border-slate-100 pb-1">
            3. Prevent — “Here’s the best response” (Recommended Best Action)
          </h4>
          <ul className="space-y-2 text-sm text-slate-700">
            {executiveMemo.action.map((point, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 shrink-0" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Key Numbers Matrix */}
        <div className="pt-4 border-t border-slate-200 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Key Financial Numbers at a Glance
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
              <span className="text-slate-500 block font-sans">Delayed Payment</span>
              <span className="text-sm font-bold text-slate-900 mt-0.5 block">{inflowAtRisk}</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
              <span className="text-slate-500 block font-sans">Lowest Projected Cash</span>
              <span className="text-sm font-bold text-slate-900 mt-0.5 block">{stressMinFloor}</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
              <span className="text-slate-500 block font-sans">Supplier Bill at Risk</span>
              <span className="text-sm font-bold text-slate-900 mt-0.5 block">{supplierAtRisk}</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
              <span className="text-slate-500 block font-sans">Inventory Stockout</span>
              <span className="text-sm font-bold text-slate-900 mt-0.5 block">{assemblyOutage}</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
              <span className="text-slate-500 block font-sans">Orders at Risk</span>
              <span className="text-sm font-bold text-slate-900 mt-0.5 block">{revenueAtRisk}</span>
            </div>
            <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200">
              <span className="text-emerald-700 block font-sans">Best Action Cost</span>
              <span className="text-sm font-bold text-emerald-800 mt-0.5 block">{incentiveCost}</span>
            </div>
            <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 sm:col-span-2">
              <span className="text-emerald-700 block font-sans">Revenue Protected (Net Gain, 64.6x ROI)</span>
              <span className="text-sm font-bold text-emerald-800 mt-0.5 block">{netSavedValue}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
