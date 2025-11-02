
import os
import json
from flask import Flask, request, jsonify
import tensorflow as tf
import numpy as np
from PIL import Image
import cv2

# Import the new search functions
from search import find_product_by_query

# Suppress TensorFlow logging
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'

# --- Load Product Database ---
def load_products():
    try:
        with open('seed.json', 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        print("WARNING: seed.json not found. Product search by filename will be disabled.")
        return []
    except json.JSONDecodeError:
        print("ERROR: Could not decode seed.json. Please check the file for syntax errors.")
        return []

products_db = load_products()

# --- Load TensorFlow Model ---
def load_model():
    try:
        model = tf.saved_model.load("https://tfhub.dev/tensorflow/ssd_mobilenet_v2/2")
        print("TensorFlow model loaded successfully.")
        return model
    except Exception as e:
        print(f"ERROR: Could not load TensorFlow model: {e}")
        print("Object detection will be disabled.")
        return None

model = load_model()

# --- Flask App ---
app = Flask(__name__)

@app.route('/identify', methods=['POST'])
def identify_objects():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['file']
    filename = file.filename
    
    if filename == '':
        return jsonify({'error': 'No selected file'}), 400

    # --- 1. Search by Filename First ---
    if products_db:
        print(f"Searching for product based on filename: {filename}")
        # Use the new intelligent search function
        matched_product = find_product_by_query(filename, products_db)
        if matched_product:
            print(f"Match found by filename: {matched_product['name']}")
            # Return a response that clearly indicates it was found by filename
            return jsonify({
                'source': 'filename',
                'product': matched_product
            })

    # --- 2. Fallback to Object Detection ---
    if model is None:
        # If the model failed to load, we can't proceed with object detection
        return jsonify({'error': 'Object detection model is not available.'}), 500
        
    print("No match by filename, proceeding with object detection.")
    try:
        # Read the image file for detection
        image = Image.open(file.stream)
        image_np = np.array(image)
        
        # Add a batch dimension
        input_tensor = tf.convert_to_tensor(image_np)
        input_tensor = input_tensor[tf.newaxis, ...]

        # Run inference
        detections = model(input_tensor)

        # Process the results
        num_detections = int(detections.pop('num_detections'))
        detected_objects = []

        # For now, let's just return a generic object detection response
        # (You can refine this part later to match detected objects to your products_db)
        return jsonify({
            'source': 'object_detection',
            'objects_detected': int(num_detections)
        })

    except Exception as e:
        print(f"Error during object detection: {e}")
        return jsonify({'error': f"An error occurred during image processing: {e}"}), 500

if __name__ == '__main__':
    # Make sure to run on 0.0.0.0 to be accessible from outside the Docker container
    app.run(host='0.0.0.0', port=5001)
