# Add this to your ~/.bashrc, ~/.zshrc, or PowerShell profile

# For Bash/Zsh:
find-interfaces() {
  if [ $# -eq 0 ]; then
    echo "Usage: find-interfaces <search-term>"
    echo "Example: find-interfaces Artist"
    return 1
  fi
  (cd ~/OneDrive/Desktop/Proyectos/entre-lineas && npm run find:interfaces "$1")
}

# For PowerShell (add to $PROFILE):
# function find-interfaces {
#   param([string]$searchTerm)
#   if (-not $searchTerm) {
#     Write-Host "Usage: find-interfaces <search-term>"
#     Write-Host "Example: find-interfaces Artist"
#     return
#   }
#   Set-Location ~/OneDrive/Desktop/Proyectos/entre-lineas
#   npm run find:interfaces $searchTerm
# }

# Usage after adding to profile and restarting shell:
# find-interfaces Artist
# find-interfaces Event
# find-interfaces Video