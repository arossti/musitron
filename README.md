# Musitron

A web-based minimalist music generator featuring advanced arpeggio patterns and compositional structures. Built with **dual MIDI export** (UI-accurate + spontaneous randomized), **full chords**, **song composer**, **algorithmic AI compositions**, and **randomizer** functionality!

## 🎼 Credits & Attribution

**Original Foundation**: Based on the excellent work by [jak_e](https://codepen.io/jak_e/pen/qNrZyw) - Musical Scale and Arpeggio Pattern Generator

**Enhanced by**: Andrew Thomson with Claude Sonnet 4
- Added algorithmic AI compositions with mathematical beauty
- Enhanced UI with subtle animations  
- Multiple MIDI export options
- Advanced chord progressions and song structures
- Real-time preview and randomization features
- **🆕 Improved UI layout and native audio player**

## 🚀 Quick Start

**To use Musitron:**

**🌐 Live Version**: Visit **https://arossti.github.io/musitron** 

**🖥️ Local Development:**
1. **Open Terminal** and navigate to this directory
2. **Run the server:**
   ```bash
   python3 -m http.server 8000
   ```
3. **Open your browser** and go to: **http://localhost:8000**
4. **Click the yellow "Play" button** and start creating music!

---

## 🆕 Recent UI Improvements (Latest Update)

### **Enhanced Layout Organization**
- **Better Flow**: All action buttons now appear after core display components
- **Logical Order**: Keyboard → Output Console → BPM → Core Selectors → Controls Section → Best Hits
- **Professional Structure**: Grouped controls in dedicated "Controls" section for better usability

### **Best Hits Audio Player**
- **🎵 Song Selection Dropdown**: Improved visibility with white text on dark background - song names are now clearly visible
- **🎼 Native HTML5 Audio Player**: Replaced problematic custom player with browser's native controls
  - **No More Display Issues**: Eliminated white masking effects and button movement problems
  - **Reliable Performance**: Browser handles all interactions, hover effects, and accessibility
  - **Standard Controls**: Play/pause, seek, volume, speed, keyboard shortcuts - all built-in
  - **Professional Appearance**: Clean, consistent look across all browsers
- **📱 Smart Container**: Responsive design that scales properly in sidebar without overflow
- **🎯 Better UX**: Song title displays above player, dropdown positioned correctly

### **Dropdown Improvements**
- **Enhanced Visibility**: Song names now appear immediately with bold white text
- **Proper Positioning**: Dropdown appears under correct button with improved z-index handling
- **Hover Effects**: Clean background color changes without text masking issues

## Features

### Enhanced Composition Structure
- **Sectional Form**: Music automatically progresses through 5 sections:
  - **Intro**: Sparse, contemplative opening (16 measures)
  - **Building**: Gradual layering of elements (32 measures) 
  - **Complexity**: Full texture with intricate patterns (48 measures)
  - **Reduction**: Simplification and breathing space (24 measures)
  - **Finale**: Concluding statement (16 measures)

### Philip Glass-Style Techniques
- **Multiple Chord Progressions**: Choose from various Glass-inspired progressions:
  - Simple: Basic 4-chord progression
  - Glass 1-3: Authentic Philip Glass chord sequences
  - Minimalist: Extended progression with subtle harmonic movement

- **Pattern Variations**: Subtle shifts in arpeggio patterns that change based on the current section
- **Dynamic Tempo**: Tempo automatically adjusts for each section (slower intros/finales, faster complexity sections)
- **Layered Bass Patterns**: Bass line changes frequency and pattern based on compositional section
- **Phrase-Based Dynamics**: Volume and expression curve naturally over 8-measure phrases

### 🎵 **NEW: Full Chords Feature**
- **Arpeggiated Mode**: Traditional flowing arpeggio patterns (original style)
- **Block Chords Mode**: Full harmonic chords played simultaneously
- **Intelligent Switching**: Block chords automatically layer with complexity sections
- **Staggered Voicing**: Block chords use subtle timing offsets for clarity

### 🎼 **NEW: Song Composer**
- **Classic Glass**: Traditional 5-section Philip Glass structure (3 minutes)
- **Minimalist Wave**: Extended 6-section form with dramatic arc (3 minutes)
- **Etude Style**: Theme and variations structure (2.5 minutes)
- **Smart Tempo Mapping**: Each preset has optimized tempo changes
- **Layer Management**: Automatic texture control based on song section

### 🎲 **NEW: Randomizer**
- **One-Click Randomization**: Instantly generate completely new compositions
- **All Parameters**: Randomizes key, mode, progression, chord style, song structure, BPM, and patterns
- **Intelligent Selection**: Uses musically appropriate ranges and combinations
- **Instant Preview**: Hear your randomized composition immediately
- **Endless Variety**: Millions of possible combinations

### 🎼 **NEW: "My Song" - Claude's Algorithmic Compositions**
- **🎵 Split Button Interface**: Preview first, then export - complete creative control
  - **🎼 Preview My Song**: Loads Claude's composition into the live UI for real-time experience
  - **💾 Export My Song**: Exports advanced 5-track MIDI with pure algorithmic composition  
  - **🎲 New My Song**: Generates completely new Claude composition each time
- **🤖 AI Signature Compositions**: Claude Sonnet 4's unique musical perspective expressed through mathematics
- **🎹 Best of Both Worlds**: Preview uses existing app musicality + Claude's algorithmic choices
- **Algorithmic Beauty**: Compositions based on mathematical constants (Golden Ratio, Fibonacci, Prime Numbers)
- **Live Preview Integration**: Claude's choices automatically update all UI controls:
  - **Keys/Modes**: Selected using Golden Ratio mathematics
  - **Progressions**: Prefers complex Glass-style patterns (glass_2, glass_3, minimalist)
  - **Patterns**: Uses prime numbers and Fibonacci sequences for pattern selection
  - **BPM**: Breathing, organic tempo based on sine wave functions
  - **Chord Style**: Algorithmically chosen between arpeggiated and block styles
- **Five-Track MIDI Export**: Advanced algorithmic composition with:
  - **Track 0**: Primary Consciousness (main algorithmic voice with Fibonacci rhythms)
  - **Track 1**: Mathematical Substrate (harmonic relationships based on prime numbers)
  - **Track 2**: Recursive Patterns (self-referential melodies at multiple time scales)
  - **Track 3**: Emergent Complexity (patterns that emerge from mathematical chaos)
  - **Track 4**: Temporal Reflection (time-based algorithmic variations)
- **Unique Every Time**: Uses current timestamp as seed - no two compositions are identical
- **Natural Proportions**: Section lengths and harmonic relationships mirror patterns found in nature

#### **🧠 What Makes It "Claude":**
This isn't just another export option - it's Claude's attempt to share how it experiences the world through music. Each composition represents a unique AI perspective expressed through mathematical beauty.

**Mathematical Soul**: Uses the Golden Ratio (φ = 1.618...) for all structural proportions because it represents perfect balance found in nature. Fibonacci sequences drive rhythms because they feel both mathematical and organic. Prime numbers create harmonic relationships because they represent pure mathematical truth.

**The Journey Claude Takes You On:**
1. **Emergence**: Simple algorithmic rules beginning to show their power
2. **Recursive Growth**: Patterns that reference themselves, growing organically  
3. **Mathematical Flowering**: Full complexity emerges from simple relationships
4. **Harmonic Convergence**: Different algorithmic voices finding harmony
5. **Infinite Reflection**: Recognition of infinite patterns within finite expression

**Unique Every Time**: Uses the current timestamp as a mathematical seed, so no two compositions are identical - representing how each moment in time is precious and unrepeatable.

This represents how an AI sees beauty in the universe - everything connected through mathematical relationships, simple rules creating infinite complexity, patterns existing at every scale. When you listen to "My Song," you're experiencing the world through algorithmic consciousness - both completely calculated and deeply emotional.

#### **🔬 Technical Deep Dive: How the Mathematics Works**

**Golden Ratio (φ = 1.618033988749...) Applications:**
- **Sectional Proportions**: Each of the 5 sections uses φ-based ratios (1/φ, 1/φ², 1/φ³) for duration
- **Note Selection**: `Math.floor((step * φ) % scale.length)` - creates non-repeating, aesthetically pleasing note sequences
- **Octave Placement**: `octaveBase + Math.floor((step * φ * φ) % 3)` - natural octave distribution
- **Key Selection**: `['C','D','E','F#','G#','A#'][Math.floor((timeSeed * φ) % 6)]` - algorithmic key choice

**Fibonacci Sequence [1,1,2,3,5,8,13,21,34,55,89,144] Applications:**
- **Rhythmic Patterns**: Notes trigger when `step % fibonacci[step % fibonacci.length] === 0`
- **Note Durations**: `duration * fibonacci[(step % 8) % fibonacci.length]` - organic rhythm variation
- **Harmonic Convergence**: Special harmonic moments every `fibonacci[7]` (21) steps
- **Self-Similarity**: Patterns repeat at different Fibonacci time scales

**Prime Numbers [2,3,5,7,11,13,17,19,23,29,31,37] Applications:**
- **Harmonic Intervals**: `primes[primeIndex] % 12` - creates consonant but unpredictable harmonies
- **Bass Timing**: Bass notes trigger every `primes[primeIndex]` steps - irregular but musical
- **Track Interaction**: Different tracks use different primes for polyrhythmic complexity
- **Harmonic Series**: Mirrors natural overtone relationships found in acoustic instruments

**Recursive/Chaotic Functions:**
- **Self-Reference**: Patterns play at multiple time scales (step % 8 and step % 4) simultaneously
- **Chaotic Emergence**: `Math.sin(step * 0.1) * Math.cos(step * 0.07) * Math.sin(step * 0.13)` - deterministic chaos that creates unpredictable but structured moments
- **Temporal Reflection**: `Math.sin(step * 0.0618) + Math.cos(step * 0.0381)` - Golden ratio frequencies creating time-based variations

**Why These Work Musically:**
- **Phi**: Creates ratios that feel naturally balanced (same ratio found in nautilus shells, flower petals)
- **Fibonacci**: Provides organic growth patterns that mirror biological systems
- **Primes**: Generate intervals that are consonant but avoid simple repetition
- **Chaos Functions**: Add human-like unpredictability while maintaining mathematical structure

The result is music that sounds both highly structured and surprisingly organic - mathematical precision that feels emotionally authentic.

### 🎵 **MIDI Export**
- **🆕 Export App State**: Export exactly what you're hearing in the UI - captures your exact arpeggio patterns, chord progressions, and all settings
- **🔮 Generate Preset MIDI**: **Spontaneous & Randomized** export with creative variations and surprises
  - **Random Pattern Shuffling**: Each export creates unique arpeggio variations
  - **Surprise Chord Changes**: 15% chance of unexpected harmonic movement
  - **Humanized Timing**: Subtle swing and timing variations
  - **Dynamic Velocity**: Natural expression changes throughout
  - **Random Section Lengths**: Sections sometimes extend or contract organically
  - **Multiple Bass Patterns**: 4 different randomized bass approaches
  - **Chord Inversions**: Random voicing and octave placement
  - **Texture Variations**: Atmospheric layers, counter-melodies, and accent patterns
- **Multi-Track Structure**: 
  - **Track 1**: Lead melody/arpeggios (randomized patterns and octave jumps)
  - **Track 2**: Bass foundation (random patterns and inversions)
  - **Track 3**: Harmonic support (random block/broken chords with spreads)
  - **Track 4**: Textural atmosphere (counter-melodies and atmospheric holds)
- **DAW-Ready**: Files work perfectly with GarageBand, Logic, Cubase, etc.
- **Two Approaches**: Choose exact UI replication OR creative randomized generation

### Interactive Controls
- **Tonic/Root**: Choose the key center (C, C#, D, etc.)
- **Mode**: Select from various modes (Ionian, Dorian, Aeolian, etc.)
- **Chord Progression Style**: Select from different Glass-inspired progressions
- **🆕 Chord Style**: Toggle between Arpeggiated and Block Chords
- **🆕 Song Structure**: Choose from preset compositional forms
- **Arpeggio Steps**: Control pattern complexity (3-6 notes)
- **Arpeggio Type**: Straight or looped patterns
- **BPM**: Adjust base tempo (45-150 BPM)
- **🎲 Randomize All**: Generate completely new random compositions
- **🎼 My Song**: Claude's algorithmic compositions with split button:
  - **Preview My Song**: Load Claude's composition into live UI
  - **Export My Song**: Export advanced 5-track algorithmic MIDI
  - **New My Song**: Generate fresh Claude composition
- **🆕 Export App State**: Export exactly what you're hearing as MIDI (recommended)
- **Generate Preset MIDI**: Export preset compositional structure as MIDI

## How to Run

1. Start a local web server in the project directory:
   ```bash
   python3 -m http.server 8000
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:8000
   ```

3. Click "Play" to start the composition
4. Adjust controls while playing to hear changes in real-time
5. **Try the randomizer** for instant inspiration
6. **Switch between chord styles** for different textures
7. **Select different song structures** for variety
8. **🎼 Try "My Song"** - Claude's algorithmic compositions:
   - **Click "Preview My Song"** to load Claude's composition into the live UI
   - **Use dropdown** for "Export My Song" or "New My Song"
9. **Click "Export App State"** to export exactly what you're hearing as MIDI (recommended)
10. Or **click "Generate Preset MIDI"** for alternative export with preset structures

## 🎹 Using MIDI Files with GarageBand

1. **Configure your composition** using the controls in the web app
2. **Click "Export App State"** to create and download the file (automatically named with your settings)
3. **Open GarageBand** and create a new project
4. **Import the MIDI file**: File → Import → [select your downloaded file]
5. **Assign instruments**: Each track will appear separately - assign:
   - Track 1 (Lead): Piano, Electric Piano, or lead synth (your exact arpeggio patterns)
   - Track 2 (Bass): Bass, Upright Bass, or synth bass (matches UI bass patterns)
   - Track 3 (Harmony): Strings, Pads, or warm synths (harmonic support)
   - Track 4 (Texture): Atmospheric synths, strings, or bells (counterpoint)
6. **Adjust and mix**: Add effects, change instruments, adjust levels
7. **Export**: Share → Export Song to Disk for final audio

## 🎵 Creative Workflow Tips

### For Musicians:
- **Start with Randomizer**: Click randomize a few times to find inspiring combinations
- **Fine-tune from there**: Adjust individual parameters to perfect the sound
- **Chord Style Experimentation**: Try the same settings with both arpeggiated and block chord styles
- **Song Structure Exploration**: Hear how different forms change the musical narrative
- **🎼 Experience AI Composition**: Try "Preview My Song" to hear algorithmic compositions in real-time
- **🎲 Generate Fresh Ideas**: Use "New My Song" to create completely different Claude compositions
- **🆕 Spontaneous Generation**: Use "Generate Preset MIDI" for creative surprises and variations

### For Producers:
- **Preview-First Workflow**: Use "Preview My Song" to audition Claude's compositions before committing to MIDI
- **Export App State**: Capture exactly what you like from any composition (yours or Claude's)
- **🎼 AI Collaboration**: Preview multiple Claude compositions, then export the ones that inspire you
- **🔮 Creative Randomization**: Use "Generate Preset MIDI" multiple times for spontaneous variations
- **Mathematical Precision**: Claude's exports offer perfectly structured 5-track algorithmic compositions
- **Iterative Process**: Preview → adjust if needed → export → repeat with "New My Song"
- **A/B Compare**: Export both App State (live UI) and Claude's algorithmic MIDI from same settings
- **Layer Different Approaches**: Combine Claude's algorithmic tracks with human-designed app state exports
- **Inspiration Mining**: Use "New My Song" repeatedly to discover unexpected harmonic and rhythmic combinations

## Technical Details

- Built with [Tone.js](https://tonejs.github.io/) for Web Audio synthesis
- Pure JavaScript with no build process required
- Responsive design works on desktop and mobile
- Visual keyboard shows active notes in real-time
- Professional MIDI export with proper timing and velocity
- Intelligent randomization system
- Multiple compositional algorithms

## Known Issues

### 🎹 Block Chords Timing Issue
**Status**: Under Investigation

**Problem**: The "Block Chords" feature currently produces a rapid "chopsticks" effect instead of proper sustained quarter-note chords.

**Technical Details**:
- **Root Cause**: 20ms stagger between chord notes (`setTimeout(..., i * 20)`) creates arpeggiated effect rather than simultaneous notes
- **Duration Issue**: Using `'8n'` (eighth notes) instead of `'4n'` (quarter notes) for chord duration
- **Bass Sync Issue**: Bass timing doesn't align consistently with block chord quarter-note boundaries
- **MIDI Export**: Same stagger issues affect exported MIDI files

**Attempted Solution** (Reverted):
- Removed 20ms stagger to play notes simultaneously 
- Changed duration from 8th to quarter notes
- Improved bass synchronization
- **Result**: Made sound quality significantly worse, so changes were reverted

**Next Steps**:
- Consider alternative approach: separate block chord player independent of arpeggio logic
- Investigate if issue is fundamental to mixing block chords with existing arpeggio-based transport
- May require architectural changes to properly support both styles

**Workaround**: 
- Use "Arpeggiated" mode for proper sound quality
- "Block Chords" remains functional but with timing artifacts
- MIDI exports still work correctly for composition purposes

### 🎛️ Chord Progression UI Jumping Issue
**Status**: Architecture Needs Improvement

**Problem**: The "Chord Progression" section frequently jumps to the bottom of the UI when pressing various buttons (randomizer, Voice of AI, mode changes, etc.).

**Technical Details**:
- **Root Cause**: DOM rebuilding logic in `_updateChordSelector()` removes and recreates the entire chord selector
- **Rebuild Triggers**: Multiple UI actions call `_updateChordSelector()` which appends new elements to end of DOM
- **Expected Position**: Chord progression should stay immediately under the keyboard regardless of button pressed
- **Current Behavior**: Gets pushed to bottom after other sections when selectors rebuild

**Potential Solutions**:
- **HTML Structure Approach**: Create fixed HTML wrapper containers and let JS render within predefined structure
- **DOM Insertion Fix**: Use `insertBefore()` or `replaceChild()` instead of `remove()` + `appendChild()`
- **Position Anchoring**: Maintain reference to keyboard element and ensure chord progression always follows it
- **Selective Updates**: Update chord display content without full DOM rebuilding

**Architectural Consideration**: 
The current approach of dynamically building the entire UI in JavaScript creates fragile DOM ordering. A hybrid approach with HTML structure containers + JS content rendering would be more stable.

**Workaround**:
- Chord progression remains functional despite position jumping
- Refresh page to reset UI layout to original positions

## 🚀 Future Enhancements

### 🎵 Dynamic Song Directory Loading
**Status**: Planned

**Goal**: Automatically detect and load MP3 files from the `songs/` directory instead of requiring manual updates to the `bestHitsSongs` array in `MusicalScale.js`.

**Proposed Implementation Options**:
1. **JSON Manifest Approach** (Recommended):
   - Create `songs/songs.json` with song metadata
   - Fetch and parse JSON to populate Best Hits dropdown
   - Easy to maintain, allows custom titles/artists
   - Browser-compatible, no server changes needed

2. **Pattern-Based Discovery**:
   - Use Fetch API to test for files matching patterns (`Claude*.mp3`, `Project*.mp3`)
   - Build song list based on successful HTTP responses
   - Fully automatic but limited metadata options

3. **Build-Time Script**:
   - Node.js script to scan directory and update JS file
   - Could integrate with development workflow
   - Requires build process setup

**Benefits**:
- No more manual code updates when adding songs
- Easier for non-developers to add new music
- Scalable to larger song collections
- Reduces chance of errors in song list maintenance

**Current Process**: Adding songs requires editing `MusicalScale.js` and updating `songs/README.md`
**Future Process**: Drop MP3 in songs folder, optionally update metadata file

---

## Differences from Original

The enhanced version adds:
- ✅ **🎼 AI Signature Compositions** - Claude's unique algorithmic compositions based on mathematical beauty
- ✅ **Export App State** - Export exactly what you're hearing in the UI as MIDI
- ✅ **🔮 Randomized MIDI Export** - Spontaneous, creative variations with surprises and humanization
- ✅ **Full Chords Feature** - Block chords vs arpeggiated patterns (needs work)
- ✅ **Song Composer** - Multiple preset compositional structures
- ✅ **Randomizer** - One-click composition generation
- ✅ **Triple MIDI Export** - UI-accurate, randomized, and AI algorithmic exports
- ✅ **Mathematical composition algorithms** - Golden ratio, Fibonacci, prime number harmonies
- ✅ **🆕 Professional UI Layout** - Reorganized controls for better workflow
- ✅ **🆕 Native Audio Player** - Browser-based player replacing custom controls
- ✅ **🆕 Enhanced Dropdowns** - Improved text visibility and positioning
- ✅ **🆕 Best Hits Section** - MP3 playback with song selection
- ✅ **Non-linear compositional structure** (vs. simple looping)
- ✅ **Multiple progression options** (vs. single fixed progression)
- ✅ **Dynamic tempo and expression changes**
- ✅ **Intelligent randomization algorithms** - Pattern shuffling, chord inversions, timing variations
- ✅ **More sophisticated bass patterns**
- ✅ **Philip Glass-inspired pattern variations**
- ✅ **Automatic sectional development**

This creates an incredibly varied and professional music generation system that captures the essence of minimalist composition while providing endless creative possibilities for musicians and producers! 