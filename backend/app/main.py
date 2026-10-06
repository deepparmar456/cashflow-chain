"""
CashFlow Chain - FastAPI Backend Application
Serves financial analytics, dependency graph solvers, and simulation endpoints.
ONE SERVER: FastAPI now serves both the REST API and the built React frontend.
Run: python run_backend.py   →   open http://localhost:8000
"""

import os
from pathlib import Path
from typing import Optional, Dict, List
from fastapi import FastAPI, Query, HTTPException, UploadFile, File, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, FileResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from .financial_engine import FinancialEngine

app = FastAPI(
    title="CashFlow Chain API",
    description="Financial early-warning, dependency cascade solver, and intervention optimization engine.",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

engine = FinancialEngine()

SAMPLE_DATAPACKS_DIR = Path(__file__).resolve().parent / "sample_datapacks"

# ── Serve Built React Frontend ─────────────────────────────────────────────
# frontend/dist is built by: cd frontend && npm run build
# After that, http://localhost:8000  serves the full UI — no Vite needed.
FRONTEND_DIST = Path(__file__).resolve().parent.parent.parent / "frontend" / "dist"
FRONTEND_ASSETS = FRONTEND_DIST / "assets"

if FRONTEND_ASSETS.exists():
    app.mount("/assets", StaticFiles(directory=str(FRONTEND_ASSETS)), name="assets")
# ──────────────────────────────────────────────────────────────────────────


class DataPackJsonPayload(BaseModel):
    files: Dict[str, str]


@app.get("/")
def root():
    """Serve the React SPA index.html."""
    index = FRONTEND_DIST / "index.html"
    if index.exists():
        return FileResponse(str(index), media_type="text/html")
    return {"message": "CashFlow Chain API is running. Build the frontend first: cd frontend && npm run build"}


@app.get("/health")
def health_check():
    return {
        "status": "HEALTHY",
        "system": "CashFlow Chain Backend Engine",
        "version": "1.0.0",
        "company_name": engine.company_name,
        "mode": engine.mode,
        "frontend_served": FRONTEND_DIST.exists()
    }


@app.get("/api/datapack/status")
def get_datapack_status():
    return {
        "company_name": engine.company_name,
        "mode": engine.mode,
        "is_custom": engine.is_custom,
        "benchmark_company": "ABC Industries"
    }


@app.post("/api/upload-datapack")
async def upload_datapack_json(payload: DataPackJsonPayload):
    result = engine.ingest_datapack(payload.files)
    if not result.get("success"):
        return JSONResponse(status_code=400, content=result)
    return result


@app.post("/api/upload-datapack-files")
async def upload_datapack_files(files: List[UploadFile] = File(...)):
    files_dict: Dict[str, str] = {}
    for f in files:
        content_bytes = await f.read()
        try:
            files_dict[f.filename] = content_bytes.decode("utf-8")
        except UnicodeDecodeError:
            files_dict[f.filename] = content_bytes.decode("latin-1")
    result = engine.ingest_datapack(files_dict)
    if not result.get("success"):
        return JSONResponse(status_code=400, content=result)
    return result


@app.post("/api/reset-benchmark")
def reset_benchmark():
    return engine.reset_benchmark()


@app.get("/api/download-datapack/{pack_name}")
def download_sample_datapack(pack_name: str):
    clean = pack_name.lower().strip()
    if "zenith" in clean:
        target = SAMPLE_DATAPACKS_DIR / "zenith_precision_datapack.zip"
        download_name = "zenith_precision_sme_datapack.zip"
    else:
        target = SAMPLE_DATAPACKS_DIR / "apex_components_datapack.zip"
        download_name = "apex_components_sme_datapack.zip"
    if not target.exists():
        raise HTTPException(status_code=404, detail=f"Data pack file {target.name} not found.")
    return FileResponse(path=str(target), media_type="application/zip", filename=download_name)


@app.get("/api/metrics")
def get_metrics(intervention: Optional[str] = Query("NONE")):
    return engine.get_metrics(active_intervention=intervention.upper())


@app.get("/api/timeline")
def get_timeline(intervention: Optional[str] = Query("NONE")):
    return engine.get_cash_timeline(active_intervention=intervention.upper())


@app.get("/api/customer-risk")
def get_customer_risk():
    return engine.get_customer_risk_profile()


@app.get("/api/impact-chain")
def get_impact_chain(intervention: Optional[str] = Query("NONE")):
    return engine.get_impact_chain_graph(active_intervention=intervention.upper())


@app.get("/api/interventions")
def get_interventions():
    return engine.get_interventions()


@app.get("/api/executive-explanation")
@app.get("/api/executive-memo")
def get_executive_explanation(intervention: Optional[str] = Query("NONE")):
    return engine.get_executive_explanation(active_intervention=intervention.upper())


@app.get("/api/customers")
def get_customers():
    return {"total": len(engine.data["customers"]), "customers": engine.data["customers"]}


@app.get("/api/suppliers")
def get_suppliers():
    return {"total": len(engine.data["suppliers"]), "suppliers": engine.data["suppliers"]}


@app.get("/api/invoices")
def get_invoices():
    return {"total": len(engine.data["invoices"]), "invoices": engine.data["invoices"]}


@app.get("/api/sku-details")
def get_sku_details():
    return {
        "sku": engine.data["sku"],
        "sales_orders_at_risk": engine.data["sales_orders_at_risk"]
    }
