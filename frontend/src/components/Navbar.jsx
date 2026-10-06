import React from 'react';
import { useSimulation, SCREENS } from '../context/SimulationContext';
import { Play, RefreshCw, UploadCloud } from 'lucide-react';

export default function Navbar() {
  const {
    activeScreen,
    setActiveScreen,
    startGuidedDemo,
    resetAll,
    setShowLoadCompanyModal,
    activeCompany
  } = useSimulation();

  const navItems = [
    { id: SCREENS.LANDING, label: 'Home' },
    { id: SCREENS.COMMAND_CENTER, label: 'Overview' },
    { id: SCREENS.CUSTOMER_RISK, label: 'Expected Delay' },
    { id: SCREENS.IMPACT_CHAIN, label: 'What Happens Next' },
    { id: SCREENS.INTERVENTIONS, label: 'Best Action' },
    { id: SCREENS.EXECUTIVE_MEMO, label: 'Summary Report' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand + Demo Scenario Badge */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActiveScreen(SCREENS.LANDING)}
            className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black text-sm shadow-xs">
              CF
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm sm:text-base tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                  CASHFLOW CHAIN
                </span>
              </div>
              <span className="text-[10px] text-slate-500 font-medium hidden sm:block">
                Predict → Trace → Prevent
              </span>
            </div>
          </button>

          {/* Subtle Scenario Label */}
          <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-[11px] font-medium text-slate-600 border border-slate-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="font-semibold text-slate-800">{activeCompany || 'Apex Components'}</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-500">Default Scenario: ABC Industries</span>
          </div>
        </div>

        {/* Center: Clean Business Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = activeScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveScreen(item.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 font-bold border border-blue-200/80 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right: Primary Start Guided Demo CTA & Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => startGuidedDemo(1)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xs hover:shadow-sm transition-all cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Start Guided Demo</span>
          </button>

          <button
            onClick={() => setShowLoadCompanyModal(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 shadow-2xs transition-colors cursor-pointer"
            title="Upload Custom Company CSV Data"
          >
            <UploadCloud className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline">Load Data</span>
          </button>

          <button
            onClick={resetAll}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer"
            title="Reset to Home"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
}
