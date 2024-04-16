#!/bin/bash
# Exit on error or undefined variable
set -euo pipefail

# Read the first line starting with http from submit.txt
# Uncomment and adjust the following lines if needed
# if [ -e submit.txt ]; then
#     USER_LINK_SUBMISSION=$(grep -m 1 '^http' submit.txt)
#     if [ -z "$USER_LINK_SUBMISSION" ]; then
#         echo "No URL found in submit.txt"
#         exit 1
#     fi
# else
#     echo "submit.txt file not found"
#     exit 1
# fi

# Ensure the directory exists before changing to it
if [ -d "assessment" ]; then
    cd assessment
else
    echo "Assessment directory does not exist"
    exit 1
fi

# # Clean node_modules directory safely
# if [ -d "node_modules" ]; then
#     rm -rf node_modules
# fi

# Update or create .env with USER_LINK_SUBMISSION
# Uncomment and adjust the following line if needed
# echo "USER_LINK_SUBMISSION=$USER_LINK_SUBMISSION" > .env

# Check and install dotenv if necessary
if npm list dotenv 2>/dev/null | grep -q 'dotenv'; then
    echo "dotenv is already installed."
else
    echo "Installing dotenv..."
    npm install dotenv >/dev/null 2>&1
fi

# Ensure all dependencies are installed
npm install

# Run Cypress testing
node runCypress.js

# Run Python script to process results
if [ -f "cypressResults.json" ]; then
    python3 process_filtered_logs.py cypressResults.json
else
    echo "cypressResults.json does not exist"
    exit 1
fi

# # Check and move assessment result
# if [ -f "assessment_result.json" ]; then
#     cp assessment_result.json ..
#     echo "Assessment results generated"
# else
#     echo "Python script failed!!!"
#     exit 1
# fi
