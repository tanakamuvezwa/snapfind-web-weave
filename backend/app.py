
import os
import json
from flask import Flask, request, jsonify
from google.cloud import vision
import google.generativeai as genai
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

# --- Instantiate Generative AI Client ---
try:
    genai.configure(api_key=os.environ.get("GEMINI_API_KEY"))
    generative_model = genai.GenerativeModel('gemini-pro')
    print("Google Generative AI client instantiated successfully.")
except Exception as e:
    print(f"ERROR: Could not instantiate Google Generative AI client: {e}")
    generative_model = None

# --- Flask App ---
app = Flask(__name__)

def generate_description(product_name):
    if not generative_model:
        return "No description available."
    try:
        prompt = f"Write a short, compelling product description for a {product_name}. Make it sound like a listing on a marketplace."
        response = generative_model.generate_content(prompt)
        return response.text
    except Exception as e:
        print(f"Error generating description: {e}")
        return "No description available."

def suggest_price(product_name):
    if not generative_model:
        return "N/A"
    try:
        prompt = f"What is a reasonable price for a new {product_name}? Give me a single number, no currency symbols."
        response = generative_model.generate_content(prompt)
        return response.text
    except Exception as e:
        print(f"Error suggesting price: {e}")
        return "N/A"

@app.route('/identify', methods=['POST'])
def identify_objects():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']
    filename = file.filename

    if filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if products_db:
        matched_product = find_product_by_query(filename, products_db)
        if matched_product:
            description = generate_description(matched_product['name'])
            price = suggest_price(matched_product['name'])
            return jsonify({
                'source': 'filename',
                'product': matched_product,
                'description': description,
                'price': price
            })

    if vision_client is None:
        return jsonify({'error': 'Google Cloud Vision client is not available.'}), 500

    try:
        content = file.read()
        image = vision.Image(content=content)

        response = vision_client.object_localization(image=image)
        localized_object_annotations = response.localized_object_annotations

        if localized_object_annotations:
            main_object = localized_object_annotations[0].name
            description = generate_description(main_object)
            price = suggest_price(main_object)
            
            # For demonstration, we'll create a fake product object
            product = {
                "name": main_object,
                "keywords": [main_object.lower()]
            }
            
            return jsonify({
                'source': 'object_detection',
                'product': product,
                'description': description,
                'price': price
            })
        else:
            return jsonify({'error': 'No objects detected'}), 404

    except Exception as e:
        print(f"Error during object detection: {e}")
        return jsonify({'error': f"An error occurred during image processing: {e}"}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
