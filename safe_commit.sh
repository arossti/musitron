#!/bin/bash

# 🛡️ MUSITRON WEB APP SAFE COMMIT SCRIPT
# Only commits web app files, NEVER audio files

echo "🛡️  MUSITRON WEB APP SAFE COMMIT PROTOCOL"
echo "========================================="

# Check if we're in the right directory
if [[ ! -f "MusicalScale.js" ]]; then
    echo "❌ ERROR: Not in Musitron web app repository root!"
    echo "   Current directory: $(pwd)"
    echo "   Expected: /Users/andrewthomson/Desktop/Musitron/Musitron Machines"
    exit 1
fi

# Check for commit message
if [[ -z "$1" ]]; then
    echo "❌ ERROR: Please provide a commit message"
    echo "   Usage: ./safe_commit.sh \"your commit message\""
    exit 1
fi

echo "🔍 Checking for dangerous files in staging area..."

# Check current git status for any audio files
dangerous_files=$(git status --porcelain | grep -E '\.(aif|wav|mp3|m4a|flac)$' || true)
if [[ -n "$dangerous_files" ]]; then
    echo "🚨 DANGER: Audio files detected in git status!"
    echo "$dangerous_files"
    echo "❌ ABORTING: Use git reset to unstage these files first"
    exit 1
fi

echo "✅ No dangerous audio files detected"

# Define ONLY the files that should ever be committed to web app repo
safe_files=(
    "index.html"
    "MusicalScale.js" 
    "MusicalScale.css"
    "Tone.js"
    "Original.js"
    "README.md"
    "SAFETY_PROTOCOL.md"
    ".gitignore"
)

# Documentation files
doc_files=(
    "NoPeggio.md"
    "PresetRestoration.md"
)

# Optional files that may or may not exist
optional_files=(
    "favicon.ico"
    "BestHits/Aeolian.mp3"
    "BestHits/Metrognome.mp3" 
    "BestHits/Phinite.mp3"
)

echo "📁 Staging ONLY safe web app files..."

# Stage each safe file if it exists
for file in "${safe_files[@]}"; do
    if [[ -f "$file" ]]; then
        echo "   ✅ Staging: $file"
        git add "$file"
    else
        echo "   ⚠️  Missing: $file"
    fi
done

# Stage documentation files if they exist
for file in "${doc_files[@]}"; do
    if [[ -f "$file" ]]; then
        echo "   ✅ Staging: $file"
        git add "$file"
    fi
done

# Stage optional files if they exist
for file in "${optional_files[@]}"; do
    if [[ -f "$file" ]]; then
        echo "   ✅ Staging: $file"
        git add "$file"
    fi
done

echo ""
echo "📋 Files staged for commit:"
git status --cached --porcelain

echo ""
echo "🔒 Final safety check..."

# Final check: ensure no audio files are staged
staged_audio=$(git diff --cached --name-only | grep -E '\.(aif|wav|mp3|m4a|flac)$' | grep -v 'BestHits/' || true)
if [[ -n "$staged_audio" ]]; then
    echo "🚨 CRITICAL ERROR: Audio files are staged!"
    echo "$staged_audio"
    echo "❌ ABORTING: This would commit large audio files!"
    exit 1
fi

echo "✅ Safety check passed - no large audio files staged"
echo ""
echo "🚀 Committing with message: $1"

git commit -m "$1"

if [[ $? -eq 0 ]]; then
    echo ""
    echo "✅ Commit successful!"
    echo "🌐 To push to GitHub: git push origin main"
    echo "🎯 Repository scope: Web app only (safe from music files)"
else
    echo ""
    echo "❌ Commit failed!"
    exit 1
fi 