import React, { useState } from 'react';
import { useSimulation, SCREENS } from '../context/SimulationContext';
import { uploadDataPack } from '../api/client';
import { 
  X, 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  Building2, 
  ArrowRight, 
  Download, 
  Layers, 
  Cpu, 
  AlertCircle,
  AlertTriangle,
  Database,
  Trash2,
  FileCheck,
  Sparkles
} from 'lucide-react';

const REQUIRED_FILES = [
  {
    name: 'company.csv',
    title: 'Company Profile & Buffers',
    description: 'company_name, starting_cash, safety_threshold',
    columns: ['company_name', 'starting_cash', 'safety_threshold']
  },
  {
    name: 'receivables.csv',
    title: 'Accounts Receivable Ledger',
    description: 'invoice_id, customer_name, amount, due_date, status, settled_date, delay_days',
    columns: ['invoice_id', 'customer_name', 'amount', 'due_date', 'status', 'settled_date', 'delay_days']
  },
  {
    name: 'payables.csv',
    title: 'Accounts Payable Ledger',
    description: 'payable_id, supplier_name, amount, due_date, lead_time_days',
    columns: ['payable_id', 'supplier_name', 'amount', 'due_date', 'lead_time_days']
  },
  {
    name: 'inventory.csv',
    title: 'Factory SKU Inventory',
    description: 'sku_id, sku_name, days_of_stock, daily_burn_rate_units, supplier_name',
    columns: ['sku_id', 'sku_name', 'days_of_stock', 'daily_burn_rate_units', 'supplier_name']
  },
  {
    name: 'sales_orders.csv',
    title: 'Committed Sales Orders',
    description: 'order_id, customer_name, sku_id, units, unit_price, delivery_due_date',
    columns: ['order_id', 'customer_name', 'sku_id', 'units', 'unit_price', 'delivery_due_date']
  }
];

// Pre-packaged Zenith Precision sample dataset for instant 1-click evaluation
const ZENITH_SAMPLE_DATA = {
  'company.csv': `company_name,starting_cash,safety_threshold\nZenith Precision Engineering Ltd.,3800000,1200000\n`,
  'receivables.csv': `invoice_id,customer_name,amount,due_date,status,settled_date,delay_days\nINV-Z-011,Titan Heavy Industries,1200000,2026-06-10,PAID,2026-06-15,5\nINV-Z-022,Titan Heavy Industries,1400000,2026-07-15,PAID,2026-07-25,10\nINV-Z-033,Titan Heavy Industries,1600000,2026-08-20,PAID,2026-09-04,15\nINV-Z-1001,Titan Heavy Industries,1800000,2026-10-09,OPEN,,\nINV-Z-1002,Kalyani Steels Ltd,520000,2026-10-16,OPEN,,\nINV-Z-1003,Thermax Power Aux,380000,2026-10-24,OPEN,,\n`,
  'payables.csv': `payable_id,supplier_name,amount,due_date,lead_time_days\nPINV-Z-801,Precision Alloys Forge Ltd,1000000,2026-10-15,14\nPINV-Z-802,Sterling CNC Fasteners,320000,2026-10-12,7\nPINV-Z-803,Zenith Corrugated Packaging,180000,2026-10-19,4\nPINV-Z-804,SuperClean Industrial Solvents,220000,2026-10-25,6\n`,
  'inventory.csv': `sku_id,sku_name,days_of_stock,daily_burn_rate_units,supplier_name\nSKU-ZEN-401,Turbine Flange Assembly 200mm,15,8,Precision Alloys Forge Ltd\n`,
  'sales_orders.csv': `order_id,customer_name,sku_id,units,unit_price,delivery_due_date\nSO-Z-8801,Global Energy Systems,SKU-ZEN-401,60,25000,2026-10-22\nSO-Z-8802,National Infrastructure Corp,SKU-ZEN-401,40,25000,2026-10-26\n`
};

