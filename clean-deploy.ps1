# clean-deploy.ps1
# Performs a "Clean" deployment:
# 1. Forces a fresh build (--no-cache)
# 2. Resets machine count to 1 to clean up any "ghost" or excess machines.

$ErrorActionPreference = "Stop"

Write-Host "🧼 Starting Clean Deployment Sequence..." -ForegroundColor Cyan
Write-Host "   (This prevents using stale cache and prunes extra machines)" -ForegroundColor DarkGray

# Function to deploy and clean
function Deploy-Service ($Path, $Name, $Dockerfile) {
    Write-Host "`n🚀 Deploying [$Name]..." -ForegroundColor Yellow
    
    # 1. Deploy with No Cache (Forces rebuild)
    # We use --dockerfile to specify the file relative to ROOT
    # We pass "." at the end to set the build context to the ROOT (Crucial for Monorepo)
    fly deploy -c $Path --dockerfile $Dockerfile --no-cache --ha=false .
    
    if ($LASTEXITCODE -ne 0) { 
        Write-Host "❌ [$Name] Deployment Failed!" -ForegroundColor Red
        exit 1 
    }

    # 2. Cleanup / Scale Reset
    # This ensures only 1 machine exists/runs, removing any "ghosts" or accidental scale-ups
    Write-Host "🧹 Pruning ghost machines (Scaling to 1)..." -ForegroundColor Magenta
    fly scale count 1 -c $Path -y

    Write-Host "✅ [$Name] Clean Deploy Complete!" -ForegroundColor Green
}

# Run for both services
Deploy-Service "apps/plaqode-auth/fly.toml" "plaqode-auth-v1" "apps/plaqode-auth/Dockerfile"
Deploy-Service "apps/qrstudio-api/fly.toml" "plaqode-api-v1" "apps/qrstudio-api/Dockerfile"

Write-Host "`n✨ All services successfully refreshed and cleaned!" -ForegroundColor Cyan
