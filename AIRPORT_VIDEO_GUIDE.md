# Airport Terminal Video Generator

Generate professional multilingual videos for social media reels using the airport terminal image.

## Quick Start

### 1. Save Your Image

Save the airport terminal image as:
```
airport_terminal.jpg
```

Place it in the root directory of the project.

### 2. Install Dependencies

The project already has the required dependencies listed in `requirements.txt`:

```bash
pip install -r requirements.txt
```

You also need FFmpeg installed:

```bash
# Ubuntu/Debian
sudo apt-get install ffmpeg

# macOS
brew install ffmpeg

# Windows
choco install ffmpeg
```

### 3. Generate Videos

Run the video generator:

```bash
python generate_airport_terminal_video.py
```

This will:
- Generate voiceover narrations in 3 languages (English, Italian, Sinhala)
- Create video files by combining the image with audio
- Export MP4 files suitable for social media

### 4. Output Files

Videos will be saved in the `generated_videos/` directory:

```
generated_videos/
├── airport_terminal_en.mp4  (English)
├── airport_terminal_it.mp4  (Italian)
└── airport_terminal_si.mp4  (Sinhala)
```

## Upload to Social Media

### Facebook Reels
- Format: MP4
- Aspect Ratio: 9:16 (vertical)
- Duration: 3-90 seconds
- File Size: Up to 4GB
- Direct upload from `generated_videos/` folder

### Instagram Reels
- Format: MP4
- Aspect Ratio: 9:16 (vertical)
- Duration: 3-90 seconds
- Bitrate: 192 kbps (configured in generator)

### TikTok
- Format: MP4
- Aspect Ratio: 9:16 (vertical)
- Duration: 3-10 minutes
- Max File Size: 287.6 MB

### YouTube Shorts
- Format: MP4
- Aspect Ratio: 9:16 (vertical)
- Duration: 15-60 seconds

## Customization

### Change Image

Modify `generate_airport_terminal_video.py`:

```python
generator = AirportTerminalVideoGenerator(image_path="your_image.jpg")
```

### Change Voice Style

```python
generator = AirportTerminalVideoGenerator(voice_preset="professional")
```

Available presets:
- `default` - Standard voice
- `warm` - Friendly, conversational
- `professional` - Formal, corporate
- `energetic` - Upbeat, excited

### Change Narration Text

Edit the `narrations` dictionary in the `generate_narrations()` method to customize text for each language.

### Change Video Duration

The script auto-adjusts video duration to match audio length. To limit video to a specific duration, modify:

```python
# In create_video_from_image()
"-t", "6",  # Limit to 6 seconds (add this before output_path)
```

## Troubleshooting

### "FFmpeg not found"
Install FFmpeg (see Installation section above)

### "OmniVoice not installed"
Make sure you ran:
```bash
pip install -r requirements.txt
```

### Video has no sound
Check that audio files were generated in `generated_narratives/` directory

### Image not found error
1. Ensure `airport_terminal.jpg` is in the project root
2. Check file name matches exactly (case-sensitive on Linux/Mac)
3. Use full path if storing elsewhere:
   ```python
   generator = AirportTerminalVideoGenerator(image_path="/path/to/image.jpg")
   ```

## Project Files

- `generate_airport_terminal_video.py` - Main video generator script
- `narrative_generator.py` - Audio generation using OmniVoice
- `requirements.txt` - Python dependencies
- `airport_terminal.jpg` - Input image (you need to add this)

## Languages Supported

1. **English** - For international audience
2. **Italian** - For Italian employers and audience
3. **Sinhala** - For local Sri Lankan audience

Each video includes full narration about opportunities for migrant workers at the airport.

## Output Quality

Generated videos use:
- **Video Codec**: H.264 (libx264)
- **Audio Codec**: AAC
- **Audio Bitrate**: 192 kbps
- **Pixel Format**: YUV420p (universal compatibility)
- **Resolution**: Same as source image

Perfect for sharing on all major social media platforms.
