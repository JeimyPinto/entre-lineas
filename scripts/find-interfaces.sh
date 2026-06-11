#!/bin/bash
# Interface Finder - Shell wrapper for easy use
# Usage: ./scripts/find-interfaces.sh <search-term>

if [ $# -eq 0 ]; then
    echo "Usage: ./scripts/find-interfaces.sh <search-term>"
    echo "Example: ./scripts/find-interfaces.sh Artist"
    exit 1
fi

npm run find:interfaces "$1"