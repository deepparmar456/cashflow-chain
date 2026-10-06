# CASHFLOW CHAIN
### AI-Assisted Financial Early-Warning & Second-Order Intervention System for SMEs

> **The Core SME Question:** *"If one important customer pays late, what does that break next?"*  
> **The Core Engine Loop:** **PREDICT** $\rightarrow$ **TRACE** $\rightarrow$ **SIMULATE** $\rightarrow$ **PREVENT**

---

## 1. Executive Summary

Most SME financial accounting software (Zoho, QuickBooks, Tally) is **rearward-looking**—it tells the owner what has *already* gone wrong.

**CashFlow Chain** is a **forward-looking causal intelligence system**. It predicts payment delays weeks in advance, computes the multi-hop dependency shockwaves across cash reserves, critical suppliers, and factory inventory, and runs an algorithmic optimization engine to identify the **lowest-cost intervention** that prevents operational collapse.

---

## 2. The 5 Core Screens

| # | Screen | Purpose | Key Metrics / Highlights |
|---|---|---|---|
| **1** | **Command Center** | Macro Financial Health & Immediate Threat Radar | • Cash Position: **₹42.6L**<br>• 30-Day Min Cash: **₹21.2L** (Baseline) / **₹6.6L** (Stress Breach)<br>• Receivables at Risk: **₹31.4L**<br>• Revenue Exposure: **₹31.0L**<br>• Prominent Alert: *"CASHFLOW CHAIN DETECTED: ABC Industries — predicted 21-day delay"*<br>• 30-day interactive cash trajectory curve (Recharts) |
| **2** | **Customer Risk** | Root-Cause Diagnostic on Focal Account | • Customer: **ABC Industries**<br>• Scheduled Inflow: **₹24.0L** (Due 08-Oct-2026)<br>• Expected Payment Delay: **+21 Days** (Arrival 29-Oct-2026)<br>• Risk Confidence: **87%** (Based on a clear upward payment-delay trend across the last 3 settled invoices)<br>• 4 Warning Signs: Escalating delays, concentration fragility, payment friction, liquidity dependence |
| **3** | **Impact Chain** *(Hero)* | Interactive 6-Hop Dependency Graph | **Interactive React Flow Canvas:**<br>`[ABC Industries Delay: ₹24L]` $\rightarrow$ `[Cash Buffer Drops to ₹6.6L]` $\rightarrow$ `[Supplier X Payment At Risk: ₹12L]` $\rightarrow$ `[PO-8841 Raw Material Frozen]` $\rightarrow$ `[Inventory: 12-day stockout]` $\rightarrow$ `[Revenue Exposure: ₹31.0L]`<br>• **Clickable Nodes:** Click any node to open the mathematical derivation and ledger transaction drawer. |
| **4** | **Intervention Simulator** | Algorithmic Countermeasure Engine | • **Option A: Early Payment Incentive** (Cost: **₹48K**, Protects: **₹31L**, 100% in this scenario) $\rightarrow$ **RECOMMENDED ACTION**<br>• **Option B: Supplier Payment Rescheduling** (Cost: **₹0**, Protects: **₹18L**, Leaves ₹13L exposed)<br>• **Option C: Short-Term Invoice Financing** (Cost: **₹1.10L**, Protects: **₹31L**, 100% in this scenario)<br>• **Live Recalculation:** Selecting an option flips the graph nodes to green, restores cash above ₹15L, and displays **₹30.52L net value protected**. |
| **5** | **AI Executive Memo** | Institutional C-Suite Decision Briefing | Structured as **Evidence $\rightarrow$ Impact $\rightarrow$ Action** with one-click clipboard copy and export. Backed 100% by deterministic calculations (zero numerical hallucinations). |

---

## 3. Mathematical Consistency & Verified Formulas

Every number across all 5 screens is mathematically harmonized:

### A. Cash Flow Ledger Projection
$$\text{Projected Cash}_t = \text{Current Cash} + \sum_{\tau=1}^t \text{Inflows}_\tau - \sum_{\tau=1}^t \text{Outflows}_\tau$$
- Starting Cash: **₹42,60,000 (₹42.6L)**
- Working Capital Safety Buffer: **₹15,00,000 (₹15.0L)**
- Normal Operating Minimum: **₹21,20,000 (₹21.2L)**
- Stress Scenario: With ABC's ₹24L delayed from 08-Oct to 29-Oct, cash on 14-Oct plummets to **₹6,60,000 (₹6.6L)**, creating an **₹8.4L deficit** below safety threshold.

### B. Inventory Lead-Time Shock
$$\text{Days of Stock} = \frac{\text{Current Buffer Stock (180 units)}}{\text{Daily Burn Rate (10 units/day)}} = 18 \text{ days}$$
$$\text{Delivery Cycle under Freeze} = 14 \text{ days lead time} + 16 \text{ days hold} = 30 \text{ days}$$
$$\text{Assembly Line Outage} = 30 - 18 = \mathbf{12 \text{ consecutive days of stockout}}$$

### C. Revenue Exposure (SKU & Order Level)
- Production SKU: **SKU-IND-904** (Industrial 50kW Modular Inverters)
- Unproduced Volume: 12 days $\times$ 10 units/day = **120 units**
- Impacted Committed Orders:
  - **Order #SO-4021 (Zenith Dynamics):** 80 units @ ₹25,833.33 = **₹20,66,666**
  - **Order #SO-4029 (Apex Infra Logistics):** 40 units @ ₹25,833.33 = **₹10,33,334**
  - **Total Revenue Exposed:** $80 \times 25,833.33 + 40 \times 25,833.33 = \mathbf{₹31,00,000 \text{ (₹31.0L)}}$

