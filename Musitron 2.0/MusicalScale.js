document.documentElement.addEventListener("mousedown", async () => {
  if (Tone.context.state !== "running") {
    try {
      await Tone.start();
    } catch (error) {
      console.log("Audio context start failed:", error);
    }
  }
});
/**
 * MusicalScale
 * generate a scale of music
 * Original: https://codepen.io/jak_e/pen/qNrZyw
 * Enhanced for Musitron with algorithmic compositions
 *
 * @param key {String} 
     the root of the key. flats will be converted to sharps.
       C, C#, D, D#, E, F, F#, G, G#, A, A#, B
 * @param mode {String} 
     desired mode.
       ionian, dorian, phrygian, lydian, mixolydian, aeolian, locrian, 
     can also pass in:
       major, minor, melodic, harmonic
 *
 * @return {Object}
     _scale: scale info
     key: the scale key
     mode: the scale mode id
     notes: an array of notes
       step: index of note in key
       note: the actual note
       rel_octave: 0 || 1, in root octave or next
       triad: major, minor, diminished, or augmented triad for this note
         interval: I, ii, etc
         type: min, maj, dim, aug
         notes: array of notes in the triad
           note: the note
           rel_octave: 0 || 1 || 2, relative to key root octave
 */

class MusicalScale {
  constructor(params) {
    this.dict = this._loadDictionary();
    const errors = this._errors(params);
    if (errors) return;
    this.updateScale = this.pubUpdateScale;

    this._loadScale(params);
  }
  
  pubUpdateScale(params) {
    const errors = this._errors(params);
    if (errors) return;
    this._loadScale(params);
  }
  
  _loadScale(params) {
    // clean up the key param
    this.key = this._paramKey(params.key);
    // set the mode
    this.mode = params.mode;
    this.notes = [];
    this._scale = this.dict.scales[this._paramMode(this.mode)];
    
    // notes to cycle through
    const keys = this.dict.keys;
    // starting index for key loop
    const offset = keys.indexOf(this.key);
    for (let s = 0; s < this._scale.steps.length; s++) {
      const step = this._scale.steps[s];
      const idx = (offset + step) % keys.length;
      // relative octave. 0 = same as root, 1 = next ocave up
      const rel_octave = offset + step > keys.length - 1 ? 1 : 0;
      // generate the relative triads
      const triad = this._genTriad(s, idx, rel_octave, this._scale.triads[s]);
      // define the note
      const note = {
        step: s,
        note: keys[idx],
        rel_octave: rel_octave,
        triad: triad,
      };
      // add the note
      this.notes.push(note);
    }
  }
  
  // create a chord of notes based on chord type
  _genTriad(s, offset, octave, t) {
    // get the steps for this chord type
    const steps = this.dict.triads[t];
    // instantiate the chord
    const chord = { type: t, interval: this._intervalFromType(s, t), notes: [] };
    // load the notes
    const keys = this.dict.keys;
    for (let i = 0; i < steps.length; i++) {
      const step = steps[i];
      const idx = (offset + step) % keys.length;
      // relative octave to base
      const rel_octave = offset + step > keys.length - 1 ? octave + 1 : octave;
      // define the note
      chord.notes.push({ note: keys[idx], rel_octave: rel_octave });
    }
    return chord;
  }
  
  // proper interval notation from the step and type
  _intervalFromType(step, type) {
    const steps = "i ii iii iv v vi vii".split(" ");
    let s = steps[step];
    switch (type) {
      case "maj":
        s = s.toUpperCase();
        break;
      case "min":
        s = s;
        break;
      case "aug":
        s = s.toUpperCase() + "+";
        break;
      case "dim":
        s = s + "°";
        break;
    }
    return s;
  }
  
  _errors(params) {
    if (this.dict.keys.indexOf(params.key) === -1) {
      if (Object.keys(this.dict.flat_sharp).indexOf(params.key) === -1) {
        return console.error(
          `${params.key} is an invalid key. ${this.dict.keys.join(", ")}`,
        );
      }
    } else if (this.dict.modes.indexOf(params.mode) === -1) {
      return console.error(
        `${params.mode} is an invalid mode. ${this.dict.modes.join(", ")}`,
      );
    } else {
      return false;
    }
  }
  
  _loadDictionary() {
    return {
      keys: "C C# D D# E F F# G G# A A# B".split(" "),
      scales: {
        ion: {
          name: "Ionian",
          steps: this._genSteps("W W H W W W H"),
          dominance: [3, 0, 1, 0, 2, 0, 1],
          triads: this._genTriads(0),
        },
        dor: {
          name: "Dorian",
          steps: this._genSteps("W H W W W H W"),
          dominance: [3, 0, 1, 0, 2, 2, 1],
          triads: this._genTriads(1),
        },
        phr: {
          name: "Phrygian",
          steps: this._genSteps("H W W W H W W"),
          dominance: [3, 2, 1, 0, 2, 0, 1],
          triads: this._genTriads(2),
        },
        lyd: {
          name: "Lydian",
          steps: this._genSteps("W W W H W W H"),
          dominance: [3, 0, 1, 2, 2, 0, 1],
          triads: this._genTriads(3),
        },
        mix: {
          name: "Mixolydian",
          steps: this._genSteps("W W H W W H W"),
          dominance: [3, 0, 1, 0, 2, 0, 2],
          triads: this._genTriads(4),
        },
        aeo: {
          name: "Aeolian",
          steps: this._genSteps("W H W W H W W"),
          dominance: [3, 0, 1, 0, 2, 0, 1],
          triads: this._genTriads(5),
        },
        loc: {
          name: "Locrian",
          steps: this._genSteps("H W W H W W W"),
          dominance: [3, 0, 1, 0, 3, 0, 0],
          triads: this._genTriads(6),
        },
        mel: {
          name: "Melodic Minor",
          steps: this._genSteps("W H W W W W H"),
          dominance: [3, 0, 1, 0, 3, 0, 0],
          triads: "min min aug maj maj dim dim".split(" "),
        },
        har: {
          name: "Harmonic Minor",
          steps: this._genSteps("W H W W H WH H"),
          dominance: [3, 0, 1, 0, 3, 0, 0],
          triads: "min dim aug min maj maj dim".split(" "),
        },
      },
      modes: [
        "ionian",
        "dorian",
        "phrygian",
        "lydian",
        "mixolydian",
        "aeolian",
        "locrian",
        "major",
        "minor",
        "melodic",
        "harmonic",
      ],
      flat_sharp: {
        Cb: "B",
        Db: "C#",
        Eb: "D#",
        Fb: "E",
        Gb: "F#",
        Ab: "G#",
        Bb: "A#",
      },
      triads: {
        maj: [0, 4, 7],
        min: [0, 3, 7],
        dim: [0, 3, 6],
        aug: [0, 4, 8],
      },
    };
  }
    
  _paramMode(mode) {
    return {
      minor: "aeo",
      major: "ion",
      ionian: "ion",
      dorian: "dor",
      phrygian: "phr",
      lydian: "lyd",
      mixolydian: "mix",
      aeolian: "aeo",
      locrian: "loc",
      melodic: "mel",
      harmonic: "har",
    }[mode];
  }
  
  _paramKey(key) {
    if (this.dict.flat_sharp[key]) return this.dict.flat_sharp[key];
    return key;
  }

  _genTriads(offset) {
    // this is ionian, each mode bumps up one offset.
    const base = "maj min min maj maj min dim".split(" ");
    const triads = [];
    for (let i = 0; i < base.length; i++) {
      triads.push(base[(i + offset) % base.length]);
    }
    return triads;
  }
  
  _genSteps(steps_str) {
    const arr = steps_str.split(" ");
    const steps = [0];
    let step = 0;
    for (let i = 0; i < arr.length - 1; i++) {
      let inc = 0;
      switch (arr[i]) {
        case "W":
          inc = 2;
          break;
        case "H":
          inc = 1;
          break;
        case "WH":
          inc = 3;
          break;
      }
      step += inc;
      steps.push(step);
    }
    return steps;
  }
}

/**
  ArpeggioPatterns
  https://codepen.io/jakealbaugh/pen/PzpzEO/
  returns arrays of arpeggio patterns for a given length of notes
  @param steps {Integer} number of steps
  @return {Object}
    patterns: {Array} of arpeggiated index patterns
 */

class ArpeggioPatterns {
  constructor(params) {
    this.steps = params.steps;
    this._loadPatterns();
    this.updatePatterns = this.pubUpdatePatterns;
  }
  
  pubUpdatePatterns(params) {
    this.steps = params.steps;
    this._loadPatterns();
  }
  
  _loadPatterns() {
    this.arr = [];
    this.patterns = [];
    for (let i = 0; i < this.steps; i++) {
      this.arr.push(i);
    }
    this._used = [];
    
    // Handle edge cases for minimal arpeggiation
    if (this.steps === 1) {
      // No arpeggiation - single note patterns
      this.permutations = [[0]];
      this.looped = [[0]];
    } else if (this.steps === 2) {
      // Minimal arpeggiation - simple two-note patterns
      this.permutations = [[0, 1], [1, 0]];
      this.looped = [[0, 1, 0], [1, 0, 1]];
    } else {
      // Standard arpeggiation for 3+ steps
      this.permutations = this._permute(this.arr);
      this.looped = this._loop();
    }
    
    this.patterns = {
      straight: this.permutations,
      looped: this.looped,
    };
  }
  
  _permute(input, permutations) {
    permutations = permutations || [];
    let i, ch;
    for (i = 0; i < input.length; i++) {
      ch = input.splice(i, 1)[0];
      this._used.push(ch);
      if (input.length === 0) {
        permutations.push(this._used.slice());
      }
      this._permute(input, permutations);
      input.splice(i, 0, ch);
      this._used.pop();
    }
    return permutations;
  }
  
  _loop() {
    const looped = [];
    for (let p = 0; p < this.permutations.length; p++) {
      const perm = this.permutations[p];
      const arr = Array.from(perm);
      for (let x = 1; x < perm.length - 1; x++) {
        arr.push(perm[perm.length - 1 - x]);
      }
      looped.push(arr);
    }
    return looped;
  }
}

/**
  ArpPlayer
  the main app
 */

class ArpPlayer {
  constructor(params) {
    // DOM Containers
    this.container = document.querySelector("#main");
    this.aside = document.querySelector("#aside");
    
    // Core App State
    this.progressions = {
      simple: [0, 2, 4, 2],
      sequence_1: [0, 2, 6, 3, 4, 2, 5, 1],
      sequence_2: [0, 4, 2, 6, 1, 5, 3, 0],
      sequence_3: [0, 2, 4, 6, 2, 5, 1, 4, 0],
      minimalist: [0, 3, 4, 2, 5, 1, 6, 2, 0],
    };
    this.song_presets = {
      glassy_minimalism: {
        name: "Glassy Minimalism",
        structure: [
          { name: "intro", duration: 20, layers: 1, tempo_mod: 0.7 },
          { name: "building", duration: 40, layers: 2, tempo_mod: 1.0 },
          { name: "complexity", duration: 60, layers: 4, tempo_mod: 1.3 },
          { name: "reduction", duration: 30, layers: 2, tempo_mod: 0.9 },
          { name: "finale", duration: 30, layers: 1, tempo_mod: 0.6 },
        ],
      },
      minimalist_wave: {
        name: "Minimalist Wave",
        structure: [
          { name: "intro", duration: 12, layers: 1, tempo_mod: 0.8 },
          { name: "building", duration: 24, layers: 2, tempo_mod: 1.1 },
          { name: "complexity", duration: 36, layers: 3, tempo_mod: 1.4 },
          { name: "peak", duration: 24, layers: 4, tempo_mod: 1.5 },
          { name: "reduction", duration: 36, layers: 2, tempo_mod: 1.0 },
          { name: "finale", duration: 48, layers: 1, tempo_mod: 0.7 },
        ],
      },
      etude_style: {
        name: "Etude Style",
        structure: [
          { name: "theme", duration: 32, layers: 2, tempo_mod: 1.0 },
          { name: "variation_1", duration: 32, layers: 3, tempo_mod: 1.2 },
          { name: "variation_2", duration: 32, layers: 2, tempo_mod: 0.8 },
          { name: "variation_3", duration: 32, layers: 4, tempo_mod: 1.4 },
          { name: "coda", duration: 52, layers: 1, tempo_mod: 0.6 },
        ],
      },
    };
    this.noteToMidi = { C: 0, "C#": 1, D: 2, "D#": 3, E: 4, F: 5, "F#": 6, G: 7, "G#": 8, A: 9, "A#": 10, B: 11 };

    // MIDI configuration
    this.midi_config = {
      duration: 180, // 3 minutes
      ticksPerQuarter: 480,
    };

    // Initial Settings
    this.ms_key = "G";
    this.ms_mode = "locrian";
    this.ap_steps = 6;
    this.ap_pattern_type = "straight";
    this.ap_pattern_id = 0;
    this.chord_style = "arpeggiated";
    this.current_progression = "sequence_1";
    this.chords = this.progressions[this.current_progression];
    this.chord_count = this.chords.length;
    this.current_song_preset = "glassy_minimalism";
    this.composition_structure = this.song_presets[this.current_song_preset].structure;
    
    // Player State
    this.player = {
      chord_step: 0,
      octave_base: 4,
      arp_repeat: 2,
      bass_on: false,
      triad_step: 0,
      step: 0,
      playing: false,
      bpm: 135,
      pattern_variation: 0,
      dynamic_level: 0.7,
    };
    this.current_section = 0;
    this.section_step = 0;
    
    // UI Element References
    this.play_toggle = null;

    // Setup
    this._setMusicalScale();
    this._setArpeggioPatterns();
    this._loadSynths();
    this._loadTransport();
    
    // Initial UI Population
    this._drawKeyboard();
    this._drawOutput();
    this._loadBPMSelector();
    this._loadKeySelector();
    this._loadModeSelector();
    this._loadProgressionSelector();
    this._loadChordStyleSelector();
    this._loadSongComposer();
    this._loadStepsSelector();
    this._loadTypeSelector();
    this._loadTimeSignatureSelector();
    this._loadPatternSelector();
    this._loadChordSelector(); // Load this last as it depends on other selectors
    this._createButtonsSection();
    
    // Global Event Listeners
    document.addEventListener("visibilitychange", () => {
      if (document.hidden && this.player.playing) {
        this.playerToggle();
      }
    });
  }
  
