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
      className={`group relative w-[320px] rounded-2xl border-2 p-5 bg-white transition-all cursor-pointer ${
        currentStatus.bg
      } ${currentStatus.border} ${currentStatus.glow} ${
        isSelected ? 'ring-4 ring-blue-500/30 shadow-md scale-105' : 'hover:scale-[1.02] shadow-sm'
      }`}
    >
      <Handle type="target" position={Position.Left} className="!bg-slate-300 !w-3 !h-3" />
      <Handle type="source" position={Position.Right} className="!bg-blue-600 !w-3 !h-3" />

      {/* Top Header Row */}
      <div className="flex items-center justify-between gap-2 border-b border-slate-200 pb-2.5">
        <div className="flex items-center gap-2">
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 text-xs font-mono font-bold text-slate-700 border border-slate-200">
            {data.step_number}
          </span>
          <span className="text-xs font-mono font-semibold text-slate-500 uppercase tracking-wider">{data.subtitle}</span>
        </div>
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold uppercase border ${currentStatus.badgeBg}`}>
          <StatusIcon className="w-3.5 h-3.5" />
          <span>{data.status}</span>
        </span>
      </div>

      {/* Node Main Title & Key Monetary Impact */}
      <div className="mt-3.5">
        <h4 className="text-base font-bold text-slate-900 truncate group-hover:text-blue-600 transition-colors">
          {data.title}
        </h4>
        <div className="mt-2 flex items-baseline justify-between">
          <span className="text-2xl font-black font-mono text-slate-900 tracking-tight">
            {data.amount}
          </span>
          <div className="text-right">
            <span className="text-[11px] text-slate-500 block font-mono font-medium">{data.metric_label}</span>
            <span className={`text-sm font-mono font-black ${currentStatus.text}`}>
              {data.metric_value}
            </span>
          </div>
        </div>
      </div>

      {/* Footer Cue */}
      <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-500">
        <span className="flex items-center gap-1.5 text-blue-600 font-semibold group-hover:text-blue-700">
          <Calculator className="w-3.5 h-3.5" />
          <span>Inspect Formula</span>
        </span>
        <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
      </div>
    </div>
  );
}

export default memo(CustomFinancialNode);
