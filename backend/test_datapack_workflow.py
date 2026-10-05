"""
Automated End-to-End Test for SME Data Pack Ingestion, Schema Validation,
Cascade Derivation, and Benchmark Restoration.
"""

import urllib.request
import urllib.parse
import json
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')
base = 'http://localhost:8000'

def post_json(endpoint, data):
    req = urllib.request.Request(
        f"{base}{endpoint}",
        data=json.dumps(data).encode('utf-8'),
        headers={'Content-Type': 'application/json'},
        method='POST'
    )
    try:
        with urllib.request.urlopen(req) as resp:
            return resp.status, json.loads(resp.read().decode('utf-8'))
    except urllib.error.HTTPError as e:
        return e.code, json.loads(e.read().decode('utf-8'))

def get_json(endpoint):
    with urllib.request.urlopen(f"{base}{endpoint}") as resp:
        return resp.status, json.loads(resp.read().decode('utf-8'))

print("==================================================")
print("RUNNING SME DATA PACK VALIDATION & INGESTION TESTS")
print("==================================================")

# Load Zenith sample files
zenith_dir = os.path.join(os.path.dirname(__file__), 'app', 'sample_datapacks', 'zenith_precision')
zenith_files = {}
for fname in os.listdir(zenith_dir):
    if fname.endswith('.csv'):
        with open(os.path.join(zenith_dir, fname), 'r', encoding='utf-8') as f:
            zenith_files[fname] = f.read()

# TEST 1: Missing File (e.g. omitting inventory.csv)
print("\n[TEST 1] Testing Incomplete Data Pack (Missing inventory.csv)...")
incomplete_files = dict(zenith_files)
del incomplete_files['inventory.csv']
status, res = post_json('/api/upload-datapack', {'files': incomplete_files})
print(f"Status Code: {status}")
print(f"Error Type: {res.get('error_type')}")
print(f"Missing Files: {res.get('missing_files')}")
assert status == 400, f"Expected 400, got {status}"
assert res.get('error_type') == 'MISSING_FILES', f"Expected MISSING_FILES, got {res.get('error_type')}"
assert 'inventory.csv' in res.get('missing_files', []), "inventory.csv not in missing_files"
print("✓ TEST 1 PASSED: Incomplete pack rejected with explicit missing file list.")

# TEST 2: Missing Column (e.g. removing delay_days from receivables.csv)
print("\n[TEST 2] Testing Schema Validation (Missing required column 'delay_days')...")
bad_col_files = dict(zenith_files)
bad_col_files['receivables.csv'] = "invoice_id,customer_name,amount,due_date,status,settled_date\nINV-1,Test,500,2026-10-10,OPEN,\n"
status, res = post_json('/api/upload-datapack', {'files': bad_col_files})
print(f"Status Code: {status}")
print(f"Error Type: {res.get('error_type')}")
print(f"Missing Columns: {res.get('missing_columns')}")
assert status == 400, f"Expected 400, got {status}"
assert res.get('error_type') == 'MISSING_COLUMNS', f"Expected MISSING_COLUMNS, got {res.get('error_type')}"
assert 'delay_days' in res['missing_columns']['receivables.csv']['missing']
print("✓ TEST 2 PASSED: Missing column rejected with explicit column breakdown.")

# TEST 3: Ingest Complete Zenith Precision SME Data Pack
print("\n[TEST 3] Ingesting Complete Zenith Precision SME Data Pack...")
status, res = post_json('/api/upload-datapack', {'files': zenith_files})
print(f"Status Code: {status}")
print(f"Company: {res.get('company_name')}")
print(f"Focal Customer: {res.get('focal_customer')}")
print(f"Focal Amount: {res.get('focal_amount_formatted')}")
print(f"Predicted Delay: {res.get('predicted_delay')}")
print(f"Risk Confidence: {res.get('risk_confidence')}")
print(f"Critical Supplier: {res.get('critical_supplier')}")
print(f"Stockout Outage: {res.get('stockout_days')} days")
print(f"Revenue Exposure: {res.get('revenue_exposure_formatted')}")
print(f"Optimal Cost: {res.get('recommended_cost')}")
assert status == 200, f"Expected 200, got {status}"
assert res.get('company_name') == 'Zenith Precision Engineering Ltd.'
assert res.get('focal_customer') == 'Titan Heavy Industries'
assert res.get('predicted_delay') == '+20 Days'
assert res.get('critical_supplier') == 'Precision Alloys Forge Ltd'
assert res.get('stockout_days') == 14
assert res.get('revenue_exposure_formatted') == '₹25.0L'
print("✓ TEST 3 PASSED: Custom data pack drove genuine calculations across all stages.")

# TEST 4: Verify All Endpoints Reflect Zenith Precision Under Custom Mode
print("\n[TEST 4] Verifying All Application Endpoints Under Custom Mode...")
_, metrics = get_json('/api/metrics')
_, risk = get_json('/api/customer-risk')
_, chain = get_json('/api/impact-chain')
_, interventions = get_json('/api/interventions')
_, memo = get_json('/api/executive-explanation')

print(f"Metrics Revenue Exposure: {metrics['revenue_exposure_formatted']}")
print(f"Customer Risk Name: {risk['name']} (Delay: +{risk['predicted_delay_days']}d)")
print(f"Impact Chain Node 1 Title: {chain['nodes'][0]['data']['title']} ({chain['nodes'][0]['data']['amount']})")
print(f"Intervention Option A Cost: {interventions['options'][0]['cost_formatted']}")
print(f"Executive Memo Title: {memo['title']}")
print(f"Executive Memo Math Summary Exposure: {memo['math_summary']['revenue_exposure']}")

assert risk['name'] == 'Titan Heavy Industries'
assert risk['predicted_delay_days'] == 20
assert chain['nodes'][0]['data']['title'] == 'Titan Heavy Industries'
assert chain['nodes'][0]['data']['amount'] == '₹18.0L'
assert metrics['revenue_exposure_formatted'] == '₹25.0L'
assert interventions['options'][0]['cost_formatted'] == '₹36,000'
assert memo['math_summary']['revenue_exposure'] == '₹25.0L'
print("✓ TEST 4 PASSED: Endpoints all dynamically derive from uploaded custom dataset.")

# TEST 5: Reset Benchmark Scenario
print("\n[TEST 5] Restoring Canonical Benchmark Scenario (Apex Components Ltd.)...")
status, res = post_json('/api/reset-benchmark', {})
print(f"Status Code: {status}")
print(f"Restored Company: {res.get('company_name')}")
print(f"Mode: {res.get('mode')}")
assert status == 200
assert res.get('company_name') == 'Apex Components Ltd.'
assert res.get('mode') == 'BENCHMARK'

_, benchmark_metrics = get_json('/api/metrics')
print(f"Benchmark Revenue Exposure: {benchmark_metrics['revenue_exposure_formatted']}")
print(f"Benchmark Min Cash: {benchmark_metrics['projected_min_cash_formatted']}")
assert benchmark_metrics['revenue_exposure_formatted'] == '₹31.0L'
assert benchmark_metrics['projected_min_cash_formatted'] == '₹6.6L'
print("✓ TEST 5 PASSED: Benchmark scenario restored with 100% precision.")

print("\n==================================================")
print(">>> ALL 5 SME DATA PACK TESTS PASSED FLAWLESSLY! <<<")
print("==================================================")