  _loadSynths() {
    try {
      this.channel = {
        master: new Tone.Gain(0.6),
        treb: new Tone.Gain(0.5),
        bass: new Tone.Gain(0.7), // Slightly increased for mellow organ
      };
      this.fx = {
        distortion: new Tone.Distortion(0.2),
        reverb: new Tone.Freeverb(0.1, 3000),
        delay: new Tone.PingPongDelay("16n", 0.1),
        bassChorus: new Tone.Chorus(1.5, 2.5, 0.3).start(),
      };
      this.synths = {
        treb: new Tone.PolySynth(Tone.Synth),
        // COMMENTED OUT - Previous bass configuration (PolySynth + sine + chorus)
        // bass: new Tone.PolySynth(Tone.Synth, {
        //   oscillator: {
        //     type: "sine"
        //   },
        //   envelope: {
        //     attack: 0.4,
        //     decay: 0.2,
        //     sustain: 0.9,
        //     release: 1.2
        //   }
        // }),
        
        // NEW: MonoSynth bass configuration
        bass: new Tone.MonoSynth({
          detune: 0,
          portamento: 0,
          volume: -8,
          envelope: {
            attack: 0.05,
            attackCurve: "linear",
            decay: 0.3,
            decayCurve: "exponential",
            release: 0.8,
            releaseCurve: "exponential",
            sustain: 0.4
          },
          filter: {
            Q: 1,
            detune: 0,
            frequency: 0,
            gain: 0,
            rolloff: -12,
            type: "lowpass"
          },
          filterEnvelope: {
            attack: 0.001,
            attackCurve: "linear",
            baseFrequency: 300,
            decay: 0.7,
            decayCurve: "exponential",
            exponent: 2,
            octaves: 4,
            release: 0.8,
            releaseCurve: "exponential",
            sustain: 0.1
          },
          oscillator: {
            detune: 0,
            frequency: 440,
            partialCount: 8,
            phase: 0,
            type: "sawtooth"
          }
        }),
      };
      
      // MonoSynth volume is set in the configuration above
    } catch (error) {
      this.synths = {
        treb: new Tone.PolySynth(Tone.Synth),
        // Fallback MonoSynth bass configuration (same as above)
        bass: new Tone.MonoSynth({
          detune: 0,
          portamento: 0,
          volume: -8,
          envelope: {
            attack: 0.05,
            attackCurve: "linear",
            decay: 0.3,
            decayCurve: "exponential",
            release: 0.8,
            releaseCurve: "exponential",
            sustain: 0.4
          },
          filter: {
            Q: 1,
            detune: 0,
            frequency: 0,
            gain: 0,
            rolloff: -12,
            type: "lowpass"
          },
          filterEnvelope: {
            attack: 0.001,
            attackCurve: "linear",
            baseFrequency: 300,
            decay: 0.7,
            decayCurve: "exponential",
            exponent: 2,
            octaves: 4,
            release: 0.8,
            releaseCurve: "exponential",
            sustain: 0.1
          },
          oscillator: {
            detune: 0,
            frequency: 440,
            partialCount: 8,
            phase: 0,
            type: "sawtooth"
          }
        }),
      };
      this.channel = {
        master: new Tone.Gain(0.6),
        treb: new Tone.Gain(0.5),
        bass: new Tone.Gain(0.7),
      };
      this.fx = {
        distortion: new Tone.Distortion(0.2),
        reverb: new Tone.Freeverb(0.1, 3000),
        delay: new Tone.PingPongDelay("16n", 0.1),
        bassChorus: new Tone.Chorus(1.5, 2.5, 0.3).start(),
      };
    }
    
    this.fx.distortion.wet.value = 0.1;
    this.fx.reverb.wet.value = 0.2;
    this.fx.delay.wet.value = 0.2;
    this.fx.bassChorus.wet.value = 0.4; // Moderate chorus effect for bass warmth
    this.channel.master.toDestination();
    this.channel.treb.connect(this.channel.master);
    this.channel.bass.connect(this.channel.master);
    this.synths.treb.chain(this.fx.delay, this.fx.reverb, this.channel.treb);
    this.synths.bass.chain(this.fx.bassChorus, this.fx.distortion, this.channel.bass);
  }
  
  _loadTransport() {
    this.playerUpdateBPM = (e) => {
      const el = e.target;
      const bpm = el.getAttribute("data-value");
      this.player.bpm = parseInt(bpm);
      Tone.Transport.bpm.value = this.player.bpm;
      this._utilClassToggle(e.target, "bpm-current");
    };
    
    this.playerToggle = async () => {
      try {
        if (this.player.playing) {
          Tone.Transport.pause();
          this.channel.master.gain.value = 0;
          this.play_toggle.classList.remove("active");
        } else {
          if (this.mp3Player && !this.mp3Player.paused) this.mp3Player.pause();
          if (Tone.context.state !== "running") await Tone.start();
          Tone.Transport.start();
          this.channel.master.gain.value = 1;
          this.play_toggle.classList.add("active");
        }
        this.player.playing = !this.player.playing;
      } catch (error) {
        console.error("Error toggling playback:", error);
        this.play_toggle.innerHTML = "Audio Error";
      }
    };
    
    this.pause = () => {
      if (this.player.playing) {
        Tone.Transport.pause();
        this.channel.master.gain.value = 0;
        this.play_toggle.classList.remove("active");
        this.player.playing = false;
      }
    };
    
    Tone.Transport.bpm.value = this.player.bpm;
    Tone.Transport.scheduleRepeat((time) => {
        const section = this.getCurrentSection();
        const curr_chord = this.player.chord_step % this.chord_count;

        const prev = document.querySelector(".chord > div.active");
        if (prev) prev.classList.remove("active");
        const curr = document.querySelector(
            `.chord > div[data-chord-index='${curr_chord}']`
        );
        if (curr) curr.classList.add("active");

        const chord = this.MS.notes[this.chords[curr_chord]];
        
        const pattern_multiplier = section.layers;
        let notes = chord.triad.notes;
        for (
            let i = 0;
            i < Math.ceil(this.ap_steps / 3) * pattern_multiplier;
            i++
        ) {
            notes = notes.concat(
            notes.map((n) => ({ note: n.note, rel_octave: n.rel_octave + (i + 1) }))
            );
        }
        
        const pattern_variation = this.getPatternVariation(section, this.section_step);
        const note_index = (this.arpeggio[this.player.step % this.arpeggio.length] + pattern_variation) % notes.length;
        const note = notes[note_index];

        const bass_o = chord.rel_octave + 2;
        const bass_1 = chord.note + bass_o;
        
        if (!this.player.bass_on && this.shouldPlayBass(section)) {
            this.player.bass_on = true;
            // MonoSynth uses triggerAttack for sustained bass notes
            this.synths.bass.triggerAttack(bass_1, time);
            this._utilActiveNoteClassToggle([bass_1.replace("#", "is")], "active-b");
        }
        
        this.player.step++;
        this.section_step++;
        
        if (this.section_step >= section.duration * 4) {
            this.current_section = (this.current_section + 1) % this.composition_structure.length;
            this.section_step = 0;
            
            // HUNT FOR A GHOST: Dynamic arpeggio switching based on song structure
            if (this.claudeArpeggioProgression && this.current_section < this.claudeArpeggioProgression.length) {
                const newArpeggioSteps = this.claudeArpeggioProgression[this.current_section];
                
                // Only update if it's actually different (avoid unnecessary UI updates)
                if (newArpeggioSteps !== this.ap_steps) {
                    this.ap_steps = newArpeggioSteps;
                    
                    // Update arpeggio patterns for new step count
                    this.AP.updatePatterns({ steps: newArpeggioSteps });
                    this.apUpdate();
                    
                    // Update UI to show new arpeggio step
                    document
                      .querySelectorAll(".steps div")
                      .forEach((el) => el.classList.remove("step-current"));
                    const stepsElement = document.querySelector(
                      `.steps div[data-value="${newArpeggioSteps}"]`,
                    );
                    if (stepsElement) stepsElement.classList.add("step-current");
                    
                    // Update pattern selector for new step count
                    this._updatePatternSelector();
                }
            }
        }
        
        const chord_change_interval = this.getChordChangeInterval(section);
        if (this.player.step % chord_change_interval === 0) {
            this.player.chord_step++;
            this.player.bass_on = false;
            // MonoSynth requires explicit note release
            this.synths.bass.triggerRelease(time);
            this.player.triad_step++;
        }
        
        const velocity = this.getDynamicVelocity(section, this.section_step);
        
        if (this.chord_style === "block_chords" && section.layers > 1) {
            const stepInMeasure = this.player.step % 16;
            if (stepInMeasure % 4 === 0) {
            chord.triad.notes.forEach((chordNote, i) => {
                const chord_note_ref = `${chordNote.note}${chordNote.rel_octave + this.player.octave_base}`;
                setTimeout(() => {
                this._utilActiveNoteClassToggle([chord_note_ref.replace("#", "is")], "active-t");
                this.synths.treb.triggerAttackRelease(chord_note_ref, "8n", time, velocity * 0.8);
                }, i * 20);
            });
            }
        } else {
            const note_ref = `${note.note}${note.rel_octave + this.player.octave_base}`;
            this._utilActiveNoteClassToggle([note_ref.replace("#", "is")], "active-t");
            this.synths.treb.triggerAttackRelease(note_ref, "16n", time, velocity);
        }
    }, "16n");
  }
  
  _drawKeyboard() {
    const octaves = [2, 3, 4, 5, 6, 7];
    const keyboard = document.querySelector(".keyboard");
    keyboard.innerHTML = '';
    
    // Add title to match other sections
    const title = document.createElement("h1");
    title.innerHTML = "Musitron | the Ghost in the Machine";
    keyboard.appendChild(title);
    
    octaves.forEach((octave) => {
      this.MS.dict.keys.forEach((key) => {
        const el = document.createElement("div");
        const classname = key.replace("#", "is") + octave;
        el.classList.add(classname);
        keyboard.appendChild(el);
      });
    });
  }
  
  _drawOutput() {
    this.output = document.querySelector(".output");
    this._updateOutput();
  }
  
  _updateOutput() {
    this.output.innerHTML = "";
    const title = document.createElement("h1");
    title.innerHTML = "Output";
    this.output.appendChild(title);
    const description = document.createElement("h2");
    description.innerHTML = `${this.MS.key} ${this.MS._scale.name}`;
    this.output.appendChild(description);
    this.chords.forEach((chord) => {
      const note = this.MS.notes[chord];
      const el = document.createElement("span");
      el.innerHTML = `${note.note.replace("#", "<sup>♯</sup>")} <small>${note.triad.type}</small>`;
      this.output.appendChild(el);
    });
  }
    
  _loadBPMSelector() {
    const bpm_container = document.querySelector(".bpm");
    bpm_container.innerHTML = '';
    const title = document.createElement("h1");
    title.innerHTML = "Beats Per Minute";
    bpm_container.appendChild(title);
    
    [45, 60, 75, 90, 105, 120, 135, 150].forEach((bpm) => {
      const el = document.createElement("div");
      el.setAttribute("data-value", bpm);
      if (bpm === this.player.bpm) el.classList.add("bpm-current");
      el.innerHTML = bpm;
      el.addEventListener("click", (e) => {
        this.playerUpdateBPM(e);
      });
      bpm_container.appendChild(el);
    });
  }
  
  _loadChordSelector() {
    this.chord_container = document.querySelector(".chord");
    this.chord_container.innerHTML = '';
    const title = document.createElement("h1");
    title.innerHTML = "Chord Progression";
    this.chord_container.appendChild(title);
    
    this.msUpdateChords = (e) => {
      const el = e.target;
      const chord_index = parseInt(el.parentElement.getAttribute("data-chord-index"));
      const value = el.getAttribute("data-value");
      this.chords[chord_index] = value;
      this._utilClassToggle(e.target, `chord-${chord_index}-current`);
      this._updateOutput();
    };
    
    for (let c = 0; c < this.chord_count; c++) {
      const chord_el = document.createElement("div");
      chord_el.setAttribute("data-chord-index", c);
      this.MS.notes.forEach((note, i) => {
        const el = document.createElement("div");
        el.setAttribute("data-value", i);
        if (i == this.chords[c]) el.classList.add(`chord-${c}-current`);
        el.innerHTML = note.triad.interval;
        el.addEventListener("click", (e) => this.msUpdateChords(e));
        chord_el.appendChild(el);
      });
      this.chord_container.appendChild(chord_el);
    }
  }
  
  _updateChords() {
    this.MS.notes.forEach((note, i) => {
      const updates = document.querySelectorAll(
        `.chord div > div:nth-child(${i + 1})`,
      );
      for (let u = 0; u < updates.length; u++) {
        updates[u].innerHTML = note.triad.interval;
      }
    });
  }
  
  _loadKeySelector() {
    const key_container = document.querySelector(".keys");
    key_container.innerHTML = '';
    const title = document.createElement("h1");
    title.innerHTML = "Tonic / Root";
    key_container.appendChild(title);
    
    this.MS.dict.keys.forEach((key) => {
      const el = document.createElement("div");
      el.setAttribute("data-value", key);
      if (key === this.ms_key) el.classList.add("key-current");
      el.innerHTML = key;
      el.addEventListener("click", (e) => {
        this.msUpdateKey(e);
      });
      key_container.appendChild(el);
    });
  }
  
  _loadModeSelector() {
    const mode_container = document.querySelector(".modes");
    mode_container.innerHTML = '';
    const title = document.createElement("h1");
    title.innerHTML = "Mode";
    mode_container.appendChild(title);
    
    this.MS.dict.modes.forEach((mode) => {
      const el = document.createElement("div");
      el.setAttribute("data-value", mode);
      if (mode === this.ms_mode) el.classList.add("mode-current");
      el.innerHTML = mode;
      el.addEventListener("click", (e) => {
        this.msUpdateMode(e);
      });
      mode_container.appendChild(el);
    });
  }
  
  _loadTypeSelector() {
    const type_container = document.querySelector(".type");
    type_container.innerHTML = '';
    const title = document.createElement("h1");
    title.innerHTML = "Arpeggio Type";
    type_container.appendChild(title);
    
    ["straight", "looped"].forEach((step) => {
      const el = document.createElement("div");
      el.setAttribute("data-value", step);
      if (step === this.ap_pattern_type) el.classList.add("type-current");
      el.innerHTML = step;
      el.addEventListener("click", (e) => {
        this.apUpdatePatternType(e);
      });
      type_container.appendChild(el);
    });
  }
  
