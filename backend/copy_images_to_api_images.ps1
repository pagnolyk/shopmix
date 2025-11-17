# Copies image files from the frontend assets folder to backend/api/images
# Usage: run from PowerShell (optionally as admin):
#   cd C:\Users\USERT\Pictures\shopmix\backend
#   powershell -ExecutionPolicy Bypass -File .\copy_images_to_api_images.ps1

$src = "C:\Users\USERT\Pictures\shopmix\src\assets\frontend_assets"
$dst = "C:\Users\USERT\Pictures\shopmix\backend\api\images"

Write-Host "Source: $src"
Write-Host "Destination: $dst"

# Create destination if missing
if (-Not (Test-Path -Path $dst)) {
  New-Item -ItemType Directory -Path $dst -Force | Out-Null
  Write-Host "Created destination folder: $dst"
}

# File extensions to copy
$exts = @('*.jpg','*.jpeg','*.png','*.webp','*.avif','*.svg','*.gif')

# Copy files (flatten into destination)
foreach ($ext in $exts) {
  Get-ChildItem -Path $src -Include $ext -Recurse -File -ErrorAction SilentlyContinue | ForEach-Object {
    $destFile = Join-Path $dst $_.Name
    Copy-Item -Path $_.FullName -Destination $destFile -Force
    Write-Host "Copied: $($_.Name)"
  }
}

Write-Host "Done. Verify images exist in: $dst"
