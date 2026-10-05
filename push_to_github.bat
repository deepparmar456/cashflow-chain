@echo off
echo ======================================================================
echo              Push CashFlow Chain to Your GitHub
echo ======================================================================
echo.
echo 1. Go to https://github.com/new and create a new repository:
echo    - Repository name: cashflow-chain
echo    - Public or Private: Public (recommended for hackathon judges)
echo    - Leave "Add a README file" UNCHECKED
echo.
set /p REPO_URL="Paste your GitHub repository URL (e.g. https://github.com/YourUser/cashflow-chain.git): "

if "%REPO_URL%"=="" (
    echo.
    echo [ERROR] No URL entered. Aborting.
    pause
    exit /b 1
)

echo.
echo [1/2] Connecting remote origin...
git remote remove origin >nul 2>&1
git remote add origin %REPO_URL%

echo [2/2] Pushing code to main branch...
git branch -M main
git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo ======================================================================
    echo   SUCCESS! Your repository is now fully live on GitHub!
    echo.
    echo   Next Step (1-Minute Standalone Deployment):
    echo   1. Go to https://render.com
    echo   2. Click "New +" -> "Web Service"
    echo   3. Connect your new "cashflow-chain" repo
    echo   4. Click "Create Web Service"
    echo.
    echo   Render will build and give you a permanent standalone HTTPS URL!
    echo ======================================================================
) else (
    echo.
    echo [ERROR] Push failed. If a browser window popped up, please sign in to GitHub.
)

echo.
pause
