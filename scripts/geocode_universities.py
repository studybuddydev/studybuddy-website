#!/usr/bin/env python3
"""
Geocode universities from the GitHub university-domains-list.
Produces public/university_coords.json — a mapping of university name → {lat, lng}.

Uses OpenStreetMap Nominatim (free, no API key, 1 req/sec rate limit).
Resumable: caches results so you can stop and restart.

Usage:
    pip install geopy requests
    python scripts/geocode_universities.py

Takes ~3 hours for the full ~10,000 university list.
Add --only-names "MIT,Stanford University" to geocode specific ones.
"""

import json
import os
import sys
import time
import argparse
import requests
from pathlib import Path
from geopy.geocoders import Nominatim
from geopy.exc import GeocoderTimedOut, GeocoderServiceError

# ── Paths ───────────────────────────────────────────────
SCRIPT_DIR = Path(__file__).resolve().parent
PROJECT_DIR = SCRIPT_DIR.parent
CACHE_FILE = PROJECT_DIR / "scripts" / "_geocode_cache.json"
OUTPUT_FILE = PROJECT_DIR / "public" / "university_coords.json"
SOURCE_URL = "https://raw.githubusercontent.com/Hipo/university-domains-list/refs/heads/master/world_universities_and_domains.json"

# ── Geocoder setup ──────────────────────────────────────
geolocator = Nominatim(user_agent="studybuddy-university-map/1.0", timeout=10)


def load_cache():
    """Load previously geocoded results."""
    if CACHE_FILE.exists():
        with open(CACHE_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    return {}


def save_cache(cache):
    """Persist cache to disk."""
    CACHE_FILE.parent.mkdir(parents=True, exist_ok=True)
    with open(CACHE_FILE, "w", encoding="utf-8") as f:
        json.dump(cache, f, ensure_ascii=False)


def geocode_university(name, country, retries=3):
    """
    Try to geocode a university. Strategies (in order):
    1. Search for "University Name, Country"
    2. Search for just "University Name"
    3. Return None if not found
    """
    queries = [
        f"{name}, {country}",
        name,
    ]

    for query in queries:
        for attempt in range(retries):
            try:
                time.sleep(1.1)  # Nominatim rate limit: 1 req/sec
                location = geolocator.geocode(query, exactly_one=True)
                if location:
                    return {"lat": round(location.latitude, 5), "lng": round(location.longitude, 5)}
                break  # No result, try next query
            except GeocoderTimedOut:
                if attempt < retries - 1:
                    time.sleep(2)
                    continue
            except GeocoderServiceError as e:
                print(f"  ⚠ Service error for '{query}': {e}")
                if attempt < retries - 1:
                    time.sleep(5)
                    continue
            except Exception as e:
                print(f"  ⚠ Unexpected error for '{query}': {e}")
                break

    return None


def fetch_university_list():
    """Fetch the full university list from GitHub."""
    print(f"Fetching university list from GitHub...")
    resp = requests.get(SOURCE_URL, timeout=30)
    resp.raise_for_status()
    universities = resp.json()
    print(f"  Got {len(universities)} universities")
    return universities


def main():
    parser = argparse.ArgumentParser(description="Geocode universities for StudyBuddy map")
    parser.add_argument("--only-names", type=str, help="Comma-separated list of specific university names to geocode")
    parser.add_argument("--limit", type=int, default=0, help="Max number of universities to geocode (0 = all)")
    parser.add_argument("--reset", action="store_true", help="Clear cache and start fresh")
    args = parser.parse_args()

    # Load or reset cache
    if args.reset and CACHE_FILE.exists():
        CACHE_FILE.unlink()
        print("Cache cleared.")

    cache = load_cache()
    print(f"Cache has {len(cache)} entries")

    # Fetch university list
    universities = fetch_university_list()

    # Filter if --only-names provided
    if args.only_names:
        names = set(n.strip() for n in args.only_names.split(","))
        universities = [u for u in universities if u["name"] in names]
        print(f"Filtered to {len(universities)} universities")

    # Apply limit
    if args.limit > 0:
        universities = universities[:args.limit]

    # Geocode
    total = len(universities)
    geocoded = 0
    skipped = 0
    failed = 0

    for i, uni in enumerate(universities):
        name = uni["name"]
        country = uni["country"]

        # Skip if already cached
        if name in cache:
            skipped += 1
            continue

        print(f"[{i+1}/{total}] Geocoding: {name} ({country})...", end=" ", flush=True)

        result = geocode_university(name, country)
        if result:
            cache[name] = result
            geocoded += 1
            print(f"✓ ({result['lat']}, {result['lng']})")
        else:
            cache[name] = None  # Mark as attempted but not found
            failed += 1
            print("✗ not found")

        # Save cache every 50 entries
        if (geocoded + failed) % 50 == 0:
            save_cache(cache)
            print(f"  💾 Cache saved ({len(cache)} entries)")

    # Final save
    save_cache(cache)

    # Build output: only entries with coordinates
    coords = {name: loc for name, loc in cache.items() if loc is not None}

    OUTPUT_FILE.parent.mkdir(parents=True, exist_ok=True)
    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(coords, f, ensure_ascii=False, indent=None, separators=(",", ":"))

    print(f"\n{'='*50}")
    print(f"Done!")
    print(f"  Geocoded:  {geocoded}")
    print(f"  Skipped:   {skipped} (already cached)")
    print(f"  Failed:    {failed}")
    print(f"  Total coords: {len(coords)}")
    print(f"  Output: {OUTPUT_FILE}")
    print(f"  Cache:  {CACHE_FILE}")


if __name__ == "__main__":
    main()
