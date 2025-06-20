# Best Hits MP3 Player

This directory contains MP3 files for the "Best Hits" feature in Musitron.

## How to Add Your Songs

1. Upload your MP3 files to this `songs/` directory with these exact filenames:
   - `Claude3.mp3` - Claude3 composition
   - `Claude4.mp3` - Claude4 composition
   - `Claude5.mp3` - Claude5 composition
   - `Project1.mp3` - Project1 studio mix
   - `Project2.mp3` - Project2 studio mix

2. The files should be standard MP3 format, ideally:
   - Sample rate: 44.1kHz or 48kHz
   - Bit rate: 128kbps or higher
   - Format: MP3 (.mp3 extension)

## Features

- **Dropdown Selection**: Click the dropdown arrow next to "Best Hits" to select any song
- **Auto-Pause**: When you start an MP3, the live generator automatically pauses
- **When you start the generator, any playing MP3 automatically pauses**
- **Time Display**: Shows current time and total duration while playing
- **Visual Feedback**: Currently playing song is highlighted in green

## Technical Notes

- Uses HTML5 audio player for MP3 playback
- Integrates seamlessly with the existing Tone.js generator
- Green glow animation matches the Musitron design aesthetic
- Responsive controls work on both desktop and mobile

## File Structure Expected

```
songs/
├── Claude3.mp3      # Required
├── Claude4.mp3      # Required
├── Claude5.mp3      # Required
├── Project1.mp3     # Required
├── Project2.mp3     # Required
└── README.md        # This file
```

## Adding More Songs

To add additional songs beyond the initial 4, edit the `bestHitsSongs` array in `MusicalScale.js`:

```javascript
this.bestHitsSongs = [
  { file: "songs/Claude3.mp3", title: "Claude3", artist: "Musitron AI" },
  { file: "songs/Claude4.mp3", title: "Claude4", artist: "Musitron AI" },
  { file: "songs/Project1.mp3", title: "Project1", artist: "Studio Mix" },
  { file: "songs/Project2.mp3", title: "Project2", artist: "Studio Mix" },
  // Add new songs here:
  { file: "songs/NewSong.mp3", title: "New Song Title", artist: "Artist Name" }
];
``` 