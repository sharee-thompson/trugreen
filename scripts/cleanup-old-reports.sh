#!/bin/bash

# Cleanup script to remove old reports before publishing to gh-pages
# Keeps: 
#   - Last 5 accessibility report runs
#   - Last 5 link validation report runs (pairs of .html + .json per device)
#   - All performance CSV data (history is valuable)

set -e

echo "Cleaning up old reports..."

# Cleanup old link validation reports (keep last 5 unique timestamps)
if [ -d "link-validation-reports" ]; then
  echo "Cleaning link validation reports..."
  
  cd link-validation-reports
  
  # Extract unique base names (remove .html/.json extension) and sort
  UNIQUE_FILES=$(ls -1 2>/dev/null | sed 's/\.[^.]*$//' | sort -u)
  UNIQUE_COUNT=$(echo "$UNIQUE_FILES" | grep -v '^$' | wc -l)
  
  if [ "$UNIQUE_COUNT" -gt 5 ]; then
    # Keep only the 5 most recent (sorted lexicographically, which matches ISO 8601 timestamps)
    KEEP_TIMESTAMPS=$(echo "$UNIQUE_FILES" | sort | tail -5)
    
    # Delete files that are NOT in the keep list
    for file in *; do
      BASE_NAME="${file%.*}"
      # Check if this base name is in the keep list
      if ! echo "$KEEP_TIMESTAMPS" | grep -F "$BASE_NAME" > /dev/null 2>&1; then
        echo "  Deleting: $file"
        rm -f "$file"
      fi
    done
  fi
  
  cd - > /dev/null
  REMAINING=$(ls -1 link-validation-reports 2>/dev/null | wc -l)
  echo "  Kept $REMAINING link validation files (approx. $((REMAINING / 2)) runs)"
fi

# Cleanup old accessibility reports in dashboard
if [ -d "dashboard/accessibility/accessibility-reports" ]; then
  echo "Cleaning accessibility reports in dashboard..."
  
  cd dashboard/accessibility/accessibility-reports
  
  # Count subdirectories (each represents a run)
  RUN_DIRS=$(ls -1d */ 2>/dev/null | wc -l || echo 0)
  
  if [ "$RUN_DIRS" -gt 5 ]; then
    # Keep only the 5 most recent (by modification time)
    KEEP_DIRS=$(ls -1dt */ 2>/dev/null | head -5 | sed 's/\/$//')
    
    # Delete directories not in the keep list
    for dir in */; do
      DIR_NAME="${dir%/}"
      if ! echo "$KEEP_DIRS" | grep -F "$DIR_NAME" > /dev/null 2>&1; then
        echo "  Deleting: $DIR_NAME/"
        rm -rf "$dir"
      fi
    done
  fi
  
  cd - > /dev/null
  REMAINING=$(ls -1d dashboard/accessibility/accessibility-reports/*/ 2>/dev/null | wc -l || echo 0)
  echo "  Kept $REMAINING accessibility report runs"
fi

echo "Cleanup complete!"
