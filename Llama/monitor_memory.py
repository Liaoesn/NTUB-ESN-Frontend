import os
import psutil
import time
from transformers import AutoModelForCausalLM, AutoTokenizer

def set_nice_level(nice_level=10):
    """
    Set the nice level of the process to lower its priority in the OS.
    """
    try:
        os.nice(nice_level)  # Increase niceness to lower priority
        print(f"Process nice level set to {nice_level}, lowering process priority.")
    except AttributeError:
        print("os.nice() is not available on this operating system. This step will be skipped.")

def monitor_memory_usage(interval=1, threshold=90):
    """
    Monitor system memory usage and print it.
    
    :param interval: Time interval (in seconds) between memory checks.
    :param threshold: Memory usage percentage that if exceeded will trigger a warning.
    """
    try:
        set_nice_level()

        # Load tokenizer and model
        model_name = "FlagAlpha/Atom-7B-Chat"
        print("Loading tokenizer...")
        tokenizer = AutoTokenizer.from_pretrained(model_name)
        print("Tokenizer loaded.")
        print("Loading model...")
        model = AutoModelForCausalLM.from_pretrained(model_name)
        print("Model loaded successfully.")
        
    except Exception as e:
        print(f"An error occurred: {e}")
        return  # Terminate function if an error occurs

    # Continuously monitor the memory usage during the load process
    try:
        while True:
            mem = psutil.virtual_memory()
            print(f"Current memory usage: {mem.percent}%")
            if mem.percent >= threshold:
                print(f"Warning: Memory usage is above {threshold}%!")
            time.sleep(interval)
    except KeyboardInterrupt:
        print("Monitoring stopped by user.")

if __name__ == "__main__":
    monitor_memory_usage(interval=1, threshold=90)
