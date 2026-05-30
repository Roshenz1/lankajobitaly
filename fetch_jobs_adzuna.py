#!/usr/bin/env python3
"""
Fetch job listings from Adzuna API for Verona and Milan
Updates jobs.json with fresh listings every 3 days
"""

import json
import requests
import sys
from datetime import datetime

# Adzuna API credentials
APP_ID = "f0f9a33b"
APP_KEY = "82f5c76c870615906362a15da663c939"
API_BASE = "https://api.adzuna.com/v1/api/jobs/it/search/1"

# Job category mappings
CATEGORIES = {
    "food": "cameriere cuoco lavapiatti",
    "elder": "badante assistenza anziani",
    "clean": "pulizie pulizia domestica",
    "baby": "babysitter baby sitter",
    "factory": "operaio produzione fabbrica",
    "warehouse": "magazziniere scaffalista"
}

# Icons and colors by category
CATEGORY_CONFIG = {
    "food": {"ico": "🍽️", "bg": "#ff6b6b"},
    "elder": {"ico": "👴", "bg": "#4ecdc4"},
    "clean": {"ico": "🧹", "bg": "#45b7d1"},
    "baby": {"ico": "👶", "bg": "#f9ca24"},
    "factory": {"ico": "🏭", "bg": "#6c5ce7"},
    "warehouse": {"ico": "📦", "bg": "#00b894"}
}

def fetch_jobs(city, category_key, keywords):
    """Fetch jobs from Adzuna API for a specific city and category"""
    try:
        params = {
            "app_id": APP_ID,
            "app_key": APP_KEY,
            "what": keywords,
            "where": city,
            "results_per_page": 5,
            "sort_by": "date",
            "sort_direction": "decreasing"
        }

        response = requests.get(API_BASE, params=params, timeout=10)
        response.raise_for_status()
        data = response.json()

        jobs = []
        for i, job in enumerate(data.get("results", [])[:5]):
            job_obj = {
                "id": hash(f"{job['title']}{job['company']['display_name']}{city}") % 10000,
                "title": job.get("title", ""),
                "sin": f"Job from {job['company']['display_name']} in {city.capitalize()}",
                "company": job.get("company", {}).get("display_name", "Unknown"),
                "city": city.capitalize(),
                "type": category_key.replace("_", " ").title(),
                "typeKey": category_key,
                "salary": job.get("salary_max", "Negotiable") if job.get("salary_max") else "Negotiable",
                "perm": "permanent" in job.get("contract_type", "").lower(),
                "isNew": True,
                "urgent": False,
                "featured": i == 0,  # Feature first job
                "ico": CATEGORY_CONFIG[category_key]["ico"],
                "bg": CATEGORY_CONFIG[category_key]["bg"],
                "desc": job.get("description", "")[:200] if job.get("description") else "Job posting from Adzuna",
                "url": job.get("redirect_url", ""),
                "source": "Adzuna"
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

    print("🔄 Starting job fetch from Adzuna API...")
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
            # Keep manual entries (those without 'source' = 'Adzuna')
            manual_jobs = [j for j in existing if j.get("source") != "Adzuna"]
    except FileNotFoundError:
        manual_jobs = []

    # Combine: Adzuna jobs first, then manual entries
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
