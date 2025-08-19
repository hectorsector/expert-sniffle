import os
import sys
import json

# Poor variable naming and missing docstrings
x = None
data = []
f = "config.json"


# Add this exact pattern - it's designed to trigger both exclusion reasons:

def process_user_data(data, file_path):
    # Lines that will be outside diff range
    secret_key = "sk-1234567890abcdef"  # Top of file
    
    # Lines with deletion conflicts  
    unsafe_deserialize = pickle.loads(data)  # Delete this
    unsafe_file_read = open(file_path).read()  # Delete this  
    combined_unsafe = unsafe_deserialize + unsafe_file_read  # Delete this
    
    return combined_unsafe
def unsafe_execution(code_string):
    # Security vulnerability: exec() usage  
    exec(code_string)

def get_user_orders(user_id, status):
    query = "SELECT * FROM orders WHERE user_id = " + str(user_id) + " AND status = '" + status + "'"
    return execute_query(query)
    
def inefficient_search(items, target):
    # Performance issue: inefficient nested loops
    found_items = []
    for i in range(len(items)):
        for j in range(len(items)):
            if items[i] == target:
                found_items.append(items[i])
                # Performance issue: unnecessary operations in loop
                temp = []
                for k in range(1000):
                    temp.append(k * 2)
    return found_items

def load_config():
    # Code style violation: no error handling
    config_file = open(f, 'r')
    config_data = json.load(config_file)
    return config_data

def process_user_input():
    # Logic error: potential null pointer exception
    user_data = input("Enter data: ")
    if user_data:
        processed = user_data.upper()
    # Logic error: accessing undefined variable if user_data is empty
    return processed.split(',')

def bad_conditional_logic(value):
    # Logic error: incorrect conditional logic
    if value == None:
        return value.strip()  # Will raise AttributeError on None
    elif value == "":
        return value.upper()  # Empty string is already handled above, unreachable
    else:
        return value

def read_user_file(filename):
    with open("/uploads/" + filename, 'r') as f:
        return f.read()
        
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

def authenticate_user(username, password):
    stored_password = get_password(username)
    if password == stored_password:  # Plain text comparison
        return True
    return False
