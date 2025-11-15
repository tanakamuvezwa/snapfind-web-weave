
import os
import json
from flask import Flask, request, jsonify
from google.cloud import vision
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

# --- Instantiate Vision Client ---
try:
    vision_client = vision.ImageAnnotatorClient()
    print("Google Cloud Vision client instantiated successfully.")
except Exception as e:
    print(f"ERROR: Could not instantiate Google Cloud Vision client: {e}")
    vision_client = None

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
    if vision_client is None:
        return jsonify({'error': 'Google Cloud Vision client is not available.'}), 500

    print("No match by filename, proceeding with object detection.")
    try:
        # Read the image file for detection
        content = file.read()
        image = vision.Image(content=content)


        # Run label detection
        response = vision_client.label_detection(image=image)
        labels = response.label_annotations

        # Process the results
        detected_objects = []
        for label in labels:
            detected_objects.append(label.description)


        # For now, let's just return a generic object detection response
        # (You can refine this part later to match detected objects to your products_db)
        return jsonify({
            'source': 'object_detection',
            'objects_detected': detected_objects
        })

    except Exception as e:
        print(f"Error during object detection: {e}")
        return jsonify({'error': f"An error occurred during image processing: {e}"}), 500

if __name__ == '__main__':
    # Make sure to run on 0.0.0.0 to be accessible from outside the Docker container
    app.run(host='0.0.0.0', port=5001)
