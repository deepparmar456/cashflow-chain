import urllib.request
import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

base = 'http://localhost:8000'
metrics = json.loads(urllib.request.urlopen(f'{base}/api/metrics').read())
timeline = json.loads(urllib.request.urlopen(f'{base}/api/timeline').read())
risk = json.loads(urllib.request.urlopen(f'{base}/api/customer-risk').read())
chain = json.loads(urllib.request.urlopen(f'{base}/api/impact-chain').read())
interventions = json.loads(urllib.request.urlopen(f'{base}/api/interventions').read())
memo = json.loads(urllib.request.urlopen(f'{base}/api/executive-explanation').read())

print("=== 1. COMMAND CENTER CONSISTENCY ===")
print("Current Cash:", metrics["current_cash_position_formatted"])
print("Baseline Min Cash:", metrics["baseline_min_cash_formatted"])
print("Stress Min Cash:", metrics["projected_min_cash_formatted"])
print("Receivables at Risk:", metrics["receivables_at_risk_formatted"])
print("Revenue Exposure:", metrics["revenue_exposure_formatted"])

# Check timeline minimum
min_stress_pt = min(timeline, key=lambda x: x["stress_cash"])
trough_val = f"₹{min_stress_pt['stress_cash']/100000:.1f}L"
print(f"Timeline Stress Trough: {min_stress_pt['date']} -> {trough_val}")
assert trough_val == metrics["projected_min_cash_formatted"], f"Timeline trough {trough_val} != metrics {metrics['projected_min_cash_formatted']}"

print("\n=== 2. CUSTOMER RISK CONSISTENCY ===")
print("Customer:", risk["name"])
print("Outstanding:", risk["outstanding_formatted"])
print("Expected Date:", risk["expected_payment_date"])
print("Predicted Date:", risk["predicted_payment_date"])
print("Predicted Delay:", f"+{risk['predicted_delay_days']} Days")
print("Confidence:", risk["confidence_formatted"])
print("Formula:", risk["model_metadata"]["formula"])
assert risk["outstanding_formatted"] == "₹24.0L"
assert risk["predicted_delay_days"] == 21
assert risk["confidence_formatted"] == "87%"

print("\n=== 3. IMPACT CHAIN CONSISTENCY ===")
nodes = chain["nodes"]
for n in nodes:
    d = n["data"]
    print(f"Node {d['step_number']}: {d['title']} ({d['subtitle']}) -> Amount: {d['amount']}, Metric: {d['metric_value']}, Status: {d['status']}")
assert nodes[0]["data"]["amount"] == "₹24.0L"
assert "₹6.6L" in nodes[1]["data"]["amount"]
assert nodes[2]["data"]["amount"] == "₹12.0L"
assert nodes[4]["data"]["amount"] == "12 Days"
assert nodes[5]["data"]["amount"] == "₹31.0L"

print("\n=== 4. INTERVENTION SIMULATOR CONSISTENCY ===")
for opt in interventions["options"]:
    print(f"Option {opt['id']}: Cost={opt['cost_formatted']}, Protected={opt['exposure_protected_formatted']} ({opt['coverage_pct']}%), Rec={opt['is_recommended']}")
assert interventions["options"][0]["cost_formatted"] == "₹48,000"
assert interventions["options"][0]["exposure_protected_formatted"] == "₹31.0L"
assert interventions["options"][0]["is_recommended"] == True

print("\n=== 5. EXECUTIVE MEMO AUDIT MATRIX CONSISTENCY ===")
math = memo["math_summary"]
for k, v in math.items():
    print(f"• {k}: {v}")
assert math["inflow_at_risk"] == "₹24.0L"
assert math["breach_minimum_cash"] == "₹6.6L"
assert math["supplier_obligation"] == "₹12.0L"
assert math["stockout_duration"] == "12 Days"
assert math["revenue_exposure"] == "₹31.0L"
assert math["recommended_cost"] == "₹48,000"
assert math["net_protected_value"] == "₹30.52L"

print("\n========================================================")
print(">>> ALL 5 SCREENS ARE 100% CANONICALLY & NUMERICALLY CONSISTENT! <<<")
print("========================================================")
