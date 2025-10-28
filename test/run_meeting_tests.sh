#!/bin/bash

# -------------------------------
# Meeting Minutes AI - Batch Test Runner
# Runs all transcript test files against the local API
# and saves results as JSON under /test/results/
# -------------------------------

API_URL="http://localhost:3000/api/meeting"
INPUT_DIR="test"
OUTPUT_DIR="test/results"

# Create results directory if it doesn’t exist
mkdir -p "$OUTPUT_DIR"

# List of transcript test files
TEST_FILES=(
  # "transcript_simple.txt"
  # "transcript_long.txt"
  # "transcript_messy.txt"
  # "transcript_client_call.txt"
  "transcript_brainstorm.txt"
)

echo "🚀 Starting Meeting Minutes AI backend tests..."
echo "-----------------------------------------------"

for FILE in "${TEST_FILES[@]}"; do
  INPUT_PATH="$INPUT_DIR/$FILE"
  OUTPUT_PATH="$OUTPUT_DIR/${FILE%.txt}_result.json"

  if [ ! -f "$INPUT_PATH" ]; then
    echo "⚠️  Skipping missing file: $INPUT_PATH"
    continue
  fi

  echo "Testing: $FILE ..."

  # Use jq -Rs to encode file safely as JSON string
  RESPONSE=$(curl -s -X POST "$API_URL" \
    -H "Content-Type: application/json" \
    -d "$(jq -Rs '{transcript: .}' "$INPUT_PATH")")

  # Save raw response to /test/results
  echo "$RESPONSE" | jq '.' > "$OUTPUT_PATH"

  # Simple validation output
  if echo "$RESPONSE" | grep -q '"success":true'; then
    echo "✅ Success → saved result to $OUTPUT_PATH"
  else
    echo "❌ Failure → see $OUTPUT_PATH for details"
  fi

  echo ""
done

echo "-----------------------------------------------"
echo "🏁 All tests completed. Results saved in $OUTPUT_DIR/"
