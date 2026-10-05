"""
Converts PROJECT_REPORT.md into a beautifully styled, print-ready HTML report (PROJECT_REPORT.html).
Can be opened in any browser and saved as PDF (Ctrl+P -> Save as PDF).
"""

import markdown

with open("PROJECT_REPORT.md", "r", encoding="utf-8") as f:
    md_content = f.read()

html_body = markdown.markdown(md_content, extensions=['tables', 'fenced_code'])

full_html = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>CashFlow Chain — Project Report</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;600;700&display=swap');
    
    body {{
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.65;
      color: #1e293b;
      max-width: 900px;
      margin: 40px auto;
      padding: 0 24px;
      background: #ffffff;
    }}
    
    h1 {{
      font-size: 2.2rem;
      font-weight: 800;
      color: #0f172a;
      border-bottom: 3px solid #38bdf8;
      padding-bottom: 12px;
      margin-bottom: 4px;
    }}
    
    h2 {{
      font-size: 1.45rem;
      font-weight: 700;
      color: #0f172a;
      margin-top: 36px;
      margin-bottom: 12px;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 8px;
    }}
    
    h3 {{
      font-size: 1.15rem;
      font-weight: 600;
      color: #1e293b;
      margin-top: 24px;
      margin-bottom: 8px;
    }}
    
    p, li {{
      font-size: 0.95rem;
      color: #334155;
    }}
    
    strong {{
      color: #0f172a;
    }}
    
    table {{
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
      font-size: 0.88rem;
    }}
    
    th, td {{
      padding: 10px 14px;
      border: 1px solid #cbd5e1;
      text-align: left;
    }}
    
    th {{
      background-color: #f1f5f9;
      font-weight: 700;
      color: #0f172a;
    }}
    
    tr:nth-child(even) {{
      background-color: #f8fafc;
    }}
    
    code {{
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.85em;
      background: #f1f5f9;
      padding: 2px 6px;
      border-radius: 4px;
      color: #0284c7;
    }}
    
    pre {{
      background: #0f172a;
      color: #f8fafc;
      padding: 16px;
      border-radius: 8px;
      overflow-x: auto;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.85rem;
      line-height: 1.45;
    }}
    
    pre code {{
      background: transparent;
      color: #38bdf8;
      padding: 0;
    }}
    
    blockquote {{
      border-left: 4px solid #38bdf8;
      margin: 16px 0;
      padding: 8px 16px;
      background: #f0f9ff;
      color: #0369a1;
      border-radius: 0 8px 8px 0;
    }}
    
    .print-banner {{
      background: #0f172a;
      color: #ffffff;
      padding: 12px 20px;
      border-radius: 8px;
      margin-bottom: 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.88rem;
    }}
    
    .print-btn {{
      background: #38bdf8;
      color: #0f172a;
      border: none;
      font-weight: 700;
      padding: 8px 16px;
      border-radius: 6px;
      cursor: pointer;
    }}
    
    @media print {{
      .print-banner {{ display: none; }}
      body {{ margin: 0; padding: 0; max-width: 100%; }}
      h1, h2, h3 {{ page-break-after: avoid; }}
      table, pre {{ page-break-inside: avoid; }}
    }}
  </style>
</head>
<body>
  <div class="print-banner">
    <span>💡 <strong>CashFlow Chain Official Hackathon Report</strong></span>
    <button class="print-btn" onclick="window.print()">Print / Save as PDF</button>
  </div>
  {html_body}
</body>
</html>
"""

with open("PROJECT_REPORT.html", "w", encoding="utf-8") as f:
    f.write(full_html)

print("PROJECT_REPORT.html created successfully!")
