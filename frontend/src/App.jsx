import React from 'react';
import { SimulationProvider, useSimulation, SCREENS } from './context/SimulationContext';
import Navbar from './components/Navbar';
import DemoStepper from './components/DemoStepper';
import LandingOverview from './screens/LandingOverview';
import GuidedDemo from './screens/GuidedDemo';
import CommandCenter from './screens/CommandCenter';
import CustomerRisk from './screens/CustomerRisk';
import ImpactChain from './screens/ImpactChain';
import InterventionSimulator from './screens/InterventionSimulator';
import ExecutiveMemo from './screens/ExecutiveMemo';
import LoadCompanyDataModal from './components/LoadCompanyDataModal';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="max-w-[1200px] mx-auto px-6 py-16 text-center font-sans">
          <div className="p-8 rounded-2xl bg-white border border-rose-200 shadow-md max-w-xl mx-auto space-y-4">
            <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto text-2xl font-bold">
              !
            </div>
            <h2 className="text-xl font-bold text-slate-900">Temporary Diagnostic Notice</h2>
            <p className="text-xs text-slate-600">
              The view encountered a temporary rendering state. Click below to reload cleanly.
            </p>
            <div className="p-3 bg-slate-50 rounded text-[11px] text-rose-700 text-left overflow-auto max-h-32 border border-slate-200 font-mono">
              {this.state.error?.message || 'Component render exception'}
            </div>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
              }}
              className="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs cursor-pointer shadow-xs"
            >
              RELOAD DASHBOARD
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function ScreenRenderer() {
  const { activeScreen } = useSimulation();

  switch (activeScreen) {
    case SCREENS.LANDING:
      return <LandingOverview />;
    case SCREENS.GUIDED_DEMO:
      return <GuidedDemo />;
    case SCREENS.COMMAND_CENTER:
      return <CommandCenter />;
    case SCREENS.CUSTOMER_RISK:
      return <CustomerRisk />;
    case SCREENS.IMPACT_CHAIN:
      return <ImpactChain />;
    case SCREENS.INTERVENTIONS:
      return <InterventionSimulator />;
    case SCREENS.EXECUTIVE_MEMO:
      return <ExecutiveMemo />;
    default:
      return <LandingOverview />;
  }
}

function AppContent() {
  const { activeScreen } = useSimulation();
  const showStepper = activeScreen !== SCREENS.LANDING && activeScreen !== SCREENS.GUIDED_DEMO;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      <Navbar />
      <main className="flex-1 w-full pb-16">
        <ErrorBoundary>
          <ScreenRenderer />
        </ErrorBoundary>
      </main>
      {showStepper && <DemoStepper />}
      <LoadCompanyDataModal />
    </div>
  );
}

export default function App() {
  return (
    <SimulationProvider>
      <AppContent />
    </SimulationProvider>
  );
}
