/**
 * Centralized API client for CashFlow Chain
 * Connects to FastAPI backend with graceful fallback.
 */

const BASE_URL = '';

export async function fetchMetrics(intervention = 'NONE') {
  try {
    const res = await fetch(`${BASE_URL}/api/metrics?intervention=${intervention}`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('Backend unavailable, using canonical fallback for metrics:', err);
    return getFallbackMetrics(intervention);
  }
}

export async function fetchTimeline(intervention = 'NONE') {
  try {
    const res = await fetch(`${BASE_URL}/api/timeline?intervention=${intervention}`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('Backend unavailable, using fallback timeline:', err);
    return getFallbackTimeline(intervention);
  }
}

export async function fetchCustomerRisk() {
  try {
    const res = await fetch(`${BASE_URL}/api/customer-risk`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('Backend unavailable, using fallback customer risk:', err);
    return getFallbackCustomerRisk();
  }
}

export async function fetchImpactChain(intervention = 'NONE') {
  try {
    const res = await fetch(`${BASE_URL}/api/impact-chain?intervention=${intervention}`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('Backend unavailable, using fallback impact chain:', err);
    return getFallbackImpactChain(intervention);
  }
}

export async function fetchInterventions() {
  try {
    const res = await fetch(`${BASE_URL}/api/interventions`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('Backend unavailable, using fallback interventions:', err);
    return getFallbackInterventions();
  }
}

export async function fetchExecutiveExplanation(intervention = 'NONE') {
  try {
    const res = await fetch(`${BASE_URL}/api/executive-explanation?intervention=${intervention}`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('Backend unavailable, using fallback executive memo:', err);
    return getFallbackExecutiveMemo(intervention);
  }
}

export async function fetchSkuDetails() {
  try {
    const res = await fetch(`${BASE_URL}/api/sku-details`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (err) {
    return {
      sku: {
        sku_id: "SKU-IND-904",
        name: "Industrial Power Inverter 50kW Modular",
        current_stock_units: 180,
        daily_burn_rate_units: 10,
        days_of_stock: 18,
        supplier_id: "SUP-001",
        supplier_lead_time_days: 14,
        critical_material: "Poly-Sil Resin Monomer Batch #401",
        unit_selling_price: 25833.33,
        unit_gross_margin: 0.38
      },
      sales_orders_at_risk: [
        {
          order_id: "SO-4021",
          customer_name: "Zenith Dynamics",
          units: 80,
          unit_price: 25833.33,
          total_value: 2066666.67,
          delivery_due_date: "2026-10-20",
          penalty_clause: "Full cancellation if delayed past 24-Oct"
        },
        {
          order_id: "SO-4029",
          customer_name: "Apex Infra Logistics",
          units: 40,
          unit_price: 25833.33,
          total_value: 1033333.33,
          delivery_due_date: "2026-10-24",
          penalty_clause: "Contractual breach with 10% penalty per week"
        }
      ]
    };
  }
}

export async function uploadDataPack(filesMap) {
  try {
    const res = await fetch(`${BASE_URL}/api/upload-datapack`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ files: filesMap })
    });
    const data = await res.json();
    return data;
  } catch (err) {
    return {
      success: false,
      error_type: 'NETWORK_ERROR',
      message: `Failed to connect to backend server: ${err.message}`
    };
  }
}

export async function resetBenchmarkScenario() {
  try {
    const res = await fetch(`${BASE_URL}/api/reset-benchmark`, {
      method: 'POST'
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('Backend unavailable, reset locally:', err);
    return { success: true, company_name: 'ABC Industries', mode: 'BENCHMARK' };
  }
}

export async function fetchDatapackStatus() {
  try {
    const res = await fetch(`${BASE_URL}/api/datapack/status`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (err) {
    return { company_name: 'ABC Industries', mode: 'BENCHMARK', is_custom: false };
  }
}

// Canonical fallback generator matching the single simulation engine
function getFallbackMetrics(intervention) {
  if (intervention === 'OPTION_A') {
    return {
      current_cash_position: 4260000.0,
      current_cash_position_formatted: "₹42.6L",
      baseline_min_cash: 2120000.0,
      baseline_min_cash_formatted: "₹21.2L",
      projected_min_cash: 2072000.0,
      projected_min_cash_formatted: "₹20.7L",
      safety_threshold: 1500000.0,
      safety_threshold_formatted: "₹15.0L",
      receivables_at_risk: 740000.0,
      receivables_at_risk_formatted: "₹7.4L",
      revenue_exposure: 0.0,
      revenue_exposure_formatted: "₹0.0L",
      exposure_protected: 3100000.0,
      exposure_protected_formatted: "₹31.0L",
      intervention_cost: 48000.0,
      intervention_cost_formatted: "₹48,000",
      net_savings: 3052000.0,
      net_savings_formatted: "₹30.52L",
      active_intervention: "OPTION_A",
      system_status: "HEALTHY",
      alert: { active: false }
    };
  } else if (intervention === 'OPTION_B') {
    return {
      current_cash_position: 4260000.0,
      current_cash_position_formatted: "₹42.6L",
      baseline_min_cash: 2120000.0,
      baseline_min_cash_formatted: "₹21.2L",
      projected_min_cash: 1160000.0,
      projected_min_cash_formatted: "₹11.6L",
      safety_threshold: 1500000.0,
      safety_threshold_formatted: "₹15.0L",
      receivables_at_risk: 3140000.0,
      receivables_at_risk_formatted: "₹31.4L",
      revenue_exposure: 1300000.0,
      revenue_exposure_formatted: "₹13.0L",
      exposure_protected: 1800000.0,
      exposure_protected_formatted: "₹18.0L",
      intervention_cost: 0.0,
      intervention_cost_formatted: "₹0",
      net_savings: 1800000.0,
      net_savings_formatted: "₹18.00L",
      active_intervention: "OPTION_B",
      system_status: "PARTIAL",
      alert: { active: true, title: "RESIDUAL CASCADE RISK", customer: "ABC Industries", predicted_delay: "Leaves 5-day stockout", impact_summary: "Supplier extension leaves ₹13L unmitigated revenue exposure." }
    };
  } else if (intervention === 'OPTION_C') {
    return {
      current_cash_position: 4260000.0,
      current_cash_position_formatted: "₹42.6L",
      baseline_min_cash: 2120000.0,
      baseline_min_cash_formatted: "₹21.2L",
      projected_min_cash: 2010000.0,
      projected_min_cash_formatted: "₹20.1L",
      safety_threshold: 1500000.0,
      safety_threshold_formatted: "₹15.0L",
      receivables_at_risk: 740000.0,
      receivables_at_risk_formatted: "₹7.4L",
      revenue_exposure: 0.0,
      revenue_exposure_formatted: "₹0.0L",
      exposure_protected: 3100000.0,
      exposure_protected_formatted: "₹31.0L",
      intervention_cost: 110000.0,
      intervention_cost_formatted: "₹1.10L",
      net_savings: 2990000.0,
      net_savings_formatted: "₹29.90L",
      active_intervention: "OPTION_C",
      system_status: "HEALTHY",
      alert: { active: false }
    };
  }
  return {
    current_cash_position: 4260000.0,
    current_cash_position_formatted: "₹42.6L",
    baseline_min_cash: 2120000.0,
    baseline_min_cash_formatted: "₹21.2L",
    projected_min_cash: 660000.0,
    projected_min_cash_formatted: "₹6.6L",
    safety_threshold: 1500000.0,
    safety_threshold_formatted: "₹15.0L",
    receivables_at_risk: 3140000.0,
    receivables_at_risk_formatted: "₹31.4L",
    revenue_exposure: 3100000.0,
    revenue_exposure_formatted: "₹31.0L",
    exposure_protected: 0.0,
    exposure_protected_formatted: "₹0.0L",
    intervention_cost: 0.0,
    intervention_cost_formatted: "₹0",
    net_savings: 0.0,
    net_savings_formatted: "₹0.00L",
    active_intervention: "NONE",
    system_status: "CRITICAL",
    alert: {
      active: true,
      title: "CASHFLOW CHAIN DETECTED",
      customer: "ABC Industries",
      predicted_delay: "predicted 21-day payment delay",
      impact_summary: "Could push projected liquidity to ₹6.6L, putting ₹12L Supplier X payment at risk and exposing ₹31.0L revenue."
    }
  };
}

function getFallbackTimeline(intervention) {
  const dates = ["01 Oct", "03 Oct", "05 Oct", "07 Oct", "08 Oct", "10 Oct", "12 Oct", "14 Oct", "16 Oct", "18 Oct", "20 Oct", "22 Oct", "24 Oct", "26 Oct", "28 Oct", "29 Oct", "30 Oct"];
  return dates.map((d, i) => {
    const isStressDip = i >= 6 && i <= 14;
    const stressVal = isStressDip ? (i === 7 ? 660000 : (i === 6 ? 940000 : 850000)) : 2200000 + (i * 80000);
    const baseVal = 2120000 + (Math.sin(i) * 500000) + 1200000;
    let activeVal = stressVal;
    if (intervention === 'OPTION_A') {
      activeVal = baseVal - 48000;
    } else if (intervention === 'OPTION_C') {
      activeVal = baseVal - 110000;
    } else if (intervention === 'OPTION_B') {
      activeVal = isStressDip ? 1860000 : baseVal;
    }
    return {
      day: i + 1,
      date: d,
      baseline_cash: baseVal,
      stress_cash: stressVal,
      active_cash: activeVal,
      safety_threshold: 1500000
    };
  });
}

function getFallbackCustomerRisk() {
  return {
    customer_id: "CUST-001",
    name: "ABC Industries",
    tier: "Tier-1 Strategic Corporate Client",
    outstanding_amount: 2400000.0,
    outstanding_formatted: "₹24.0L",
    invoice_id: "INV-2026-0891",
    expected_payment_date: "08 Oct 2026",
    predicted_payment_date: "29 Oct 2026",
    predicted_delay_days: 21,
    confidence_score: 0.87,
    confidence_formatted: "87%",
    model_metadata: {
      model_type: "Payment Delay Trend Model",
      formula: "Delay(t) = 5.0 * t + 1.0",
      r_squared: 1.0,
      slope: 5.0,
      intercept: 1.0
    },
    signals: [
      {
        title: "Payment Delays Escalating",
        severity: "CRITICAL",
        metric: "+5.0 days/period trend",
        description: "Regression model trained on historical payments (6d, 11d, 16d) extrapolates delay to 21 days (R² = 1.00)."
      },
      {
        title: "Outstanding Exposure Spike",
        severity: "CRITICAL",
        metric: "56.4% of total A/R",
        description: "ABC Industries current outstanding represents over 56% of total open SME receivables, creating extreme concentration fragility."
      },
      {
        title: "Payment Behaviour Deteriorating",
        severity: "WARNING",
        metric: "ERP Approval Freeze Flag",
        description: "Cross-referenced telemetry indicates ABC restructured their internal accounts payable workflow to a 45-day cycle."
      },
      {
        title: "Projected Liquidity Shock Trigger",
        severity: "CRITICAL",
        metric: "₹24L single-source dependency",
        description: "Customer represents the anchor liquidity event required to fund mid-month supplier obligations on Oct 14."
      }
    ],
    historical_invoices: [
      { invoice: "INV-2026-1001", amount: "₹18.0L", due: "15 Jul 2026", paid: "21 Jul 2026", delay: "6 days late", status: "SETTLED" },
      { invoice: "INV-2026-1002", amount: "₹21.0L", due: "10 Aug 2026", paid: "21 Aug 2026", delay: "11 days late", status: "SETTLED" },
      { invoice: "INV-2026-1003", amount: "₹22.5L", due: "05 Sep 2026", paid: "21 Sep 2026", delay: "16 days late", status: "SETTLED" },
      { invoice: "INV-2026-0891", amount: "₹24.0L", due: "08 Oct 2026", paid: "29 Oct (Est)", delay: "+21 days projected", status: "AT RISK" }
    ]
  };
}

function getFallbackImpactChain(intervention) {
  const isHealthy = intervention === 'OPTION_A' || intervention === 'OPTION_C';
  const isPartial = intervention === 'OPTION_B';

  return {
    nodes: [
      {
        id: "node_customer",
        type: "customFinancialNode",
        position: { x: 40, y: 140 },
        data: {
          step_number: 1,
          title: "ABC Industries",
          subtitle: "Receivable at Risk",
          amount: "₹24.0L",
          status: isHealthy ? "HEALTHY" : "CRITICAL",
          metric_label: "Predicted Delay",
          metric_value: isHealthy ? "0 days" : "+21 days",
          details: {
            formula: "Delay(t) = 5.0 * t + 1.0",
            variables: { "Invoice ID": "INV-2026-0891", "Due Date": "08-Oct-2026", "Forecast Date": isHealthy ? "10-Oct-2026" : "29-Oct-2026", "Confidence": "87%" },
            explanation: "Payment delay trend model (Delay(t) = 5.0 * t + 1.0) projects a 21-day delay on the ₹24L scheduled inflow, deferring liquidity past the mid-month payable date."
          }
        }
      },
      {
        id: "node_cash",
        type: "customFinancialNode",
        position: { x: 440, y: 140 },
        data: {
          step_number: 2,
          title: "Cash Buffer Breach",
          subtitle: "Liquidity Shock",
          amount: isHealthy ? (intervention === 'OPTION_A' ? "₹20.7L min" : "₹20.1L min") : (isPartial ? "₹11.6L min" : "₹6.6L min"),
          status: isHealthy ? "HEALTHY" : "CRITICAL",
          metric_label: "Safety Buffer",
          metric_value: isHealthy ? "Buffer Safe" : "₹8.4L deficit",
          details: {
            formula: "Cash_t = Cash_{t-1} + Inflows_t - Outflows_t < Threshold",
            variables: { "Starting Cash": "₹42.6L", "Safety Limit": "₹15.0L", "Downturn Min": isHealthy ? "₹20.7L" : "₹6.6L" },
            explanation: "Delayed ₹24L could push projected liquidity down to ₹6.6L, falling below the mandatory ₹15.0L working capital limit."
          }
        }
      },
      {
        id: "node_supplier",
        type: "customFinancialNode",
        position: { x: 840, y: 140 },
        data: {
          step_number: 3,
          title: "Supplier X",
          subtitle: "Supplier Payment at Risk",
          amount: "₹12.0L",
          status: isHealthy ? "HEALTHY" : (isPartial ? "HEALTHY" : "CRITICAL"),
          metric_label: "Payment Status",
          metric_value: isHealthy ? "Protected" : (isPartial ? "Rescheduled" : "Hold / At Risk"),
          details: {
            formula: "Disbursable = Cash_t - Safety_Threshold >= Obligation",
            variables: { "Supplier": "Supplier X (Precision Polymer & Silicon)", "Payable ID": "PINV-9921", "Due Date": "14-Oct-2026", "Terms": "Strict Net-15" },
            explanation: "Because available cash is below the safety threshold, the ₹12L payment cannot be released, placing the supplier account on hold."
          }
        }
      },
      {
        id: "node_procurement",
        type: "customFinancialNode",
        position: { x: 1240, y: 140 },
        data: {
          step_number: 4,
          title: "Raw Material PO-8841",
          subtitle: "Procurement Frozen",
          amount: "300 kg",
          status: isHealthy ? "HEALTHY" : "WARNING",
          metric_label: "Dispatch Status",
          metric_value: isHealthy ? "On Schedule" : (isPartial ? "Partial (+9d)" : "Withheld (+16d)"),
          details: {
            formula: "Dispatch = II(Payment == Settled)",
            variables: { "Material": "Poly-Sil Grade-A Resin", "Lead Time": "14 Days", "Revised Arrival": isHealthy ? "28-Oct" : "13-Nov" },
            explanation: "Supplier X halts shipment of critical resin components until invoice PINV-9921 is honored."
          }
        }
      },
      {
        id: "node_inventory",
        type: "customFinancialNode",
        position: { x: 1640, y: 140 },
        data: {
          step_number: 5,
          title: "Production Inventory",
          subtitle: "Days of Stock Depletion",
          amount: isHealthy ? "0 Days" : (isPartial ? "5 Days" : "12 Days"),
          status: isHealthy ? "HEALTHY" : (isPartial ? "WARNING" : "CRITICAL"),
          metric_label: "Shortage Duration",
          metric_value: isHealthy ? "0 days stockout" : (isPartial ? "5 days stockout" : "12 days stockout"),
          details: {
            formula: "Stockout = max(0, Lead_Time + Freeze - Days_Stock)",
            variables: { "Buffer": "180 units (18 days)", "Demand": "10 units/day", "Delivery Cycle": isHealthy ? "14 days" : "30 days" },
            explanation: "Buffer stock lasts 18 days, but delivery is delayed to 30 days, causing an unrecoverable 12-day assembly line shutdown."
          }
        }
      },
      {
        id: "node_revenue",
        type: "customFinancialNode",
        position: { x: 2040, y: 140 },
        data: {
          step_number: 6,
          title: "Revenue Exposure",
          subtitle: "Order SLA Breach",
          amount: isHealthy ? "₹0.0L" : (isPartial ? "₹13.0L" : "₹31.0L"),
          status: isHealthy ? "HEALTHY" : (isPartial ? "WARNING" : "CRITICAL"),
          metric_label: "Exposure Protected",
          metric_value: isHealthy ? "₹31.0L (100%)" : (isPartial ? "₹18.0L (58%)" : "₹0.0L (0%)"),
          details: {
            formula: "Exposure = 120 * ₹25,833.33 = ₹31,00,000",
            variables: { "Zenith Dynamics (SO-4021)": "80 units = ₹20,66,666", "Apex Infra (SO-4029)": "40 units = ₹10,33,334" },
            explanation: "120 unproduced inverter units directly violate delivery SLAs for two key enterprise accounts, incurring total cancellation loss of ₹31L."
          }
        }
      }
    ],
    edges: [
      { id: "e1", source: "node_customer", target: "node_cash", animated: true, style: { stroke: isHealthy ? "#10b981" : "#f43f5e", strokeWidth: 2.5 } },
      { id: "e2", source: "node_cash", target: "node_supplier", animated: true, style: { stroke: isHealthy ? "#10b981" : "#f43f5e", strokeWidth: 2.5 } },
      { id: "e3", source: "node_supplier", target: "node_procurement", animated: true, style: { stroke: isHealthy ? "#10b981" : "#f43f5e", strokeWidth: 2.5 } },
      { id: "e4", source: "node_procurement", target: "node_inventory", animated: true, style: { stroke: isHealthy ? "#10b981" : "#f43f5e", strokeWidth: 2.5 } },
      { id: "e5", source: "node_inventory", target: "node_revenue", animated: true, style: { stroke: isHealthy ? "#10b981" : "#f43f5e", strokeWidth: 2.5 } }
    ]
  };
}

function getFallbackInterventions() {
  return {
    scenario: "ABC Industries pays 21 days late (shifts from 08-Oct to 29-Oct).",
    unmitigated_exposure: 3100000.0,
    unmitigated_exposure_formatted: "₹31.0L",
    recommended_action_id: "OPTION_A",
    recommended_action_title: "Early Payment Incentive",
    mathematical_selection_rule: "min_{a} Cost(a) s.t. ExposureProtected(a) == ₹31.0L",
    recommendation_reason: "Lowest intervention cost (₹48,000) among all feasible scenarios guaranteeing 100% protection of the ₹31.0L revenue exposure.",
    options: [
      {
        id: "OPTION_A",
        title: "Early Payment Incentive",
        category: "Customer Commercial Structuring",
        cost: 48000.0,
        cost_formatted: "₹48,000",
        exposure_protected: 3100000.0,
        exposure_protected_formatted: "₹31.0L",
        coverage_pct: 100.0,
        net_benefit: 3052000.0,
        net_benefit_formatted: "₹30.52L",
        execution_speed: "24 - 48 Hours",
        mechanism: "2.0% dynamic cash discount on ₹24L ($24,00,000 * 0.02 = ₹48,000). Accelerates inflow to Day 10, preventing working capital breach entirely.",
        tradeoff: "Direct P&L discount charge of ₹48K, but yields 64.6x return in protected finished goods revenue.",
        is_recommended: true,
        optimization_status: "OPTIMAL_SOLUTION",
        optimization_rationale: "Unique mathematical minimizer of the constrained cost objective function: min Cost subject to 100% exposure protection."
      },
      {
        id: "OPTION_B",
        title: "Supplier Payment Rescheduling",
        category: "Supply Chain Credit Renegotiation",
        cost: 0.0,
        cost_formatted: "₹0",
        exposure_protected: 1800000.0,
        exposure_protected_formatted: "₹18.0L",
        coverage_pct: 58.1,
        net_benefit: 1800000.0,
        net_benefit_formatted: "₹18.0L",
        execution_speed: "3 - 5 Business Days",
        mechanism: "Negotiate 7-day payment extension with Supplier X (due Oct 21 instead of Oct 14).",
        tradeoff: "Zero direct monetary cost, but only protects ₹18L of revenue; leaves a 5-day stockout and ₹13L order cancellation risk.",
        is_recommended: false,
        optimization_status: "INFEASIBLE_UNDER_FULL_PROTECTION",
        optimization_rationale: "Fails full coverage constraint (Coverage = 58.1% < 100%). Leaves ₹13.0L residual unmitigated enterprise exposure."
      },
      {
        id: "OPTION_C",
        title: "Short-Term Invoice Financing",
        category: "FinTech Working Capital Facility",
        cost: 110000.0,
        cost_formatted: "₹1.10L",
        exposure_protected: 3100000.0,
        exposure_protected_formatted: "₹31.0L",
        coverage_pct: 100.0,
        net_benefit: 2990000.0,
        net_benefit_formatted: "₹29.90L",
        execution_speed: "2 - 3 Business Days",
        mechanism: "Factor ABC Industries ₹24L invoice at 1.5% platform fee + 14% p.a. pro-rata for 30 days. Liquidity delivered Oct 9.",
        tradeoff: "Fully protects ₹31L, but incurs ₹1,10,000 financing fee (2.29x more expensive than Option A).",
        is_recommended: false,
        optimization_status: "SUBOPTIMAL",
        optimization_rationale: "Satisfies 100% protection constraint but is strictly dominated by Option A on cost (₹1.10L vs ₹48K)."
      }
    ]
  };
}

function getFallbackExecutiveMemo(intervention) {
  return {
    title: "CASHFLOW CHAIN — C-SUITE LIQUIDITY INTELLIGENCE BRIEFING",
    date: "01 October 2026",
    classification: "CONFIDENTIAL // FINANCIAL EXECUTIVE MEMO",
    executive_summary: "ABC Industries' predicted payment delay creates a potential liquidity chain reaction. The delayed ₹24L inflow may push available cash below the supplier-payment threshold, putting a ₹12L supplier obligation at risk. This could delay raw-material procurement and expose approximately ₹31L of revenue.",
    evidence: [
      "Customer ABC Industries accounts for an upcoming scheduled inflow of ₹24,00,000 on 08-Oct-2026 (48.2% of first-half collections).",
      "Rolling delay telemetry shows payment turnaround deteriorating from +6 days (Jul) to +11 days (Aug) and +16 days (Sep).",
      "Payment delay trend model (Delay(t) = 5.0 * t + 1.0) projects a 21-day payment delay to 29-Oct-2026 with 87% risk confidence (R² = 1.00)."
    ],
    impact: [
      "Liquidity Cascade: The ₹24L delayed inflow could push cumulative operating cash down to ₹6.6L, breaching the mandatory ₹15.0L working capital threshold.",
      "Supplier Obligation at Risk: A ₹12,00,000 scheduled payable to Supplier X (Precision Polymer & Silicon Ltd) due 14-Oct cannot be disbursed safely.",
      "Inventory Stockout: Halting raw material PO-8841 leads to a 12-day total production outage once the 18-day factory buffer is depleted.",
      "Revenue Exposure: Delivery SLA breach across 120 units of SKU-IND-904, exposing ₹31.0L across committed sales orders SO-4021 & SO-4029."
    ],
    action: [
      "RECOMMENDED ACTION: Deploy Option A — Early Payment Incentive.",
      "Mathematical Optimization Rationale: Formulated as min Cost(a) subject to 100% exposure protection. Option A costs ₹48,000 versus ₹1,10,000 for Option C, achieving identical 100% protection at 56.4% lower expenditure.",
      "Immediate Implementation Step: Dispatch commercial incentive notice #INC-0891 to ABC Industries Treasury with a 48-hour acceptance window."
    ],
    math_summary: {
      inflow_at_risk: "₹24.0L",
      breach_minimum_cash: "₹6.6L",
      supplier_obligation: "₹12.0L",
      stockout_duration: "12 Days",
      revenue_exposure: "₹31.0L",
      recommended_cost: "₹48,000",
      net_protected_value: "₹30.52L"
    }
  };
}
