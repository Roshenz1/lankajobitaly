#!/usr/bin/env python3
"""
Generate Sinhala Reel Audio for McDonald's Verona Job Posting
Uses OmniVoice to create multilingual audio narratives
"""

from narrative_generator import NarrativeGenerator

# McDonald's Verona Sinhala Narrative (Full Version)
sinhala_narrative = """ආයුබෝවන් ඉතාලියේ හැමතැනම විසිරිලා ඉන්න මගේ ආදරණීය සිංහල සහෝදර සහෝදරියන් හැමෝටම ජයවේවා!

අද මම ඔයාලත් එක්ක කතා කරන්නේ ඉතාලියේ සම්මතයි "Contratto" එහෙමත් නැත්තම් රැකියා ගිවිසුම් ගැන. මේක අනිවාර්යයෙන්ම බලන්න!

ස්ථිර පත්වීම (Contratto a Tempo Indeterminato) - ඔයා වැරැද්දක් කළොත් මිසක් ඔයාව අයින් කරන්න අමාරුයි.
තාවකාලික පත්වීම (Contratto a Tempo Determinato) - කාලසීමාවක් තියෙන "රෙන්ට්" එක.
ආධුනික පත්වීම (Contratto di Apprendistato) - තරුණ අයට ඉගෙන ගන්න අවස්ථාව.

Bustapaga (පඩි පත්‍රිකාව) සෑම මාසයම තිසා බලන්න.
Tredicesima සහ Quattordicesima - අවුරුද්දට අතිරේක පඩි!
TFR - ඔයා රැකියාවෙන් ඉවත් වන විට ලැබෙන ඔබේ අයිතිය!

දැනුවත් වෙන්න, ඔයාගේ අයිතිවාසිකම් රැකගන්න. තවත් දෙයක් දැනගන්න ඕනේ නම් බය නැතුව අහන්න.
අපි හැමෝම ඉන්නේ එකම යාත්‍රාවේ! ජයවේවා! 🇱🇰"""

def generate_mcdonalds_sinhala_audio():
    """Generate Sinhala audio for McDonald's Verona reel."""

    print("🎬 McDonald's Verona - Sinhala Reel Narrative Generation")
    print("=" * 60)

    # Initialize generator with warm voice
    generator = NarrativeGenerator(voice_preset="warm")

    # Generate Sinhala audio
    print("\n🎙️ Generating Sinhala audio (warm, professional tone)...")
    output_path = generator.generate_narrative(
        text=sinhala_narrative,
        language="si",
        output_path="generated_narratives/mcdonalds_verona_sinhala.wav",
        speaker_name="mcdonalds_verona"
    )

    if output_path:
        print(f"\n✅ SUCCESS!")
        print(f"📁 File saved: {output_path}")
        print(f"\n📝 File details:")
        print(f"   - Language: Sinhala")
        print(f"   - Duration: ~45 seconds")
        print(f"   - Format: WAV (22050 Hz, 16-bit)")
        print(f"   - Use in: Instagram Reels, TikTok, YouTube Shorts")
        return output_path
    else:
        print(f"\n❌ Failed to generate audio. Is OmniVoice installed?")
        print(f"   Install with: pip install omnivoice torch torchaudio")
        return None

def generate_all_languages():
    """Generate McDonald's narratives in all supported languages."""

    narratives = {
        "en": """Hello to all Sinhala brothers and sisters spread across Italy! Today I'm talking about something very important - employment contracts in Italy, or "Contratto". Know your rights!

Learn about Fixed Contracts (Tempo Indeterminato), Temporary Contracts (Tempo Determinato), and Apprenticeships. Check your pay slip every month, claim your 13th and 14th salary bonuses, and protect your TFR (severance). Be aware, protect your rights, and ask without fear. We're all in this journey together! 🇱🇰""",

        "it": """Ciao a tutti i fratelli e sorelle srilankesi sparsi per l'Italia! Oggi parlo di qualcosa di molto importante - i contratti di lavoro in Italia. Conoscete i vostri diritti!

Imparate sui Contratti Indeterminati, Contratti Temporanei e Apprendistati. Controllate la busta paga ogni mese, chiedete la 13ª e 14ª mensilità, e proteggete il vostro TFR. Siate consapevoli, proteggete i vostri diritti, e chiedete senza paura. Siamo tutti in questo viaggio insieme! 🇱🇰""",

        "si": sinhala_narrative
    }

    print("🎬 Generating multilingual McDonald's Verona reels...")
    print("=" * 60)

    generator = NarrativeGenerator(voice_preset="warm")
    results = generator.generate_multilingual_narratives(
        text_map=narratives,
        output_prefix="mcdonalds_verona_reel"
    )

    print("\n📊 Generation Summary:")
    for lang, path in results.items():
        lang_name = generator.SUPPORTED_LANGUAGES[lang]["name"]
        status = "✅" if path else "❌"
        print(f"{status} {lang_name}: {path}")

    return results

if __name__ == "__main__":
    import sys

    if len(sys.argv) > 1 and sys.argv[1] == "--all":
        # Generate all three languages
        generate_all_languages()
    else:
        # Generate Sinhala only (default)
        generate_mcdonalds_sinhala_audio()
