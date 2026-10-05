# CASHFLOW CHAIN — PowerShell Launcher
Write-Host "======================================================================" -ForegroundColor Cyan
Write-Host "            CASHFLOW CHAIN — Financial Intelligence Engine" -ForegroundColor Cyan
Write-Host "            Starting Backend (FastAPI) and Frontend (Vite)" -ForegroundColor Cyan
Write-Host "======================================================================" -ForegroundColor Cyan

$env:PYTHONIOENCODING = "utf-8"
$root = $PSScriptRoot

# 1. Start Backend in separate window
Write-Host "[1/2] Launching Backend on http://localhost:8000 ..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$root\backend'; `$env:PYTHONIOENCODING='utf-8'; .\.venv\Scripts\python.exe run_backend.py"

Start-Sleep -Seconds 2

# 2. Start Frontend
Write-Host "[2/2] Launching Frontend on http://localhost:5173 ..." -ForegroundColor Green
Set-Location "$root\frontend"
& npm.cmd run dev -- --host
