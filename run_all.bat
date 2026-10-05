@echo off
echo ======================================================================
echo   CASHFLOW CHAIN — Financial Intelligence Engine
echo   ONE-CLICK LAUNCH — Everything runs from a single window
echo ======================================================================
echo.
echo  Opening http://localhost:8000 in your browser...
echo  Keep this window open while using the application.
echo  Close it to stop the server.
echo.
set PYTHONIOENCODING=utf-8
cd /d %~dp0backend
.venv\Scripts\python.exe run_backend.py
