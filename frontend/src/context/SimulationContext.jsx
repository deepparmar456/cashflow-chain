import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  fetchMetrics,
  fetchTimeline,
  fetchCustomerRisk,
  fetchImpactChain,
  fetchInterventions,
  fetchExecutiveExplanation,
  resetBenchmarkScenario,
  fetchDatapackStatus
} from '../api/client';

const SimulationContext = createContext();

export const SCREENS = {
  LANDING: 'LANDING',
  GUIDED_DEMO: 'GUIDED_DEMO',
  COMMAND_CENTER: 'COMMAND_CENTER',
  CUSTOMER_RISK: 'CUSTOMER_RISK',
  IMPACT_CHAIN: 'IMPACT_CHAIN',
  INTERVENTIONS: 'INTERVENTIONS',
  EXECUTIVE_MEMO: 'EXECUTIVE_MEMO'
};

export const GUIDED_STAGES = [
  { id: 1, key: 'PREDICT', title: 'Predict', short: '01 Predict', subtitle: 'Payment Delay Shock' },
  { id: 2, key: 'TRACE', title: 'Trace', short: '02 Trace', subtitle: 'Second-Order Cascade' },
  { id: 3, key: 'SIMULATE', title: 'Simulate', short: '03 Simulate', subtitle: 'Intervention Evaluation' },
  { id: 4, key: 'PREVENT', title: 'Prevent', short: '04 Prevent', subtitle: 'Cascade Neutralization' },
  { id: 5, key: 'VERDICT', title: 'Verdict', short: '05 Verdict', subtitle: 'Decision & Value Return' }
];

export const DEMO_STEPS = [
  { step: 1, screen: SCREENS.COMMAND_CENTER, title: "1. Open Command Center", action: "Review Macro Health & Cash Position" },
  { step: 2, screen: SCREENS.COMMAND_CENTER, title: "2. Inspect Healthy Baseline", action: "Note ₹42.6L Cash & ₹21.2L Baseline Min" },
  { step: 3, screen: SCREENS.COMMAND_CENTER, title: "3. Spot the Chain Alert", action: "Click 'TRACE IMPACT' on ABC Industries Alert" },
  { step: 4, screen: SCREENS.CUSTOMER_RISK, title: "4. Customer Risk Deep-Dive", action: "Analyze ABC ₹24L Inflow & 21-Day Delay Signals" },
  { step: 5, screen: SCREENS.CUSTOMER_RISK, title: "5. Trigger Cascade Simulation", action: "Click 'SIMULATE CASCADE' to Launch Graph" },
  { step: 6, screen: SCREENS.IMPACT_CHAIN, title: "6. Interactive Dependency Graph", action: "Trace 6-Node Chain from Buffer to Supplier X" },
  { step: 7, screen: SCREENS.IMPACT_CHAIN, title: "7. Verify Underlying Math", action: "Click Nodes to Inspect Exact Formular & Invoices" },
  { step: 8, screen: SCREENS.INTERVENTIONS, title: "8. Open Intervention Simulator", action: "Compare Scenarios A, B, and C" },
  { step: 9, screen: SCREENS.INTERVENTIONS, title: "9. Apply Recommended Option A", action: "Click Early Payment Incentive (Cost: ₹48K)" },
  { step: 10, screen: SCREENS.IMPACT_CHAIN, title: "10. Observe Cascade Prevention", action: "Watch All 6 Nodes Turn Green (₹31L Protected)" },
  { step: 11, screen: SCREENS.EXECUTIVE_MEMO, title: "11. Review C-Suite Executive Memo", action: "Evidence → Impact → Action Decision Briefing" }
];

