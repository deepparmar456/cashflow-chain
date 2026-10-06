import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { AlertCircle, CheckCircle2, AlertTriangle, Calculator, ExternalLink } from 'lucide-react';
import { useSimulation } from '../../context/SimulationContext';

function CustomFinancialNode({ data, id }) {
  const { setSelectedNode, selectedNode } = useSimulation();
  const isSelected = selectedNode?.id === id;

  const statusConfig = {
    CRITICAL: {
      border: 'border-rose-400',
      bg: 'bg-rose-50/40',
      text: 'text-rose-600',
      badgeBg: 'bg-rose-100 text-rose-800 border-rose-200',
      icon: AlertCircle,
      glow: 'shadow-sm'
    },
    WARNING: {
      border: 'border-amber-400',
      bg: 'bg-amber-50/40',
      text: 'text-amber-600',
      badgeBg: 'bg-amber-100 text-amber-800 border-amber-200',
      icon: AlertTriangle,
      glow: 'shadow-sm'
    },
    HEALTHY: {
      border: 'border-emerald-400',
      bg: 'bg-emerald-50/40',
      text: 'text-emerald-600',
      badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      icon: CheckCircle2,
      glow: 'shadow-sm'
    }
  };

  const currentStatus = statusConfig[data.status] || statusConfig.CRITICAL;
  const StatusIcon = currentStatus.icon;

  return (
    <div
      onClick={() => setSelectedNode({ id, ...data })}
      className={`group relative w-[335px] rounded-2xl border-2 p-6 bg-white transition-all cursor-pointer ${
        currentStatus.bg
      } ${currentStatus.border} ${currentStatus.glow} ${
        isSelected ? 'ring-4 ring-blue-500/30 shadow-md scale-105' : 'hover:scale-[1.02] shadow-sm'
      }`}
    >
      <Handle type="target" position={Position.Left} className="!bg-slate-400 !w-3.5 !h-3.5" />
      <Handle type="source" position={Position.Right} className="!bg-blue-600 !w-3.5 !h-3.5" />

      {/* Top Header Row */}
      <div className="flex items-center justify-between gap-2 border-b border-slate-200 pb-3">
        <div className="flex items-center gap-2">
          <span className="flex items-center justify-center w-7 h-7 rounded-full bg-slate-100 text-xs font-mono font-extrabold text-slate-800 border border-slate-300">
            {data.step_number}
          </span>
          <span className="text-xs font-mono font-bold text-slate-600 uppercase tracking-wider">{data.subtitle}</span>
        </div>
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono font-bold uppercase border ${currentStatus.badgeBg}`}>
          <StatusIcon className="w-3.5 h-3.5" />
          <span>{data.status}</span>
        </span>
      </div>

      {/* Node Main Title & Key Monetary Impact */}
      <div className="mt-4">
        <h4 className="text-lg font-extrabold text-slate-900 truncate group-hover:text-blue-600 transition-colors">
          {data.title}
        </h4>
        <div className="mt-2.5 flex items-baseline justify-between">
          <span className="text-3xl font-black font-mono text-slate-900 tracking-tight">
            {data.amount}
          </span>
          <div className="text-right">
            <span className="text-xs text-slate-500 block font-mono font-semibold">{data.metric_label}</span>
            <span className={`text-base font-mono font-black ${currentStatus.text}`}>
              {data.metric_value}
            </span>
          </div>
        </div>
      </div>

      {/* Footer Cue */}
      <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs font-mono text-slate-500">
        <span className="flex items-center gap-1.5 text-blue-600 font-bold group-hover:text-blue-700 font-sans">
          <Calculator className="w-4 h-4" />
          <span>Click for numbers &amp; formula</span>
        </span>
        <ExternalLink className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100" />
      </div>
    </div>
  );
}

export default memo(CustomFinancialNode);
