import React, { useState } from 'react';
import { useSimulation, SCREENS } from '../../context/SimulationContext';
import { X, Calculator, ArrowRight, Layers, FileText, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export default function NodeDetailsDrawer() {
  const { selectedNode, setSelectedNode, setActiveScreen } = useSimulation();
  const [showFormula, setShowFormula] = useState(false);

  if (!selectedNode) return null;

  const { title, subtitle, amount, status, metric_label, metric_value, details } = selectedNode;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[460px] bg-white border-l border-slate-200 shadow-2xl flex flex-col animate-in slide-in-from-right duration-200 font-sans">
      {/* Drawer Header */}
      <div className="p-5 border-b border-slate-200 flex items-start justify-between bg-slate-50">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
              Step #{selectedNode.step_number} in Chain
            </span>
            <span className="text-xs text-slate-500 uppercase font-semibold">{subtitle}</span>
          </div>
          <h3 className="mt-1.5 text-lg font-bold text-slate-900 flex items-center gap-2">
            {title}
          </h3>
        </div>
        <button
          onClick={() => setSelectedNode(null)}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Drawer Body */}
      <div className="flex-1 overflow-y-auto p-5 space-y-5">
        {/* Core Node Metrics Banner */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 block uppercase font-semibold">Key Amount</span>
            <span className="text-2xl font-extrabold font-mono text-slate-900 mt-0.5 block">{amount}</span>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-500 block uppercase font-semibold">{metric_label}</span>
            <span className={`text-base font-bold font-mono ${
              status === 'CRITICAL' ? 'text-rose-600' : status === 'WARNING' ? 'text-amber-600' : 'text-emerald-600'
            }`}>
              {metric_value}
            </span>
          </div>
        </div>

        {/* Plain Business Explanation */}
        <div className="space-y-1.5">
          <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-blue-600" />
            <span>What Happens at This Step</span>
          </h4>
          <p className="text-xs leading-relaxed text-slate-700 bg-slate-50 p-3.5 rounded-lg border border-slate-200">
            {details?.explanation || "This step shows how the payment delay spreads through the business."}
          </p>
        </div>

        {/* Supporting Numbers Table */}
        {details?.variables && (
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-purple-600" />
              <span>Supporting Numbers</span>
            </h4>
            <div className="rounded-lg border border-slate-200 overflow-hidden bg-white">
              <table className="w-full text-left text-xs font-mono">
                <tbody className="divide-y divide-slate-100">
                  {Object.entries(details.variables).map(([key, val]) => (
                    <tr key={key} className="hover:bg-slate-50">
                      <td className="px-3.5 py-2.5 text-slate-500 border-r border-slate-100 w-1/2 font-sans">{key}</td>
                      <td className="px-3.5 py-2.5 text-slate-900 font-semibold">{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Expandable Technical Formula */}
        {details?.formula && (
          <div className="pt-2 border-t border-slate-200">
            <button
              onClick={() => setShowFormula(!showFormula)}
              className="flex items-center justify-between w-full text-left text-xs font-semibold text-blue-600 hover:text-blue-800 cursor-pointer"
            >
              <span className="flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>{showFormula ? 'Hide Mathematical Formula' : 'Why? / View Exact Calculation Formula'}</span>
              </span>
              {showFormula ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {showFormula && (
              <div className="mt-2 p-3.5 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs text-sky-300 overflow-x-auto shadow-inner">
                <code>{details.formula}</code>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Drawer Action Footer */}
      <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
        <button
          onClick={() => setSelectedNode(null)}
          className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-colors cursor-pointer"
        >
          Close
        </button>
        <button
          onClick={() => {
            setSelectedNode(null);
            setActiveScreen(SCREENS.INTERVENTIONS);
          }}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-colors cursor-pointer"
        >
          <span>Compare Best Actions</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