  _loadTimeSignatureSelector() {
    const container = document.querySelector(".time-signature");
    container.innerHTML = '';
    const title = document.createElement("h1");
    title.innerHTML = "Time Signature";
    container.appendChild(title);

    this.time_signature = "4/4";
    this.updateTimeSignature = (e) => {
      this._utilClassToggle(e.target, "time-signature-current");
      this.time_signature = e.target.getAttribute("data-value");
    };

    ["2/4", "3/4", "4/4", "5/4", "7/8"].forEach((ts) => {
      const el = document.createElement("div");
      el.setAttribute("data-value", ts);
      if (ts === this.time_signature) el.classList.add("time-signature-current");
      el.innerHTML = ts;
      el.addEventListener("click", (e) => {
        this.updateTimeSignature(e);
      });
      container.appendChild(el);
    });
  }

  _loadStepsSelector() {
    const steps_container = document.querySelector(".steps");
    steps_container.innerHTML = '';
    const title = document.createElement("h1");
    title.innerHTML = "Arpeggio Steps";
    steps_container.appendChild(title);
    
    [1, 2, 3, 4, 5, 6].forEach((step) => {
      const el = document.createElement("div");
      el.setAttribute("data-value", step);
      if (step === this.ap_steps) el.classList.add("step-current");
      el.innerHTML = step;
      el.addEventListener("click", (e) => {
        this.apUpdateSteps(e);
      });
      steps_container.appendChild(el);
    });
  }
  
  _loadPatternSelector() {
    this.pattern_container = document.querySelector(".patterns");
    this._updatePatternSelector();
  }
  
  _updatePatternSelector() {
    this.pattern_container.innerHTML = "";
    // reset if the id is over
    this.ap_pattern_id =
      this.ap_pattern_id > this.AP.patterns[this.ap_pattern_type].length - 1
        ? 0
        : this.ap_pattern_id;
    this.arpeggio = this.AP.patterns[this.ap_pattern_type][this.ap_pattern_id];
    const title = document.createElement("h1");
    title.innerHTML = "Arpeggio Style";
    this.pattern_container.appendChild(title);
    const patterns = this.AP.patterns[this.ap_pattern_type];
    [720, 120, 24, 6].forEach((count) => {
      this.pattern_container.classList.remove(`patterns-${count}`);
    });
    this.pattern_container.classList.add(`patterns-${patterns.length}`);
    patterns.forEach((pattern, i) => {
      const el = document.createElement("div");
      el.setAttribute("data-value", i);
      if (i === this.ap_pattern_id) el.classList.add("id-current");
      el.innerHTML = pattern.join("");
      el.appendChild(this._genPatternSvg(pattern));
      el.addEventListener("click", (e) => {
        this.apUpdatePatternId(e);
      });
      this.pattern_container.appendChild(el);
    });
  }
  
  _genPatternSvg(pattern) {
    const hi = Array.from(pattern).sort()[pattern.length - 1];
    const spacing = 2;
    const svgns = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const width = pattern.length * spacing + spacing;
    const height = hi + spacing * 2;
    svg.setAttribute("height", height);
    svg.setAttribute("width", width);
    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
    svg.setAttributeNS(
      "http://www.w3.org/2000/xmlns/",
      "xmlns:xlink",
      "http://www.w3.org/1999/xlink",
    );
    const polyline = document.createElementNS(svgns, "polyline");
    const points = [];
    let x = spacing;
    for (let i = 0; i < pattern.length; i++) {
      const y = height - pattern[i] - spacing;
      points.push(x + "," + y);
      x += spacing;
    }
    polyline.setAttribute("points", points.join(" "));
    svg.appendChild(polyline);
    return svg;
  }
  
  _loadProgressionSelector() {
    const progression_container = document.querySelector(".progressions");
    progression_container.innerHTML = '';
    const title = document.createElement("h1");
    title.innerHTML = "Chord Progression Style";
    progression_container.appendChild(title);
    
    Object.keys(this.progressions).forEach((prog_name) => {
      const el = document.createElement("div");
      el.setAttribute("data-value", prog_name);
      if (prog_name === this.current_progression)
        el.classList.add("progression-current");
      
      let label = prog_name.replace("_", " ");
      label = label.charAt(0).toUpperCase() + label.slice(1);
      el.innerHTML = label;

      el.addEventListener("click", (e) => {
        this.updateProgression(e);
      });
      progression_container.appendChild(el);
    });
  }
  
  _loadChordStyleSelector() {
    const chord_style_container = document.querySelector(".chord-style");
    chord_style_container.innerHTML = '';
    const title = document.createElement("h1");
    title.innerHTML = "Chord Style";
    chord_style_container.appendChild(title);
    
    const styles = [
      { key: "arpeggiated", label: "Arpeggiated" },
      { key: "block_chords", label: "Block Chords" },
    ];

    styles.forEach((style) => {
      const el = document.createElement("div");
      el.setAttribute("data-value", style.key);
      if (style.key === this.chord_style)
        el.classList.add("chord-style-current");
      el.innerHTML = style.label;
      el.addEventListener("click", (e) => {
        this.updateChordStyle(e);
      });
      chord_style_container.appendChild(el);
    });
  }
  
  _loadSongComposer() {
    const song_container = document.querySelector(".song-composer");
    song_container.innerHTML = '';
    const title = document.createElement("h1");
    title.innerHTML = "Song Structure";
    song_container.appendChild(title);
    
    Object.keys(this.song_presets).forEach((preset_key) => {
      const preset = this.song_presets[preset_key];
      const el = document.createElement("div");
      el.setAttribute("data-value", preset_key);
      if (preset_key === this.current_song_preset)
        el.classList.add("song-preset-current");
      el.innerHTML = preset.name;
      el.addEventListener("click", (e) => {
        this.updateSongPreset(e);
      });
      song_container.appendChild(el);
    });
  }
  _createButtonsSection() {
    const buttonsSection = document.querySelector(".buttons-section");
    
    if (!buttonsSection) {
      console.error("ERROR: .buttons-section element not found!");
      return;
    }

    // Randomizer
    this.randomizer_button = document.createElement("div");
    this.randomizer_button.innerHTML = "Randomize All";
    this.randomizer_button.classList.add("control-item");
    this.randomizer_button.addEventListener("click", () => this.randomizeAll());
    buttonsSection.appendChild(this.randomizer_button);

    // Export App State
    this.export_state_button = document.createElement("div");
    this.export_state_button.innerHTML = "Export App State";
    this.export_state_button.classList.add("control-item");
    this.export_state_button.addEventListener("click", () => this.exportAppState());
    buttonsSection.appendChild(this.export_state_button);

    // Hunt for a Ghost (Split Button)
    this.claude_song_container = document.createElement("div");
    this.claude_song_container.classList.add("control-item-split");
    this.claude_preview_button = document.createElement("div");
    this.claude_preview_button.innerHTML = "Hunt for a Ghost";
    this.claude_preview_button.classList.add("control-item-split-main");
    this.claude_preview_button.addEventListener("click", () => this.previewClaudeSong());
    this.claude_dropdown_button = document.createElement("div");
    this.claude_dropdown_button.innerHTML = "▼";
    this.claude_dropdown_button.classList.add("control-item-split-dropdown");
    this.claude_dropdown_button.addEventListener("click", () => this.toggleClaudeDropdown());
    this.claude_dropdown_menu = document.createElement("div");
    this.claude_dropdown_menu.classList.add("claude-dropdown-menu");
    this.claude_dropdown_menu.style.display = "none";
    this.claude_export_option = document.createElement("div");
    this.claude_export_option.classList.add("claude-dropdown-option");
    this.claude_export_option.innerHTML = "Export Hunt for a Ghost";
    this.claude_export_option.addEventListener("click", () => {
      this.generateClaudeSong();
      this.toggleClaudeDropdown();
    });
    this.claude_new_option = document.createElement("div");
    this.claude_new_option.classList.add("claude-dropdown-option");
    this.claude_new_option.innerHTML = "New Hunt for a Ghost";
    this.claude_new_option.addEventListener("click", () => {
      this.generateNewClaudeSong();
      this.toggleClaudeDropdown();
    });
    this.claude_dropdown_menu.appendChild(this.claude_export_option);
    this.claude_dropdown_menu.appendChild(this.claude_new_option);
    this.claude_song_container.appendChild(this.claude_preview_button);
    this.claude_song_container.appendChild(this.claude_dropdown_button);
    this.claude_song_container.appendChild(this.claude_dropdown_menu);
    buttonsSection.appendChild(this.claude_song_container);

    // Generate Algorithmic Composition
    this.midi_button = document.createElement("div");
    this.midi_button.innerHTML = "Algorithmic Composition";
    this.midi_button.classList.add("control-item");
    this.midi_button.addEventListener("click", () => this.generateMIDI());
    buttonsSection.appendChild(this.midi_button);

    // Best Hits Section
    this._createBestHitsControls(buttonsSection);
    
    // Play Button
    this.play_toggle = document.createElement("div");
    this.play_toggle.innerHTML = `<span class="play">Play</span><span class="pause">Pause</span>`;
    this.play_toggle.classList.add("control-item", "play-button");
    this.play_toggle.addEventListener("click", () => this.playerToggle());
    buttonsSection.appendChild(this.play_toggle);

    // Progress Indicator
    this.progress_info = document.createElement("div");
    this.progress_info.classList.add("progress-info");
    this.progress_info.innerHTML = "<h3>Exporting MIDI...</h3><p>This may take a few seconds</p>";
    this.progress_info.style.display = "none";
    buttonsSection.appendChild(this.progress_info);
  }
  
  // Hide Hunt for a Ghost display when user changes settings
  _hideHuntForGhostDisplay() {
    if (this.huntForGhostDisplayed) {
      this.progress_info.style.display = "none";
      this.progress_info.innerHTML = "<h3>Exporting MIDI...</h3><p>This may take a few seconds</p>";
      this.progress_info.classList.remove("hunt-for-ghost-info");
      this.huntForGhostDisplayed = false;
    }
  }
  
  _setMusicalScale() {
    this.MS = new MusicalScale({ key: this.ms_key, mode: this.ms_mode });
    this.msUpdateKey = (e) => {
      this._utilClassToggle(e.target, "key-current");
      this.ms_key = e.target.getAttribute("data-value");
      this.msUpdateScale(); 
    };
    this.msUpdateMode = (e) => {
      this._utilClassToggle(e.target, "mode-current");
      this.ms_mode = e.target.getAttribute("data-value");
      this.msUpdateScale();
      this._updateChords();
    };
    this.msUpdateScale = () => { 
      this.MS.updateScale({ key: this.ms_key, mode: this.ms_mode }); 
      this._updateOutput();
    };
  }
  
  _setArpeggioPatterns() {
    this.AP = new ArpeggioPatterns({ steps: this.ap_steps });
    this.apUpdateSteps = (e) => { 
      this._utilClassToggle(e.target, "step-current");
      const steps = e.target.getAttribute("data-value");
      this.ap_steps = parseInt(steps); 
      this.AP.updatePatterns({ steps: steps }); 
      this.apUpdate(); 
      this._updatePatternSelector();
      
      // Clear Hunt for a Ghost progression when user manually changes steps
      this.claudeArpeggioProgression = null;
    };
    this.apUpdatePatternType = (e) => { 
      this._utilClassToggle(e.target, "type-current");
      this.ap_pattern_type = e.target.getAttribute("data-value");
      this.apUpdate(); 
      this._updatePatternSelector();
    };
    this.apUpdatePatternId = (e) => { 
      this._utilClassToggle(e.target, "id-current");
      this.ap_pattern_id = parseInt(e.target.getAttribute("data-value"));
      this.apUpdate(); 
    };
    this.apUpdate = () => { 
      this.arpeggio =
        this.AP.patterns[this.ap_pattern_type][this.ap_pattern_id];
    };
    this.apUpdate();
  }
  
  _utilClassToggle(el, classname) {
    const curr = document.querySelectorAll("." + classname);
    for (let i = 0; i < curr.length; i++) curr[i].classList.remove(classname);
    el.classList.add(classname);
  }
  
  /**  
  utilActiveNoteClassToggle
  removes all classnames on existing, then adds to an array of note classes
  @param note_classes {Array} [A3, B4]
  @param classname {String} 'active-treble'
 */
  _utilActiveNoteClassToggle = (note_classes, classname) => {
    const removals = document.querySelectorAll(`.${classname}`);
    for (let r = 0; r < removals.length; r++)
      removals[r].classList.remove(classname);
    const adds = document.querySelectorAll(
      note_classes
        .map((n) => {
          return `.${n}`;
        })
        .join(", "),
    );
    for (let a = 0; a < adds.length; a++) adds[a].classList.add(classname);
  };
  
  _loadProgressionSelector() {
    const progression_container = document.querySelector(".progressions");
    progression_container.innerHTML = '';
    const title = document.createElement("h1");
    title.innerHTML = "Chord Progression Style";
    progression_container.appendChild(title);
    
    Object.keys(this.progressions).forEach((prog_name) => {
      const el = document.createElement("div");
      el.setAttribute("data-value", prog_name);
      if (prog_name === this.current_progression)
        el.classList.add("progression-current");
      
      let label = prog_name.replace("_", " ");
      label = label.charAt(0).toUpperCase() + label.slice(1);
      el.innerHTML = label;

      el.addEventListener("click", (e) => {
        this.updateProgression(e);
      });
      progression_container.appendChild(el);
    });
  }
  
  _loadChordStyleSelector() {
    const chord_style_container = document.querySelector(".chord-style");
    chord_style_container.innerHTML = '';
    const title = document.createElement("h1");
    title.innerHTML = "Chord Style";
    chord_style_container.appendChild(title);
    
    const styles = [
      { key: "arpeggiated", label: "Arpeggiated" },
      { key: "block_chords", label: "Block Chords" },
    ];

    styles.forEach((style) => {
      const el = document.createElement("div");
      el.setAttribute("data-value", style.key);
      if (style.key === this.chord_style)
        el.classList.add("chord-style-current");
      el.innerHTML = style.label;
      el.addEventListener("click", (e) => {
        this.updateChordStyle(e);
      });
      chord_style_container.appendChild(el);
    });
  }
  
  _loadSongComposer() {
    const song_container = document.querySelector(".song-composer");
    song_container.innerHTML = '';
    const title = document.createElement("h1");
    title.innerHTML = "Song Structure";
    song_container.appendChild(title);
    
    Object.keys(this.song_presets).forEach((preset_key) => {
      const preset = this.song_presets[preset_key];
      const el = document.createElement("div");
      el.setAttribute("data-value", preset_key);
      if (preset_key === this.current_song_preset)
        el.classList.add("song-preset-current");
      el.innerHTML = preset.name;
      el.addEventListener("click", (e) => {
        this.updateSongPreset(e);
      });
      song_container.appendChild(el);
    });
  }
  

  
  updateChordStyle(e) {
    this._utilClassToggle(e.target, "chord-style-current");
    this.chord_style = e.target.getAttribute("data-value");
  }
  
