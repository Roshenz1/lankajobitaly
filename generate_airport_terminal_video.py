#!/usr/bin/env python3
"""
Airport Terminal Video Generator
Creates multilingual reels from airport terminal image with voiceover narration.
Exports as MP4 for Facebook Reels, Instagram Stories, and TikTok.
"""

from narrative_generator import NarrativeGenerator
import subprocess
import os
from typing import Optional, Dict
import json


class AirportTerminalVideoGenerator:
    """Generate airport terminal videos with multilingual narration."""

    def __init__(self, image_path: str = "airport_terminal.jpg", voice_preset: str = "warm"):
        """
        Initialize the video generator.

        Args:
            image_path: Path to the airport terminal image
            voice_preset: Voice preset for narration (warm, professional, etc.)
        """
        self.image_path = image_path
        self.voice_preset = voice_preset
        self.generator = NarrativeGenerator(voice_preset=voice_preset)
        self.output_dir = "generated_videos"
        self.audio_dir = "generated_narratives"
        os.makedirs(self.output_dir, exist_ok=True)
        os.makedirs(self.audio_dir, exist_ok=True)

    def generate_narrations(self) -> Dict[str, Optional[str]]:
        """Generate narrations in all supported languages."""

        narrations = {
            "en": """Welcome to Colombo International Airport. This is the busy departure terminal
where thousands of Sri Lankan workers embark on their journeys to opportunities abroad.
The forecourt is bustling with activity - families saying goodbye, porters managing luggage,
and travelers preparing for new adventures. Whether it's Italy, the Middle East, or beyond,
this airport is a gateway to better employment and brighter futures for many.
Today, we celebrate the courage and determination of our migrant workers.""",

            "it": """Benvenuti all'Aeroporto Internazionale di Colombo. Questo è il terminal delle partenze
dove migliaia di lavoratori dello Sri Lanka intraprendono i loro viaggi verso opportunità all'estero.
Il piazzale è pieno di attività - famiglie che si salutano, facchini che gestiscono i bagagli,
e viaggiatori che si preparano per nuove avventure. Che sia l'Italia, il Medio Oriente o oltre,
questo aeroporto è un gateway per l'occupazione migliore e un futuro più luminoso per molti.
Oggi celebriamo il coraggio e la determinazione dei nostri lavoratori migranti.""",

            "si": """කොළඹ ජාත්‍යන්තර ගුවන්තොටුපළට සාදරයෙන් පිළිගනිමු. මෙය ඔබ්බට යෑමේ ටර්මිනල්
එතැනින් ශ්‍රී ලංකාවේ දහස් දහසක් කම්කරුවරු විදේශ රැකියා අවස්ථා සොයා ගිහින් ගමන් කරන බව.
පුරාවිඩු නගරය - පවුල් සබඳු වී සිටින අවස්ථාව, ගිණි තිරකර සරණ ගිණී,
සහ ගමනාම ගිණු නව ඇවිදුම් සඳහා සූදානම් වෙමින් සිටින ගමනාගමකරුවරු.
ඉතාලිය, මැදපෙරදිග හෝ එයින් පිටතට, මෙම ගුවන්තොටුපළ හොඳ සේවා සහ බොහෝ දෙනා සඳහා
ඉතා සැහැල්ලු ඉන්දි ගේට්ටුවයි. අද අපි ගිණු දේශ කර්ම කරුවරුගේ සාහසය සහ
දෘඪ අදහස සඳහා සිදුවීම සිදුවේ."""
        }

        print("🎙️ Generating multilingual narrations for airport terminal video...")
        print("=" * 70)

        results = self.generator.generate_multilingual_narratives(
            text_map=narrations,
            output_prefix="airport_terminal"
        )

        return results

    def create_video_from_image(
        self,
        audio_path: str,
        output_path: str,
        duration: int = 5
    ) -> bool:
        """
        Create video from image and audio using FFmpeg.

        Args:
            audio_path: Path to audio file
            output_path: Path to output MP4 file
            duration: Video duration in seconds (default 5)

        Returns:
            True if successful, False otherwise
        """
        if not os.path.exists(self.image_path):
            print(f"❌ Error: Image not found at {self.image_path}")
            return False

        if not os.path.exists(audio_path):
            print(f"❌ Error: Audio not found at {audio_path}")
            return False

        try:
            # FFmpeg command to create video from image + audio
            cmd = [
                "ffmpeg",
                "-y",  # Overwrite output file
                "-loop", "1",  # Loop image
                "-i", self.image_path,  # Input image
                "-i", audio_path,  # Input audio
                "-c:v", "libx264",  # Video codec
                "-c:a", "aac",  # Audio codec
                "-b:a", "192k",  # Audio bitrate
                "-pix_fmt", "yuv420p",  # Pixel format for compatibility
                "-shortest",  # Stop when shortest stream ends (audio)
                output_path
            ]

            print(f"   Creating video: {output_path}")
            subprocess.run(cmd, check=True, capture_output=True)

            if os.path.exists(output_path):
                file_size = os.path.getsize(output_path) / (1024 * 1024)
                print(f"   ✓ Video created: {output_path} ({file_size:.2f} MB)")
                return True
            return False

        except subprocess.CalledProcessError as e:
            print(f"   ❌ FFmpeg error: {e.stderr.decode()}")
            return False
        except FileNotFoundError:
            print("   ❌ FFmpeg not found. Install with: sudo apt-get install ffmpeg")
            return False

    def generate_all_videos(self) -> Dict[str, Optional[str]]:
        """Generate videos in all supported languages."""

        print("\n🎬 Airport Terminal Video Generation")
        print("=" * 70)

        # Generate audio narrations
        audio_files = self.generate_narrations()

        print("\n📹 Creating videos...")
        print("=" * 70)

        results = {}
        languages = {
            "en": "English",
            "it": "Italian",
            "si": "Sinhala"
        }

        for lang_code, lang_name in languages.items():
            audio_path = audio_files.get(lang_code)
            if not audio_path:
                print(f"⏭️ Skipping {lang_name} (audio generation failed)")
                results[lang_code] = None
                continue

            output_filename = f"airport_terminal_{lang_code}.mp4"
            output_path = os.path.join(self.output_dir, output_filename)

            print(f"\n📹 {lang_name}:")
            if self.create_video_from_image(audio_path, output_path):
                results[lang_code] = output_path
            else:
                results[lang_code] = None

        return results

    def generate_summary(self, results: Dict[str, Optional[str]]) -> None:
        """Print generation summary."""

        print("\n" + "=" * 70)
        print("✅ GENERATION COMPLETE!")
        print("=" * 70)

        languages = {
            "en": "English",
            "it": "Italian",
            "si": "Sinhala"
        }

        print("\n📊 Summary:")
        for lang_code, lang_name in languages.items():
            output_path = results.get(lang_code)
            if output_path and os.path.exists(output_path):
                status = "✓"
                size = os.path.getsize(output_path) / (1024 * 1024)
                print(f"{status} {lang_name:10} → {os.path.basename(output_path)} ({size:.2f} MB)")
            else:
                print(f"✗ {lang_name:10} → Failed")

        print("\n📤 Upload Instructions:")
        print("   • Facebook Reels: 9:16 aspect ratio, 3-90 seconds")
        print("   • Instagram Reels: 9:16 aspect ratio, 3-90 seconds")
        print("   • TikTok: 9:16 aspect ratio, 3-10 minutes")
        print("   • YouTube Shorts: 9:16 aspect ratio, 15-60 seconds")

        print(f"\n📁 Video files location: {self.output_dir}/")


def main():
    """Generate airport terminal videos."""

    # Check if image exists
    image_path = "airport_terminal.jpg"
    if not os.path.exists(image_path):
        print(f"⚠️  Image not found: {image_path}")
        print(f"   Please save your airport terminal image as '{image_path}'")
        print(f"   Or update the image_path in the generator.")
        return

    # Initialize generator and create videos
    generator = AirportTerminalVideoGenerator(image_path=image_path)
    results = generator.generate_all_videos()
    generator.generate_summary(results)


if __name__ == "__main__":
    main()
