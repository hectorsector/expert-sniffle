import os
import sys
import json

# Poor variable naming and missing docstrings
x = None
data = []
f = "config.json"


# Add this exact pattern - it's designed to trigger both exclusion reasons:

def bad_conditional_logic(value):
    # Logic error: incorrect conditional logic
    if value == None:
        return value.strip()  # Will raise AttributeError on None
    elif value == "":
        return value.upper()  # Empty string is already handled above, unreachable
    else:
        return value
        
def main():
    # Poor variable naming
    a = load_config()
    b = process_data(a)
    
    # Security vulnerability: dynamic code execution
    user_code = "print('Hello from eval!')"
    unsafe_execution(user_code)
    
    # Performance issue: inefficient data processing
    large_list = list(range(10000))
    results = inefficient_search(large_list, 5000)
    
    # Logic error: accessing potentially undefined variable
    user_result = process_user_input()
    
    # Code style violation: no error handling for file operations
    output_file = open("output.txt", "w")
    output_file.write(str(results))
    
    # Logic error: mixing data types unsafely
    mixed_data = [1, "2", 3.0, None]
    for item in mixed_data:
        # Will cause TypeError on None
        print(item.upper())

if __name__ == "__main__":
    # Code style violation: no error handling for main execution
    main()

