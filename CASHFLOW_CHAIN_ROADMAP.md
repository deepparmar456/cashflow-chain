# CASHFLOW CHAIN — Complete Technical Architecture & Hackathon Roadmap

> **Product Definition:** AI-assisted financial early-warning and second-order intervention system for SMEs.  
> **Core Question:** *"If one important customer pays late, what does that break next?"*  
> **Core Engine Loop:** **PREDICT** $\rightarrow$ **TRACE** $\rightarrow$ **SIMULATE** $\rightarrow$ **PREVENT**

---

## 1. Executive Summary & Design Philosophy

CashFlow Chain addresses the biggest blind spot in SME financial management: **liquidity cascade failure**. Most accounting software (Zoho, QuickBooks, Tally) shows what is *already late*. CashFlow Chain predicts what *will be late*, computes the multi-hop dependency shock across cash, suppliers, and manufacturing, and identifies the cheapest math-verified intervention to prevent the breakdown.

### Non-Negotiable Standards
- **Zero Hallucinated Metrics:** Every single rupee and percentage across all 5 screens is mathematically derived from the underlying ledger and deterministic simulation models.
- **Institutional FinTech Aesthetics:** Bloomberg / Palantir Foundry / Stripe Capital dark-mode theme (`slate-950` / `zinc-900`), crisp monospace numerals, status badges (`emerald`, `amber`, `rose`), zero childish cartoonish widgets.
- **Demo-Ready Resilience:** Runs locally with a single startup command, pre-seeded with 50+ customers, 20+ suppliers, and 350+ invoices, with "ABC Industries" pre-engineered as the headline scenario.
- **Interactive Hero Feature:** Custom React Flow graph where clicking any node displays the exact formula and ledger entries behind that node's state.

---

## 2. Full Tech Stack Architecture

```
                    ┌────────────────────────────────────────────────────────┐
                    │                   FRONTEND (Vite + React)              │
                    │  - Tailwind CSS + Lucide Icons                         │
                    │  - Recharts (30-Day Cash Trajectory & Inflows)         │
                    │  - React Flow (@xyflow/react) - Interactive Cascade    │
                    │  - Guided Pitch Stepper (1-click judge presentation)   │
                    └───────────────────────────▲────────────────────────────┘
                                                │ REST API (JSON)
                                                │ Port 8000
                    ┌───────────────────────────▼────────────────────────────┐
                    │                   BACKEND (Python FastAPI)             │
                    │  - Dependency Graph Solver (NetworkX / Custom DAG)     │
                    │  - Scikit-Learn / Trend Risk Classifier                │
                    │  - Cash Projection & Inventory Shock Engine            │
                    │  - Deterministic Executive Memo Generator              │
                    └───────────────────────────▲────────────────────────────┘
                                                │ In-Memory DataFrames
                    ┌───────────────────────────▼────────────────────────────┐
                    │             SYNTHETIC DATASET ENGINE (Pandas)          │
                    │  - 50+ Customers (payment history, delay variance)    │
                    │  - 20+ Suppliers (lead times, payment terms, tiers)    │
                    │  - 350+ Invoices (past 90d + upcoming 60d)            │
                    │  - Inventory SKUs (buffer stock, daily burn rate)      │
                    └────────────────────────────────────────────────────────┘
```

---

## 3. Mathematical Consistency & Calculation Engine

All metrics across the 5 screens are tied to a unified mathematical ledger:

### A. Cash Position & Projection Formula
$$\text{Projected Cash}_t = \text{Current Cash} + \sum_{\tau=1}^t \text{Expected Inflows}_\tau - \sum_{\tau=1}^t \text{Expected Outflows}_\tau$$
- **Current Starting Cash:** ₹42,60,000 (₹42.6L)
- **Minimum Cash Safety Threshold:** ₹15,00,000 (₹15.0L)
- **Baseline 30-Day Minimum Cash:** ₹21,20,000 (₹21.2L) — *Healthy baseline operating buffer without delays*
- **Total Receivables at Risk (Portfolio):** ₹31,40,000 (₹31.4L across flagged accounts)
- **Engineered Inflow at Risk (ABC Industries):**
  - Invoice: ₹24,00,000 (₹24L receivable at risk) due **08-Oct-2026**
  - Predicted Delay: **21 days** (New predicted date: **29-Oct-2026**)
  - Confidence: **87%** (Derived from rolling delay trend $+3.2\text{ days/mo}$, credit utilization $92\%$, payment friction score)