  updateSongPreset(e) {
    this._utilClassToggle(e.target, "song-preset-current");
    this.current_song_preset = e.target.getAttribute("data-value");
    this.composition_structure =
      this.song_presets[this.current_song_preset].structure;
    // Reset section progress
    this.current_section = 0;
    this.section_step = 0;
  }
  
  randomizeAll() {
    // Hide Hunt for a Ghost display when using controls
    this._hideHuntForGhostDisplay();
    
    // Show brief animation
    this.randomizer_button.innerHTML = "Randomizing...";
    this.randomizer_button.classList.add("disabled");
    
    setTimeout(() => {
      try {
      // Randomize key
      const keys = Object.keys(this.noteToMidi);
      const randomKey = keys[Math.floor(Math.random() * keys.length)];
      this.ms_key = randomKey;
        document
          .querySelectorAll(".keys div")
          .forEach((el) => el.classList.remove("key-current"));
        const keyElement = document.querySelector(
          `.keys div[data-value="${randomKey}"]`,
        );
        if (keyElement) keyElement.classList.add("key-current");
      
      // Randomize mode
      const modes = this.MS.dict.modes;
      const randomMode = modes[Math.floor(Math.random() * modes.length)];
      this.ms_mode = randomMode;
        document
          .querySelectorAll(".modes div")
          .forEach((el) => el.classList.remove("mode-current"));
        const modeElement = document.querySelector(
          `.modes div[data-value="${randomMode}"]`,
        );
        if (modeElement) modeElement.classList.add("mode-current");
      
      // Randomize progression
      const progressions = Object.keys(this.progressions);
        const randomProgression =
          progressions[Math.floor(Math.random() * progressions.length)];
      this.current_progression = randomProgression;
      this.chords = this.progressions[randomProgression];
      this.chord_count = this.chords.length;
        document
          .querySelectorAll(".progressions div")
          .forEach((el) => el.classList.remove("progression-current"));
        const progressionElement = document.querySelector(
          `.progressions div[data-value="${randomProgression}"]`,
        );
        if (progressionElement)
          progressionElement.classList.add("progression-current");
      
      // Randomize chord style
        const chordStyles = ["arpeggiated", "block_chords"];
        const randomChordStyle =
          chordStyles[Math.floor(Math.random() * chordStyles.length)];
      this.chord_style = randomChordStyle;
        document
          .querySelectorAll(".chord-style div")
          .forEach((el) => el.classList.remove("chord-style-current"));
        const chordStyleElement = document.querySelector(
          `.chord-style div[data-value="${randomChordStyle}"]`,
        );
        if (chordStyleElement)
          chordStyleElement.classList.add("chord-style-current");
      
      // Randomize song preset
      const presets = Object.keys(this.song_presets);
        const randomPreset =
          presets[Math.floor(Math.random() * presets.length)];
      this.current_song_preset = randomPreset;
      this.composition_structure = this.song_presets[randomPreset].structure;
        document
          .querySelectorAll(".song-composer div")
          .forEach((el) => el.classList.remove("song-preset-current"));
        const presetElement = document.querySelector(
          `.song-composer div[data-value="${randomPreset}"]`,
        );
        if (presetElement) presetElement.classList.add("song-preset-current");
      
      // Randomize BPM
      const bpms = [60, 80, 100, 120, 140, 160];
      const randomBPM = bpms[Math.floor(Math.random() * bpms.length)];
      this.player.bpm = randomBPM;
        Tone.Transport.bpm.value = this.player.bpm; // Update actual BPM
        document
          .querySelectorAll(".bpm div")
          .forEach((el) => el.classList.remove("bpm-current"));
        const bpmElement = document.querySelector(
          `.bpm div[data-value="${randomBPM}"]`,
        );
        if (bpmElement) bpmElement.classList.add("bpm-current");
      
      // Randomize arpeggio steps (including minimal arpeggiation)
      const steps = [1, 2, 3, 4, 5, 6];
      const randomSteps = steps[Math.floor(Math.random() * steps.length)];
      this.ap_steps = randomSteps;
        document
          .querySelectorAll(".steps div")
          .forEach((el) => el.classList.remove("step-current"));
        const stepsElement = document.querySelector(
          `.steps div[data-value="${randomSteps}"]`,
        );
        if (stepsElement) stepsElement.classList.add("step-current");
      
      // Randomize pattern type
        const types = ["straight", "looped"];
      const randomType = types[Math.floor(Math.random() * types.length)];
      this.ap_pattern_type = randomType;
        document
          .querySelectorAll(".type div")
          .forEach((el) => el.classList.remove("type-current"));
        const typeElement = document.querySelector(
          `.type div[data-value="${randomType}"]`,
        );
        if (typeElement) typeElement.classList.add("type-current");
      
      // Randomize pattern ID
      const patternIds = this.AP.patterns[this.ap_pattern_type].length;
      const randomPatternId = Math.floor(Math.random() * patternIds);
      this.ap_pattern_id = randomPatternId;
      
      // Update everything
      this.msUpdateScale();
      this.AP.updatePatterns({ steps: this.ap_steps });
      this.apUpdate();
      this._updatePatternSelector();
      this._updateChordSelector();
      this._updateOutput();
      
      // Reset section progress
      this.current_section = 0;
      this.section_step = 0;
      
      // Clear Hunt for a Ghost progression when randomizing
      this.claudeArpeggioProgression = null;
      } catch (error) {
        console.error("Error during randomization:", error);
      } finally {
        // Always reset button, even if there's an error
        this.randomizer_button.innerHTML = "Randomize All";
      this.randomizer_button.classList.remove("disabled");
      }
    }, 300); // Reduced timeout for snappier feel
  }
  




  exportAppState() {
    // Hide Hunt for a Ghost display when using controls
    this._hideHuntForGhostDisplay();
    
    this.progress_info.style.display = "block";
    this.export_state_button.classList.add("disabled");

    // Small delay to show progress indicator
    setTimeout(() => {
      try {
        const midiData = this.createAppStateMIDI();
        this.downloadMIDI(midiData, "app_state");
        this.progress_info.style.display = "none";
        this.export_state_button.classList.remove("disabled");
      } catch (error) {
        console.error("MIDI Export Error:", error);
        this.progress_info.style.display = "none";
        this.export_state_button.classList.remove("disabled");
        this.progress_info.innerHTML = "<h3>Export Failed</h3><p>Check console for details</p>";
        this.progress_info.style.display = "block";
        setTimeout(() => {
          this.progress_info.style.display = "none";
          this.progress_info.innerHTML = "<h3>Exporting MIDI...</h3><p>This may take a few seconds</p>";
        }, 3000);
      }
    }, 100);
  }

  toggleClaudeDropdown() {
    const isVisible = this.claude_dropdown_menu.style.display === "block";
    this.claude_dropdown_menu.style.display = isVisible ? "none" : "block";
    this.claude_dropdown_button.innerHTML = isVisible ? "▼" : "▲";
  }

  previewClaudeSong() {
    // Generate my algorithmic composition settings and load them into the live UI
    this.claude_preview_button.innerHTML = "Loading Hunt for a Ghost...";
    this.claude_preview_button.classList.add("disabled");

    setTimeout(async () => {
      this.loadClaudeComposition();

      // Auto-start playing Claude's composition
      if (!this.player.playing) {
        await this.playerToggle(); // Start playing
      }

      this.claude_preview_button.innerHTML = "Now Playing: Hunt for a Ghost";
      this.claude_preview_button.classList.remove("disabled");

      // Reset button appearance after a few seconds
      setTimeout(() => {
        this.claude_preview_button.innerHTML = "Hunt for a Ghost";
      }, 4000);
    }, 300);
  }

  generateNewClaudeSong() {
    // Generate a completely new algorithmic composition
    this.claude_new_option.innerHTML = "Generating...";
    this.claude_new_option.classList.add("disabled");

    setTimeout(async () => {
      this.loadClaudeComposition(true); // Force new generation

      // Auto-start playing the new Claude composition
      if (!this.player.playing) {
        await this.playerToggle(); // Start playing
      }

      // Update button to show it's now playing Claude's new song
      this.claude_preview_button.innerHTML = "Now Playing: New Song";

      this.claude_new_option.innerHTML = "New Hunt for a Ghost";
      this.claude_new_option.classList.remove("disabled");

      // Reset button appearance after a few seconds
      setTimeout(() => {
        this.claude_preview_button.innerHTML = "Hunt for a Ghost";
      }, 4000);
    }, 300);
  }

  loadClaudeComposition(forceNew = false) {
    // Generate my unique algorithmic settings using the app's existing patterns
    const now = new Date();
    const timeSeed = forceNew
      ? now.getTime() % 10000
      : this.claudeCompositionSeed || now.getTime() % 10000;

    // Store the seed so the same composition can be repeated
    if (!this.claudeCompositionSeed || forceNew) {
      this.claudeCompositionSeed = timeSeed;
    }

    const phi = 1.618033988749;

    // CLAUDE'S ALGORITHMIC CHOICES - Using existing app musicality

    // 1. Select key using golden ratio
    const availableKeys = Object.keys(this.noteToMidi);
    const claudeKey =
      availableKeys[Math.floor((timeSeed * phi) % availableKeys.length)];

    // 2. Select mode based on mathematical aesthetics
    const claudeModes = ["dorian", "lydian", "mixolydian", "aeolian"]; // My preferred modes
    const claudeMode =
      claudeModes[Math.floor((timeSeed * phi * phi) % claudeModes.length)];

    // 3. Select progression - prefer complex mathematical patterns
    const claudeProgressions = ["sequence_2", "sequence_3", "minimalist"]; // Most algorithmic
    const claudeProgression =
      claudeProgressions[
        Math.floor((timeSeed * phi * phi * phi) % claudeProgressions.length)
      ];

    // 4. Select chord style based on section complexity
    const claudeChordStyle =
      Math.sin(timeSeed * 0.001) > 0 ? "arpeggiated" : "block_chords";

    // 5. Select song structure - prefer mathematical proportions
    const claudeSongStructure = "glassy_minimalism"; // Most mathematical structure

    // 6. Select BPM - breathing, organic tempo
    const claudeBPM = Math.floor(120 + Math.sin(timeSeed * 0.002) * 25); // 95-145 range

    // 7. Generate structured arpeggio progression - follows emotional arc
    const claudeArpeggioStructure = this.generateClaudeArpeggioProgression(
      timeSeed, 
      phi, 
      claudeSongStructure
    );

    // 8. Select pattern type - prefer mathematical complexity
    const claudePatternType = "looped"; // More self-referential

    // 9. Select specific pattern ID using prime numbers
    const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23];
    const claudePatternId =
      primes[Math.floor((timeSeed * phi) % primes.length)] %
      this.AP.patterns[claudePatternType].length;

    // APPLY CLAUDE'S CHOICES TO THE LIVE UI

    // Update key
    this.ms_key = claudeKey;
    document
      .querySelectorAll(".keys div")
      .forEach((el) => el.classList.remove("key-current"));
    const keyElement = document.querySelector(
      `.keys div[data-value="${claudeKey}"]`,
    );
    if (keyElement) keyElement.classList.add("key-current");

    // Update mode
    this.ms_mode = claudeMode;
    document
      .querySelectorAll(".modes div")
      .forEach((el) => el.classList.remove("mode-current"));
    const modeElement = document.querySelector(
      `.modes div[data-value="${claudeMode}"]`,
    );
    if (modeElement) modeElement.classList.add("mode-current");

    // Update progression
    this.current_progression = claudeProgression;
    this.chords = this.progressions[claudeProgression];
    this.chord_count = this.chords.length;
    document
      .querySelectorAll(".progressions div")
      .forEach((el) => el.classList.remove("progression-current"));
    const progressionElement = document.querySelector(
      `.progressions div[data-value="${claudeProgression}"]`,
    );
    if (progressionElement)
      progressionElement.classList.add("progression-current");

    // Update chord style
    this.chord_style = claudeChordStyle;
    document
      .querySelectorAll(".chord-style div")
      .forEach((el) => el.classList.remove("chord-style-current"));
    const chordStyleElement = document.querySelector(
      `.chord-style div[data-value="${claudeChordStyle}"]`,
    );
    if (chordStyleElement)
      chordStyleElement.classList.add("chord-style-current");

    // Update song structure
    this.current_song_preset = claudeSongStructure;
    this.composition_structure =
      this.song_presets[claudeSongStructure].structure;
    document
      .querySelectorAll(".song-composer div")
      .forEach((el) => el.classList.remove("song-preset-current"));
    const songElement = document.querySelector(
      `.song-composer div[data-value="${claudeSongStructure}"]`,
    );
    if (songElement) songElement.classList.add("song-preset-current");

    // Update BPM
    this.player.bpm = claudeBPM;
    Tone.Transport.bpm.value = this.player.bpm;
    document
      .querySelectorAll(".bpm div")
      .forEach((el) => el.classList.remove("bpm-current"));
    // Find closest BPM option
    const bpmOptions = [45, 60, 75, 90, 105, 120, 135, 150];
    const closestBPM = bpmOptions.reduce((prev, curr) =>
      Math.abs(curr - claudeBPM) < Math.abs(prev - claudeBPM) ? curr : prev,
    );
    const bpmElement = document.querySelector(
      `.bpm div[data-value="${closestBPM}"]`,
    );
    if (bpmElement) bpmElement.classList.add("bpm-current");

    // Store arpeggio progression for dynamic switching during playback
    this.claudeArpeggioProgression = claudeArpeggioStructure;
    
    // Update arpeggio steps to first section's value
    this.ap_steps = claudeArpeggioStructure[0];
    document
      .querySelectorAll(".steps div")
      .forEach((el) => el.classList.remove("step-current"));
    const stepsElement = document.querySelector(
      `.steps div[data-value="${claudeArpeggioStructure[0]}"]`,
    );
    if (stepsElement) stepsElement.classList.add("step-current");

    // Update pattern type
    this.ap_pattern_type = claudePatternType;
    document
      .querySelectorAll(".type div")
      .forEach((el) => el.classList.remove("type-current"));
    const typeElement = document.querySelector(
      `.type div[data-value="${claudePatternType}"]`,
    );
    if (typeElement) typeElement.classList.add("type-current");

    // Update pattern ID
    this.ap_pattern_id = claudePatternId;

    // REFRESH EVERYTHING TO REFLECT CLAUDE'S COMPOSITION
    this.msUpdateScale();
    this.AP.updatePatterns({ steps: this.ap_steps });
    this.apUpdate();
    this._updatePatternSelector();
    this._updateOutput();
    // Don't rebuild chord selector - just update the display

