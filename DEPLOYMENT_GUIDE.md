# CashFlow Chain — Live Public Deployment & Demo Guide

This document explains how judges and evaluators access the full **CashFlow Chain** application (React frontend + Python FastAPI financial engine) over public HTTPS.

---

## ⚡ Option 1: Live Public URL (Active Right Now)

The entire full-stack application (frontend + predictive ML engine + CSV ingestion) is currently live on a secure Cloudflare HTTPS tunnel:

👉 **[https://cashflow-chain.onrender.com/](https://cashflow-chain.onrender.com/)**

- **No login or IP bypass required**: Any browser, phone, or evaluator can open this link directly.
- **Unified Engine**: Both the React UI and the FastAPI REST endpoints are served on this single URL.
- **Benchmark Data Preloaded**: Opens directly into the canonical **Apex Components Ltd.** scenario (₹42.6L cash, ₹24L inflow shock, ₹31L revenue exposure, ₹48K optimal intervention).
- **Live CSV Ingestion**: Evaluators can click `＋ LOAD COMPANY DATA` and upload custom SME CSVs or click `Quick-Load Sample: Zenith Precision Ltd.` to test live model fitting.

---

## 🚀 Option 2: Permanent Cloud Deployment (Render.com)

Because we unified the React build into FastAPI's static file handler, **you only deploy one single service**. No separate CORS configuration or dual-URL headaches.

### 3-Minute Render.com Deployment Steps:
1. Push this folder to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "CashFlow Chain Hackathon Release"
   git remote add origin https://github.com/<your-username>/cashflow-chain.git
   git push -u origin main
   ```
2. Go to **[Render.com](https://render.com)** and click **New +** $\rightarrow$ **Web Service**.
3. Select your repository.
4. Render will automatically read [`render.yaml`](./render.yaml). If configuring manually:
   - **Environment**: `Python`
   - **Build Command**:
     ```bash
     cd frontend && npm install && npm run build && cd ../backend && pip install -r requirements.txt
     ```
   - **Start Command**:
     ```bash
     cd backend && uvicorn app.main:app --host 0.0.0.0 --port $PORT
     ```
   - **Plan**: Free
5. Click **Create Web Service**. Within ~2 minutes, your permanent URL will be live at:
   `https://cashflow-chain.onrender.com`

---

## 💻 Option 3: Local Offline Demo (For Presentation Screen)

If presenting from your laptop during live judging:
1. Open this folder in Windows File Explorer.
2. Double-click [`run_all.bat`](./run_all.bat).
3. It launches the Python FastAPI engine and automatically opens your browser to:
   👉 **http://localhost:8000**
