import React, { useState } from 'react';
import { useSimulation, DEMO_STEPS } from '../context/SimulationContext';
import { ChevronLeft, ChevronRight, RotateCcw, ChevronDown, ChevronUp } from 'lucide-react';

export default function DemoStepper() {
  const { demoStep, goToDemoStep, nextDemoStep, prevDemoStep, resetAll } = useSimulation();
  const [minimized, setMinimized] = useState(false);
  const current = DEMO_STEPS.find(s => s.step === demoStep) || DEMO_STEPS[0];

  if (minimized) {
    return (
      <div className="fixed bottom-4 right-6 z-50 font-sans">
        <button
          onClick={() => setMinimized(false)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/95 border border-slate-300 text-slate-800 hover:text-blue-600 shadow-md text-xs font-semibold backdrop-blur transition-all cursor-pointer"
        >
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
          <span>Pitch Walkthrough ({current.step}/11): {current.title.split('. ')[1]}</span>
          <ChevronUp className="w-3.5 h-3.5 text-slate-500" />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-4xl px-4 font-sans">
      <div className="bg-white/95 backdrop-blur-md border border-slate-300 shadow-xl rounded-xl p-2.5 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
        {/* Step indicator info */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-50 text-blue-600 font-mono font-bold text-xs border border-blue-200 shrink-0">
            {current.step}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-900 truncate text-xs">{current.title}</span>
              <span className="text-[9px] uppercase font-mono px-1 py-0.2 rounded bg-slate-100 text-slate-600 border border-slate-200 shrink-0">
                Story Flow
              </span>
            </div>
            <p className="text-[11px] text-slate-500 truncate">{current.action}</p>
          </div>
        </div>

        {/* Stepper progress dots */}
        <div className="hidden md:flex items-center gap-1.5 px-2">
          {DEMO_STEPS.map((s) => (
            <button
              key={s.step}
              onClick={() => goToDemoStep(s.step)}
              title={`${s.step}. ${s.title}`}
              className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                s.step === demoStep
                  ? 'w-5 bg-blue-600'
                  : s.step < demoStep
                  ? 'bg-emerald-500/80'
                  : 'bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>

        {/* Controller buttons */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto justify-end shrink-0">
          <button
            onClick={resetAll}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer"
            title="Restart from Step 1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={prevDemoStep}
            disabled={demoStep === 1}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-3 h-3" />
            <span>Prev</span>
          </button>

          <button
            onClick={nextDemoStep}
            disabled={demoStep === DEMO_STEPS.length}
            className="flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-40 disabled:pointer-events-none transition-colors shadow-xs cursor-pointer"
          >
            <span>Next</span>
            <ChevronRight className="w-3 h-3" />
          </button>

          <button
            onClick={() => setMinimized(true)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer"
            title="Minimize Stepper"
          >
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
