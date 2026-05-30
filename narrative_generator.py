#!/usr/bin/env python3
"""
OmniVoice Narrative Generator for Reels
Generates multilingual audio narratives (English, Italian, Sinhala) for video reels.
"""

from typing import Optional, Dict
import json
import os


class NarrativeGenerator:
    """Generate audio narratives using OmniVoice for multiple languages."""

    SUPPORTED_LANGUAGES = {
        "en": {"code": "eng", "name": "English"},
        "it": {"code": "ita", "name": "Italian"},
        "si": {"code": "sin", "name": "Sinhala"},
    }

    def __init__(self, voice_preset: str = "default"):
        """
        Initialize the narrative generator.

        Args:
            voice_preset: Voice preset for narration (default, warm, professional, etc.)
        """
        try:
            from omnivoice import OmniVoice
            self.omni = OmniVoice()
        except ImportError:
            print(
                "OmniVoice not installed. Install with: pip install omnivoice"
            )
            self.omni = None

        self.voice_preset = voice_preset
        self.output_dir = "generated_narratives"
        os.makedirs(self.output_dir, exist_ok=True)

    def generate_narrative(
        self,
        text: str,
        language: str = "en",
        output_path: Optional[str] = None,
        speaker_name: str = "narrator",
    ) -> Optional[str]:
        """
        Generate audio narrative in specified language.

        Args:
            text: Narrative text to convert to speech
            language: Language code (en, it, si)
            output_path: Path to save audio file. Auto-generated if None
            speaker_name: Name for the output file

        Returns:
            Path to generated audio file, or None if generation failed
        """
        if language not in self.SUPPORTED_LANGUAGES:
            raise ValueError(
                f"Language '{language}' not supported. "
                f"Supported: {list(self.SUPPORTED_LANGUAGES.keys())}"
            )

        if not self.omni:
            print("OmniVoice not available")
            return None

        lang_info = self.SUPPORTED_LANGUAGES[language]

        if output_path is None:
            output_path = os.path.join(
                self.output_dir,
                f"{speaker_name}_{language}_{lang_info['name'].lower()}.wav"
            )

        try:
            # Generate speech using OmniVoice
            audio = self.omni.tts(
                text=text,
                language=lang_info["code"],
                voice_preset=self.voice_preset,
            )

            # Save audio file
            audio.save(output_path)
            print(f"✓ Generated: {lang_info['name']} - {output_path}")
            return output_path

        except Exception as e:
            print(f"✗ Error generating {lang_info['name']} narrative: {e}")
            return None

    def generate_multilingual_narratives(
        self,
        text_map: Dict[str, str],
        output_prefix: str = "reel",
    ) -> Dict[str, Optional[str]]:
        """
        Generate narratives in multiple languages at once.

        Args:
            text_map: Dictionary mapping language codes to narrative text
            output_prefix: Prefix for output files

        Returns:
            Dictionary mapping language codes to file paths
        """
        results = {}
        for lang, text in text_map.items():
            output_path = os.path.join(
                self.output_dir,
                f"{output_prefix}_{lang}.wav"
            )
            results[lang] = self.generate_narrative(
                text=text,
                language=lang,
                output_path=output_path,
                speaker_name=output_prefix,
            )
        return results

    def list_supported_languages(self) -> Dict[str, str]:
        """Return list of supported languages with their codes."""
        return {
            code: info["name"]
            for code, info in self.SUPPORTED_LANGUAGES.items()
        }


def main():
    """Example usage of the narrative generator."""
    generator = NarrativeGenerator(voice_preset="professional")

    # Example narratives for a reel
    example_narratives = {
        "en": "Discover amazing job opportunities in Sri Lanka. "
              "Browse thousands of positions across all industries.",
        "it": "Scopri straordinarie opportunità di lavoro nello Sri Lanka. "
              "Sfoglia migliaia di posizioni in tutti i settori.",
        "si": "ශ්‍රී ලංකාවේ ඔබ සඳහා අద්භූත සේවා අවස්ථා සොයා ගන්න. "
              "සියලුම කර්මාන්තවල ස්ථාන සිතිමු.",
    }

    print("🎬 Generating multilingual reels narratives...")
    print(f"Supported languages: {generator.list_supported_languages()}\n")

    results = generator.generate_multilingual_narratives(
        text_map=example_narratives,
        output_prefix="jobs_reel_001",
    )

    print("\nGenerated files:")
    for lang, path in results.items():
        status = "✓" if path else "✗"
        lang_name = generator.SUPPORTED_LANGUAGES[lang]["name"]
        print(f"{status} {lang_name}: {path}")


if __name__ == "__main__":
    main()
