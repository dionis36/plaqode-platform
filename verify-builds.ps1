# verify-builds.ps1
# Run this script from the root of your monorepo to verify Docker builds.

$ErrorActionPreference = "Stop"

Write-Host "🐳 Starting Local Docker Build Verification..." -ForegroundColor Cyan

# 1. Verify Plaqode Auth
Write-Host "`n🔍 Verifying [plaqode-auth]..." -ForegroundColor Yellow
try {
    docker build -f apps/plaqode-auth/Dockerfile . --no-cache
    if ($LASTEXITCODE -ne 0) { throw "Docker build returned error code $LASTEXITCODE" }
    Write-Host "✅ [plaqode-auth] Build Successful!" -ForegroundColor Green
}
catch {
    Write-Host "❌ [plaqode-auth] Build Failed!" -ForegroundColor Red
    Write-Host $_
    exit 1
}

# 2. Verify QR Studio API
Write-Host "`n🔍 Verifying [qrstudio-api]..." -ForegroundColor Yellow
try {
    docker build -f apps/qrstudio-api/Dockerfile . --no-cache
    if ($LASTEXITCODE -ne 0) { throw "Docker build returned error code $LASTEXITCODE" }
    Write-Host "✅ [qrstudio-api] Build Successful!" -ForegroundColor Green
}
catch {
    Write-Host "❌ [qrstudio-api] Build Failed!" -ForegroundColor Red
    Write-Host $_
    exit 1
}

Write-Host "`n🎉 All builds verified successfully! You are ready to deploy." -ForegroundColor Cyan
