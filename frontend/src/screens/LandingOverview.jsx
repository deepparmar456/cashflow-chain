import React from 'react';
import { useSimulation, SCREENS } from '../context/SimulationContext';
import {
  Play,
  ArrowRight,
  TrendingDown,
  Activity,
  Layers,
  ShieldCheck,
  AlertTriangle,
  HelpCircle,
  Clock,
  DollarSign,
  PackageCheck,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export default function LandingOverview() {
  const { startGuidedDemo, setActiveScreen, metrics, customerRisk, activeCompany } = useSimulation();

  const shockAmount = customerRisk?.outstanding_formatted || '₹24.0L';
  const minCash = metrics?.projected_min_cash_formatted || '₹6.6L';
  const exposure = metrics?.revenue_exposure_formatted || '₹31.0L';

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      {/* 1. HERO SECTION */}
      <section className="text-center max-w-4xl mx-auto space-y-6">
        {/* Scenario & Product Subtitle */}
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-medium shadow-sm">
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
          <span className="font-semibold tracking-wide uppercase">CASHFLOW CHAIN</span>
          <span className="text-blue-300">•</span>
          <span className="text-blue-600 font-mono text-[11px]">DEMO SCENARIO • SYNTHETIC SME DATA</span>
        </div>

        {/* Primary Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12]">
          See the financial shock before it becomes a business failure.
        </h1>

        {/* Supporting Copy */}
        <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto font-normal leading-relaxed">
          CashFlow Chain predicts payment delays, traces their second-order impact across cash, suppliers, inventory and revenue, and identifies the lowest-cost intervention to stop the cascade.
        </p>

        {/* Core Loop: PREDICT → TRACE → SIMULATE → PREVENT */}
        <div className="pt-2 pb-4">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-4 p-2 rounded-2xl bg-white border border-slate-200/80 shadow-sm text-xs font-semibold text-slate-700">
            <span className="px-3 py-1.5 rounded-xl bg-slate-50 text-slate-900 border border-slate-200">
              01 PREDICT
            </span>
            <span className="text-slate-300">→</span>
            <span className="px-3 py-1.5 rounded-xl bg-slate-50 text-slate-900 border border-slate-200">
              02 TRACE
            </span>
            <span className="text-slate-300">→</span>
            <span className="px-3 py-1.5 rounded-xl bg-slate-50 text-slate-900 border border-slate-200">
              03 SIMULATE
            </span>
            <span className="text-slate-300">→</span>
            <span className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200">
              04 PREVENT
            </span>
          </div>
        </div>

        {/* The Core Question Card */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-50/70 via-indigo-50/50 to-blue-50/70 border border-blue-200/60 max-w-2xl mx-auto shadow-sm">
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider block mb-1">
            The Critical Question for Growing Businesses
          </span>
          <p className="text-lg sm:text-xl font-bold text-slate-900 italic">
            &ldquo;If one important customer pays late, what does that break next?&rdquo;
          </p>
        </div>

        {/* Primary and Secondary CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={() => startGuidedDemo(1)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-base font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 transition-all cursor-pointer"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>RUN GUIDED DEMO</span>
          </button>

          <button
            onClick={() => setActiveScreen(SCREENS.COMMAND_CENTER)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-base font-medium bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 shadow-sm transition-all cursor-pointer"
          >
            <span>Explore Platform</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 2. KEY METRICS AT A GLANCE (CANONICAL BENCHMARK NUMBERS) */}
      <section className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
              Benchmark Scenario Profile
            </h2>
            <p className="text-base font-bold text-slate-900">
              {activeCompany || 'Apex Components Ltd.'} • Automotive Precision Manufacturing
            </p>
          </div>
          <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-100 text-slate-700 self-start sm:self-auto">
            Opening Cash: ₹42.6L • Safety Floor: ₹15.0L
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Shock */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
            <span className="text-xs font-medium text-slate-500 block uppercase">1. Inflow Shock</span>
            <div className="mt-1 text-2xl font-bold font-mono text-rose-600">{shockAmount}</div>
            <p className="text-xs text-slate-600 mt-1">ABC Industries 21-day delay predicted by linear trend model.</p>
          </div>

          {/* Card 2: Liquidity Breach */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
            <span className="text-xs font-medium text-slate-500 block uppercase">2. Stress Min Cash</span>
            <div className="mt-1 text-2xl font-bold font-mono text-amber-600">{minCash}</div>
            <p className="text-xs text-slate-600 mt-1">Breaches ₹15.0L safety floor on Day 14 (Oct 14, 2026).</p>
          </div>

          {/* Card 3: Downstream Revenue Exposure */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
            <span className="text-xs font-medium text-slate-500 block uppercase">3. Revenue Exposure</span>
            <div className="mt-1 text-2xl font-bold font-mono text-rose-700">{exposure}</div>
            <p className="text-xs text-slate-600 mt-1">12-day assembly stockout cancels Orders SO-4021 &amp; SO-4029.</p>
          </div>

          {/* Card 4: Recommended Intervention */}
          <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200/80">
            <span className="text-xs font-medium text-emerald-700 block uppercase">4. Optimal Solution</span>
            <div className="mt-1 text-2xl font-bold font-mono text-emerald-700">₹48,000</div>
            <p className="text-xs text-emerald-800 mt-1">Early payment discount saves ₹31.0L (64.6x Net ROI).</p>
          </div>
        </div>
      </section>

      {/* 3. WHY NORMAL ACCOUNTING SOFTWARE IS INSUFFICIENT */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
            Industry Blindspot
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Why Traditional Tools Fail SMEs
          </h2>
          <p className="text-sm text-slate-600">
            82% of small businesses that close are profitable on paper. They fail because financial delays break operations invisibly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pillar 1: Accounting */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-sm">
              01
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Accounting Software
            </h3>
            <p className="text-xs font-mono text-slate-500">Tally • QuickBooks • Zoho Books</p>
            <p className="text-sm text-slate-600 leading-relaxed">
              <strong>Rearview mirror bookkeeping.</strong> Records what already happened yesterday. Treats invoices as static isolated rows without predictive delay foresight.
            </p>
          </div>

          {/* Pillar 2: Forecasting */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-sm">
              02
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Cash Forecasting Tools
            </h3>
            <p className="text-xs font-mono text-slate-500">Float • Pulse • PlanGuru</p>
            <p className="text-sm text-slate-600 leading-relaxed">
              <strong>Stops at the bank account.</strong> Pure financial spreadsheet. Completely blind to raw material procurement lead times, factory buffers, and customer contract SLAs.
            </p>
          </div>

          {/* Pillar 3: CashFlow Chain */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-blue-50/50 to-white border-2 border-blue-500/60 shadow-sm space-y-3 relative">
            <span className="absolute top-4 right-4 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-blue-600 text-white">
              CASHFLOW CHAIN
            </span>
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
              03
            </div>
            <h3 className="text-lg font-bold text-blue-950">
              Second-Order Decision Engine
            </h3>
            <p className="text-xs font-mono text-blue-600">Predict → Trace → Simulate → Prevent</p>
            <p className="text-sm text-slate-700 leading-relaxed">
              <strong>Connects finance to the factory floor.</strong> Uses machine learning to forecast delays, traces the 6-node downstream operational domino, and solves for the lowest-cost intervention.
            </p>
          </div>
        </div>
      </section>

      {/* 4. FAST JUMP BANNER */}
      <section className="p-8 rounded-2xl bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
        <div className="space-y-1.5 text-center md:text-left">
          <span className="text-xs font-mono text-blue-400 uppercase tracking-wider font-semibold">
            Interactive Product Walkthrough
          </span>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
            Ready to experience the 5-step decision flow?
          </h3>
          <p className="text-sm text-slate-400 max-w-xl">
            See how a single payment delay escalates into a ₹31L factory crisis, and how Option A stops it for ₹48K.
          </p>
        </div>

        <button
          onClick={() => startGuidedDemo(1)}
          className="px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-400 text-slate-950 font-bold text-sm shadow-md transition-all shrink-0 cursor-pointer flex items-center gap-2"
        >
          <Play className="w-4 h-4 fill-current" />
          <span>START GUIDED DEMO</span>
        </button>
      </section>
    </div>
  );
}