### B. The 5-Hop Domino Shock (Impact Chain)
1. **Node 1 (Trigger):** ABC Industries ₹24L receivable at risk — predicted 21-day payment delay.
2. **Node 2 (Liquidity Shock):** On Oct 12, cumulative cash dips from baseline ₹21.2L down to **₹6.6L**, breaching the **₹15.0L** supplier safety threshold.
3. **Node 3 (Supplier Payment at Risk):** Supplier X (Primary Silicon/Chemical Vendor) payment of **₹12.0L** due on Oct 14 cannot be safely released without critical insolvency risk.
4. **Node 4 (Procurement Freeze):** Supplier X halts raw material dispatch (Order #PO-8841: 300kg Grade-A Polymer/Resin).
5. **Node 5 (Inventory Stockout):**
   $$\text{Days of Stock} = \frac{\text{Current SKU Buffer (180 units)}}{\text{Average Daily Demand (10 units/day)}} = 18 \text{ days}$$
   $$\text{Supplier Lead Time} = 14 \text{ days} + 16 \text{ days freeze} = 30 \text{ days}$$
   $$\text{Inventory Shortage Duration} = 30 - 18 = \mathbf{12 \text{ days of stockout}}$$
6. **Node 6 (Revenue Exposure — SKU & Order Level Math):**
   - **SKU-IND-904 (Industrial Power Inverters):** Daily production rate = 10 units. 12-day shutdown = **120 units backlogged/cancelled**.
   - **Order #SO-4021 (Zenith Dynamics):** 80 units @ ₹25,833.33 = **₹20,66,666** (delivery SLA breach with cancellation clause).
   - **Order #SO-4029 (Apex Infra Logistics):** 40 units @ ₹25,833.33 = **₹10,33,334** (firm delivery date 24-Oct).
   - **Total Verified Revenue Exposure:** $80 \times ₹25,833.33 + 40 \times ₹25,833.33 = \mathbf{₹31,00,000 \text{ (₹31.0L)}}$.

### C. Mathematical Optimization Engine (Action Selection)
Rather than a vague black-box recommendation, the decision engine formulates a **Constrained Cost-Minimization Linear Program**:
$$\min_{a \in \{A, B, C\}} \text{Cost}(a) \quad \text{subject to} \quad \frac{\text{ExposureProtected}(a)}{\text{TotalExposure}} = 1.0$$

| Option | Strategy | Cost | Calculation / Mechanism | Exposure Protected | Net Benefit | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **A** | **Early Payment Incentive** | **₹48,000** | 2% cash discount on ₹24L ($24,00,000 \times 0.02$). ABC pays within 48h. | **₹31,00,000** (100%) | **+₹30.52L** | **RECOMMENDED** (Lowest cost for 100% protection) |
| **B** | **Supplier Payment Rescheduling** | **₹0** | Negotiate 7-day payment extension with Supplier X. Reduces freeze by 7 days; 5 days of stockout remain. | **₹18,00,000** (58%) | +₹18.00L | Partial Protection (leaves ₹13L exposed) |
| **C** | **Short-Term Invoice Financing** | **₹1,10,000** | 1.5% upfront fee + 14% p.a. pro-rata for 30 days on ₹24L factoring. Inflow received on Oct 9. | **₹31,00,000** (100%) | +₹29.90L | Viable but $2.3\times$ higher cost than Option A |

---

## 4. The 5 Core Screens & UI/UX Breakdown

### Screen 1: Command Center (Executive Liquidity & Radar)
- **Top Financial Strip (4 Institutional KPI Tiles):**
  - **Cash Position:** `₹42.6L` (with trend delta `+4.2% vs last month`)
  - **30-Day Minimum Cash:** `₹11.2L` (threshold marker at ₹15L)
  - **Receivables at Risk:** `₹31.4L` (3 high-risk accounts tagged)
  - **Revenue Exposure:** `₹31.0L` (pulsing critical indicator)
- **High-Priority Alert Banner:**
  - `[CRITICAL ALERT] CASHFLOW CHAIN DETECTED`
  - Subtitle: *"ABC Industries — predicted 21-day payment delay triggers downstream liquidity breach."*
  - Action Button: **"TRACE IMPACT"** $\rightarrow$ Smooth transition to Screen 2/3.
- **Interactive 30-Day Cash Trajectory Chart (Recharts):**
  - Shows 2 curves: **Baseline Cash** (healthy green) vs. **Stress Scenario** (dips into the red zone on Oct 12–28).
  - Hover tooltip detailing daily inflows, outflows, and projected balance.

### Screen 2: Customer Risk (Root Cause Diagnostic)
- **Profile Header:** ABC Industries (Tier-1 Enterprise Client, ₹1.4Cr annual volume).
- **Core Risk Scorecard:**
  - Outstanding: **₹24.0L**
  - Expected Payment: **08 Oct 2026**
  - Predicted Payment: **29 Oct 2026**
  - Predicted Delay: **+21 Days**
  - Model Confidence: **87%**
- **4 Quantitative Risk Signals:**
  1. *Delay Trend Increasing:* Last 3 payments delayed by 4, 11, and 18 days ($R^2 = 0.94$).
  2. *Credit Exposure Spike:* Outstanding balance now represents 56% of total receivables.
  3. *Payment Friction:* ERP portal indicates revised internal approval cycle at client.
  4. *Concentration Risk:* Represents 48% of total scheduled inflows for October W1-W2.
- **Historical Invoices Table:** Recent invoice payment performance chart.
- **Primary Action:** **"SIMULATE CASCADE"** $\rightarrow$ Launches the Hero Graph.

### Screen 3: Impact Chain (The Hero Interactive Dependency Graph)
- **Full-Screen Interactive React Flow Canvas:**
  - Nodes designed as sleek institutional cards with status indicators, metadata, and monetary impacts.
  - Animated glowing connection lines (edges) indicating the direction of shock propagation.
  - Color states: `Healthy` (slate/emerald), `Warning` (amber), `Critical` (rose/red glow).
- **The 6 Structured Nodes:**
  1. `[ABC Industries]` — *₹24L Payment Delayed (+21d)* [Critical]
  2. `[Cash Buffer]` — *Drops to ₹6.6L (< ₹15L safety limit)* [Critical]
  3. `[Supplier X]` — *₹12L Obligation Due Oct 14 at Risk* [Critical]
  4. `[Raw Material PO-8841]` — *Procurement Frozen / Dispatch Withheld* [Warning]
  5. `[Assembly Line & Inventory]` — *12-Day Stockout Projected* [Critical]
  6. `[Revenue Exposure]` — *₹31L in Unfulfilled Client Orders* [Critical]
- **Interactive Node Drawer / Inspector:**
  - Clicking any node opens a right-hand slide-out drawer showing:
    - Node Category & Responsible Entity
    - Mathematical Formula & Variables
    - Raw Ledger Transactions
    - Immediate Contingency Options

### Screen 4: Intervention Simulator (The Decision Engine)
- **Active Scenario Banner:** *"Stress Test: ABC Industries pays 21 days late."*
- **3 Interactive Scenario Cards (Options A, B, C):**
  - Option A prominently carries the badge: **"RECOMMENDED ACTION"**
  - Explanatory note: *"Lowest intervention cost among scenarios protecting the full projected exposure."*
  - Each card details: Cost, Time to Execute, Downstream Protection %, and Net ROI.
- **Dynamic What-If Recalculation:**
  - Clicking **"Apply Intervention A"** immediately triggers an animated state update:
    - The cash trajectory curve recovers above the ₹15L threshold.
    - The React Flow graph nodes transition dynamically from **Critical (Red)** to **Protected (Emerald Green)**.
    - Total Exposure decreases from **₹31.0L $\rightarrow$ ₹0**.
    - Displays Net Savings: **₹30.52 Lakhs**.

### Screen 5: AI Executive Explanation (Institutional Briefing Memo)
- **Format:** C-Suite / Board-Ready Strategic Briefing.
- **Structured Sections:**
  - **1. Executive Synthesis:** Summary of the systemic threat in 2 sentences.
  - **2. Evidence (The Trigger):** ABC Industries delay trajectory, statistical confidence (87%), cash deficit window.
  - **3. Impact (The Chain Reaction):** Detailed cascade through Supplier X, 12-day inventory stockout, and ₹31L customer order fulfillment risk.
  - **4. Prescribed Action:** Early Payment 2% discount rationale, operational steps, and estimated net ROI (64.5x return on intervention cost).
- **Interactive Features:**
  - **"Copy Briefing"** button for clipboard export.
  - **"Export PDF Memo"** simulation.
  - Toggle between "Technical Ledger Details" and "Board Summary".

---

## 5. Hackathon Presentation & Demo Mode

To make the live pitch effortless, CashFlow Chain includes a **Guided Pitch Stepper** alongside standard navigation:
1. **Persistent Top Bar:** Shows the 4 primary KPIs, active status indicator, and navigation tabs.
2. **"Demo Flow" Controller:** A floating presentation bar at the bottom:
   - `[Prev Step]` `Step 1 of 5: Command Center` `[Next Step: Trace Impact]`
   - Allows the presenter to click through the exact 11-step hackathon script seamlessly without hesitation.
3. **Reset State Button:** One click restores the default baseline or restarts the scenario.

---

## 6. Synthetic Data Architecture (50+ Customers, 20+ Suppliers)

The Python backend seeds an in-memory realistic SME dataset:
- `customers.json`: 52 realistic Indian SME/Enterprise corporate names (e.g., Tata Motors Vendor #4, Zenith Tech, ABC Industries, Reliance Retail Tier-2, Apex Logistics). Fields: `id`, `name`, `credit_limit`, `payment_terms`, `historical_avg_delay`, `risk_tier`.
- `suppliers.json`: 22 suppliers across Raw Materials, Packaging, Logistics, Utilities. Fields: `id`, `name`, `category`, `payment_terms`, `lead_time_days`, `criticality_tier`.
- `invoices.json`: 380 invoices across past 90 days (for payment pattern modeling) and upcoming 60 days.
- `inventory.json`: 15 key production SKUs with unit costs, daily demand rates, buffer stock, and supplier dependencies.
- `cashflow_ledger.json`: Daily opening balances, projected receivables, scheduled payables, net liquidity.

---

## 7. Project Structure & Organization

```
CASHFLOW CHAIN/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py                   # FastAPI application & CORS setup
│   │   ├── data_generator.py         # 50+ customers, 20+ suppliers, 380+ invoices
│   │   ├── financial_engine.py       # Deterministic cash projection & inventory shock logic
│   │   ├── risk_predictor.py         # Transparent delay prediction & confidence scoring
│   │   ├── cascade_graph.py          # Network dependency graph structure & node state solver
│   │   └── routes/
│   │       ├── metrics.py            # /api/metrics (Top KPI strip)
│   │       ├── timeline.py           # /api/timeline (30-day cash curve baseline vs stress)
│   │       ├── customer_risk.py      # /api/customer-risk (ABC Industries breakdown)
│   │       ├── impact_chain.py       # /api/impact-chain (React Flow nodes & edges)
│   │       ├── interventions.py      # /api/interventions (Simulate Option A, B, C)
│   │       └── executive_memo.py     # /api/executive-memo (Generated AI explanation)
│   ├── requirements.txt              # fastapi, uvicorn, pandas, numpy, scikit-learn
│   └── run_backend.py
│
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── Navbar.jsx            # Institutional top bar with live KPI strip
│   │   │   ├── DemoStepper.jsx       # Floating 1-click pitch presentation controller
│   │   │   ├── NodeDetailsDrawer.jsx # Slide-over math & formula inspector for graph
│   │   │   └── flow/
│   │   │       ├── CustomFlowNode.jsx# Styled institutional React Flow node card
│   │   │       └── CustomEdge.jsx    # Pulsing glowing connection line
│   │   ├── screens/
│   │   │   ├── CommandCenter.jsx     # Screen 1: Macro metrics, alert, 30d cash curve
│   │   │   ├── CustomerRisk.jsx      # Screen 2: ABC Industries risk diagnostic
│   │   │   ├── ImpactChain.jsx       # Screen 3: Hero interactive React Flow graph
│   │   │   ├── InterventionSim.jsx   # Screen 4: 3 What-If interventions + recalculation
│   │   │   └── ExecutiveMemo.jsx     # Screen 5: Evidence → Impact → Action memo
│   │   ├── context/
│   │   │   └── SimulationContext.jsx # Global state (active intervention, node states, exposure)
│   │   ├── api/
│   │   │   └── client.js             # Centralized API fetcher
│   │   ├── App.jsx                   # Main layout & router/screen switcher
│   │   ├── index.css                 # Tailwind directives & custom scrollbars/glows
│   │   └── main.jsx
│   ├── package.json                  # react, vite, tailwindcss, @xyflow/react, recharts, lucide-react
│   └── vite.config.js
│
├── README.md                         # Quickstart, financial logic explanation, pitch script
└── run_all.bat / run_all.ps1         # 1-click script to start both Backend & Frontend
```

---

## 8. Step-by-Step Execution Plan

1. **Step 1: Backend Foundation & Synthetic Data Engine**
   - Implement `data_generator.py` with 50+ customers, 20+ suppliers, 380+ invoices.
   - Calibrate ABC Industries with realistic historical payment delays.
   - Implement `financial_engine.py` with the 30-day projection, inventory shock, and revenue exposure equations.
2. **Step 2: API Endpoints & Verification**
   - Expose and test all endpoints (`/api/metrics`, `/api/timeline`, `/api/customer-risk`, `/api/impact-chain`, `/api/interventions`, `/api/executive-memo`).
   - Validate numerical consistency across every endpoint.
3. **Step 3: Frontend Setup & Institutional UI System**
   - Initialize Vite + React + Tailwind CSS.
   - Configure financial dark mode theme, fonts, and Lucide icons.
   - Build persistent Top Navbar with live KPI strip.
4. **Step 4: Screen 1 & Screen 2 (Command Center & Customer Risk)**
   - Recharts 30-day cash curve (Baseline vs. Delayed scenario).
   - High-impact alert banner with "TRACE IMPACT" action.
   - Customer Risk scorecard with 4 quantitative delay signals and payment history.
5. **Step 5: Screen 3 (The Hero Impact Chain Graph)**
   - Integrate React Flow with custom dark financial node cards.
   - Custom pulsing animated edges.
   - Slide-out drawer displaying node-by-node mathematical formulas and ledger data.
6. **Step 6: Screen 4 & Screen 5 (Intervention Simulator & AI Memo)**
   - 3 intervention comparison cards with "Recommended" badge on Option A.
   - Instant dynamic recalculation: applying Option A flips graph nodes to green and resets exposure to ₹0.
   - AI Executive Explanation formatted as Evidence $\rightarrow$ Impact $\rightarrow$ Action.
7. **Step 7: Guided Pitch Stepper, Testing & 1-Click Launch Script**
   - Add floating presentation mode for seamless live demonstration.
   - Create single-command runner script (`run_all.bat` / `run_all.ps1`).
   - Complete comprehensive README.md with demo script.
