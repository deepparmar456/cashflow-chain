import React, { useState } from 'react';
import { useSimulation, SCREENS } from '../context/SimulationContext';
import {
  Play,
  ArrowRight,
  AlertTriangle,
  Clock,
  Layers,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  CheckCircle2
} from 'lucide-react';

export default function LandingOverview() {
  const { startGuidedDemo, setActiveScreen, metrics, customerRisk, activeCompany } = useSimulation();
  const [showDetails, setShowDetails] = useState(false);

  const shockAmount = customerRisk?.outstanding_formatted || '₹24.0L';
  const minCash = metrics?.projected_min_cash_formatted || '₹6.6L';
  const exposure = metrics?.revenue_exposure_formatted || '₹31.0L';
  const delayDays = customerRisk?.predicted_delay_days || 21;

  return (
    <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12 font-sans">
      {/* 1. HERO SECTION */}
      <section className="text-center max-w-4xl mx-auto space-y-6">
        {/* Live Default Scenario Alert Pill */}
        <div className="inline-flex flex-wrap items-center justify-center gap-2.5 px-4 py-2 rounded-full bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm font-semibold shadow-2xs">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-pulse" />
          <span>DEFAULT DEMO SCENARIO:</span>
          <strong className="text-slate-900">
            &ldquo;ABC Industries may receive a ₹24L payment {delayDays} days late.&rdquo;
          </strong>
        </div>

        {/* Primary Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12]">
          See the financial shock before it becomes a business failure.
        </h1>

        {/* Supporting Copy */}
        <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
          CashFlow Chain predicts payment delays, shows what they could break next, and recommends what to do.
        </p>

        {/* Primary and Secondary CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            onClick={() => startGuidedDemo(1)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-base font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 transition-all cursor-pointer"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>START GUIDED DEMO</span>
          </button>

          <button
            onClick={() => setActiveScreen(SCREENS.COMMAND_CENTER)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-base font-semibold bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 shadow-2xs transition-all cursor-pointer"
          >
            <span>Explore Full Platform</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Core Question Callout */}
        <div className="pt-2">
          <p className="text-sm sm:text-base font-medium text-slate-500">
            The core question we answer:{' '}
            <span className="font-bold text-slate-800 italic">
              &ldquo;If one important customer pays late, what does that break next?&rdquo;
            </span>
          </p>
        </div>
      </section>

      {/* 2. ONLY 3 CONCEPTS: PREDICT → TRACE → PREVENT */}
      <section className="space-y-4">
        <div className="flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-widest text-blue-600">
          <span>HOW IT WORKS IN 60 SECONDS</span>
          <span>•</span>
          <span>PREDICT → TRACE → PREVENT</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Concept 1: Predict */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold">
                  01 PREDICT
                </span>
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-xl font-extrabold text-slate-900">
                Something might go wrong.
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Spots early warning signs before an invoice is missed. ABC Industries is expected to pay <strong className="text-slate-900">{shockAmount}</strong> about <strong className="text-rose-600">{delayDays} days late</strong>.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-500">
              <span>Expected Payment Delay</span>
              <span className="font-bold text-rose-600">+{delayDays} Days (87% conf.)</span>
            </div>
          </div>

          {/* Concept 2: Trace */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold">
                  02 TRACE
                </span>
                <Layers className="w-5 h-5 text-amber-600" />
              </div>
              <h2 className="text-xl font-extrabold text-slate-900">
                Here&apos;s what it could break.
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Maps how the problem spreads: Cash drops to <strong className="text-slate-900">{minCash}</strong> → Supplier X holds raw materials → 12-day inventory outage → <strong className="text-rose-600">{exposure}</strong> in customer orders at risk.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-500">
              <span>What Happens Next</span>
              <span className="font-bold text-rose-600">{exposure} Revenue Exposed</span>
            </div>
          </div>

          {/* Concept 3: Prevent */}
          <div className="p-6 rounded-2xl bg-emerald-50/40 border-2 border-emerald-500/70 shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white text-xs font-bold">
                  03 PREVENT
                </span>
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
              </div>
              <h2 className="text-xl font-extrabold text-slate-900">
                Here&apos;s the best response.
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Compares available options and recommends the lowest-cost fix: a <strong className="text-emerald-700">₹48,000</strong> early-payment discount that protects <strong className="text-emerald-700">100% ({exposure})</strong> of revenue.
              </p>
            </div>
            <div className="pt-3 border-t border-emerald-200/70 flex items-center justify-between text-xs font-mono text-emerald-800">
              <span>Best Action</span>
              <span className="font-bold text-emerald-700">₹48K saves {exposure} (64.6x ROI)</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ABC SCENARIO QUICK-START CARD */}
      <section className="p-6 sm:p-8 rounded-2xl bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
        <div className="space-y-1.5 text-center md:text-left">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-blue-400 uppercase tracking-wider font-semibold">
            <span>Interactive 5-Step Story Walkthrough</span>
            <span>•</span>
            <span>60–90 Seconds</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
            ABC Industries may receive a ₹24L payment 21 days late.
          </h3>
          <p className="text-sm text-slate-300 max-w-xl">
            Walk through the live scenario step-by-step: see why it happens, what it breaks next, and how the best response prevents ₹31L in lost orders.
          </p>
        </div>

        <button
          onClick={() => startGuidedDemo(1)}
          className="px-7 py-4 rounded-xl bg-blue-500 hover:bg-blue-400 text-slate-950 font-extrabold text-sm shadow-md transition-all shrink-0 cursor-pointer flex items-center gap-2"
        >
          <Play className="w-4 h-4 fill-current" />
          <span>START ABC DEMO</span>
        </button>
      </section>

      {/* 4. EXPANDABLE "WHY? / DETAILS" SECTION (KEEPS MAIN PAGE UNCLUTTERED) */}
      <section className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-2xs">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <HelpCircle className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-bold text-slate-800">
              Why normal accounting software isn&apos;t enough &amp; full scenario numbers
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-600">
            <span>{showDetails ? 'Hide Details' : 'Why? / View Details'}</span>
            {showDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </button>

        {showDetails && (
          <div className="px-6 pb-6 pt-2 border-t border-slate-100 space-y-6 text-sm text-slate-600">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1.5">
                <h4 className="font-bold text-slate-900">1. Accounting Software (Tally / QuickBooks)</h4>
                <p className="text-xs leading-relaxed">
                  <strong>Looks backward.</strong> Records invoices after they are overdue, with no warning of upcoming delays or factory impact.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1.5">
                <h4 className="font-bold text-slate-900">2. Basic Cash Tools (Float / Spreadsheets)</h4>
                <p className="text-xs leading-relaxed">
                  <strong>Stops at the bank balance.</strong> Doesn&apos;t connect cash gaps to supplier holds, raw material stockouts, or customer orders at risk.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-200 space-y-1.5">
                <h4 className="font-bold text-blue-950">3. CashFlow Chain (Our Approach)</h4>
                <p className="text-xs text-slate-700 leading-relaxed">
                  <strong>Connects finance to operations.</strong> Predicts the delay, traces the 6-step domino effect, and calculates the lowest-cost fix.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 font-mono text-xs">
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-slate-500 block">Company</span>
                <span className="font-bold text-slate-900">{activeCompany || 'Apex Components Ltd.'}</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-slate-500 block">Starting Cash / Safety Floor</span>
                <span className="font-bold text-slate-900">₹42.6L / ₹15.0L</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-slate-500 block">Lowest Projected Cash</span>
                <span className="font-bold text-rose-600">{minCash} (Oct 14)</span>
              </div>
              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200">
                <span className="text-emerald-700 block">Best Action Net Savings</span>
                <span className="font-bold text-emerald-800">+₹30.52L (64.6x ROI)</span>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