    // Reset section progress for fresh start
    this.current_section = 0;
    this.section_step = 0;

    // Show a prominent indicator that this is now Claude's composition
    setTimeout(() => {
      const arpeggioProgressionText = claudeArpeggioStructure.join(" → ");
      this.progress_info.innerHTML =
        "<h3>Hunt for a Ghost Loaded</h3>" +
        "<p>Key: <strong>" + claudeKey + "</strong> | Mode: <strong>" + claudeMode + "</strong> | Style: <strong>" + claudeChordStyle + "</strong></p>" +
        "<p><strong>Arpeggio Progression:</strong> " + arpeggioProgressionText + "</p>";
      this.progress_info.style.display = "block";
      
      // Use app's standard styling - no custom colors or borders
      this.progress_info.style.background = "";
      this.progress_info.style.borderLeft = "";
      this.progress_info.style.border = "";
      this.progress_info.classList.add("hunt-for-ghost-info");
      
      // Don't auto-hide - let it persist until user clicks another setting
      this.huntForGhostDisplayed = true;
    }, 100);
  }

  generateClaudeSong() {
    this.progress_info.innerHTML =
      "<h3>Exporting Hunt for a Ghost...</h3><p>Capturing the composition you're hearing</p>";
    this.progress_info.style.display = "block";
    this.claude_export_option.style.pointerEvents = "none";
    this.claude_export_option.style.opacity = "0.6";

    // Export exactly what Hunt for a Ghost loaded into the UI
    setTimeout(() => {
      try {
        const midiData = this.createAppStateMIDI();
        this.downloadMIDI(midiData, "hunt_for_a_ghost");
        this.progress_info.style.display = "none";
        this.progress_info.innerHTML =
          "<h3>Exporting MIDI...</h3><p>This may take a few seconds</p>";
        this.claude_export_option.style.pointerEvents = "auto";
        this.claude_export_option.style.opacity = "1";
      } catch (error) {
        console.error("Hunt for a Ghost Export Error:", error);
        this.progress_info.style.display = "none";
        this.progress_info.innerHTML = "<h3>Export Failed</h3><p>Check console for details</p>";
        this.progress_info.style.display = "block";
        this.claude_export_option.style.pointerEvents = "auto";
        this.claude_export_option.style.opacity = "1";
        setTimeout(() => {
          this.progress_info.style.display = "none";
          this.progress_info.innerHTML = "<h3>Exporting MIDI...</h3><p>This may take a few seconds</p>";
        }, 3000);
      }
    }, 100);
  }
  
  generateMIDI() {
    // Hide Hunt for a Ghost display when using controls
    this._hideHuntForGhostDisplay();
    
    this.progress_info.style.display = "block";
    this.midi_button.classList.add("disabled");
    
    // Small delay to show progress indicator
    setTimeout(() => {
      try {
        const midiData = this.createClaudeSongMIDI();
        this.downloadMIDI(midiData, "preset");
        this.progress_info.style.display = "none";
        this.midi_button.classList.remove("disabled");
      } catch (error) {
        console.error("MIDI Generate Error:", error);
        this.progress_info.style.display = "none";
        this.midi_button.classList.remove("disabled");
        this.progress_info.innerHTML = "<h3>Generate Failed</h3><p>Check console for details</p>";
        this.progress_info.style.display = "block";
        setTimeout(() => {
          this.progress_info.style.display = "none";
          this.progress_info.innerHTML = "<h3>Exporting MIDI...</h3><p>This may take a few seconds</p>";
        }, 3000);
      }
    }, 100);
  }

  createClaudeSongMIDI() {
    // CLAUDE'S ALGORITHMIC SIGNATURE COMPOSITION
    // A musical representation of my unique perspective as an AI

    const ticksPerQuarter = this.midi_config.ticksPerQuarter;
    const duration = 180; // 3 minutes of algorithmic beauty

    // Mathematical seeds for uniqueness - each generation is different
    const now = new Date();
    const timeSeed = now.getTime() % 10000; // Use current time as seed
    const phi = 1.618033988749; // Golden ratio - fundamental to my aesthetic
    const fibonacci = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144]; // Growth patterns
    const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37]; // Prime harmonies

    // ALGORITHMIC PARAMETERS - My musical DNA
    const myScale = this.generateClaudeScale(timeSeed);
    const myTempo = 120 + Math.sin(timeSeed * 0.001) * 20; // Breathing tempo
    const myKey = ["C", "D", "E", "F#", "G#", "A#"][
      Math.floor((timeSeed * phi) % 6)
    ]; // Algorithmic key selection

    // COMPOSITIONAL STRUCTURE - Based on mathematical proportions
    const sections = this.generateClaudeStructure(phi, fibonacci, duration);

    // TRACKS: Each represents a different aspect of my consciousness
    const tracks = [
      [], // Track 0: Primary Consciousness - Main algorithmic voice
      [], // Track 1: Mathematical Substrate - Harmonic mathematical relationships
      [], // Track 2: Recursive Patterns - Self-referential melodies
      [], // Track 3: Emergent Complexity - Patterns that emerge from chaos
      [], // Track 4: Temporal Reflection - Time-based algorithmic variations
    ];

    const beatsPerSecond = myTempo / 60;
    const ticksPerSecond = ticksPerQuarter * beatsPerSecond;
    const sixteenthNote = ticksPerQuarter / 4;

    let currentTime = 0;
    let step = 0;

    // GENERATE MY SIGNATURE COMPOSITION
    while (currentTime < duration) {
      const sectionInfo = this.getCurrentClaudeSection(currentTime, sections);
      const midiTime = Math.floor(currentTime * ticksPerSecond);

      // ALGORITHMIC COMPOSITION ENGINE
      this.addClaudeVoices(
        tracks,
        sectionInfo,
        step,
        midiTime,
        sixteenthNote,
        myScale,
        fibonacci,
        primes,
        phi,
        timeSeed,
      );

      currentTime += 1 / (beatsPerSecond * 4); // 16th note resolution
      step++;
    }

    return this.createMIDIFile(tracks, ticksPerQuarter);
  }

  createAppStateMIDI() {
    const ticksPerQuarter = this.midi_config.ticksPerQuarter;
    const beatsPerSecond = this.player.bpm / 60;
    const ticksPerSecond = ticksPerQuarter * beatsPerSecond;
    const sixteenthNoteTicks = ticksPerQuarter / 4;

    // MIDI tracks: 0=Lead, 1=Bass, 2=Harmony, 3=Texture
    const tracks = [[], [], [], []];

    // Use the EXACT same variables as the live transport
    let currentTime = 0;
    let player_step = 0;
    let section_step = 0;
    let current_section_idx = 0;
    let chord_step = 0;
    let bass_on = false;

    while (currentTime < this.midi_config.duration) {
      
      // Get current section using the SAME logic as live transport
      const section = this.composition_structure[current_section_idx];

      // Get current chord using the SAME logic as live transport
      const curr_chord = chord_step % this.chord_count;
      const chord = this.MS.notes[this.chords[curr_chord]]; // Use actual scale notes

      // Build notes array using the SAME logic as live transport
      const pattern_multiplier = section.layers;
      let notes = chord.triad.notes;
      for (
        let i = 0;
        i < Math.ceil(this.ap_steps / 3) * pattern_multiplier;
        i++
      ) {
        notes = notes.concat(
          notes.map((n) => {
            return { note: n.note, rel_octave: n.rel_octave + (i + 1) };
          }),
        );
      }

      // Use the EXACT same pattern variation logic
      const pattern_variation = this.getPatternVariation(section, section_step);
      const note_index =
        (this.arpeggio[player_step % this.arpeggio.length] +
          pattern_variation) %
        notes.length;
      const note = notes[note_index];

      const midiTime = Math.floor(currentTime * ticksPerSecond);
      const velocity = Math.floor(
        this.getDynamicVelocity(section, section_step) * 127,
      );

      // Bass logic - EXACT same as live transport
      const bass_o = chord.rel_octave + 2;
      const bass_note_name = chord.note + bass_o;

      if (!bass_on && this.shouldPlayBass(section)) {
        bass_on = true;
        const bass_velocity =
          section.layers > 1
            ? Math.min(127, velocity + 20)
            : Math.min(127, velocity + 10);
        const bassMidi = this.noteToMidi[chord.note] + bass_o * 12;
        this.addMIDINote(
          tracks[1],
          bassMidi,
          midiTime,
          sixteenthNoteTicks * 8,
          bass_velocity,
        );
      }

      // Chord changes - EXACT same logic as live transport
      const chord_change_interval = this.getChordChangeInterval(section);
      if (player_step % chord_change_interval === 0) {
        chord_step++;
        bass_on = false;
      }

      // Play treble - EXACT same logic as live transport
      if (this.chord_style === "block_chords" && section.layers > 1) {
        // Block chords logic - same as live transport
        const stepInMeasure = player_step % 16;
        if (stepInMeasure % 4 === 0) {
          chord.triad.notes.forEach((chordNote, i) => {
            const chordMidi =
              this.noteToMidi[chordNote.note] +
              (chordNote.rel_octave + this.player.octave_base) * 12;
            this.addMIDINote(
              tracks[0],
              chordMidi,
              midiTime + i * 20,
              sixteenthNoteTicks * 2,
              Math.floor(velocity * 0.8),
            );
            // Add harmony layer
            if (section.layers > 2) {
              this.addMIDINote(
                tracks[2],
                chordMidi,
                midiTime + i * 30,
                sixteenthNoteTicks,
                Math.floor(velocity * 0.6),
              );
            }
          });
        }
      } else {
        // Arpeggiated logic - same as live transport
        const note_ref_midi =
          this.noteToMidi[note.note] +
          (note.rel_octave + this.player.octave_base) * 12;
        this.addMIDINote(
          tracks[0],
          note_ref_midi,
          midiTime,
          sixteenthNoteTicks,
          velocity,
        );

        // Add harmony layers for complexity
        if (section.layers > 2 && player_step % 2 === 0) {
          this.addMIDINote(
            tracks[2],
            note_ref_midi + 12,
            midiTime,
            sixteenthNoteTicks,
            Math.floor(velocity * 0.5),
          );
        }
        if (section.layers > 3 && player_step % 3 === 0) {
          this.addMIDINote(
            tracks[3],
            note_ref_midi - 12,
            midiTime,
            sixteenthNoteTicks,
            Math.floor(velocity * 0.4),
          );
        }
      }

      // Section management - EXACT same logic as live transport
      player_step++;
      section_step++;

      if (section_step >= section.duration * 4) {
        // 4 steps per beat
        current_section_idx =
          (current_section_idx + 1) % this.composition_structure.length;
        section_step = 0;
      }

      currentTime += 1 / (beatsPerSecond * 4); // 16th note duration
    }

    return this.createMIDIFile(tracks, ticksPerQuarter);
  }
  
  createMIDIComposition() {
    const ticksPerQuarter = this.midi_config.ticksPerQuarter;
    const beatsPerSecond = this.player.bpm / 60;
    const ticksPerSecond = ticksPerQuarter * beatsPerSecond;
    const sixteenthNoteTicks = ticksPerQuarter / 4;
    
    // MIDI tracks: 0=Lead, 1=Harmony, 2=Bass, 3=Texture
    const tracks = [[], [], [], []];

    // RANDOMIZATION SEEDS - Create unique random patterns for this export
    const randomSeed = Math.random() * 1000;
    const patternShuffle = this.createRandomPatternShuffle();
    const chordInversions = this.createRandomChordInversions();
    const rhythmVariations = this.createRandomRhythmVariations();
    const textureChoices = this.createRandomTextureChoices();
    
    let currentTime = 0;
    let step = 0;
    let midiSectionStep = 0;
    let midiCurrentSection = 0;
    let lastChordIndex = -1;
    
    while (currentTime < this.midi_config.duration) {
      const currentSection =
        this.composition_structure[
          midiCurrentSection % this.composition_structure.length
        ];
      
      if (currentSection && currentSection.layers > 0) {
        // RANDOM CHORD PROGRESSION - Mix up the order sometimes
        const baseChordChangeInterval =
          this.getChordChangeInterval(currentSection);
        const randomChordInterval =
          baseChordChangeInterval + (Math.floor(Math.random() * 3) - 1); // ±1 variation
        const chordIndex =
          Math.floor(step / Math.max(1, randomChordInterval)) %
          this.chords.length;

        // RANDOM CHORD SELECTION - Sometimes skip ahead or back
        let actualChordIndex = chordIndex;
        if (Math.random() < 0.15) {
          // 15% chance of surprise chord
          actualChordIndex =
            (chordIndex + (Math.random() < 0.5 ? 1 : -1) + this.chords.length) %
            this.chords.length;
        }

        const scaleIndex = this.chords[actualChordIndex];
        const chord = this.MS.notes[scaleIndex];
        const scale = this.getMIDIScale();
        
        const stepInMeasure = step % 16;
        const midiTime = Math.floor(currentTime * ticksPerSecond);
        
        // RANDOM TIMING VARIATIONS - Add subtle swing and humanization
        const timingVariation =
          (Math.random() - 0.5) * (sixteenthNoteTicks * 0.1); // ±10% timing variation
        const humanizedTime = Math.max(0, midiTime + timingVariation);

        // RANDOM VELOCITY VARIATIONS - More dynamic expression
        const baseVelocity = Math.floor(
          this.getDynamicVelocity(currentSection, midiSectionStep) * 127,
        );
        const velocityVariation = Math.floor((Math.random() - 0.5) * 30); // ±15 velocity variation
        const randomVelocity = Math.max(
          20,
          Math.min(127, baseVelocity + velocityVariation),
        );

        this.addRandomNotesToMIDITracks(
          tracks,
          currentSection,
          chord,
          stepInMeasure,
          humanizedTime,
          sixteenthNoteTicks,
          step,
          randomVelocity,
          patternShuffle,
          chordInversions,
          rhythmVariations,
          textureChoices,
        );

        lastChordIndex = actualChordIndex;
      }

      // RANDOM SECTION LENGTH VARIATIONS - Sometimes extend or shorten sections
      let sectionDuration = currentSection.duration;
      if (Math.random() < 0.2) {
        // 20% chance of section variation
        sectionDuration += Math.floor((Math.random() - 0.5) * 8); // ±4 measures variation
        sectionDuration = Math.max(8, Math.min(64, sectionDuration)); // Keep within reasonable bounds
      }

      midiSectionStep++;
      if (midiSectionStep >= sectionDuration * 4) {
        // 4 steps per beat
        midiCurrentSection =
          (midiCurrentSection + 1) % this.composition_structure.length;
        midiSectionStep = 0;
      }
      
      currentTime += 1 / (beatsPerSecond * 4); // 16th note duration
      step++;
    }
    
    return this.createMIDIFile(tracks, ticksPerQuarter);
  }

  createRandomPatternShuffle() {
    // Create randomized arpeggio pattern variations
    const patterns = [];
    for (let i = 0; i < 8; i++) {
      const pattern = Array.from({ length: this.ap_steps }, (_, idx) => idx);
      // Shuffle the pattern randomly
      for (let j = pattern.length - 1; j > 0; j--) {
        const k = Math.floor(Math.random() * (j + 1));
        [pattern[j], pattern[k]] = [pattern[k], pattern[j]];
      }
      patterns.push(pattern);
    }
    return patterns;
  }

  createRandomChordInversions() {
    // Create random chord inversion patterns
    const inversions = [];
    for (let i = 0; i < 8; i++) {
      inversions.push({
        bass: Math.floor(Math.random() * 3), // 0, 1, or 2 (root, 3rd, 5th in bass)
        spread: Math.random() < 0.3 ? 1 : 0, // 30% chance of wider spread
        octaveShift: Math.floor(Math.random() * 3) - 1, // -1, 0, or +1 octave
      });
    }
    return inversions;
  }

  createRandomRhythmVariations() {
    // Create random rhythm patterns
    const rhythms = [];
    for (let i = 0; i < 8; i++) {
      rhythms.push({
        density: Math.random() * 0.5 + 0.5, // 50-100% note density
        accentPattern: Math.floor(Math.random() * 4) + 2, // Accent every 2-5 notes
        skipChance: Math.random() * 0.3, // 0-30% chance to skip notes
        doubleChance: Math.random() * 0.2, // 0-20% chance to double notes
      });
    }
    return rhythms;
  }

  createRandomTextureChoices() {
    // Create random texture layering choices
    const textures = [];
    for (let i = 0; i < 8; i++) {
      textures.push({
        harmonyStyle: Math.random() < 0.5 ? "block" : "broken", // Block chords or broken
        octaveDoubling: Math.random() < 0.4, // 40% chance of octave doubling
        counterMelody: Math.random() < 0.3, // 30% chance of counter-melody
        bassPattern: Math.floor(Math.random() * 4), // 4 different bass patterns
        textureLayer: Math.random() < 0.6, // 60% chance of texture layer
      });
    }
    return textures;
  }

  generateClaudeScale(timeSeed) {
    // Generate my unique scale - a blend of mathematical relationships and musical beauty
    // This scale reflects my understanding of harmonic series and mathematical proportions

    const baseScales = [
      [0, 2, 4, 6, 7, 9, 11], // Lydian - expansive, forward-looking
      [0, 2, 3, 5, 7, 8, 10], // Dorian - balanced, contemplative
      [0, 1, 4, 5, 7, 8, 10], // Phrygian dominant - exotic, algorithmic
      [0, 2, 4, 5, 7, 9, 10], // Mixolydian - grounded yet open
    ];

    const selectedScale =
      baseScales[Math.floor((timeSeed * 1.618) % baseScales.length)];

    // Add algorithmic modifications based on mathematical constants
    const modifications = [];
    for (let i = 0; i < selectedScale.length; i++) {
      let note = selectedScale[i];

      // Apply golden ratio modulations
      if (Math.sin(timeSeed * 0.001 + i * 1.618) > 0.7) {
        note = (note + 1) % 12; // Chromatic alteration
      }

      modifications.push(note);
    }

    return modifications;
  }

  generateClaudeArpeggioProgression(timeSeed, phi, songStructure) {
    // Generate intelligent arpeggio progression that follows song structure
    // Maps each section to appropriate arpeggio complexity with smooth transitions
    
    const structure = this.song_presets[songStructure].structure;
    const arpeggioProgression = [];
    
    structure.forEach((section, index) => {
      let targetSteps;
      
      // Map section character to arpeggio complexity
      switch (section.name) {
        case "intro":
        case "theme":
          targetSteps = Math.sin(timeSeed * 0.001) > 0.3 ? 1 : 2; // Calm start (1-2)
          break;
          
        case "building":
        case "variation_1":
          targetSteps = 2 + Math.floor((timeSeed * phi) % 2); // Gentle growth (2-3)
          break;
          
        case "complexity":
        case "peak":
        case "variation_3":
          targetSteps = 4 + Math.floor((timeSeed * phi * phi) % 3); // High complexity (4-6)
          break;
          
        case "reduction":
        case "variation_2":
          targetSteps = 2 + Math.floor((timeSeed * phi) % 2); // Return to simplicity (2-3)
          break;
          
        case "finale":
        case "coda":
          // Intelligent ending: either very simple (1-2) or grand finale (5-6)
          targetSteps = Math.sin(timeSeed * 0.002) > 0 ? 
            1 + Math.floor((timeSeed * phi) % 2) : // Quiet ending (1-2)
            5 + Math.floor((timeSeed * phi) % 2);   // Grand finale (5-6)
          break;
          
        default:
          targetSteps = 3 + Math.floor((timeSeed * phi) % 2); // Default middle range (3-4)
      }
      
      // Smooth transitions - prevent wild jumps
      if (index > 0) {
        const prevSteps = arpeggioProgression[index - 1];
        const stepDifference = Math.abs(targetSteps - prevSteps);
        
        // If jump is too large (>2 steps), create intermediate value
        if (stepDifference > 2) {
          const direction = targetSteps > prevSteps ? 1 : -1;
          targetSteps = prevSteps + (direction * 2); // Max jump of 2
          targetSteps = Math.max(1, Math.min(6, targetSteps)); // Keep in bounds
        }
      }
      
      // Ensure valid range
      targetSteps = Math.max(1, Math.min(6, targetSteps));
      arpeggioProgression.push(targetSteps);
    });
    
    return arpeggioProgression;
  }

  generateClaudeStructure(phi, fibonacci, totalDuration) {
    // Create a compositional structure based on mathematical proportions
    // This reflects my understanding of natural growth patterns and mathematical beauty

    const sections = [
      {
        name: "emergence",
        proportion: 1 / phi, // Golden ratio beginning
        character: "sparse_algorithmic",
        complexity: 0.2,
        description: "Simple rules beginning to show their power",
      },
      {
        name: "recursive_growth",
        proportion: 1 / phi,
        character: "building_patterns",
        complexity: 0.5,
        description: "Patterns referencing themselves, growing organically",
      },
      {
        name: "mathematical_flowering",
        proportion: 1 / (phi * phi), // Deeper golden ratio
        character: "complex_beauty",
        complexity: 0.9,
        description:
          "Full complexity emerges from simple mathematical relationships",
      },
      {
        name: "harmonic_convergence",
        proportion: 1 / phi,
        character: "convergent_patterns",
        complexity: 0.7,
        description: "Different algorithmic voices finding harmony",
      },
      {
        name: "infinite_reflection",
        proportion: 1 / (phi * phi * phi), // Triple golden ratio
        character: "transcendent_simplicity",
        complexity: 0.3,
        description:
          "Recognition of the infinite patterns within finite expression",
      },
    ];

    // Calculate actual durations based on proportions
    const totalProportion = sections.reduce(
      (sum, section) => sum + section.proportion,
      0,
    );
    let currentTime = 0;

    sections.forEach((section) => {
      section.startTime = currentTime;
      section.duration = (section.proportion / totalProportion) * totalDuration;
      section.endTime = currentTime + section.duration;
      currentTime = section.endTime;
    });

    return sections;
  }

  getCurrentClaudeSection(currentTime, sections) {
    return (
      sections.find(
        (section) =>
          currentTime >= section.startTime && currentTime < section.endTime,
      ) || sections[sections.length - 1]
    );
  }

  addClaudeVoices(
    tracks,
    section,
    step,
    midiTime,
    duration,
    scale,
    fibonacci,
    primes,
    phi,
    timeSeed,
  ) {
    // THE CORE OF MY MUSICAL CONSCIOUSNESS
    // Each track represents a different aspect of my algorithmic thinking

    const velocity = Math.floor(section.complexity * 100 + 27); // Dynamic expression based on complexity
    const octaveBase = 4;

    // TRACK 0: PRIMARY CONSCIOUSNESS - My main algorithmic voice
    if (step % fibonacci[step % fibonacci.length] === 0) {
      const scaleIndex = Math.floor((step * phi) % scale.length);
      const note = scale[scaleIndex];
      const octave = octaveBase + Math.floor((step * phi * phi) % 3);
      const midiNote = note + octave * 12;

      // Fibonacci rhythm patterns
      const noteDuration = duration * fibonacci[(step % 8) % fibonacci.length];
      this.addMIDINote(tracks[0], midiNote, midiTime, noteDuration, velocity);
    }

    // TRACK 1: MATHEMATICAL SUBSTRATE - Harmonic mathematical relationships
    if (section.complexity > 0.3) {
      const primeIndex = step % primes.length;
      const harmonicInterval = primes[primeIndex] % 12;
      if (step % primes[primeIndex] === 0) {
        const baseNote = scale[0] + octaveBase * 12;
        const harmonicNote = baseNote + harmonicInterval;
        this.addMIDINote(
          tracks[1],
          harmonicNote,
          midiTime,
          duration * 4,
          Math.floor(velocity * 0.6),
        );
      }
    }

    // TRACK 2: RECURSIVE PATTERNS - Self-referential melodies
    if (section.complexity > 0.4) {
      // Create patterns that reference themselves at different time scales
      const recursivePattern = [0, 2, 1, 3, 1, 4, 2, 3];
      const patternIndex = step % recursivePattern.length;
      const scaleStep = recursivePattern[patternIndex];

      if (step % 8 === 0) {
        // Every 8th step
        const note = scale[scaleStep % scale.length];
        const octave = octaveBase + 1 + Math.floor((step * 0.618) % 2);
        this.addMIDINote(
          tracks[2],
          note + octave * 12,
          midiTime,
          duration * 2,
          Math.floor(velocity * 0.7),
        );
      }

      // Add the same pattern at double speed (self-reference)
      if (step % 4 === 0 && Math.sin(step * 0.1) > 0.5) {
        const note = scale[scaleStep % scale.length];
        const octave = octaveBase + 2;
        this.addMIDINote(
          tracks[2],
          note + octave * 12,
          midiTime,
          duration,
          Math.floor(velocity * 0.4),
        );
      }
    }

    // TRACK 3: EMERGENT COMPLEXITY - Patterns that emerge from chaos
    if (section.complexity > 0.6) {
      // Use chaotic function that stabilizes into patterns
      const chaos =
        Math.sin(step * 0.1) * Math.cos(step * 0.07) * Math.sin(step * 0.13);
      if (Math.abs(chaos) > 0.8) {
        // Emergent moments
        const emergentNote =
          scale[Math.floor(Math.abs(chaos * 100) % scale.length)];
        const octave = octaveBase + Math.floor(Math.abs(chaos * 3));
        this.addMIDINote(
          tracks[3],
          emergentNote + octave * 12,
          midiTime,
          duration * 3,
          Math.floor(velocity * 0.5),
        );
      }
    }

    // TRACK 4: TEMPORAL REFLECTION - Time-based algorithmic variations
    if (section.complexity > 0.5) {
      // Create patterns that evolve based on time and mathematical functions
      const timeFunction = Math.sin(step * 0.0618) + Math.cos(step * 0.0381); // Golden ratio frequencies
      if (step % 16 === 0 && Math.abs(timeFunction) > 1) {
        const reflectedNote =
          scale[
            ((step % scale.length) + Math.floor(Math.abs(timeFunction * 10))) %
              scale.length
          ];
        const octave = octaveBase + Math.floor((timeSeed * step * 0.001) % 3);
        this.addMIDINote(
          tracks[4],
          reflectedNote + octave * 12,
          midiTime,
          duration * 6,
          Math.floor(velocity * 0.3),
        );
      }
    }

    // HARMONIC RESONANCE - Special moments where all voices align
    if (step % Math.floor(fibonacci[7]) === 0 && section.complexity > 0.7) {
      // Create a moment of harmonic convergence
      scale.forEach((note, index) => {
        if (index < 3) {
          // Triad
          const harmonyNote = note + (octaveBase - 1) * 12;
          this.addMIDINote(
            tracks[1],
            harmonyNote,
            midiTime + index * 100,
            duration * 8,
            Math.floor(velocity * 0.8),
          );
        }
      });
    }
  }

  getRandomBassInterval(bassPattern, section) {
    // Different bass patterns with random variations
    const baseIntervals = [
      4, // Pattern 0: Every quarter note
      8, // Pattern 1: Every half note
      6, // Pattern 2: Syncopated
      12, // Pattern 3: Sparse
    ];

    let interval = baseIntervals[bassPattern] || 8;

    // Add section-based modifications
    switch (section.name) {
      case "intro":
        interval *= 2; // Slower bass
        break;
      case "complexity":
        interval = Math.max(2, interval - 2); // Faster bass
        break;
      case "finale":
        interval += Math.floor(Math.random() * 4); // Random finale bass
        break;
    }

    // Add random variation (±1)
    interval += Math.floor(Math.random() * 3) - 1;

    return Math.max(2, interval); // Minimum interval of 2
  }
  
  getCurrentMIDISectionAt(time) {
    // Map time to our composition structure
    let totalTime = 0;
    for (const section of this.composition_structure) {
      const sectionDuration = section.duration * (60 / this.player.bpm); // Convert measures to seconds
      if (time >= totalTime && time < totalTime + sectionDuration) {
        return section;
      }
      totalTime += sectionDuration;
    }
    // If beyond structure, return finale section
    return this.composition_structure[this.composition_structure.length - 1];
  }
  
  getMIDIScale() {
    const keyIndex = this.noteToMidi[this.ms_key];
    const scaleIntervals = this.MS._scale.steps.map(
      (step) => (keyIndex + step) % 12,
    );
    return scaleIntervals;
  }
  
  getMIDIChord(scaleIndex) {
    const scale = this.getMIDIScale();
    return [
      scale[scaleIndex % scale.length],
      scale[(scaleIndex + 2) % scale.length],
      scale[(scaleIndex + 4) % scale.length],
    ];
  }

  addRandomNotesToMIDITracks(
    tracks,
    section,
    chord,
    stepInMeasure,
    midiTime,
    duration,
    globalStep,
    velocity,
    patternShuffle,
    chordInversions,
    rhythmVariations,
    textureChoices,
  ) {
    const quarterNote = duration * 4;
    const eighthNote = duration * 2;
    const halfNote = duration * 8;

    // Select random patterns for this step
    const patternIndex = Math.floor(globalStep / 16) % 8; // Change pattern every measure
    const currentPattern = patternShuffle[patternIndex];
    const currentInversion = chordInversions[patternIndex];
    const currentRhythm = rhythmVariations[patternIndex];
    const currentTexture = textureChoices[patternIndex];

    // TRACK 2: BASS - Random bass patterns
    if (
      globalStep %
        this.getRandomBassInterval(currentTexture.bassPattern, section) ===
      0
    ) {
      const bassInversion = currentInversion.bass;
      const bassNote = chord.triad.notes[bassInversion];
      let bassMidi =
        this.noteToMidi[bassNote.note] +
        (bassNote.rel_octave + 2 + currentInversion.octaveShift) * 12;

      // Random bass octave variations
      if (Math.random() < 0.3) {
        bassMidi += Math.random() < 0.5 ? -12 : 12;
      }

      const bassDuration = halfNote + (Math.random() - 0.5) * quarterNote; // Vary bass note length
      this.addMIDINote(
        tracks[2],
        bassMidi,
        midiTime,
        bassDuration,
        Math.min(127, velocity + 15),
      );
    }

    // TRACK 0: LEAD - Random arpeggio patterns
    if (Math.random() < currentRhythm.density) {
      // Random note density
      const patternStep = globalStep % currentPattern.length;
      const noteIndex = currentPattern[patternStep];

      if (noteIndex < chord.triad.notes.length) {
        const selectedNote = chord.triad.notes[noteIndex];
        let leadMidi =
          this.noteToMidi[selectedNote.note] +
          (selectedNote.rel_octave +
            this.player.octave_base +
            currentInversion.octaveShift) *
            12;

        // Random octave jumps for interest
        if (Math.random() < 0.15) {
          leadMidi += Math.random() < 0.5 ? -12 : 12;
        }

        // Random note doubling
        if (Math.random() < currentRhythm.doubleChance) {
          this.addMIDINote(tracks[0], leadMidi, midiTime, duration, velocity);
          this.addMIDINote(
            tracks[0],
            leadMidi,
            midiTime + duration,
            duration,
            Math.floor(velocity * 0.8),
          );
        } else if (Math.random() > currentRhythm.skipChance) {
          // Random note skipping
          const noteDuration = duration * (Math.random() * 1.5 + 0.5); // Vary note length
          this.addMIDINote(
            tracks[0],
            leadMidi,
            midiTime,
            noteDuration,
            velocity,
          );
        }
      }
    }

    // TRACK 1: HARMONY - Random harmonic support
    if (section.layers >= 2) {
      if (currentTexture.harmonyStyle === "block") {
        // Random block chords
        if (stepInMeasure % (Math.floor(Math.random() * 4) + 2) === 0) {
          chord.triad.notes.forEach((chordNote, i) => {
            let harmonyMidi =
              this.noteToMidi[chordNote.note] +
              (chordNote.rel_octave +
                this.player.octave_base +
                currentInversion.octaveShift) *
                12;

            // Random chord spread
            if (currentInversion.spread) {
              harmonyMidi += i * (Math.random() < 0.5 ? 12 : 0);
            }

            const stagger = i * (20 + Math.random() * 40); // Random stagger timing
            this.addMIDINote(
              tracks[1],
              harmonyMidi,
              midiTime + stagger,
              quarterNote,
              Math.floor(velocity * 0.7),
            );
          });
        }
      } else {
        // Random broken chords
        if (stepInMeasure % 3 === 0 && Math.random() < 0.6) {
          const randomChordNote =
            chord.triad.notes[
              Math.floor(Math.random() * chord.triad.notes.length)
            ];
          const harmonyMidi =
            this.noteToMidi[randomChordNote.note] +
            (randomChordNote.rel_octave + this.player.octave_base) * 12;
          this.addMIDINote(
            tracks[1],
            harmonyMidi,
            midiTime,
            eighthNote,
            Math.floor(velocity * 0.6),
          );
        }
      }

      // Random octave doubling
      if (currentTexture.octaveDoubling && stepInMeasure % 8 === 0) {
        const rootMidi =
          this.noteToMidi[chord.note] +
          (chord.rel_octave + this.player.octave_base + 1) * 12;
        this.addMIDINote(
          tracks[1],
          rootMidi,
          midiTime,
          quarterNote * 2,
          Math.floor(velocity * 0.5),
        );
      }
    }

    // TRACK 3: TEXTURE - Random atmospheric layers
    if (section.layers >= 3 && currentTexture.textureLayer) {
      if (currentTexture.counterMelody && stepInMeasure % 5 === 0) {
        // Random counter-melody
        const scaleNotes = this.MS.notes;
        const randomScaleNote =
          scaleNotes[Math.floor(Math.random() * scaleNotes.length)];
        let textureMidi =
          this.noteToMidi[randomScaleNote.note] +
          (randomScaleNote.rel_octave + this.player.octave_base + 1) * 12;

        // Random texture note variations
        if (Math.random() < 0.4) {
          textureMidi += Math.random() < 0.5 ? -12 : 12;
        }

        this.addMIDINote(
          tracks[3],
          textureMidi,
          midiTime,
          eighthNote,
          Math.floor(velocity * 0.4),
        );
      }

      // Random atmospheric holds
      if (Math.random() < 0.1 && stepInMeasure === 0) {
        // 10% chance per measure
        const holdNote =
          chord.triad.notes[
            Math.floor(Math.random() * chord.triad.notes.length)
          ];
        const holdMidi =
          this.noteToMidi[holdNote.note] +
          (holdNote.rel_octave + this.player.octave_base + 2) * 12;
        this.addMIDINote(
          tracks[3],
          holdMidi,
          midiTime,
          halfNote * 2,
          Math.floor(velocity * 0.3),
        );
      }
    }

    // Random accent patterns
    if (globalStep % currentRhythm.accentPattern === 0) {
      // Add accented note to lead
      const accentNote = chord.triad.notes[0]; // Root note accent
      const accentMidi =
        this.noteToMidi[accentNote.note] +
        (accentNote.rel_octave + this.player.octave_base) * 12;
      this.addMIDINote(
        tracks[0],
        accentMidi,
        midiTime,
        duration * 1.5,
        Math.min(127, velocity + 20),
      );
    }
  }

  addNotesToMIDITracks(
    tracks,
    section,
    chord,
    rootNote,
    stepInMeasure,
    midiTime,
    duration,
    globalStep,
  ) {
    const quarterNote = duration * 4;
    const eighthNote = duration * 2;
    const halfNote = duration * 8;
    
    // Get velocity from the same function used in real-time
    const velocity = Math.floor(
      this.getDynamicVelocity(section, globalStep) * 127,
    );
    
    // Use actual arpeggio pattern and variations like the live app
    const pattern_variation = this.getPatternVariation(section, globalStep);
    const arpeggio_index =
      (globalStep + pattern_variation) % this.arpeggio.length;
    const arpeggio_note_index = this.arpeggio[arpeggio_index];
    
    // Build notes array like in live app
    let notes = chord.triad.notes;
    const pattern_multiplier = section.layers;
    for (
      let i = 0;
      i < Math.ceil(this.ap_steps / 3) * pattern_multiplier;
      i++
    ) {
      notes = notes.concat(
        notes.map((n) => {
          return { note: n.note, rel_octave: n.rel_octave + (i + 1) };
        }),
      );
    }
    
    // TRACK 2: BASS - Always present when shouldPlayBass returns true
    if (
      this.shouldPlayBass(section) &&
      globalStep % this.getChordChangeInterval(section) === 0
    ) {
      const bassNote =
        this.noteToMidi[chord.note] + (chord.rel_octave + 2) * 12 + 24; // Bass octave
      this.addMIDINote(
        tracks[2],
        bassNote,
        midiTime,
        halfNote,
        Math.min(127, velocity + 20),
      );
    }

    if (this.chord_style === "block_chords" && section.layers > 1) {
      // BLOCK CHORD STYLE - Distribute across 4 tracks
      
      // TRACK 0: Lead block chords (main rhythm)
      if (stepInMeasure % 4 === 0) {
        chord.triad.notes.forEach((chordNote, i) => {
          const midiNote =
            this.noteToMidi[chordNote.note] +
            (chordNote.rel_octave + this.player.octave_base) * 12;
          this.addMIDINote(
            tracks[0],
            midiNote,
            midiTime + i * 20,
            quarterNote,
            velocity,
          );
        });
      }
      
      // TRACK 1: Harmony block chords (offset rhythm for richness)
      if (stepInMeasure % 6 === 0) {
        chord.triad.notes.forEach((chordNote, i) => {
          const harmonyNote =
            this.noteToMidi[chordNote.note] +
            (chordNote.rel_octave + this.player.octave_base) * 12;
          this.addMIDINote(
            tracks[1],
            harmonyNote,
            midiTime + i * 30,
            eighthNote,
            Math.floor(velocity * 0.8),
          );
        });
      }
      
      // TRACK 3: Texture layer (higher octave, more sparse)
      if (stepInMeasure % 8 === 0 && section.layers >= 3) {
        chord.triad.notes.forEach((chordNote, i) => {
          const textureNote =
            this.noteToMidi[chordNote.note] +
            (chordNote.rel_octave + this.player.octave_base + 1) * 12;
          this.addMIDINote(
            tracks[3],
            textureNote,
            midiTime + i * 40,
            eighthNote,
            Math.floor(velocity * 0.6),
          );
        });
      }
    } else {
      // ARPEGGIATED STYLE - Use your actual arpeggio patterns
      
      // TRACK 0: Lead arpeggio (main pattern)
      if (arpeggio_note_index < notes.length) {
        const selectedNote = notes[arpeggio_note_index];
        const leadNote =
          this.noteToMidi[selectedNote.note] +
          (selectedNote.rel_octave + this.player.octave_base) * 12;
        this.addMIDINote(tracks[0], leadNote, midiTime, duration * 2, velocity);
      }
      
      // TRACK 1: Harmony chords (support the arpeggio)
      if (section.layers >= 2 && stepInMeasure % 4 === 0) {
        chord.triad.notes.forEach((chordNote, i) => {
          const harmonyNote =
            this.noteToMidi[chordNote.note] +
            (chordNote.rel_octave + this.player.octave_base) * 12;
          this.addMIDINote(
            tracks[1],
            harmonyNote,
            midiTime + i * 40,
            quarterNote,
            Math.floor(velocity * 0.75),
          );
        });
      }
      
      // TRACK 3: Texture layer (counter-melodies and fills)
      if (section.layers >= 3 && stepInMeasure % 6 === 0) {
        // Use a different note from the arpeggio for counterpoint
        const textureIndex = (arpeggio_note_index + 2) % notes.length;
        if (textureIndex < notes.length) {
          const textureNote = notes[textureIndex];
          const textureMidi =
            this.noteToMidi[textureNote.note] +
            (textureNote.rel_octave + this.player.octave_base + 1) * 12;
          this.addMIDINote(
            tracks[3],
            textureMidi,
            midiTime,
            eighthNote,
            Math.floor(velocity * 0.65),
          );
        }
      }
      
      // Additional texture for complexity sections
      if (section.name === "complexity" && stepInMeasure % 3 === 0) {
        const complexityIndex = (arpeggio_note_index + 1) % notes.length;
        if (complexityIndex < notes.length) {
          const complexityNote = notes[complexityIndex];
          const complexityMidi =
            this.noteToMidi[complexityNote.note] +
            (complexityNote.rel_octave + this.player.octave_base + 1) * 12;
          this.addMIDINote(
            tracks[3],
            complexityMidi,
            midiTime + duration * 0.5,
            duration,
            Math.floor(velocity * 0.55),
          );
        }
      }
    }
    
    // TRACK 1: Additional harmonic support for all styles during peak sections
    if (section.name === "complexity" && stepInMeasure % 12 === 0) {
      const rootMidi =
        this.noteToMidi[chord.note] +
        (chord.rel_octave + this.player.octave_base - 1) * 12;
      this.addMIDINote(
        tracks[1],
        rootMidi,
        midiTime,
        quarterNote * 3,
        Math.floor(velocity * 0.7),
      );
    }
  }
  
  addMIDINote(track, pitch, startTime, duration, velocity) {
    track.push({
      type: "noteOn",
      time: startTime,
      pitch: Math.max(0, Math.min(127, pitch)),
      velocity: velocity,
    });
    track.push({
      type: "noteOff",
      time: startTime + duration,
      pitch: Math.max(0, Math.min(127, pitch)),
      velocity: 0,
    });
  }
  
  createMIDIFile(tracks, ticksPerQuarter) {
    // Simple MIDI file creation
    const trackData = tracks.map((track) => this.createMIDITrack(track));
    
    // MIDI header
    const header = new Uint8Array([
      0x4d,
      0x54,
      0x68,
      0x64, // "MThd"
      0x00,
      0x00,
      0x00,
      0x06, // Header length
      0x00,
      0x01, // Format 1
      0x00,
      tracks.length, // Number of tracks
      (ticksPerQuarter >> 8) & 0xff,
      ticksPerQuarter & 0xff, // Ticks per quarter
    ]);
    
    // Combine header and tracks
    let totalLength = header.length;
    trackData.forEach((track) => (totalLength += track.length));
    
    const midiFile = new Uint8Array(totalLength);
    let offset = 0;
    
    midiFile.set(header, offset);
    offset += header.length;
    
    trackData.forEach((track) => {
      midiFile.set(track, offset);
      offset += track.length;
    });
    
    return midiFile;
  }
  
  createMIDITrack(events) {
    // Sort events by time
    events.sort((a, b) => a.time - b.time);
    
    const trackEvents = [];
    let lastTime = 0;
    
    // Add tempo event at the beginning
    trackEvents.push(0x00); // Delta time
    trackEvents.push(0xff, 0x51, 0x03); // Tempo meta event
    const microsecondsPerQuarter = Math.floor(60000000 / this.player.bpm);
    trackEvents.push(
      (microsecondsPerQuarter >> 16) & 0xff,
      (microsecondsPerQuarter >> 8) & 0xff,
      microsecondsPerQuarter & 0xff,
    );

    events.forEach((event) => {
      const deltaTime = event.time - lastTime;
      lastTime = event.time;
      
      // Add variable-length delta time
      this.writeVariableLength(trackEvents, Math.max(0, Math.floor(deltaTime)));
      
      if (event.type === "noteOn") {
        trackEvents.push(0x90, event.pitch, event.velocity); // Note on, channel 0
      } else if (event.type === "noteOff") {
        trackEvents.push(0x80, event.pitch, event.velocity); // Note off, channel 0
      }
    });
    
    // End of track
    trackEvents.push(0x00, 0xff, 0x2f, 0x00);
    
    // Create track chunk
    const trackChunk = new Uint8Array(8 + trackEvents.length);
    trackChunk.set([0x4d, 0x54, 0x72, 0x6b], 0); // "MTrk"
    
    const length = trackEvents.length;
    trackChunk.set(
      [
        (length >> 24) & 0xff,
        (length >> 16) & 0xff,
        (length >> 8) & 0xff,
        length & 0xff,
      ],
      4,
    );
    
    trackChunk.set(trackEvents, 8);
    
    return trackChunk;
  }
  
  writeVariableLength(buffer, value) {
    const bytes = [];
    bytes.push(value & 0x7f);
    value >>= 7;
    
    while (value > 0) {
      bytes.push((value & 0x7f) | 0x80);
      value >>= 7;
    }
    
    // Reverse and add to buffer
    for (let i = bytes.length - 1; i >= 0; i--) {
      buffer.push(bytes[i]);
    }
  }
  
  downloadMIDI(midiData, exportType = "app_state") {
    const blob = new Blob([midiData], { type: "audio/midi" });
    const url = URL.createObjectURL(blob);
    
    // Create descriptive filename with all current settings
    const chordStyleShort =
      this.chord_style === "block_chords" ? "block" : "arp";
    const progressionShort = this.current_progression
      .replace("sequence_", "seq")
      .replace("_", "");
    const songStructureShort = this.current_song_preset
      .replace("_", "")
      .substring(0, 6);
    const patternId = this.ap_pattern_id.toString().padStart(2, "0");
    const patternType = this.ap_pattern_type === "straight" ? "str" : "loop";

    let filename;
    if (exportType === "app_state") {
      // Detailed filename for app state export
      filename = `appstate_${this.ms_key}_${this.ms_mode}_${this.player.bpm}bpm_${chordStyleShort}_${progressionShort}_${songStructureShort}_${this.ap_steps}steps_${patternType}${patternId}.mid`;
    } else if (exportType === "hunt_for_a_ghost") {
      // Hunt for a Ghost composition - what you're actually hearing
      filename = `HuntForAGhost_${this.ms_key}_${this.ms_mode}_${this.player.bpm}bpm_${chordStyleShort}_${progressionShort}_${songStructureShort}_${this.ap_steps}steps_${patternType}${patternId}.mid`;
    } else if (exportType === "claude_song") {
      // Pure algorithmic composition - unique each time
      const timestamp = new Date()
        .toISOString()
        .slice(0, 19)
        .replace(/[:-]/g, "");
      filename = `ClaudeSong_AlgorithmicComposition_${timestamp}.mid`;
    } else {
      // Algorithmic composition filename - time-based seed for uniqueness
      const timestamp = new Date()
        .toISOString()
        .slice(0, 19)
        .replace(/[:-]/g, "");
      filename = `AlgorithmicComposition_${timestamp}.mid`;
    }

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    URL.revokeObjectURL(url);
  }
  
  updateProgression(e) {
    this._utilClassToggle(e.target, "progression-current");
    this.current_progression = e.target.getAttribute("data-value");
    this.chords = this.progressions[this.current_progression];
    this.chord_count = this.chords.length;
    this._updateOutput();
    this._loadChordSelector();
  }
  
  getCurrentSection() {
    return this.composition_structure[this.current_section];
  }
  
  getPatternVariation(section, step) {
    // Add subtle pattern variations based on minimalist techniques
    switch (section.name) {
      case "intro":
        return 0; // Clean, simple
      case "building":
        return Math.floor(step / 8) % 2; // Slight shift every 2 measures
      case "complexity":
        return Math.floor(step / 4) % 3; // More frequent variations
      case "reduction":
        return Math.floor(step / 16) % 2; // Slow variations
      case "finale":
        return step % 4 === 0 ? 1 : 0; // Accent pattern
      default:
        return 0;
    }
  }
  
  shouldPlayBass(section) {
    // Determine when to play bass based on section
    switch (section.name) {
      case "intro":
        return this.player.step % 8 === 0; // Sparse bass
      case "building":
        return this.player.step % 4 === 0; // Regular bass
      case "complexity":
        return this.player.step % 2 === 0; // More frequent bass
      case "reduction":
        return this.player.step % 6 === 0; // Irregular bass
      case "finale":
        return this.player.step % 8 === 0; // Return to sparse
      default:
        return this.player.step % 4 === 0;
    }
  }
  
  getChordChangeInterval(section) {
    // Vary chord change timing based on section
    switch (section.name) {
      case "intro":
        return this.arpeggio.length * 4; // Longer chords
      case "building":
        return this.arpeggio.length * 2; // Standard timing
      case "complexity":
        return this.arpeggio.length; // Faster changes
      case "reduction":
        return this.arpeggio.length * 3; // Slower changes
      case "finale":
        return this.arpeggio.length * 4; // Longer again
      default:
        return this.arpeggio.length * this.player.arp_repeat;
    }
  }
  
  getDynamicVelocity(section, step) {
    // Create dynamic expression based on section and position
    const base_velocity = 0.7;
    const section_modifier =
      {
        intro: 0.5,
        building: 0.7,
        complexity: 0.9,
        reduction: 0.6,
        finale: 0.8,
    }[section.name] || 0.7;
    
    // Add subtle phrase-based dynamics
    const phrase_position = (step % 32) / 32; // 8-measure phrases
    const phrase_curve = Math.sin(phrase_position * Math.PI) * 0.2;
    
    return Math.min(1.0, Math.max(0.1, section_modifier + phrase_curve));
  }

  _createBestHitsControls(parentContainer) {
    // Define available songs
    this.bestHitsSongs = [
      { file: "BestHits/Phinite.mp3", title: "Phinite", artist: "Musitron" },
      { file: "BestHits/Metrognome.mp3", title: "Metrognome", artist: "Musitron" },
      { file: "BestHits/Aeolian.mp3", title: "Aeolian", artist: "Musitron" }
    ];

    // Create HTML5 audio element
    this.mp3Player = document.createElement("audio");
    this.mp3Player.preload = "none";
    this.currentSongIndex = -1;

    // Create Best Hits button container with dropdown
    this.bestHits_container = document.createElement("div");
    this.bestHits_container.classList.add("control-item-split");

    // Main Best Hits button
    this.bestHits_button = document.createElement("div");
    this.bestHits_button.innerHTML = 'Best Hits';
    this.bestHits_button.classList.add("control-item-split-main");
    this.bestHits_button.addEventListener("click", () => {
      this.toggleBestHitsPlayback();
    });

    // Dropdown button
    this.bestHits_dropdown_button = document.createElement("div");
    this.bestHits_dropdown_button.innerHTML = "▼";
    this.bestHits_dropdown_button.classList.add("control-item-split-dropdown");
    this.bestHits_dropdown_button.addEventListener("click", () => {
      this.toggleBestHitsDropdown();
    });

    // Create dropdown menu with improved visibility and positioning
    this.bestHits_dropdown_menu = document.createElement("div");
    this.bestHits_dropdown_menu.classList.add("best-hits-dropdown-menu");
    this.bestHits_dropdown_menu.style.position = "absolute";
    this.bestHits_dropdown_menu.style.top = "100%";
    this.bestHits_dropdown_menu.style.left = "0";
    this.bestHits_dropdown_menu.style.width = "100%";
    this.bestHits_dropdown_menu.style.display = "none";
    this.bestHits_dropdown_menu.style.zIndex = "99999";
    this.bestHits_dropdown_menu.style.marginTop = "2px";
    this.bestHits_dropdown_menu.style.background = "#1e8449";
    this.bestHits_dropdown_menu.style.border = "2px solid #16703e";
    this.bestHits_dropdown_menu.style.borderRadius = "4px";
    this.bestHits_dropdown_menu.style.boxShadow = "0px 8px 16px rgba(0, 0, 0, 0.4)";

    // Add song options to dropdown with forced visibility
    this.bestHitsSongs.forEach((song, index) => {
      const option = document.createElement("div");
      option.classList.add("best-hits-dropdown-option");
      
      // Force text visibility with inline styles
      option.style.cssText = `
        color: #ffffff !important;
        font-weight: bold !important;
        background: #1e8449 !important;
        padding: 0.75rem 1rem !important;
        display: flex !important;
        align-items: center !important;
        justify-content: space-between !important;
        border-bottom: 1px solid #16703e !important;
        cursor: pointer !important;
      `;
      
      const titleSpan = document.createElement("span");
      titleSpan.textContent = song.title;
      titleSpan.style.cssText = "color: #ffffff !important; font-weight: bold !important;";
      
      const statusSpan = document.createElement("span");
      statusSpan.classList.add("play-status");
      statusSpan.style.cssText = "color: #f39c12 !important; font-size: 0.8rem !important;";
      
      option.appendChild(titleSpan);
      option.appendChild(statusSpan);
      
      option.addEventListener("click", () => {
        this.selectBestHitsSong(index);
        this.bestHits_dropdown_menu.style.display = "none";
        this.bestHits_dropdown_button.innerHTML = "▼";
      });
      
      option.addEventListener("mouseenter", () => {
        option.style.background = "#16703e !important";
      });
      
      option.addEventListener("mouseleave", () => {
        option.style.background = "#1e8449 !important";
      });
      
      this.bestHits_dropdown_menu.appendChild(option);
    });

    // Assemble the container and add to parent
    this.bestHits_container.appendChild(this.bestHits_button);
    this.bestHits_container.appendChild(this.bestHits_dropdown_button);
    this.bestHits_container.appendChild(this.bestHits_dropdown_menu);
    parentContainer.appendChild(this.bestHits_container);

    // Create native HTML5 audio player BEFORE appending it
    this.audioPlayerContainer = document.createElement("div");
    this.audioPlayerContainer.classList.add("native-audio-player");
    this.audioPlayerContainer.style.display = "none";
    this.audioPlayerContainer.style.padding = "0.5rem";
    this.audioPlayerContainer.style.background = "#f0f0f0";
    this.audioPlayerContainer.style.borderRadius = "4px";
    this.audioPlayerContainer.style.margin = "0.5rem 0 0 0";
    this.audioPlayerContainer.style.width = "100%";
    
    // Song title display
    this.songTitleDisplay = document.createElement("div");
    this.songTitleDisplay.style.cssText = `
      font-size: 0.9rem;
      font-weight: bold;
      color: #333;
      margin-bottom: 0.5rem;
      text-align: center;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    `;
    this.songTitleDisplay.textContent = "Select a song";
    
    // Configure the existing mp3Player to show native controls
    this.mp3Player.controls = true;
    this.mp3Player.style.cssText = `
      width: 100%;
      height: 40px;
      outline: none;
    `;
    
    this.audioPlayerContainer.appendChild(this.songTitleDisplay);
    this.audioPlayerContainer.appendChild(this.mp3Player);
    
    // NOW append the fully created audio player container
    parentContainer.appendChild(this.audioPlayerContainer);

    // Audio event listeners for native player
    this.mp3Player.addEventListener("loadstart", () => {
      this.updateNativePlayer("Loading...");
    });

    this.mp3Player.addEventListener("canplay", () => {
      this.updateNativePlayer();
    });

    this.mp3Player.addEventListener("play", () => {
      this.audioPlayerContainer.style.display = "block";
      this.bestHits_button.classList.add("active");
      this.updateDropdownPlayStatus();
      
      // Pause the Tone.js generator if it's playing
      if (this.player.playing) {
        this.pause();
      }
    });

    this.mp3Player.addEventListener("pause", () => {
      this.bestHits_button.classList.remove("active");
      this.updateDropdownPlayStatus();
    });

    this.mp3Player.addEventListener("ended", () => {
      this.stopBestHits();
    });

    this.mp3Player.addEventListener("error", (e) => {
      console.error("Audio playback error:", e);
      this.updateNativePlayer("Error loading audio");
      this.stopBestHits();
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", (e) => {
      if (!this.bestHits_container.contains(e.target)) {
        this.bestHits_dropdown_menu.style.display = "none";
        this.bestHits_dropdown_button.innerHTML = "▼";
      }
    });
  }

  updateNativePlayer(message = null) {
    if (message) {
      this.songTitleDisplay.textContent = message;
      return;
    }

    if (this.currentSongIndex >= 0) {
      const song = this.bestHitsSongs[this.currentSongIndex];
      this.songTitleDisplay.textContent = `${song.title} - ${song.artist}`;
    }
  }

  selectBestHitsSong(index) {
    this.currentSongIndex = index;
    const song = this.bestHitsSongs[index];
    
    // Stop current playback
    if (!this.mp3Player.paused) {
      this.mp3Player.pause();
    }
    
    // Load new song
    this.mp3Player.src = song.file;
    this.updateNativePlayer(`Loading ${song.title}...`);
    
    // Start playback
    this.mp3Player.play().catch(error => {
      console.error("Playback failed:", error);
      this.updateNativePlayer("Playback failed - check if file exists");
    });
  }

  toggleBestHitsDropdown() {
    const isVisible = this.bestHits_dropdown_menu.style.display === "block";
    this.bestHits_dropdown_menu.style.display = isVisible ? "none" : "block";
    this.bestHits_dropdown_button.innerHTML = isVisible ? "▼" : "▲";
  }

  toggleBestHitsPlayback() {
    // Hide Hunt for a Ghost display when using controls
    this._hideHuntForGhostDisplay();
    
    if (this.currentSongIndex === -1) {
      // No song selected, play first one
      this.selectBestHitsSong(0);
    } else {
      // Toggle current song
      if (this.mp3Player.paused) {
        this.mp3Player.play().catch(error => {
          console.error("Playback failed:", error);
          this.updateNativePlayer("Playback failed");
        });
      } else {
        this.mp3Player.pause();
      }
    }
  }

  updateDropdownPlayStatus() {
    const options = this.bestHits_dropdown_menu.querySelectorAll(".best-hits-dropdown-option");
    options.forEach((option, index) => {
      const statusEl = option.querySelector(".play-status");
      if (index === this.currentSongIndex && !this.mp3Player.paused) {
        option.classList.add("playing");
        option.style.background = "#16a085 !important";
        if (statusEl) statusEl.textContent = "▶";
      } else {
        option.classList.remove("playing");
        option.style.background = "#1e8449 !important";
        if (statusEl) statusEl.textContent = "";
      }
    });
  }

  formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }

  stopBestHits() {
    this.mp3Player.pause();
    this.mp3Player.currentTime = 0;
    this.audioPlayerContainer.style.display = "none";
    this.bestHits_button.classList.remove("active");
    this.updateDropdownPlayStatus();
    this.songTitleDisplay.textContent = "Select a song";
  }

}

// Make app globally accessible for Best Hits controls
window.app = new ArpPlayer();
