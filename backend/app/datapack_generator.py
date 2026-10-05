"""
Generates canonical sample SME Data Packs as standalone CSV files and zip archives.
Allows users/judges to download and upload complete, valid SME Data Packs:
1. Apex Components Ltd. (Benchmark Demo Scenario)
2. Zenith Precision Engineering Ltd. (Alternative Custom Company Scenario)
"""

import os
import zipfile

def create_sample_datapacks(base_dir="backend/app/sample_datapacks"):
    os.makedirs(base_dir, exist_ok=True)

    # 1. APEX COMPONENTS DATA PACK
    apex_dir = os.path.join(base_dir, "apex_components")
    os.makedirs(apex_dir, exist_ok=True)

    apex_company = (
        "company_name,starting_cash,safety_threshold\n"
        "Apex Components Ltd.,4260000,1500000\n"
    )
    with open(os.path.join(apex_dir, "company.csv"), "w", encoding="utf-8") as f:
        f.write(apex_company)

    apex_receivables = (
        "invoice_id,customer_name,amount,due_date,status,settled_date,delay_days\n"
        "INV-2026-058,ABC Industries,1800000,2026-06-05,PAID,2026-06-11,6\n"
        "INV-2026-074,ABC Industries,1950000,2026-07-10,PAID,2026-07-21,11\n"
        "INV-2026-089,ABC Industries,2100000,2026-08-15,PAID,2026-08-31,16\n"
        "INV-2026-0891,ABC Industries,2400000,2026-10-08,OPEN,,\n"
        "INV-2026-102,Zenith Dynamics,420000,2026-10-14,OPEN,,\n"
        "INV-2026-105,Bharat Forge Tier-2,320000,2026-10-22,OPEN,,\n"
    )
    with open(os.path.join(apex_dir, "receivables.csv"), "w", encoding="utf-8") as f:
        f.write(apex_receivables)

    apex_payables = (
        "payable_id,supplier_name,amount,due_date,lead_time_days\n"
        "PINV-9921,Supplier X (Precision Polymer & Silicon),1200000,2026-10-14,14\n"
        "PINV-9922,Shakti Industrial Metals,550000,2026-10-10,10\n"
        "PINV-9923,Omkar Packaging Solutions,280000,2026-10-18,5\n"
        "PINV-9924,SpeedLink Freight & Cargo,340000,2026-10-22,3\n"
        "PINV-9925,Vanguard Microelectronics,820000,2026-10-28,25\n"
    )
    with open(os.path.join(apex_dir, "payables.csv"), "w", encoding="utf-8") as f:
        f.write(apex_payables)

    apex_inventory = (
        "sku_id,sku_name,days_of_stock,daily_burn_rate_units,supplier_name\n"
        "SKU-IND-904,Industrial Power Inverter 50kW Modular,18,10,Supplier X (Precision Polymer & Silicon)\n"
    )
    with open(os.path.join(apex_dir, "inventory.csv"), "w", encoding="utf-8") as f:
        f.write(apex_inventory)

    apex_sales_orders = (
        "order_id,customer_name,sku_id,units,unit_price,delivery_due_date\n"
        "SO-4021,Zenith Dynamics,SKU-IND-904,80,25833.3333,2026-10-20\n"
        "SO-4029,Apex Infra Logistics,SKU-IND-904,40,25833.3333,2026-10-24\n"
    )
    with open(os.path.join(apex_dir, "sales_orders.csv"), "w", encoding="utf-8") as f:
        f.write(apex_sales_orders)

    # Zip Apex
    apex_zip = os.path.join(base_dir, "apex_components_datapack.zip")
    with zipfile.ZipFile(apex_zip, "w") as z:
        for fname in ["company.csv", "receivables.csv", "payables.csv", "inventory.csv", "sales_orders.csv"]:
            z.write(os.path.join(apex_dir, fname), fname)

    # 2. ZENITH PRECISION DATA PACK (Alternative Company)
    zenith_dir = os.path.join(base_dir, "zenith_precision")
    os.makedirs(zenith_dir, exist_ok=True)

    zenith_company = (
        "company_name,starting_cash,safety_threshold\n"
        "Zenith Precision Engineering Ltd.,3800000,1200000\n"
    )
    with open(os.path.join(zenith_dir, "company.csv"), "w", encoding="utf-8") as f:
        f.write(zenith_company)

    zenith_receivables = (
        "invoice_id,customer_name,amount,due_date,status,settled_date,delay_days\n"
        "INV-Z-011,Titan Heavy Industries,1200000,2026-06-10,PAID,2026-06-15,5\n"
        "INV-Z-022,Titan Heavy Industries,1400000,2026-07-15,PAID,2026-07-25,10\n"
        "INV-Z-033,Titan Heavy Industries,1600000,2026-08-20,PAID,2026-09-04,15\n"
        "INV-Z-1001,Titan Heavy Industries,1800000,2026-10-09,OPEN,,\n"
        "INV-Z-1002,Kalyani Steels Ltd,520000,2026-10-16,OPEN,,\n"
        "INV-Z-1003,Thermax Power Aux,380000,2026-10-24,OPEN,,\n"
    )
    with open(os.path.join(zenith_dir, "receivables.csv"), "w", encoding="utf-8") as f:
        f.write(zenith_receivables)

    zenith_payables = (
        "payable_id,supplier_name,amount,due_date,lead_time_days\n"
        "PINV-Z-801,Precision Alloys Forge Ltd,1000000,2026-10-15,14\n"
        "PINV-Z-802,Sterling CNC Fasteners,320000,2026-10-12,7\n"
        "PINV-Z-803,Zenith Corrugated Packaging,180000,2026-10-19,4\n"
        "PINV-Z-804,SuperClean Industrial Solvents,220000,2026-10-25,6\n"
    )
    with open(os.path.join(zenith_dir, "payables.csv"), "w", encoding="utf-8") as f:
        f.write(zenith_payables)

    zenith_inventory = (
        "sku_id,sku_name,days_of_stock,daily_burn_rate_units,supplier_name\n"
        "SKU-ZEN-401,Turbine Flange Assembly 200mm,15,8,Precision Alloys Forge Ltd\n"
    )
    with open(os.path.join(zenith_dir, "inventory.csv"), "w", encoding="utf-8") as f:
        f.write(zenith_inventory)

    zenith_sales_orders = (
        "order_id,customer_name,sku_id,units,unit_price,delivery_due_date\n"
        "SO-Z-8801,Global Energy Systems,SKU-ZEN-401,60,25000,2026-10-22\n"
        "SO-Z-8802,National Infrastructure Corp,SKU-ZEN-401,40,25000,2026-10-26\n"
    )
    with open(os.path.join(zenith_dir, "sales_orders.csv"), "w", encoding="utf-8") as f:
        f.write(zenith_sales_orders)

    # Zip Zenith
    zenith_zip = os.path.join(base_dir, "zenith_precision_datapack.zip")
    with zipfile.ZipFile(zenith_zip, "w") as z:
        for fname in ["company.csv", "receivables.csv", "payables.csv", "inventory.csv", "sales_orders.csv"]:
            z.write(os.path.join(zenith_dir, fname), fname)

    print("Sample SME Data Packs generated successfully in:", base_dir)

if __name__ == "__main__":
    create_sample_datapacks()
