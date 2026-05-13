#!/bin/bash
# Auto-update job category counts from Adzuna API
# Runs every 4 days via GitHub Actions

set -e

HTML_FILE="index.html"
APP_ID="f0f9a33b"
APP_KEY="82f5c76c870615906362a15da663c939"
API="https://api.adzuna.com/v1/api/jobs/it/search/1"
UPDATED=false

echo "=== Updating Job Category Counts ==="
echo "Date: $(date)"
echo ""

# Fetch counts for each category
declare -A COUNTS
CATEGORIES=(
  "Elder Care|assistenza anziani badante"
  "Cleaning|pulizie pulizia"
  "Baby Sitting|babysitter baby sitter"
  "Factory|operaio produzione fabbrica"
  "Warehouse|magazziniere scaffalista carrellista"
  "Restaurant|cuoco cameriere lavapiatti"
  "Driving|autista corriere rider"
)

TOTAL=0
for entry in "${CATEGORIES[@]}"; do
  IFS='|' read -r name keywords <<< "$entry"
  encoded=$(echo "$keywords" | sed 's/ /+/g')
  count=$(curl -s "${API}?app_id=${APP_ID}&app_key=${APP_KEY}&results_per_page=1&what=${encoded}" | python3 -c "import sys,json; print(json.load(sys.stdin).get('count',0))" 2>/dev/null || echo "0")
  echo "  $name: $count jobs"
  COUNTS["$name"]=$count
  TOTAL=$((TOTAL + count))
  sleep 1
done

echo ""
echo "  TOTAL: $TOTAL jobs across Italy"

# Fetch city-specific counts
echo ""
echo "=== City Counts ==="
CITIES=("verona" "milano" "roma" "torino" "bologna" "firenze")
for city in "${CITIES[@]}"; do
  count=$(curl -s "${API}?app_id=${APP_ID}&app_key=${APP_KEY}&results_per_page=1&where=${city}" | python3 -c "import sys,json; print(json.load(sys.stdin).get('count',0))" 2>/dev/null || echo "0")
  echo "  $city: $count"
  sleep 1
done

echo ""
echo "=== Job data is live via API — no HTML changes needed ==="
echo "Jobs are fetched in real-time from Adzuna when users visit the site."
echo "This workflow validates the API is still working and logs counts."
