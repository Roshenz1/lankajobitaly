#!/usr/bin/env python3
"""
Fetch job listings from Jooble API for Verona and Milan
Updates jobs.json with fresh listings every 3 days
NO API KEY REQUIRED - Jooble API is completely free
"""

import json
import requests
import sys
from datetime import datetime

# Jooble API (completely free, no authentication needed)
JOOBLE_API = "https://api.jooble.org/api/search"

# Job category mappings (keywords for search)
CATEGORIES = {
    "ristorazione": "cameriere cuoco",
    "badante": "badante anziani",
    "pulizie": "pulizie domestica",
    "babysitter": "babysitter",
    "fabbrica": "operaio produzione",
    "magazzino": "magazziniere"
}

# Icons and colors by category (Italian names)
CATEGORY_CONFIG = {
    "ristorazione": {"ico": "🍽️", "bg": "#ff6b6b"},
    "badante": {"ico": "👴", "bg": "#4ecdc4"},
    "pulizie": {"ico": "🧹", "bg": "#45b7d1"},
    "babysitter": {"ico": "👶", "bg": "#f9ca24"},
    "fabbrica": {"ico": "🏭", "bg": "#6c5ce7"},
    "magazzino": {"ico": "📦", "bg": "#00b894"}
}

def fetch_jobs(city, category_key, keywords):
    """Fetch jobs from Jooble API for a specific city and category (FREE, NO AUTH)"""
    try:
        payload = {
            "keywords": [keywords],
            "location": city,
            "radius": 50,
            "pageSize": 5,
            "page": 1
        }

        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
            "Content-Type": "application/json"
        }

        response = requests.post(JOOBLE_API, json=payload, headers=headers, timeout=10)
        response.raise_for_status()
        data = response.json()

        jobs = []
        for i, job in enumerate(data.get("jobs", [])[:5]):
            job_obj = {
                "id": hash(f"{job['title']}{job['company']}{city}") % 10000,
                "title": job.get("title", ""),
                "sin": f"Posizione presso {job['company']} a {city}",
                "company": job.get("company", "Sconosciuto"),
                "city": city.capitalize(),
                "type": category_key,  # Italian category name
                "typeKey": category_key,
                "salary": "Negoziabile",
                "perm": True,
                "isNew": True,
                "urgent": False,
                "featured": i == 0,  # Feature first job
                "ico": CATEGORY_CONFIG[category_key]["ico"],
                "bg": CATEGORY_CONFIG[category_key]["bg"],
                "desc": (job.get("snippet", "")[:200] if job.get("snippet") else "Offerta di lavoro") + "...",
                "url": job.get("link", ""),
                "source": "Jooble"
            }
            jobs.append(job_obj)

        return jobs
    except Exception as e:
        print(f"❌ Error fetching {category_key} jobs in {city}: {e}", file=sys.stderr)
        return []

def update_jobs_json():
    """Fetch jobs for Verona and Milan, update jobs.json"""
    all_jobs = []
    cities = ["verona", "milano"]

    print("🔄 Starting job fetch from Jooble API...")
    print(f"📍 Cities: {', '.join(cities)}")
    print(f"📂 Categories: {list(CATEGORIES.keys())}")
    print()

    for city in cities:
        for category_key, keywords in CATEGORIES.items():
            print(f"  📥 Fetching {category_key} jobs in {city}...", end=" ")
            jobs = fetch_jobs(city, category_key, keywords)

            if jobs:
                all_jobs.extend(jobs)
                print(f"✓ {len(jobs)} jobs")
            else:
                print("⊘ 0 jobs")

    print()
    print(f"✅ Total jobs fetched: {len(all_jobs)}")

    # Add unique IDs to avoid conflicts
    for idx, job in enumerate(all_jobs):
        job["id"] = idx + 1

    # Load existing jobs to preserve any manual entries
    try:
        with open("jobs.json", "r", encoding="utf-8") as f:
            existing = json.load(f)
            # Keep manual entries (those without 'source' = 'Jooble')
            manual_jobs = [j for j in existing if j.get("source") != "Jooble"]
    except FileNotFoundError:
        manual_jobs = []

    # Combine: Jooble jobs first, then manual entries
    final_jobs = all_jobs + manual_jobs

    # Re-index all jobs
    for idx, job in enumerate(final_jobs):
        job["id"] = idx + 1

    # Save to jobs.json
    with open("jobs.json", "w", encoding="utf-8") as f:
        json.dump(final_jobs, f, indent=2, ensure_ascii=False)

    print(f"💾 Updated jobs.json with {len(all_jobs)} API jobs + {len(manual_jobs)} manual jobs")
    print(f"📊 Total jobs in database: {len(final_jobs)}")
    print(f"⏰ Last update: {datetime.now().isoformat()}")

    return len(all_jobs) > 0

if __name__ == "__main__":
    success = update_jobs_json()
    sys.exit(0 if success else 1)
