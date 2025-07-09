# 🛡️ MUSITRON SAFETY PROTOCOL
## Preventing Audio File Loss Disasters

### ⚠️ WHAT WENT WRONG
On July 9, 2025, we lost hundreds of MB of irreplaceable audio files because:
1. Git repository scope encompassed entire music workspace (`/Users/andrewthomson/Desktop/Musitron/`)
2. `git add .` from root staged ALL directories including audio files
3. `git reset --hard HEAD~1` removed staged files from hard drive
4. Only recovered due to lucky zip backup in `Musitron Cosmos/a-side.zip`

### 🚨 NEVER AGAIN RULES

#### Rule #1: ALWAYS Check Git Status Before Staging
```bash
# ALWAYS run this before git add:
git status
# If you see audio files (.aif, .wav, .mp3) - STOP!
```

#### Rule #2: NEVER Use `git add .` from Repository Root
```bash
# DANGEROUS (from /Users/andrewthomson/Desktop/Musitron/):
git add .  # ❌ NEVER DO THIS

# SAFE (stage specific files only):
git add index.html MusicalScale.js MusicalScale.css Tone.js README.md
```

#### Rule #3: Use the Safe Staging Script
```bash
# Use this script for ALL commits:
./safe_commit.sh "commit message"
```

#### Rule #4: Backup Before ANY Git Operations
```bash
# Before major git operations:
cp -r "Musitron Cosmos" "Musitron Cosmos_backup_$(date +%Y%m%d_%H%M%S)"
cp -r "Musitron Helios" "Musitron Helios_backup_$(date +%Y%m%d_%H%M%S)"
```

### 📁 REPOSITORY STRUCTURE
```
/Users/andrewthomson/Desktop/Musitron/  ← Git repository root (DANGER ZONE)
├── .gitignore                          ← Protects audio directories
├── index.html                          ← Web app (SAFE to commit)
├── MusicalScale.js                     ← Web app (SAFE to commit)
├── MusicalScale.css                    ← Web app (SAFE to commit)
├── Tone.js                             ← Web app (SAFE to commit)
├── README.md                           ← Documentation (SAFE to commit)
├── BestHits/                           ← Small MP3s only (SAFE to commit)
├── Musitron Cosmos/                    ← PROTECTED (NEVER commit)
├── Musitron Helios/                    ← PROTECTED (NEVER commit)
└── GB Projects/                        ← PROTECTED (NEVER commit)
```

### 🎯 ONLY THESE FILES SHOULD EVER BE COMMITTED:
- `index.html`
- `MusicalScale.js`
- `MusicalScale.css`
- `Tone.js`
- `README.md`
- `favicon.ico`
- `BestHits/*.mp3` (small demo files only)

### 🚫 NEVER COMMIT THESE:
- `Musitron Cosmos/` (your music compositions!)
- `Musitron Helios/` (your music compositions!)
- `GB Projects/` (GarageBand files)
- Any `.aif`, `.wav`, large `.mp3` files
- Any `*.zip` archives

### 🔒 EMERGENCY RECOVERY CHECKLIST
If audio files go missing:
1. **DON'T PANIC** - check git reflog first
2. Check for zip backups in directories
3. Look in `superceded/` directories
4. Check Time Machine/backups
5. Use `git fsck --lost-found` to find orphaned objects

### 📞 CONTACT PROTOCOL
If unsure about ANY git operation involving the repository root:
1. STOP immediately
2. Check git status
3. Ask for verification before proceeding
4. When in doubt, create backups first

**Remember: Your music is irreplaceable. Code is replaceable.** 