export default function LoadCompanyDataModal() {
  const { 
    showLoadCompanyModal, 
    setShowLoadCompanyModal, 
    setActiveScreen, 
    resetToBenchmark,
    refreshAll,
    setActiveCompany
  } = useSimulation();

  // Attached files map: { [filename]: { name: string, content?: string, file?: File, size: number } }
  const [attachedFiles, setAttachedFiles] = useState({});
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState('');
  const [validationError, setValidationError] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);

  if (!showLoadCompanyModal) return null;

  // Handle file uploads via input or drop
  const handleFilesAdded = async (fileList) => {
    setValidationError(null);
    setAnalysisResult(null);

    const newFiles = { ...attachedFiles };
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      const cleanName = file.name.trim().toLowerCase();
      // Match with required file name if close
      const matched = REQUIRED_FILES.find(rf => rf.name.toLowerCase() === cleanName);
      const targetName = matched ? matched.name : cleanName;

      const text = await file.text();
      newFiles[targetName] = {
        name: file.name,
        targetKey: targetName,
        content: text,
        size: file.size
      };
    }
    setAttachedFiles(newFiles);
  };

  const handleInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFilesAdded(e.target.files);
    }
  };

  const handleRemoveFile = (key) => {
    const updated = { ...attachedFiles };
    delete updated[key];
    setAttachedFiles(updated);
    setValidationError(null);
    setAnalysisResult(null);
  };

  // Quick-load pre-calibrated sample: Zenith Precision
  const handleQuickLoadZenith = () => {
    setValidationError(null);
    setAnalysisResult(null);
    const simulated = {};
    for (const [key, content] of Object.entries(ZENITH_SAMPLE_DATA)) {
      simulated[key] = {
        name: key,
        targetKey: key,
        content: content,
        size: new Blob([content]).size
      };
    }
    setAttachedFiles(simulated);
  };

  // Clear all attached files
  const handleClearFiles = () => {
    setAttachedFiles({});
    setValidationError(null);
    setAnalysisResult(null);
  };

  // Submit and analyze data pack
  const handleAnalyze = async () => {
    setValidationError(null);
    setAnalysisResult(null);

    // 1. Client-side check for all 5 files
    const missingClientFiles = REQUIRED_FILES
      .map(rf => rf.name)
      .filter(fname => !attachedFiles[fname]);

    if (missingClientFiles.length > 0) {
      setValidationError({
        error_type: 'MISSING_FILES',
        message: `Incomplete SME Data Pack. Missing ${missingClientFiles.length} required CSV file(s): ${missingClientFiles.join(', ')}.`,
        missing_files: missingClientFiles
      });
      return;
    }

    setAnalyzing(true);
    setAnalysisStep('Reading and validating 5 SME CSV schemas...');

    try {
      // Build payload mapping filename -> string content
      const filesPayload = {};
      for (const rf of REQUIRED_FILES) {
        filesPayload[rf.name] = attachedFiles[rf.name].content;
      }

      await new Promise(r => setTimeout(r, 400));
      setAnalysisStep('Fitting payment delay regression model to receivables history...');

      await new Promise(r => setTimeout(r, 500));
      setAnalysisStep('Tracing 6-node dependency graph (Cash → Supplier → Stockout → Sales Orders)...');

      // Call API
      const result = await uploadDataPack(filesPayload);

      if (!result.success) {
        setAnalyzing(false);
        setValidationError(result);
        return;
      }

      await new Promise(r => setTimeout(r, 400));
      setAnalyzing(false);
      setAnalysisResult(result);
      if (result.company_name) {
        setActiveCompany(result.company_name);
      }
    } catch (err) {
      setAnalyzing(false);
      setValidationError({
        error_type: 'ANALYSIS_ERROR',
        message: `Unexpected analysis error: ${err.message}`
      });
    }
  };

  const handleFinishAndOpen = () => {
    refreshAll();
    setShowLoadCompanyModal(false);
    setActiveScreen(SCREENS.COMMAND_CENTER);
  };

  const handleLoadBenchmark = async () => {
    await resetToBenchmark();
    setShowLoadCompanyModal(false);
    setActiveScreen(SCREENS.COMMAND_CENTER);
  };

  // Count how many of the 5 files are attached
  const attachedCount = REQUIRED_FILES.filter(rf => !!attachedFiles[rf.name]).length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-3 sm:p-6 pt-12 sm:pt-14 bg-slate-900/40 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden flex flex-col mb-12">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-slate-900 tracking-tight">Load Company Data</h2>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 font-semibold">
                  SME Data Pack (.CSV)
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Upload a 5-file SME financial data pack, or restore the default ABC Industries demo scenario.
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowLoadCompanyModal(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            
            {/* Column 1: Upload SME Data Pack (.CSV) */}
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <UploadCloud className="w-4 h-4 text-blue-600" />
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                      Upload SME Data Pack (.CSV)
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono text-blue-700 bg-blue-100/60 border border-blue-200 px-2 py-0.5 rounded font-medium">
                    .CSV ONLY
                  </span>
                </div>

                <p className="text-xs text-slate-600 mb-3.5 leading-relaxed">
                  Supply the 5 standard ERP/accounting CSV files to solve working capital breaches, factory stockouts, and downstream revenue exposure.
                </p>

                {/* 5-File Checklist */}
                <div className="mb-3.5 space-y-2 p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm">
                  <div className="text-[11px] font-mono text-slate-700 font-semibold mb-2 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <FileCheck className="w-3.5 h-3.5 text-blue-600" />
                      <span>REQUIRED 5-FILE PACK ({attachedCount}/5):</span>
                    </span>
                    <div className="flex items-center gap-2">
                      <a
                        href="/api/download-datapack/zenith"
                        download="zenith_precision_sme_datapack.zip"
                        className="text-[10px] text-blue-600 hover:text-blue-700 flex items-center gap-1 font-mono transition-colors"
                        title="Download sample 5-file zip archive"
                      >
                        <Download className="w-3 h-3" />
                        <span>Sample ZIP</span>
                      </a>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    {REQUIRED_FILES.map((rf) => {
                      const isAttached = !!attachedFiles[rf.name];
                      const fileInfo = attachedFiles[rf.name];
                      return (
                        <div
                          key={rf.name}
                          className={`p-2 px-2.5 rounded-lg border text-xs font-mono flex items-center justify-between transition-colors ${
                            isAttached
                              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                              : 'bg-slate-50 border-slate-200 text-slate-500'
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate">
                            <span className={isAttached ? 'text-emerald-600 font-bold' : 'text-slate-400'}>
                              {isAttached ? '✓' : '○'}
                            </span>
                            <span className="font-semibold text-slate-800">{rf.name}</span>
                            <span className="text-[10px] text-slate-400 truncate hidden sm:inline">
                              — {rf.title}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0">
                            {isAttached ? (
                              <>
                                <span className="text-[10px] text-emerald-700 font-medium">
                                  {(fileInfo.size / 1024).toFixed(1)} KB
                                </span>
                                <button
                                  onClick={() => handleRemoveFile(rf.name)}
                                  className="p-0.5 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                                  title={`Remove ${rf.name}`}
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </>
                            ) : (
                              <span className="text-[10px] text-amber-600 font-medium">Pending</span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Quick-Action Utilities */}
                  <div className="pt-2 flex items-center justify-between border-t border-slate-100 mt-2">
                    <button
                      onClick={handleQuickLoadZenith}
                      className="text-[11px] text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Sparkles className="w-3 h-3 text-blue-500" />
                      <span>Quick-Load: Zenith Precision Ltd.</span>
                    </button>
                    {attachedCount > 0 && (
                      <button
                        onClick={handleClearFiles}
                        className="text-[11px] text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                      >
                        Clear Attached
                      </button>
                    )}
                  </div>
                </div>

                {/* File Dropzone / Multi-File Selector */}
                <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-xl bg-white hover:bg-blue-50/20 transition-all cursor-pointer group">
                  <input
                    type="file"
                    multiple
                    accept=".csv,text/csv"
                    onChange={handleInputChange}
                    className="hidden"
                  />
                  <UploadCloud className="w-6 h-6 text-slate-400 group-hover:text-blue-600 transition-colors mb-1.5" />
                  <span className="text-xs font-semibold text-slate-700 group-hover:text-blue-600">
                    Drop or Select CSV Files ({attachedCount}/5 attached)
                  </span>
                  <span className="text-[11px] text-slate-400 mt-0.5">
                    Select all 5 CSVs or attach individually (.CSV only)
                  </span>
                </label>

                {/* Schema Validation Error Breakdown */}
                {validationError && (
                  <div className="mt-3 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs space-y-2">
                    <div className="flex items-center gap-2 text-rose-800 font-bold">
                      <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                      <span>Schema Validation Failed — Run Halted</span>
                    </div>
                    <p className="text-xs text-rose-700 leading-relaxed">
                      {validationError.message}
                    </p>

                    {/* Missing Files Details */}
                    {validationError.missing_files && (
                      <div className="bg-white p-2.5 rounded-lg border border-rose-200 text-xs space-y-1 font-mono">
                        <span className="text-rose-800 font-semibold">Missing Required CSV Files:</span>
                        <div className="flex flex-wrap gap-1">
                          {validationError.missing_files.map(f => (
                            <span key={f} className="px-1.5 py-0.5 rounded bg-rose-100 text-rose-800 border border-rose-200">
                              {f}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Missing Columns Details */}
                    {validationError.missing_columns && (
                      <div className="bg-white p-2.5 rounded-lg border border-rose-200 text-xs space-y-1.5 font-mono">
                        <span className="text-rose-800 font-semibold">Missing Columns Breakdown:</span>
                        {Object.entries(validationError.missing_columns).map(([file, info]) => (
                          <div key={file} className="border-t border-rose-100 pt-1">
                            <span className="text-amber-800 font-bold">{file}:</span>
                            <div className="text-rose-700 pl-2">
                              Missing: {info.missing.join(', ')}
                            </div>
                            <div className="text-slate-500 pl-2">
                              Found: {info.found.join(', ') || 'None'}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="text-[11px] text-slate-500 italic">
                      Zero silent fallback applied. The application retains its current state until valid schema CSVs are provided.
                    </div>
                  </div>
                )}

                {/* Analysis Success Breakdown */}
                {analysisResult && (
                  <div className="mt-3 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 space-y-2.5">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <div>
                        <p className="font-bold text-emerald-900 text-xs">
                          Cascade Solved: {analysisResult.company_name}
                        </p>
                        <p className="text-[11px] text-emerald-700">
                          Genuine calculations derived directly from uploaded SME CSV records.
                        </p>
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-white border border-emerald-200 text-xs font-mono space-y-1.5 text-slate-700">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Primary Inflow Shock:</span>
                        <span className="text-rose-600 font-bold">
                          {analysisResult.focal_customer} ({analysisResult.focal_amount_formatted} / {analysisResult.predicted_delay})
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Delay Trend Confidence:</span>
                        <span className="text-blue-600 font-bold">{analysisResult.risk_confidence}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Stress Minimum Cash:</span>
                        <span className="text-amber-600 font-bold">{analysisResult.stress_min_cash_formatted}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Critical Supplier Payable:</span>
                        <span>{analysisResult.critical_supplier} ({analysisResult.supplier_payable_formatted})</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Supply Stockout:</span>
                        <span className="text-rose-600 font-bold">{analysisResult.stockout_days} Days Outage</span>
                      </div>
                      <div className="flex justify-between border-t border-slate-100 pt-1.5 font-bold">
                        <span className="text-slate-700">Revenue at Risk:</span>
                        <span className="text-rose-600">{analysisResult.revenue_exposure_formatted}</span>
                      </div>
                    </div>

                    <button
                      onClick={handleFinishAndOpen}
                      className="w-full py-2.5 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-sm cursor-pointer"
                    >
                      <span>VIEW UPDATED COMMAND CENTER ({analysisResult.company_name})</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Upload & Analyze Action Button */}
              {!analysisResult && (
                <div className="mt-4">
                  {analyzing ? (
                    <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-center space-y-1.5">
                      <div className="flex items-center justify-center gap-2 text-xs font-semibold text-blue-700">
                        <Cpu className="w-4 h-4 animate-spin text-blue-600" />
                        <span>Running Canonical Financial Engine...</span>
                      </div>
                      <p className="text-[11px] text-slate-500">{analysisStep}</p>
                    </div>
                  ) : (
                    <button
                      onClick={handleAnalyze}
                      disabled={attachedCount === 0}
                      className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm ${
                        attachedCount === 5
                          ? 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer'
                          : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                      }`}
                    >
                      <Cpu className="w-4 h-4" />
                      <span>
                        {attachedCount === 5
                          ? 'ANALYZE SME DATA PACK'
                          : `ANALYZE SME DATA PACK (${attachedCount}/5 FILES READY)`}
                      </span>
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Column 2: Demo with Default ABC Scenario */}
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-blue-600" />
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                      Default Demo Scenario
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono text-blue-700 bg-blue-100/60 border border-blue-200 px-2 py-0.5 rounded font-semibold">
                    ABC Scenario
                  </span>
                </div>

                <p className="text-xs text-slate-600 mb-3.5 leading-relaxed">
                  Default preloaded scenario showing how a 21-day late payment triggers a ₹31.0L order risk—and how to prevent it.
                </p>

                {/* Preloaded Scenario Details */}
                <div className="space-y-2.5 p-4 rounded-xl bg-white border border-slate-200 shadow-sm text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Company / Scenario:</span>
                    <span className="font-bold text-slate-900">ABC Industries</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Starting Cash:</span>
                    <span className="font-mono font-bold text-blue-600">₹42.6L (Safe Limit: ₹15.0L)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Expected Payment Delay:</span>
                    <span className="font-mono font-bold text-rose-600">₹24.0L (+21 Days Late)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Risk Confidence:</span>
                    <span className="font-mono font-semibold text-blue-700">87% (Last 3 Settled Invoices Trend)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Supplier Pressure:</span>
                    <span className="font-medium text-slate-700">Supplier X (₹12.0L on Oct 14)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Inventory Impact:</span>
                    <span className="font-mono font-bold text-rose-600">12-Day Stockout (SKU-IND-904)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Orders at Risk:</span>
                    <span className="font-mono font-bold text-rose-600">₹31.0L (Orders SO-4021 &amp; SO-4029)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Best Action:</span>
                    <span className="font-mono font-bold text-emerald-600">Option A: 2% Discount (₹48,000)</span>
                  </div>
                </div>
              </div>

              {/* Reset / Load Sample Button */}
              <div className="mt-4">
                <button
                  onClick={handleLoadBenchmark}
                  className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 hover:text-slate-900 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
                >
                  <Layers className="w-4 h-4 text-blue-600" />
                  <span>LOAD DEFAULT ABC DEMO SCENARIO</span>
                </button>
              </div>
            </div>

          </div>

          {/* Institutional Pitch-Ready Callout Banner */}
          <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-100 flex items-start gap-3 text-xs">
            <AlertCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold text-blue-900">Enterprise Integration Architecture</span>
              <p className="text-slate-600 leading-relaxed">
                For this hackathon prototype we accept structured SME Data Pack CSV exports. In production deployment, these 5 data streams synchronize automatically via ERP/accounting APIs (Tally Prime, Zoho Books, QuickBooks, SAP) or live Open Banking APIs (RBI Account Aggregator).
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="font-mono">Format: Universal SME Data Pack Schema (.CSV ONLY)</span>
          </div>
          <button
            onClick={() => setShowLoadCompanyModal(false)}
            className="px-4 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 transition-colors font-medium cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
