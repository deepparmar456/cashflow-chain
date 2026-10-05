import React from 'react';
import { useSimulation, SCREENS } from '../context/SimulationContext';
import {
  AlertTriangle, ArrowRight, TrendingUp, Calendar, Clock, DollarSign,
  ShieldAlert, Activity, FileText, CheckCircle2, ChevronRight, BarChart3, Calculator
} from 'lucide-react';

export default function CustomerRisk() {
  const { customerRisk, setActiveScreen } = useSimulation();

  if (!customerRisk) {
    return (
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 py-16 text-center font-sans">
        <div className="inline-flex items-center gap-3 p-4 px-6 rounded-xl bg-white border border-slate-200 text-slate-600 shadow-sm">
          <Activity className="w-5 h-5 text-blue-600 animate-spin" />
          <span>Loading Customer Risk Diagnostics...</span>
        </div>
      </div>
    );
  }

  const signals = Array.isArray(customerRisk.signals) ? customerRisk.signals : [];
  const invoiceList = Array.isArray(customerRisk.historical_invoices) && customerRisk.historical_invoices.length > 0
    ? customerRisk.historical_invoices
    : (Array.isArray(customerRisk.invoices) ? customerRisk.invoices : []);

  return (
    <div className="max-w-[1720px] mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* 1. HEADER & PRIMARY CALL TO ACTION */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold uppercase bg-rose-50 text-rose-700 border border-rose-200">
              Root Cause Diagnostic
            </span>
            <span className="text-xs font-mono text-slate-500">
              Customer ID: {customerRisk.customer_id || 'CUST-001'}
            </span>
          </div>
          <h2 className="mt-1.5 text-2xl font-extrabold text-slate-900 flex items-center gap-3 tracking-tight">
            <span>{customerRisk.name || 'ABC Industries'}</span>
            <span className="text-xs font-mono font-normal px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
              {customerRisk.tier || 'Tier-1 Enterprise'}
            </span>
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Focal Account generating 48.2% of scheduled early-October cash inflows.
          </p>
        </div>

        {/* PRIMARY CTA: SIMULATE CASCADE */}
        <button
          onClick={() => setActiveScreen(SCREENS.IMPACT_CHAIN)}
          className="group flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-xs hover:shadow-sm transition-all shrink-0 cursor-pointer"
        >
          <span>SIMULATE CASCADE</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* 2. RISK SCORECARD TILES */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Outstanding */}
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Receivable at Risk</span>
          <div className="mt-1 text-3xl font-extrabold font-mono tracking-tight text-slate-900">
            {customerRisk.outstanding_formatted || '₹24.0L'}
          </div>
          <span className="text-[11px] font-mono text-slate-500 mt-1 block">
            Invoice: {customerRisk.invoice_id || 'INV-2026-0891'}
          </span>
        </div>

        {/* Expected Payment */}
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Expected Payment</span>
          <div className="mt-1 text-2xl font-bold font-mono text-slate-800">
            {customerRisk.expected_payment_date || '08 Oct 2026'}
          </div>
          <span className="text-[11px] font-mono text-emerald-700 mt-1 block font-medium">
            Contractual Net-30 Due
          </span>
        </div>

        {/* Predicted Payment */}
        <div className="p-4 rounded-xl bg-rose-50/50 border border-rose-200 shadow-sm">
          <span className="text-xs font-semibold text-rose-700 uppercase tracking-wider block">Predicted Payment</span>
          <div className="mt-1 text-2xl font-bold font-mono text-rose-700">
            {customerRisk.predicted_payment_date || '29 Oct 2026'}
          </div>
          <span className="text-[11px] font-mono text-rose-700 mt-1 block font-medium">
            Late Inflow Delivery
          </span>
        </div>

        {/* Predicted Delay */}
        <div className="p-4 rounded-xl bg-rose-50/80 border-2 border-rose-300 shadow-sm">
          <span className="text-xs font-semibold text-rose-800 uppercase tracking-wider block">Predicted Delay</span>
          <div className="mt-1 text-3xl font-black font-mono tracking-tight text-rose-600">
            +{customerRisk.predicted_delay_days || 21} Days
          </div>
          <span className="text-[11px] font-mono text-rose-700 mt-1 block font-bold">
            Working Capital Shortfall Trigger
          </span>
        </div>

        {/* Confidence Score */}
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Model Confidence</span>
          <div className="mt-1 text-3xl font-extrabold font-mono tracking-tight text-blue-600">
            {customerRisk.confidence_formatted || '87%'}
          </div>
          <span className="text-[11px] font-mono text-slate-500 mt-1 block">
            Payment Delay Trend Model
          </span>
        </div>
      </div>

      {/* 2.5 TRANSPARENT PREDICTIVE MODEL DERIVATION */}
      {customerRisk.model_metadata && (
        <div className="p-4 rounded-xl bg-white border border-blue-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2">
            <Calculator className="w-4 h-4 text-blue-600 shrink-0" />
            <span>
              <strong className="text-slate-900">Predictive Engine:</strong> <code className="text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 font-bold">{customerRisk.model_metadata.formula}</code> (t=4 → +{customerRisk.predicted_delay_days} days)
            </span>
          </div>
          <div className="flex items-center gap-3 text-slate-600 text-[11px]">
            <span>Goodness of Fit: <strong className="text-slate-900">R² = {customerRisk.model_metadata.r_squared}</strong></span>
            <span>•</span>
            <span>Delay Slope: <strong className="text-rose-600 font-bold">+{customerRisk.model_metadata.slope}d / period</strong></span>
            <span>•</span>
            <span>Risk Confidence: <strong className="text-blue-600 font-bold">{customerRisk.confidence_formatted}</strong></span>
          </div>
        </div>
      )}

      {/* 3. THE 4 QUANTITATIVE RISK SIGNALS */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <Activity className="w-4 h-4 text-blue-600" />
            <span>Underlying Causal Signals (4 Critical Drivers)</span>
          </h3>
          <span className="text-xs font-mono text-slate-500">Deterministic Feature Weights</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {signals.map((sig, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl border shadow-xs transition-all ${
                sig.severity === 'CRITICAL'
                  ? 'bg-rose-50/40 border-rose-200 hover:border-rose-300'
                  : 'bg-amber-50/40 border-amber-200 hover:border-amber-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-slate-200 text-xs font-mono font-bold text-slate-700">
                    {idx + 1}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 font-sans">{sig.title}</h4>
                </div>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase font-semibold ${
                  sig.severity === 'CRITICAL'
                    ? 'bg-rose-100 text-rose-800 border-rose-200'
                    : 'bg-amber-100 text-amber-800 border-amber-200'
                }`}>
                  {sig.metric}
                </span>
              </div>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed font-sans">
                {sig.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 4. HISTORICAL PAYMENT BEHAVIOUR & DELAY TREND ESCALATION */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">HISTORICAL PAYMENT TRAJECTORY</h3>
            <p className="text-xs text-slate-500">
              Demonstrates escalating delay progression over the past 90 days.
            </p>
          </div>
          <span className="text-xs font-mono text-rose-700 bg-rose-50 px-2.5 py-1 rounded border border-rose-200 font-semibold">
            Deteriorating Trend: +{customerRisk.model_metadata?.slope || 5.0} Days / Period
          </span>
        </div>

        {/* Ledger Table */}
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 font-semibold">Invoice Number</th>
                <th className="px-4 py-3 font-semibold">Amount</th>
                <th className="px-4 py-3 font-semibold">Scheduled Due</th>
                <th className="px-4 py-3 font-semibold">Actual / Est. Settled</th>
                <th className="px-4 py-3 font-semibold">Payment Delay</th>
                <th className="px-4 py-3 font-semibold text-right">Ledger Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {invoiceList.map((inv, idx) => {
                const invNum = inv.invoice || inv.invoice_id || `INV-00${idx + 1}`;
                const invAmt = inv.amount_formatted || (typeof inv.amount === 'number' ? `₹${(inv.amount / 100000).toFixed(1)}L` : inv.amount || '-');
                const invDue = inv.due || inv.due_date || '-';
                const invPaid = inv.paid || inv.settled_date || (inv.status === 'AT RISK' || inv.status === 'OPEN' ? 'Pending' : 'Settled');
                const invDelay = inv.delay || (inv.delay_days !== undefined ? (inv.delay_days > 0 ? `+${inv.delay_days} days late` : 'On Time') : '-');
                const invStatus = inv.status || 'SETTLED';
                const isAtRisk = invStatus === 'AT RISK' || invStatus === 'OPEN';

                return (
                  <tr key={idx} className={isAtRisk ? 'bg-rose-50/60 font-bold' : 'hover:bg-slate-50'}>
                    <td className="px-4 py-3 text-slate-900 flex items-center gap-1.5 font-sans">
                      {isAtRisk && <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse" />}
                      <span>{invNum}</span>
                    </td>
                    <td className="px-4 py-3 text-slate-800">{invAmt}</td>
                    <td className="px-4 py-3 text-slate-500">{invDue}</td>
                    <td className="px-4 py-3 text-slate-600">{invPaid}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded text-[11px] ${
                        isAtRisk
                          ? 'bg-rose-100 text-rose-800 border border-rose-200'
                          : 'bg-slate-100 text-slate-700'
                      }`}>
                        {invDelay}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                        isAtRisk
                          ? 'bg-rose-600 text-white'
                          : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      }`}>
                        {invStatus}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
