import os
import sys
import time
import webbrowser

os.environ["PYTHONIOENCODING"] = "utf-8"

import uvicorn

if __name__ == "__main__":
    print("=" * 60)
    print("  CashFlow Chain — Financial Intelligence Engine")
    print("  Starting on http://localhost:8000")
    print("  (Frontend + Backend served from one process)")
    print("=" * 60)

    # Open browser after a short delay
    def open_browser():
        time.sleep(2)
        webbrowser.open("http://localhost:8000")

    import threading
    t = threading.Thread(target=open_browser, daemon=True)
    t.start()

    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=False)