export function SimulationProvider({ children }) {
  // Start on the clean narrative Landing Overview
  const [activeScreen, setActiveScreen] = useState(SCREENS.LANDING);
  const [activeIntervention, setActiveIntervention] = useState('NONE');
  const [selectedNode, setSelectedNode] = useState(null);
  const [demoStep, setDemoStep] = useState(1);
  const [guidedStep, setGuidedStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showLoadCompanyModal, setShowLoadCompanyModal] = useState(false);
  const [activeCompany, setActiveCompany] = useState('Apex Components Ltd.');
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Core Data
  const [metrics, setMetrics] = useState(null);
  const [timeline, setTimeline] = useState([]);
  const [customerRisk, setCustomerRisk] = useState(null);
  const [impactChain, setImpactChain] = useState({ nodes: [], edges: [] });
  const [interventionsData, setInterventionsData] = useState(null);
  const [executiveMemo, setExecutiveMemo] = useState(null);

  const refreshAll = useCallback(() => {
    setRefreshTrigger(prev => prev + 1);
  }, []);

  const resetToBenchmark = useCallback(async () => {
    try {
      await resetBenchmarkScenario();
    } catch (e) {
      console.warn('Failed to call resetBenchmarkScenario:', e);
    }
    setActiveCompany('Apex Components Ltd.');
    setActiveIntervention('NONE');
    setSelectedNode(null);
    setDemoStep(1);
    setGuidedStep(1);
    refreshAll();
  }, [refreshAll]);

  // Refresh data when intervention or refreshTrigger changes
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const [m, t, cr, ic, inv, memo, st] = await Promise.all([
          fetchMetrics(activeIntervention),
          fetchTimeline(activeIntervention),
          fetchCustomerRisk(),
          fetchImpactChain(activeIntervention),
          fetchInterventions(),
          fetchExecutiveExplanation(activeIntervention),
          fetchDatapackStatus()
        ]);
        setMetrics(m);
        setTimeline(t);
        setCustomerRisk(cr);
        setImpactChain(ic);
        setInterventionsData(inv);
        setExecutiveMemo(memo);
        if (st && st.company_name) {
          setActiveCompany(st.company_name);
        }
      } catch (err) {
        console.error('Failed to load simulation data', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [activeIntervention, refreshTrigger]);

  const applyIntervention = (optionId) => {
    setActiveIntervention(optionId);
  };

  const handleSetActiveScreen = (screen) => {
    setActiveScreen(screen);
    if (screen === SCREENS.COMMAND_CENTER) setDemoStep(1);
    else if (screen === SCREENS.CUSTOMER_RISK) setDemoStep(4);
    else if (screen === SCREENS.IMPACT_CHAIN) setDemoStep(activeIntervention === 'OPTION_A' ? 10 : 6);
    else if (screen === SCREENS.INTERVENTIONS) setDemoStep(8);
    else if (screen === SCREENS.EXECUTIVE_MEMO) setDemoStep(11);
  };

  const startGuidedDemo = (step = 1) => {
    setActiveScreen(SCREENS.GUIDED_DEMO);
    setGuidedStep(step);
    if (step < 4) {
      setActiveIntervention('NONE');
    } else {
      setActiveIntervention('OPTION_A');
    }
  };

  const exitGuidedDemo = (targetScreen = SCREENS.COMMAND_CENTER) => {
    setActiveScreen(targetScreen);
  };

  const handleSetGuidedStep = (step) => {
    const clamped = Math.max(1, Math.min(5, step));
    setGuidedStep(clamped);
    if (clamped >= 4) {
      setActiveIntervention('OPTION_A');
    } else {
      setActiveIntervention('NONE');
    }
  };

  const nextGuidedStep = () => {
    if (guidedStep < 5) {
      handleSetGuidedStep(guidedStep + 1);
    }
  };

  const prevGuidedStep = () => {
    if (guidedStep > 1) {
      handleSetGuidedStep(guidedStep - 1);
    }
  };

  const resetGuidedDemo = () => {
    handleSetGuidedStep(1);
    setActiveIntervention('NONE');
  };

  const resetAll = () => {
    setActiveIntervention('NONE');
    setSelectedNode(null);
    setActiveScreen(SCREENS.LANDING);
    setDemoStep(1);
    setGuidedStep(1);
  };

  const goToDemoStep = (stepNumber) => {
    const target = DEMO_STEPS.find(s => s.step === stepNumber);
    if (target) {
      setDemoStep(target.step);
      setActiveScreen(target.screen);
      if (target.step === 9 || target.step === 10) {
        setActiveIntervention('OPTION_A');
      } else if (target.step < 9) {
        setActiveIntervention('NONE');
      }
    }
  };

  const nextDemoStep = () => {
    if (demoStep < DEMO_STEPS.length) {
      goToDemoStep(demoStep + 1);
    }
  };

  const prevDemoStep = () => {
    if (demoStep > 1) {
      goToDemoStep(demoStep - 1);
    }
  };

  return (
    <SimulationContext.Provider
      value={{
        activeScreen,
        setActiveScreen: handleSetActiveScreen,
        activeIntervention,
        applyIntervention,
        selectedNode,
        setSelectedNode,
        metrics,
        timeline,
        customerRisk,
        impactChain,
        interventionsData,
        executiveMemo,
        demoStep,
        goToDemoStep,
        nextDemoStep,
        prevDemoStep,
        // Guided Demo Story Mode
        guidedStep,
        setGuidedStep: handleSetGuidedStep,
        startGuidedDemo,
        exitGuidedDemo,
        nextGuidedStep,
        prevGuidedStep,
        resetGuidedDemo,
        // Utility actions
        resetAll,
        refreshAll,
        resetToBenchmark,
        loading,
        showLoadCompanyModal,
        setShowLoadCompanyModal,
        activeCompany,
        setActiveCompany
      }}
    >
      {children}
    </SimulationContext.Provider>
  );
}

export function useSimulation() {
  const context = useContext(SimulationContext);
  if (!context) {
    throw new Error('useSimulation must be used within a SimulationProvider');
  }
  return context;
}
