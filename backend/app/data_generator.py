"""
CashFlow Chain - Synthetic Dataset Generator
Generates mathematically consistent synthetic data for SMEs:
- 52 Customers with realistic credit & delay histories
- 22 Suppliers with payment terms and lead times
- 380+ Invoices (Past 90 days + Upcoming 60 days)
- Production SKUs and Sales Order Backlog
- Engineered scenario: ABC Industries -> Supplier X -> SKU-IND-904 -> ₹31L Revenue Exposure
"""

import json
from datetime import datetime, timedelta
import numpy as np

def generate_datasets():
    # Anchor date: Current operating date is 01-Oct-2026
    anchor_date = datetime(2026, 10, 1)

    # 1. CUSTOMERS (52 Customers)
    customer_names = [
        "ABC Industries", "Zenith Dynamics", "Apex Infra Logistics", "Tata Motors Vendor #4",
        "Bharat Forge Tier-2", "Reliance Retail Tier-2", "Mahindra Auto Ancillaries", "Bajaj Electricals Dist.",
        "Kalyani Steels Fabricators", "Godrej Appliances Supply", "L&T Construction Sub-12", "Havells Retail Hub",
        "Blue Star Precision Tools", "Voltas HVAC Solutions", "Thermax Boiler Units", "Cummins Diesel Works",
        "Ashok Leyland Bodyworks", "TVS Motor Component #8", "Bosch India Fab-3", "Schneider Electric Partner",
        "ABB Power Subcontractor", "Siemens Smart Infra Depot", "Adani Port Logistics Sub", "JSW Steel Rolling Mill",
        "Tata Steel Processing", "Hero MotoCorp Parts", "Eicher Commercial Supply", "Maruti Tech Suppliers",
        "Sundram Fasteners Hub", "Minda Corporation Depot", "Apollo Tyres Distribution", "MRF Industrial Tread",
        "BHEL Heavy Electricals Sub", "HAL Aerospace Machining", "Lupin Pharma Packaging", "Sun Pharma Cleanroom Fab",
        "Cipla Bio-Devices", "Dr. Reddy API Logistics", "Cadila Formulations", "Biocon Lab Gear",
        "ITC Paper & Packaging", "Dabur Distribution Depot", "Pidilite Adhesives Hub", "Asian Paints Dealer Network",
        "Berger Paints Supply", "UPL Agrochemicals", "PI Industries Reagents", "Coromandel Fertilizer Logistics",
        "Deepak Fertilisers Unit", "SRF Chemical Works", "Aarti Industries Supply", "Navin Fluorine Batch"
    ]

    customers = []
    for idx, name in enumerate(customer_names):
        is_abc = (name == "ABC Industries")
        cust_id = f"CUST-{idx+1:03d}"
        credit_limit = 5000000.0 if is_abc else float(np.random.choice([1500000, 2500000, 3500000, 6000000]))
        avg_delay = 18.5 if is_abc else float(np.random.choice([1.2, 2.5, 4.0, 7.5, 12.0]))
        risk_rating = "CRITICAL" if is_abc else np.random.choice(["LOW", "MEDIUM", "ELEVATED"], p=[0.7, 0.2, 0.1])
        
        customers.append({
            "id": cust_id,
            "name": name,
            "tier": "Tier-1 Enterprise" if idx < 10 else "Tier-2 SME",
            "credit_limit": credit_limit,
            "payment_terms_days": 30,
            "historical_avg_delay_days": avg_delay,
            "risk_rating": risk_rating,
            "is_focal": is_abc
        })

    # 2. SUPPLIERS (22 Suppliers)
    supplier_names = [
        ("Supplier X (Precision Polymer & Silicon)", "Raw Materials", 14, 15, "CRITICAL"),
        ("Shakti Industrial Metals", "Raw Materials", 10, 30, "STANDARD"),
        ("Omkar Packaging Solutions", "Packaging", 5, 21, "STANDARD"),
        ("SpeedLink Freight & Cargo", "Logistics", 3, 15, "STANDARD"),
        ("Vanguard Microelectronics", "Components", 25, 30, "HIGH"),
        ("Kavveri Hydraulics & Seals", "Components", 12, 20, "STANDARD"),
        ("Gujarat Alkali Reagents", "Chemicals", 8, 15, "HIGH"),
        ("Sterling CNC Fasteners", "Hardware", 7, 30, "STANDARD"),
        ("Penta Die Casting Works", "Tooling", 20, 30, "HIGH"),
        ("Apex Thermal Coatings", "Finishing", 6, 15, "STANDARD"),
        ("Zenith Corrugated Boxes", "Packaging", 4, 30, "LOW"),
        ("Delta Precision Motors", "Components", 18, 30, "HIGH"),
        ("Rajesh Sheet Metal", "Raw Materials", 11, 20, "STANDARD"),
        ("Navkar Industrial Gases", "Utilities", 2, 7, "HIGH"),
        ("Hind Laser Cutters", "Tooling", 15, 30, "STANDARD"),
        ("SuperClean Solvents Ltd", "Chemicals", 6, 15, "STANDARD"),
        ("Metro Surface Tech", "Finishing", 8, 20, "STANDARD"),
        ("Global Logistics Express", "Logistics", 3, 15, "LOW"),
        ("Swastik Wire & Cables", "Electrical", 9, 30, "STANDARD"),
        ("Falcon Pneumatics", "Components", 14, 25, "STANDARD"),
        ("Surat Textile Filter Fabrics", "Filtration", 7, 21, "LOW"),
        ("Everest Lubricants & Oils", "Maintenance", 5, 30, "LOW")
    ]

    suppliers = []
    for idx, (s_name, cat, lead_time, terms, crit) in enumerate(supplier_names):
        suppliers.append({
            "id": f"SUP-{idx+1:03d}",
            "name": s_name,
            "category": cat,
            "lead_time_days": lead_time,
            "payment_terms_days": terms,
            "criticality": crit,
            "is_supplier_x": (idx == 0)
        })

    # 3. INVOICES (380+ Invoices)
    # Past 90 days (July 1 - Sept 30, 2026) -> 260 invoices
    # Future 60 days (Oct 1 - Nov 30, 2026) -> 125 invoices
    invoices = []
    inv_counter = 1000

    # ABC Industries past invoices showing deteriorating delay trend (t=1: 6d, t=2: 11d, t=3: 16d -> t=4: 21d)
    abc_past = [
        {"amount": 1800000.0, "issued": "2026-06-15", "due": "2026-07-15", "paid": "2026-07-21", "delay": 6},
        {"amount": 2100000.0, "issued": "2026-07-10", "due": "2026-08-10", "paid": "2026-08-21", "delay": 11},
        {"amount": 2250000.0, "issued": "2026-08-05", "due": "2026-09-05", "paid": "2026-09-21", "delay": 16}
    ]
    for past_inv in abc_past:
        inv_counter += 1
        invoices.append({
            "invoice_id": f"INV-2026-{inv_counter}",
            "customer_id": "CUST-001",
            "customer_name": "ABC Industries",
            "amount": past_inv["amount"],
            "issue_date": past_inv["issued"],
            "due_date": past_inv["due"],
            "settled_date": past_inv["paid"],
            "status": "PAID",
            "delay_days": past_inv["delay"],
            "is_focal": False
        })

    # ABC Industries FOCAL INVOICE (Due 08-Oct-2026, ₹24,00,000)
    inv_counter += 1
    invoices.append({
        "invoice_id": "INV-2026-0891",
        "customer_id": "CUST-001",
        "customer_name": "ABC Industries",
        "amount": 2400000.0, # ₹24L
        "issue_date": "2026-09-08",
        "due_date": "2026-10-08",
        "settled_date": None,
        "status": "SCHEDULED",
        "predicted_delay_days": 21,
        "predicted_payment_date": "2026-10-29",
        "model_confidence": 0.87,
        "delay_days": 0,
        "is_focal": True
    })

    # Minor delayed receivables to total exactly ₹31.4L receivables at risk:
    # ABC Industries (₹24.0L) + CUST-002 (₹4.2L) + CUST-005 (₹3.2L) = ₹31.4L
    inv_counter += 1
    invoices.append({
        "invoice_id": f"INV-2026-{inv_counter}",
        "customer_id": "CUST-002",
        "customer_name": "Zenith Dynamics",
        "amount": 420000.0,
        "issue_date": "2026-09-12",
        "due_date": "2026-10-12",
        "settled_date": None,
        "status": "SCHEDULED",
        "predicted_delay_days": 14,
        "predicted_payment_date": "2026-10-26",
        "model_confidence": 0.74,
        "delay_days": 0,
        "is_focal": False
    })
    inv_counter += 1
    invoices.append({
        "invoice_id": f"INV-2026-{inv_counter}",
        "customer_id": "CUST-005",
        "customer_name": "Bharat Forge Tier-2",
        "amount": 320000.0,
        "issue_date": "2026-09-15",
        "due_date": "2026-10-15",
        "settled_date": None,
        "status": "SCHEDULED",
        "predicted_delay_days": 10,
        "predicted_payment_date": "2026-10-25",
        "model_confidence": 0.69,
        "delay_days": 0,
        "is_focal": False
    })

    # Generate remaining 375+ realistic invoices
    np.random.seed(42)
    # Past 255 invoices
    for i in range(255):
        inv_counter += 1
        cust = np.random.choice(customers[1:]) # pick other customers
        amt = float(np.random.choice([120000, 250000, 380000, 500000, 750000, 950000, 1200000]))
        days_ago = np.random.randint(5, 88)
        iss_date = anchor_date - timedelta(days=days_ago + 30)
        d_date = iss_date + timedelta(days=30)
        delay = int(max(0, np.random.normal(cust["historical_avg_delay_days"], 2.5)))
        p_date = d_date + timedelta(days=delay)
        
        invoices.append({
            "invoice_id": f"INV-2026-{inv_counter}",
            "customer_id": cust["id"],
            "customer_name": cust["name"],
            "amount": amt,
            "issue_date": iss_date.strftime("%Y-%m-%d"),
            "due_date": d_date.strftime("%Y-%m-%d"),
            "settled_date": p_date.strftime("%Y-%m-%d"),
            "status": "PAID",
            "delay_days": delay,
            "is_focal": False
        })

    # Future 120 invoices
    for i in range(120):
        inv_counter += 1
        cust = np.random.choice(customers[1:])
        amt = float(np.random.choice([150000, 280000, 420000, 600000, 850000, 1100000]))
        days_ahead = np.random.randint(1, 58)
        d_date = anchor_date + timedelta(days=days_ahead)
        iss_date = d_date - timedelta(days=30)
        
        invoices.append({
            "invoice_id": f"INV-2026-{inv_counter}",
            "customer_id": cust["id"],
            "customer_name": cust["name"],
            "amount": amt,
            "issue_date": iss_date.strftime("%Y-%m-%d"),
            "due_date": d_date.strftime("%Y-%m-%d"),
            "settled_date": None,
            "status": "SCHEDULED",
            "predicted_delay_days": 0,
            "predicted_payment_date": d_date.strftime("%Y-%m-%d"),
            "model_confidence": 0.92,
            "delay_days": 0,
            "is_focal": False
        })

    # 4. SUPPLIER PAYABLES (Upcoming Outflows)
    # Supplier X: ₹12,00,000 due 14-Oct-2026
    payables = [
        {
            "payable_id": "PINV-9921",
            "supplier_id": "SUP-001",
            "supplier_name": "Supplier X (Precision Polymer & Silicon)",
            "amount": 1200000.0, # ₹12L
            "due_date": "2026-10-14",
            "category": "Raw Materials",
            "criticality": "CRITICAL",
            "po_reference": "PO-8841",
            "linked_sku": "SKU-IND-904"
        },
        {
            "payable_id": "PINV-9922",
            "supplier_id": "SUP-002",
            "supplier_name": "Shakti Industrial Metals",
            "amount": 550000.0,
            "due_date": "2026-10-10",
            "category": "Raw Materials",
            "criticality": "STANDARD",
            "po_reference": "PO-8842",
            "linked_sku": "SKU-GEN-102"
        },
        {
            "payable_id": "PINV-9923",
            "supplier_id": "SUP-003",
            "supplier_name": "Omkar Packaging Solutions",
            "amount": 280000.0,
            "due_date": "2026-10-18",
            "category": "Packaging",
            "criticality": "STANDARD",
            "po_reference": "PO-8843",
            "linked_sku": "SKU-ALL"
        },
        {
            "payable_id": "PINV-9924",
            "supplier_id": "SUP-004",
            "supplier_name": "SpeedLink Freight & Cargo",
            "amount": 340000.0,
            "due_date": "2026-10-22",
            "category": "Logistics",
            "criticality": "STANDARD",
            "po_reference": "PO-8844",
            "linked_sku": "SKU-ALL"
        },
        {
            "payable_id": "PINV-9925",
            "supplier_id": "SUP-005",
            "supplier_name": "Vanguard Microelectronics",
            "amount": 820000.0,
            "due_date": "2026-10-28",
            "category": "Components",
            "criticality": "HIGH",
            "po_reference": "PO-8845",
            "linked_sku": "SKU-IND-904"
        }
    ]

    # 5. INVENTORY & SKU DEFINITION
    sku_data = {
        "sku_id": "SKU-IND-904",
        "name": "Industrial Power Inverter 50kW Modular",
        "current_stock_units": 180,
        "daily_burn_rate_units": 10,
        "days_of_stock": 18,
        "supplier_id": "SUP-001",
        "supplier_lead_time_days": 14,
        "critical_material": "Grade-A Polymer/Resin Monomer Batch #401",
        "unit_selling_price": 25833.333333333336,
        "unit_gross_margin": 0.38
    }

    # 6. SALES ORDERS BACKLOG AT RISK (SKU-IND-904)
    sales_orders_at_risk = [
        {
            "order_id": "SO-4021",
            "customer_name": "Zenith Dynamics",
            "sku_id": "SKU-IND-904",
            "units": 80,
            "unit_price": 25833.333333333336,
            "total_value": 2066666.67,
            "delivery_due_date": "2026-10-20",
            "penalty_clause": "Full order cancellation if delayed past 24-Oct"
        },
        {
            "order_id": "SO-4029",
            "customer_name": "Apex Infra Logistics",
            "sku_id": "SKU-IND-904",
            "units": 40,
            "unit_price": 25833.333333333336,
            "total_value": 1033333.33,
            "delivery_due_date": "2026-10-24",
            "penalty_clause": "Contractual breach with 10% penalty per week"
        }
    ]
    # Total revenue exposure: 80 * 25833.3333 + 40 * 25833.3333 = 120 * 25833.3333 = 31,00,000 (₹31.0L)

    return {
        "anchor_date": anchor_date.strftime("%Y-%m-%d"),
        "customers": customers,
        "suppliers": suppliers,
        "invoices": invoices,
        "payables": payables,
        "sku": sku_data,
        "sales_orders_at_risk": sales_orders_at_risk
    }

if __name__ == "__main__":
    data = generate_datasets()
    print(f"Generated {len(data['customers'])} customers")
    print(f"Generated {len(data['suppliers'])} suppliers")
    print(f"Generated {len(data['invoices'])} invoices")
    print(f"Generated {len(data['payables'])} payables")
    print(f"Focal SKU: {data['sku']['sku_id']} - {data['sku']['name']}")
