# deploy-all.ps1
# Automates the "Clean Deploy" of backend services to Fly.io
# Uses --remote-only to bypass local Docker issues.

$ErrorActionPreference = "Stop"

Write-Host "🚀 Starting Fresh Deployment Sequence..." -ForegroundColor Cyan

# 1. Deploy Auth Service
Write-Host "`n🔐 Deploying Auth Service (plaqode-auth-v1)..." -ForegroundColor Yellow
try {
    # --remote-only forces the build to happen on Fly.io servers, not your local machine
    fly deploy -c apps/plaqode-auth/fly.toml --remote-only
    if ($LASTEXITCODE -ne 0) { throw "Auth deployment failed" }
    Write-Host "✅ Auth Service Deployed Successfully!" -ForegroundColor Green
}
catch {
    Write-Host "❌ Auth Service Deployment Failed!" -ForegroundColor Red
    exit 1
}

# 2. Deploy QR Studio API
Write-Host "`n📡 Deploying QR Studio API (plaqode-api-v1)..." -ForegroundColor Yellow
try {
    fly deploy -c apps/qrstudio-api/fly.toml --remote-only
    if ($LASTEXITCODE -ne 0) { throw "API deployment failed" }
    Write-Host "✅ QR Studio API Deployed Successfully!" -ForegroundColor Green
}
catch {
    Write-Host "❌ QR Studio API Deployment Failed!" -ForegroundColor Red
    exit 1
}

Write-Host "`n✨ All systems deployed! You can now verify your live sites." -ForegroundColor Cyan
