import React, { useState } from 'react';
import { useSimulation, SCREENS } from '../context/SimulationContext';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine, CartesianGrid
} from 'recharts';
import {
  ArrowRight, ShieldAlert, CheckCircle2, HelpCircle, ChevronDown, ChevronUp, Play
} from 'lucide-react';

export default function CommandCenter() {
  const { metrics, timeline, setActiveScreen, activeIntervention, customerRisk, startGuidedDemo } = useSimulation();
  const [showChartDetails, setShowChartDetails] = useState(false);

  const isProtected = activeIntervention === 'OPTION_A' || activeIntervention === 'OPTION_C';

  // Derive critical inflection date and breach amount dynamically from the timeline
  const inflectionPoint = React.useMemo(() => {
    if (!timeline || timeline.length === 0) {
      return { date: "14-Oct-2026", cash: 660000, formatted: "₹6.6L" };
    }
    let minPoint = timeline[0];
    for (const point of timeline) {
      const stress = point.stress_cash !== undefined ? point.stress_cash : Infinity;
      const curMin = minPoint.stress_cash !== undefined ? minPoint.stress_cash : Infinity;
      if (stress < curMin) {
        minPoint = point;
      }
    }
    const valLakh = ((minPoint.stress_cash ?? 660000) / 100000).toFixed(1);
    const rawDate = (minPoint.date || "14-Oct").replace(' ', '-');
    const dateStr = rawDate.includes('2026') ? rawDate : `${rawDate}-2026`;
    return {
      date: dateStr,
      cash: minPoint.stress_cash,
      formatted: `₹${valLakh}L`
    };
  }, [timeline]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-slate-200 p-3 rounded-xl shadow-md text-xs font-mono">
          <div className="text-slate-500 mb-1 font-semibold">{label}</div>
          {payload.map((entry, index) => (
            <div key={`item-${index}`} className="flex items-center justify-between gap-4 py-0.5">
              <span className="text-slate-600">{entry.name}:</span>
              <span className="font-bold text-slate-900">₹{(entry.value / 100000).toFixed(1)}L</span>
            </div>
          ))}
          <div className="mt-1 pt-1 border-t border-slate-100 text-[10px] text-amber-700 font-medium">
            Minimum Safe Cash: ₹15.0L
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="max-w-[1720px] mx-auto px-4 sm:px-6 py-6 space-y-6 font-sans">
      {/* 1. STATUS CALLOUT BANNER */}
      {!isProtected ? (
        <div className="relative overflow-hidden rounded-2xl border border-rose-300 bg-rose-50/70 p-5 sm:p-6 shadow-sm">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-rose-100 text-rose-600 shrink-0 border border-rose-200">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-bold uppercase bg-rose-600 text-white shadow-2xs">
                    RISK LEVEL: HIGH
                  </span>
                  <span className="text-xs text-rose-800 font-semibold">“Something might go wrong.”</span>
                </div>
                <h2 className="mt-1.5 text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  {customerRisk?.name || 'ABC Industries'} may receive a {customerRisk?.outstanding_formatted || '₹24.0L'} payment {customerRisk?.predicted_delay_days || 21} days late.
                </h2>
                <p className="mt-1 text-sm text-slate-700">
                  This expected payment delay pushes cash down to <span className="text-rose-700 font-bold">{metrics?.projected_min_cash_formatted || inflectionPoint.formatted}</span> (below the ₹15.0L safe limit), freezing a ₹12.0L supplier payment and putting <span className="text-rose-700 font-bold">{metrics?.revenue_exposure_formatted || '₹31.0L'}</span> of customer orders at risk.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <button
                onClick={() => startGuidedDemo(1)}
                className="flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>START GUIDED DEMO</span>
              </button>

              <button
                onClick={() => setActiveScreen(SCREENS.CUSTOMER_RISK)}
                className="flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-sm transition-all cursor-pointer"
              >
                <span>SEE EXPECTED DELAY</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative overflow-hidden rounded-2xl border border-emerald-300 bg-emerald-50/70 p-5 sm:p-6 shadow-sm">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 shrink-0 border border-emerald-200">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-bold uppercase bg-emerald-600 text-white shadow-2xs">
                    BEST ACTION APPLIED
                  </span>
                  <span className="text-xs text-emerald-800 font-semibold">“Here’s the outcome.”</span>
                </div>
                <h2 className="mt-1.5 text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  ₹48,000 Action Protects ₹31L of Exposed Orders
                </h2>
                <p className="mt-1 text-sm text-slate-700">
                  Early Payment Incentive brings in ₹24.0L on Oct 10 for a ₹48,000 discount — ₹30.52L net value protected (100% protected in this scenario).
                </p>
              </div>
            </div>
            <button
              onClick={() => setActiveScreen(SCREENS.IMPACT_CHAIN)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors cursor-pointer shrink-0 shadow-xs"
            >
              <span>See Protected Chain</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* 2. TOP METRICS STRIP (PLAIN BUSINESS LANGUAGE) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Current Cash Balance</span>
          <div className="mt-1 text-3xl font-extrabold font-mono text-slate-900">
            {metrics?.current_cash_position_formatted || '₹42.6L'}
          </div>
          <span className="text-xs text-slate-500 mt-1 block">Starting operating cash on hand</span>
        </div>

        <div className={`p-5 rounded-2xl border shadow-sm ${
          isProtected ? 'bg-emerald-50/50 border-emerald-200' : 'bg-rose-50/50 border-rose-200'
        }`}>
          <span className="text-xs font-semibold uppercase tracking-wider block text-slate-600">Cash Pressure (Lowest Cash)</span>
          <div className={`mt-1 text-3xl font-extrabold font-mono ${
            isProtected ? 'text-emerald-700' : 'text-rose-600'
          }`}>
            {metrics?.projected_min_cash_formatted || inflectionPoint.formatted}
          </div>
          <span className={`text-xs mt-1 block font-medium ${
            isProtected ? 'text-emerald-700' : 'text-rose-700'
          }`}>
            {isProtected ? 'Safely Above ₹15.0L Minimum' : 'Drops Below ₹15.0L Safe Limit on Oct 14'}
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Expected Payment Delay</span>
          <div className="mt-1 text-3xl font-extrabold font-mono text-amber-600">
            {customerRisk?.outstanding_formatted || '₹24.0L'}
          </div>
          <span className="text-xs text-slate-500 mt-1 block">ABC Industries (+{customerRisk?.predicted_delay_days || 21} Days Late)</span>
        </div>

        <div className={`p-5 rounded-2xl border shadow-sm ${
          isProtected ? 'bg-emerald-50/50 border-emerald-200' : 'bg-white border-slate-200/80'
        }`}>
          <span className="text-xs font-semibold uppercase tracking-wider block text-slate-500">
            {isProtected ? 'Revenue Protected' : 'Orders at Risk (Revenue Exposed)'}
          </span>
          <div className={`mt-1 text-3xl font-extrabold font-mono ${
            isProtected ? 'text-emerald-700' : 'text-rose-600'
          }`}>
            {isProtected ? '₹31.0L (100%)' : metrics?.revenue_exposure_formatted || '₹31.0L'}
          </div>
          <span className={`text-xs mt-1 block font-medium ${
            isProtected ? 'text-emerald-700' : 'text-rose-600'
          }`}>
            {isProtected ? '100% Protected in This Scenario (₹30.52L Net)' : '2 Customer Orders Delayed by 12-Day Stockout'}
          </span>
        </div>
      </div>

      {/* 3. 30-DAY CASHFLOW TIMELINE */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              30-Day Cash Balance Forecast
            </h3>
            <p className="text-xs text-slate-500">
              Shows how the 21-day late payment pushes cash below the ₹15.0L safe limit—and how the best action fixes it.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
            <span className="inline-flex items-center gap-1.5 text-blue-600 font-semibold">
              <span className="w-3 h-1 bg-blue-600 rounded-full" /> Normal Plan (Paid on Time)
            </span>
            <span className="inline-flex items-center gap-1.5 text-rose-600 font-semibold">
              <span className="w-3 h-1 bg-rose-600 rounded-full" /> Cash Pressure (21d Late)
            </span>
            <span className="inline-flex items-center gap-1.5 text-amber-600 font-semibold">
              <span className="w-3 h-0.5 border-t border-dashed border-amber-600" /> ₹15L Safe Limit
            </span>
          </div>
        </div>

        <div className="h-[350px] w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={timeline} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorBaselineLight" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0}/>
                </linearGradient>
                <linearGradient id="colorStressLight" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.0}/>
                </linearGradient>
                <linearGradient id="colorActiveLight" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.0}/>
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis dataKey="date" stroke="#94a3b8" tick={{ fontSize: 11, fill: '#64748b' }} />
              <YAxis
                stroke="#94a3b8"
                tick={{ fontSize: 11, fill: '#64748b' }}
                tickFormatter={(val) => `₹${(val / 100000).toFixed(0)}L`}
              />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine y={1500000} stroke="#f59e0b" strokeDasharray="4 4" strokeWidth={1.5} label={{ value: '₹15L Safe Limit', fill: '#d97706', fontSize: 10, position: 'right' }} />

              <Area
                type="monotone"
                dataKey="baseline_cash"
                name="Normal Plan"
                stroke="#3b82f6"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorBaselineLight)"
              />

              <Area
                type="monotone"
                dataKey="stress_cash"
                name="With 21-Day Delay"
                stroke="#e11d48"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorStressLight)"
              />

              {activeIntervention !== 'NONE' && (
                <Area
                  type="monotone"
                  dataKey="active_cash"
                  name="With Best Action"
                  stroke="#10b981"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorActiveLight)"
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Expandable "Why? / Details" */}
        <div className="pt-2 border-t border-slate-100">
          <button
            onClick={() => setShowChartDetails(!showChartDetails)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{showChartDetails ? 'Hide Ledger Calculation Details' : 'Why? / How Daily Cash Numbers Are Calculated'}</span>
            {showChartDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
          {showChartDetails && (
            <div className="mt-2 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-700 space-y-1">
              <div>• <strong>Normal Plan Minimum:</strong> ₹21.2L on Oct 30 (always stays above the ₹15.0L safe limit).</div>
              <div>• <strong>Cash Pressure Minimum (With 21d Delay):</strong> ₹6.6L on Oct 14 (falls ₹8.4L short of the ₹15.0L safe limit when Supplier X’s ₹12.0L bill comes due).</div>
              <div>• <strong>With Best Action (Option A):</strong> ₹20.72L minimum on Oct 30 (2% early-payment discount brings in ₹23.52L on Oct 10).</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
