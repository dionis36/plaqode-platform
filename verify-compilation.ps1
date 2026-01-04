# verify-compilation.ps1
# Verifies the code integrity by running the build process LOCALLY (No Docker required).
# This confirms your Typescript and Prisma configurations are correct.

$ErrorActionPreference = "Stop"

Write-Host "🕵️ Starting Local Code Compilation Check..." -ForegroundColor Cyan

function Run-Check ($Path, $Name) {
    Write-Host "`n📁 Checking [$Name] in $Path..." -ForegroundColor Yellow
    Push-Location $Path
    try {
        # 1. Install Dependencies (Fast)
        Write-Host "   📦 Checking dependencies..."
        npm install --prefer-offline --no-audit --silent | Out-Null
        
        # 2. Prisma Generate
        if (Test-Path "prisma/schema.prisma") {
            Write-Host "   💎 Generating Prisma Client..."
            npx prisma generate
            if ($LASTEXITCODE -ne 0) { throw "Prisma Generate Failed" }
        }

        # 3. Build (TypeScript)
        Write-Host "   🔨 Compiling TypeScript..."
        npm run build
        if ($LASTEXITCODE -ne 0) { throw "Build Failed" }

        Write-Host "   ✅ $Name is VALID." -ForegroundColor Green
    }
    catch {
        Write-Host "   ❌ $Name FAILED Verification!" -ForegroundColor Red
        Write-Host "   Error: $_"
        Pop-Location
        exit 1
    }
    Pop-Location
}

# Check Auth
Run-Check -Path "apps/plaqode-auth" -Name "plaqode-auth"

# Check API
Run-Check -Path "apps/qrstudio-api" -Name "qrstudio-api"

Write-Host "`n🎉 Codebase verification complete! The code is healthy and ready to package." -ForegroundColor Cyan
