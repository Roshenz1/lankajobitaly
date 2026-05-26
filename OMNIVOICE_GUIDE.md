# OmniVoice Narrative Generator for Reels

Use OmniVoice to generate professional multilingual audio narratives for your video reels in **English, Italian, and Sinhala**.

## Setup

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Install OmniVoice

```bash
pip install omnivoice
```

Or from source:
```bash
git clone https://github.com/k2-fsa/OmniVoice.git
cd OmniVoice
pip install .
```

## Quick Start

### Generate Single Language Narrative

```python
from narrative_generator import NarrativeGenerator

generator = NarrativeGenerator(voice_preset="professional")

audio_path = generator.generate_narrative(
    text="Discover amazing job opportunities in Sri Lanka.",
    language="en"  # English
)
```

### Generate Multilingual Narratives

```python
narratives = {
    "en": "Discover amazing job opportunities in Sri Lanka.",
    "it": "Scopri straordinarie opportunità di lavoro nello Sri Lanka.",
    "si": "ශ්‍රී ලංකාවේ ඔබ සඳහා අද්භූත සේවා අවස්ථා සොයා ගන්න."
}

results = generator.generate_multilingual_narratives(
    text_map=narratives,
    output_prefix="my_reel_001"
)

# Output: {
#   "en": "generated_narratives/my_reel_001_en.wav",
#   "it": "generated_narratives/my_reel_001_it.wav",
#   "si": "generated_narratives/my_reel_001_si.wav"
# }
```

### Command Line Usage

```bash
python narrative_generator.py
```

This runs an example that generates a jobs reel narrative in all three languages.

## Configuration

Edit `omnivoice_config.json` to customize:

- **Voice Preset**: `default`, `warm`, `professional`, `friendly`, `energetic`
- **Output Directory**: Where generated audio files are saved
- **Audio Format**: WAV (default) or other supported formats
- **Sample Rate**: Default 22050 Hz

## Supported Languages

| Code | Language | Use Case |
|------|----------|----------|
| `en` | English | International audience |
| `it` | Italian | Italian-speaking audience |
| `si` | Sinhala | Local Sri Lankan audience |

## Features

✅ **Zero-shot TTS** - No training data needed  
✅ **600+ Languages** - Worldwide coverage  
✅ **Voice Cloning** - Optional voice reference (3-10 sec audio)  
✅ **Real-time Speed** - 40x faster than real-time (0.025 RTF)  
✅ **Fine Control** - Pronunciation, expressions, accents

## Example Workflow

```python
from narrative_generator import NarrativeGenerator

# 1. Create generator with your preferred voice
gen = NarrativeGenerator(voice_preset="warm")

# 2. Write narratives for your reel
narratives = {
    "en": "Join Lanka's largest job platform today!",
    "it": "Unisciti alla più grande piattaforma di lavoro di Lanka!",
    "si": "අද සිටින ලංකාවේ විශාලතම සේවා වේදිකාවට සම්බන්ධ වන්න!"
}

# 3. Generate audio files
results = gen.generate_multilingual_narratives(
    text_map=narratives,
    output_prefix="jobs_reel_campaign_2024"
)

# 4. Use files in your video editor
# All audio files ready in generated_narratives/
```

## Troubleshooting

**OmniVoice not installed?**
```bash
pip install omnivoice torch torchaudio
```

**GPU acceleration (optional):**
```bash
# For CUDA support
pip install torch --index-url https://download.pytorch.org/whl/cu118
```

**Audio quality issues?**
- Adjust voice preset in `NarrativeGenerator(voice_preset="professional")`
- Ensure text pronunciation is clear

## Output

Generated audio files are saved to `generated_narratives/` with naming:
```
{output_prefix}_{language_code}.wav
```

Example:
```
my_reel_001_en.wav
my_reel_001_it.wav
my_reel_001_si.wav
```

## Next Steps

- Use the generated `.wav` files directly in your video editing software
- Create separate videos for each language
- Add captions matching the narration
- Optimize audio levels for your platform (Instagram, TikTok, YouTube)

---

**Reference:** [OmniVoice GitHub](https://github.com/k2-fsa/OmniVoice)
