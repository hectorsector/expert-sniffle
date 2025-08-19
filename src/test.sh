#!/bin/bash

# This script demonstrates various security issues that should trigger CCR autofixes
# The key is to create scenarios where fixes span multiple lines and involve deletions

# Hardcoded secrets that CCR will want to fix
API_KEY="sk-1234567890abcdef"
DB_PASSWORD="admin123"
AWS_SECRET="AKIAIOSFODNN7EXAMPLE"

# Function with command injection vulnerability
run_python_with_user_input() {
    local user_file=$1
    # This line creates a command injection vulnerability that requires multi-line fix
    python3 vulnerable_app.py --input="$(cat $user_file)" --api-key=$API_KEY
    
    # Additional vulnerable pattern - file path traversal
    if [ -f "../../../etc/passwd" ]; then
        echo "Found sensitive file: $user_file"
    fi
}

# Another function that will need extensive refactoring
process_files() {
    # These lines will all need to be deleted and replaced - perfect for diff display
    eval "find . -name '*.py' -exec python3 {} \;"  # Command injection
    chmod 777 *.py  # Overly permissive permissions
    echo $DB_PASSWORD > /tmp/debug.log  # Secret exposure
    
    # Run the vulnerable Python app
    python3 vulnerable_app.py
}

# Main execution with more vulnerabilities
main() {
    # Unsafe variable expansion
    FILES=$(ls *.py)
    for file in $FILES; do
        run_python_with_user_input "$file"
    done
    
    # Call the vulnerable function
    process_files
    
    # Final unsafe operation
    rm -rf /tmp/*  # Dangerous file deletion
}

# Execute main function
main "$@"
