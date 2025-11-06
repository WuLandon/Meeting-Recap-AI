#!/bin/bash

# -----------------------------------------
# Meeting Recap AI - Follow-Up API Test Runner
# Sends sample meeting data to /api/followup
# and saves AI-generated email responses.
#
# run npm run dev
# run ./test/followup/run_followup_tests.sh
# -----------------------------------------

API_URL="http://localhost:3000/api/followup"
INPUT_DIR="test/followup/inputs"
OUTPUT_DIR="test/followup/results"

# Create results directory if it doesn’t exist
mkdir -p "$OUTPUT_DIR"

# List of JSON test files (each should contain a valid MeetingOutput object)
TEST_FILES=(
  # "meeting_simple.json"
  # "meeting_team_planning.json"
  # "meeting_brainstorming.json"
  "meeting_long_project_review.json"
  # "meeting_followup_nulls.json"
)

echo "🚀 Starting Follow-Up API backend tests..."
echo "-----------------------------------------"

for FILE in "${TEST_FILES[@]}"; do
  INPUT_PATH="$INPUT_DIR/$FILE"
  OUTPUT_PATH="$OUTPUT_DIR/${FILE%.json}_result.json"

  if [ ! -f "$INPUT_PATH" ]; then
    echo "⚠️  Skipping missing file: $INPUT_PATH"
    continue
  fi

  echo "Testing: $FILE ..."

  RESPONSE=$(curl -s -X POST "$API_URL" \
    -H "Content-Type: application/json" \
    -d @"$INPUT_PATH")

  echo "$RESPONSE" | jq '.' > "$OUTPUT_PATH"

  if echo "$RESPONSE" | grep -q '"success":true'; then
    echo "✅ Success → saved result to $OUTPUT_PATH"
  else
    echo "❌ Failure → see $OUTPUT_PATH for details"
  fi

  echo ""
done

echo "-----------------------------------------"
echo "🏁 All follow-up tests completed. Results saved in $OUTPUT_DIR/"
