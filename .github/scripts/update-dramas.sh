#!/bin/bash
# Auto-update Sinhala teledrama video IDs from YouTube
# Runs every 3 days via GitHub Actions

set -e

HTML_FILE="index.html"
UPDATED=false

# Drama search queries — name|search_query
DRAMAS=(
  "Deweni Inima S2|deweni inima latest episode"
  "Paata Kurullo|paata kurullo latest episode"
  "Iskole|iskole teledrama latest episode"
  "Maayavi|maayavi sirasa latest episode"
  "Chanchala Rekha|chanchala rekha hiru latest episode"
  "Man Adarei|man adarei derana latest episode"
  "Ron Soya|ron soya hiru latest episode"
  "Sonu Mandara|sonu mandara hiru latest episode"
  "Prema Dadayama|prema dadayama sirasa latest episode"
  "Ahankara Adare|ahankara adare sirasa latest episode"
  "Kolamba Kattiya|kolamba kattiya derana latest episode"
  "Hiripoda Wessa|hiripoda wessa swarnavahini latest episode"
)

echo "=== Updating Sinhala Teledrama Video IDs ==="
echo "Date: $(date)"
echo ""

for entry in "${DRAMAS[@]}"; do
  IFS='|' read -r name query <<< "$entry"

  # Search YouTube (sort by upload date)
  encoded_query=$(echo "$query" | sed 's/ /+/g')
  vid=$(curl -s "https://www.youtube.com/results?search_query=${encoded_query}&sp=CAI%253D" \
    -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36" \
    2>/dev/null | grep -oP '"videoId":"([^"]+)"' | head -1 | cut -d'"' -f4)

  if [ -n "$vid" ]; then
    echo "  $name -> $vid"

    # Find the old video ID for this drama in the HTML and replace it
    # Look for the drama name in DRAMAS_DATA and update the vid field on the same line
    old_vid=$(grep -oP "name:'${name}'.*?vid:'([^']+)'" "$HTML_FILE" | head -1 | grep -oP "vid:'\K[^']+")

    if [ -n "$old_vid" ] && [ "$old_vid" != "$vid" ]; then
      # Replace old vid with new vid for this specific drama entry
      sed -i "s|name:'${name}',\(.*\)vid:'${old_vid}'|name:'${name}',\1vid:'${vid}'|g" "$HTML_FILE"
      echo "    Updated: $old_vid -> $vid"
      UPDATED=true
    elif [ -n "$old_vid" ]; then
      echo "    No change (same video)"
    else
      echo "    Warning: Could not find existing entry for $name"
    fi
  else
    echo "  $name -> FAILED (no result from YouTube)"
  fi

  # Small delay to avoid rate limiting
  sleep 1
done

echo ""

if [ "$UPDATED" = true ]; then
  echo "=== Changes detected, committing ==="
  git config user.name "github-actions[bot]"
  git config user.email "github-actions[bot]@users.noreply.github.com"
  git add "$HTML_FILE"
  git commit -m "Auto-update teledrama episodes $(date +%Y-%m-%d)

Updated latest YouTube video IDs for Sinhala teledramas.
This is an automated update that runs every 3 days.

Co-Authored-By: github-actions[bot] <github-actions[bot]@users.noreply.github.com>"
  git push
  echo "=== Push complete ==="
else
  echo "=== No updates needed ==="
fi