### D. Constrained Cost-Minimization Objective
Rather than a vague black box, the recommendation engine solves:
$$\min_{a \in \{A, B, C\}} \text{Cost}(a) \quad \text{subject to} \quad \frac{\text{ExposureProtected}(a)}{\text{TotalExposure}} = 1.0$$
- **Option A (₹48,000)** is the unique mathematical minimizer providing 100% protection in this scenario, delivering **₹30.52L net value protected** (`₹31.0L - ₹0.48L`).
- **Option B (₹0)** is **infeasible** under full protection (only 58.1% coverage, leaves ₹13L exposed).
- **Option C (₹1,10,000)** satisfies full protection in this scenario (`₹29.90L net value protected`) but is strictly dominated by Option A ($2.29\times$ higher cost).

---

## 4. Quickstart Guide (1-Click Run)

### Option 1: One-Click Startup (Recommended)
Double-click or run the startup script in PowerShell:
```powershell
.\run_all.bat
# OR
.\run_all.ps1
```
This automatically starts:
- **Backend API:** `http://localhost:8000`
- **Frontend App:** `http://localhost:5173`

---

### Option 2: Live Public Web App (No Local Setup Required)
You can directly open and test the application online from any device:
🌐 **Live Public URL:** https://cashflow-chain.onrender.com/
*(Includes full interactive React Flow graph, live financial recalculations, and API proxying)*

---

### Option 3: Manual Step-by-Step Startup

#### Terminal 1: Python Backend
```powershell
cd backend
# Activate virtual environment
.\.venv\Scripts\Activate.ps1
# Start the FastAPI server
python run_backend.py
```
*API docs available at: `http://localhost:8000/docs`*

#### Terminal 2: React Frontend
```powershell
cd frontend
# Launch Vite development server
npm.cmd run dev
```
*Open `http://localhost:5173` in your browser.*

---

## 5. Hackathon Pitch Script (60–90 Second Guided Demo Flow)

Use the built-in **5-Step Guided Demo (`01 Predict → 02 Trace → 03 Compare → 04 Prevent → 05 Verdict`)**:

1. **01 Predict**  
   *"ABC Industries may receive a ₹24L payment 21 days late. Based on a clear upward payment-delay trend across the last 3 settled invoices (6d → 11d → 16d), our system flags a projected +21-day delay with 87% Risk Confidence."*
2. **02 Trace**  
   *"Watch what happens next: ABC's delay drops our cash to ₹6.6L on Oct 14—below our ₹15L safe limit. We cannot pay Supplier X ₹12L. Supplier X holds 300kg of raw material. Our 18-day buffer runs out, causing a 12-day stockout and exposing ₹31 Lakhs of customer orders."*
3. **03 Compare**  
   *"How should ABC respond? Option B costs ₹0, but only protects ₹18L and leaves ₹13L exposed. Option C costs ₹1.10L. Option A—a 2% early payment discount costing ₹48,000—accelerates cash to Oct 10 and protects 100% of exposed orders in this scenario."*
4. **04 Prevent**  
   *"When we apply Option A, all 6 nodes turn green. A ₹48,000 action protects ₹31L of exposed orders."*
5. **05 Verdict**  
   *"The outcome: ₹30.52 Lakhs in net value protected (`₹31L - ₹48K`), with 100% of exposed orders protected in this scenario."*

---

## 6. Architecture & Tech Stack

```
CASHFLOW CHAIN/
├── backend/
│   ├── app/
│   │   ├── main.py              # FastAPI REST API & routes
│   │   ├── data_generator.py    # 52 customers, 22 suppliers, 380+ invoices
│   │   ├── financial_engine.py  # Deterministic cash projection & LP optimizer
│   │   └── __init__.py
│   ├── run_backend.py           # Backend server runner
│   └── requirements.txt         # fastapi, uvicorn, pandas, numpy, scikit-learn
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx       # Institutional top bar & 4 KPI strip
│   │   │   ├── DemoStepper.jsx  # Floating 1-click pitch controller
│   │   │   └── flow/
│   │   │       ├── CustomFinancialNode.jsx  # React Flow custom node
│   │   │       └── NodeDetailsDrawer.jsx    # Formula & ledger drawer
│   │   ├── screens/
│   │   │   ├── CommandCenter.jsx         # Screen 1
│   │   │   ├── CustomerRisk.jsx          # Screen 2
│   │   │   ├── ImpactChain.jsx           # Screen 3 (Hero Screen)
│   │   │   ├── InterventionSimulator.jsx # Screen 4
│   │   │   └── ExecutiveMemo.jsx         # Screen 5
│   │   ├── context/
│   │   │   └── SimulationContext.jsx     # Global reactive state
│   │   ├── api/
│   │   │   └── client.js                 # API caller with deterministic fallback
│   │   ├── App.jsx
│   │   ├── index.css                     # Tailwind directives & glow effects
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
├── CASHFLOW_CHAIN_ROADMAP.md    # Technical architecture & math specs
├── run_all.bat                  # One-click Windows batch launcher
├── run_all.ps1                  # One-click PowerShell launcher
└── README.md
```
