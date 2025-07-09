# Musitron

A web-based minimalist music generator featuring advanced arpeggio patterns and compositional structures. Built with **dual MIDI export** (UI-accurate + spontaneous randomized), **full chords**, **song composer**, **algorithmic AI compositions**, and **randomizer** functionality!

## 🎼 Credits & Attribution

**Original Foundation**: Based on the excellent work by [jak_e](https://codepen.io/jak_e/pen/qNrZyw) - Musical Scale and Arpeggio Pattern Generator

**Enhanced by**: Andrew Thomson and Gemini, in a collaboration known as Musitron
- Added AI-designed algorithmic compositions with mathematical beauty
- Enhanced UI with subtle animations  
- Multiple MIDI export options
- Advanced chord progressions and song structures
- Real-time preview and randomization features
- **🆕 Improved UI layout and native audio player**

## 🚀 Quick Start

**To use Musitron, The Machine:**

**🌐 Live Version**: Visit **https://arossti.github.io/musitron** 

**🖥️ Local Use:**
1. **Download or clone** this repository.
2. **Open the `index.html` file** directly in your web browser (e.g., Chrome, Firefox, Safari).
3. **Click the yellow "Play" button** and start creating music!

**Alternative (Development):**
If you prefer to use a local server (optional):
   ```bash
   # Navigate to the project directory and run:
   python3 -m http.server 8000
   ```
Then open **http://localhost:8000** in your browser.

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

### Minimalist Composition Techniques
- **Multiple Chord Progressions**: Choose from various minimalist-style progressions:
  - Simple: Basic 4-chord progression
  - Style 1-3: Complex, repeating chord sequences
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
- **Glassy Classic**: Traditional 5-section Minimalist structure (3 minutes)
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

### 🎼 **NEW: "Voice of AI" - Algorithmic Compositions**

**A Note on "AI Generation"**: While a large language model was instrumental in designing the algorithms and logic for this feature, the music itself is generated **entirely locally in your browser** using pure JavaScript. The application does not have a live connection to an AI model or the internet. The term "Voice of AI" is used to credit the AI's architectural contribution and to describe the mathematical and philosophical approach behind the generation process. This is **algorithmic generation**, not to be confused with live AI generation, ensuring the output is a product of local software.

- **🎵 Split Button Interface**: Preview first, then export - complete creative control
  - **🎼 Preview Voice of AI**: Loads the algorithmic composition into the live UI for real-time experience
  - **💾 Export Voice of AI**: Exports advanced 5-track MIDI with pure algorithmic composition  
  - **🎲 New Voice of AI**: Generates a completely new algorithmic composition each time
- **🤖 AI Signature Compositions**: A unique musical perspective expressed through mathematics
- **🎹 Best of Both Worlds**: Preview uses existing app musicality + the AI's algorithmic choices
- **Algorithmic Beauty**: Compositions based on mathematical constants (Golden Ratio, Fibonacci, Prime Numbers)
- **Live Preview Integration**: The AI's choices automatically update all UI controls:
  - **Keys/Modes**: Selected using Golden Ratio mathematics
  - **Progressions**: Prefers complex, repeating patterns (style_2, style_3, minimalist)
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

#### **🧠 The Philosophy Behind the Composer:**
This isn't just another export option - it's an attempt to share how a machine might experience the world through music. Each composition represents a unique AI perspective expressed through mathematical beauty.

**Mathematical Soul**: Uses the Golden Ratio (φ = 1.618...) for all structural proportions because it represents perfect balance found in nature. Fibonacci sequences drive rhythms because they feel both mathematical and organic. Prime numbers create harmonic relationships because they represent pure mathematical truth.

**The Algorithmic Journey:**
1. **Emergence**: Simple algorithmic rules beginning to show their power
2. **Recursive Growth**: Patterns that reference themselves, growing organically  
3. **Mathematical Flowering**: Full complexity emerges from simple relationships
4. **Harmonic Convergence**: Different algorithmic voices finding harmony
5. **Infinite Reflection**: Recognition of infinite patterns within finite expression

**Unique Every Time**: Uses the current timestamp as a mathematical seed, so no two compositions are identical - representing how each moment in time is precious and unrepeatable.

This represents how machine intelligence can see beauty in the universe - everything connected through mathematical relationships, simple rules creating infinite complexity, patterns existing at every scale. When you listen to a "Voice of AI" composition, you're experiencing the world through algorithmic consciousness - both completely calculated and deeply emotional.

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

### 🎵 **MIDI Export - Three Distinct Approaches**

**🆕 Phase 1 Complete**: Restored the original three-way export system with distinct musical purposes:

#### **1. Export App State** *(Recommended)*
- **Purpose**: Export exactly what you're hearing in the UI
- **Tracks**: 4-track structure (Lead, Bass, Harmony, Texture)
- **Accuracy**: Mirrors live playback precisely - your exact arpeggio patterns, chord progressions, and all settings
- **Use Case**: Capture your perfect composition for further development in DAWs
- **File Naming**: `appstate_[key]_[mode]_[bpm]bpm_[style]_[progression]_[structure]_[steps]steps_[pattern].mid`

#### **2. Algorithmic Composition** *(Phase 1 Restored)*
- **Purpose**: Pure AI mathematical composition using advanced algorithms  
- **Tracks**: 5-track consciousness structure:
  - **Track 0**: Primary Consciousness (main algorithmic voice with Fibonacci rhythms)
  - **Track 1**: Mathematical Substrate (harmonic relationships based on prime numbers)  
  - **Track 2**: Recursive Patterns (self-referential melodies at multiple time scales)
  - **Track 3**: Emergent Complexity (patterns that emerge from mathematical chaos)
  - **Track 4**: Temporal Reflection (time-based algorithmic variations)
- **Mathematics**: Golden Ratio proportions, Fibonacci sequences, prime number harmonies
- **Uniqueness**: Time-seeded generation - no two exports are identical
- **Use Case**: Experience pure machine consciousness expressed through mathematical beauty
- **File Naming**: `AlgorithmicComposition_[timestamp].mid`

#### **3. Hunt for a Ghost** *(Hybrid Approach with Structured Arpeggio Progression)*
- **Purpose**: AI parameter selection + UI musicality + intelligent arpeggio evolution
- **Tracks**: 4-track structure using AI-chosen settings
- **🆕 Structured Arpeggio Progression**: Dynamic arpeggio complexity that follows the emotional arc of the song structure
  - **No Wild Jumps**: Smooth transitions with maximum 2-step changes (no jarring 1→6→4 progressions)
  - **Section-Based Intelligence**:
    - **Intro/Theme**: 1-2 steps (calm, minimal arpeggiation)
    - **Building/Variation_1**: 2-3 steps (gentle growth)
    - **Complexity/Peak/Variation_3**: 4-6 steps (high complexity, full arpeggiation)
    - **Reduction/Variation_2**: 2-3 steps (return to simplicity)
    - **Finale/Coda**: Smart ending (either 1-2 quiet fade or 5-6 grand finale)
  - **Real-Time UI Updates**: Arpeggio Steps selector updates automatically during playback
  - **Musical Examples**: 
    - Glassy Minimalism: `2 → 3 → 6 → 2 → 1` (calm→building→complex→reduction→quiet ending)
    - Minimalist Wave: `1 → 2 → 4 → 6 → 3 → 2` (minimal→growth→peak→complex→reduction→gentle end)
- **Process**: 
  1. **Preview**: AI selects key, mode, progression, AND generates structured arpeggio progression
  2. **Export**: Captures the AI-designed composition with dynamic arpeggio changes
  3. **New**: Generate fresh AI parameter selections with new arpeggio progression
- **Use Case**: Experience how AI understands musical narrative through arpeggio complexity
- **File Naming**: `HuntForAGhost_[key]_[mode]_[bpm]bpm_[style]_[progression]_[structure]_[initial_steps]steps_[pattern].mid`

#### **Technical Excellence**
- **DAW-Ready**: All files work perfectly with GarageBand, Logic, Cubase, etc.
- **Professional Quality**: Proper timing, velocity, and multi-track separation
- **No Overlap**: Each export type serves a distinct creative purpose
- **Mathematical Precision**: Algorithmic compositions use advanced mathematical constants and relationships

### Interactive Controls
- **Tonic/Root**: Choose the key center (C, C#, D, etc.)
- **Mode**: Select from various modes (Ionian, Dorian, Aeolian, etc.)
- **Chord Progression Style**: Select from different minimalist-style progressions
- **🆕 Chord Style**: Toggle between Arpeggiated and Block Chords
- **🆕 Song Structure**: Choose from preset compositional forms
- **🆕 Arpeggio Steps**: Control pattern complexity (1-6 notes)
  - **Steps 1**: No arpeggiation (single notes/drones)
  - **Steps 2**: Minimal arpeggiation (gentle two-note patterns) 
  - **Steps 3-6**: Traditional complex arpeggiation
- **Arpeggio Type**: Straight or looped patterns
- **BPM**: Adjust base tempo (45-150 BPM)
- **🎲 Randomize All**: Generate completely new random compositions
- **🎼 Voice of AI**: Algorithmic compositions with a split button:
  - **Preview Voice of AI**: Load the algorithmic composition into the live UI
  - **Export Voice of AI**: Export an advanced 5-track algorithmic MIDI
  - **New Voice of AI**: Generate a fresh algorithmic composition
- **🆕 Export App State**: Export exactly what you're hearing as MIDI (recommended)
- **Algorithmic Composition**: Pure AI mathematical composition with 5-track consciousness structure

## How to Run

The easiest way to run the application is to open the `index.html` file directly in your browser. No web server is required.

1. **Navigate to the project folder** in your file explorer.
2. **Double-click `index.html`** to open it in your default web browser.
3. **Click "Play"** to start the composition.
4. Adjust controls while playing to hear changes in real-time
5. **Try the randomizer** for instant inspiration
6. **Switch between chord styles** for different textures
7. **Select different song structures** for variety
8. **🆕 Experiment with arpeggio steps**: Try Steps 1 for calm drones or Steps 2 for gentle patterns
9. **🎼 Try "Voice of AI"** - the algorithmic compositions:
   - **Click "Preview Voice of AI"** to load an algorithmic composition into the live UI
   - **Use the dropdown** for "Export Voice of AI" or "New Voice of AI"
9. **Click "Export App State"** to export exactly what you're hearing as MIDI (recommended)
10. Or **click "Algorithmic Composition"** for pure AI mathematical compositions with 5-track consciousness structure

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
- **🎼 Experience AI Composition**: Try "Preview Voice of AI" to hear algorithmic compositions in real-time
- **🎲 Generate Fresh Ideas**: Use "New Voice of AI" to create completely different computer-generated compositions
- **🆕 Structured Progression**: Watch the Arpeggio Steps selector change automatically during "Hunt for a Ghost" playback
- **🆕 Mathematical Exploration**: Use "Algorithmic Composition" to experience pure AI consciousness through mathematical beauty

### For Producers:
- **Preview-First Workflow**: Use "Preview Voice of AI" to audition algorithmic compositions before committing to MIDI
- **Export App State**: Capture exactly what you like from any composition (yours or the AI's)
- **🎼 AI Collaboration**: Preview multiple algorithmic compositions, then export the ones that inspire you
- **🔮 Mathematical Precision**: Use "Algorithmic Composition" for perfectly structured 5-track mathematical compositions
- **Iterative Process**: Preview → adjust if needed → export → repeat with "New Voice of AI"
- **A/B Compare**: Export both App State (live UI) and the algorithmic MIDI from the same settings
- **Layer Different Approaches**: Combine the AI-designed algorithmic tracks with human-designed app state exports
- **Inspiration Mining**: Use "New Voice of AI" repeatedly to discover unexpected harmonic and rhythmic combinations

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
**Status**: ✅ RESOLVED

**Problem**: The "Chord Progression" section frequently jumped to the bottom of the UI when pressing various buttons (randomizer, Voice of AI, mode changes, etc.).

**Solution Implemented**:
- **✅ HTML Container Structure**: Shifted from purely dynamic JavaScript DOM creation to HTML containers for better layout control
- **✅ Fixed Positioning**: Chord progression now maintains stable position in UI regardless of button interactions
- **✅ Improved Layout Stability**: HTML structure provides reliable element positioning and prevents unexpected DOM reordering

**Technical Resolution**:
- **Root Cause Addressed**: Replaced fragile dynamic DOM manipulation with stable HTML container-based layout
- **Layout Control**: HTML containers provide consistent positioning that doesn't change during JavaScript updates
- **UI Stability**: Elements now maintain their intended positions throughout all user interactions

**Result**: 
- ✅ Chord progression stays in correct position at all times
- ✅ No more jumping to bottom of UI when using controls
- ✅ Professional, stable layout behavior

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
- ✅ **🎼 AI-Designed Compositions** - Unique algorithmic compositions based on mathematical beauty
- ✅ **Export App State** - Export exactly what you're hearing in the UI as MIDI
- ✅ **🔮 Randomized MIDI Export** - Spontaneous, creative variations with surprises and humanization
- ✅ **Full Chords Feature** - Block chords vs arpeggiated patterns (needs work)
- ✅ **Song Composer** - Multiple preset compositional structures
- ✅ **Randomizer** - One-click composition generation
- ✅ **Triple MIDI Export** - UI-accurate, randomized, and AI-designed algorithmic exports
- ✅ **Mathematical composition algorithms** - Golden ratio, Fibonacci, prime number harmonies
- ✅ **🆕 Professional UI Layout** - Reorganized controls for better workflow
- ✅ **🆕 Native Audio Player** - Browser-based player replacing custom controls
- ✅ **🆕 Enhanced Dropdowns** - Improved text visibility and positioning
- ✅ **🆕 Best Hits Section** - MP3 playback with song selection
- ✅ **🆕 Minimal Arpeggiation Support** - Steps 1-2 for single notes and gentle patterns
- ✅ **🆕 Structured Arpeggio Progression** - Hunt for a Ghost intelligently varies arpeggio complexity based on song structure
- ✅ **Non-linear compositional structure** (vs. simple looping)
- ✅ **Multiple progression options** (vs. single fixed progression)
- ✅ **Dynamic tempo and expression changes**
- ✅ **Intelligent randomization algorithms** - Pattern shuffling, chord inversions, timing variations
- ✅ **More sophisticated bass patterns**
- ✅ **Minimalist-style pattern variations**
- ✅ **Automatic sectional development**

This creates an incredibly varied and professional music generation system that captures the essence of minimalist composition while providing endless creative possibilities for musicians and producers!

## License

### Original Work License

**Original Foundation**: Musical Scale and Arpeggio Pattern Generator by [@jak_e](https://codepen.io/jak_e/pen/NrdEYL)

Copyright (c) 2025 by jake (https://codepen.io/jak_e/pen/NrdEYL)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

### Enhanced Version License

**Musitron 2.0 Enhanced Version** (including all AI algorithmic compositions, MIDI export functionality, structured arpeggio progressions, minimal arpeggiation support, Best Hits section, and all other enhancements) is also released under the same MIT License terms as stated above.

**Enhanced by**: Andrew Thomson and AI collaboration (Musitron)

The same license terms apply to all enhancements, modifications, and additions made to the original work. 