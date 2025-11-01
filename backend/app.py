
import os
from flask import Flask, request, jsonify
import tensorflow as tf
import numpy as np
from PIL import Image
import cv2

# Suppress TensorFlow logging
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'

# Load the pre-trained model from TensorFlow Hub
model = tf.saved_model.load("https://tfhub.dev/tensorflow/ssd_mobilenet_v2/2")

app = Flask(__name__)

@app.route('/identify', methods=['POST'])
def identify_objects():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    try:
        # Read the image file
        image = Image.open(file.stream)
        image_np = np.array(image)

        # Add a batch dimension
        input_tensor = tf.convert_to_tensor(image_np)
        input_tensor = input_tensor[tf.newaxis, ...]

        # Run inference
        detections = model(input_tensor)

        # Process the results
        num_detections = int(detections.pop('num_detections'))
        detections = {key: value[0, :num_detections].numpy() for key, value in detections.items()}
        detections['num_detections'] = num_detections

        # Convert detection classes to integers
        detections['detection_classes'] = detections['detection_classes'].astype(np.int64)

        # For now, let's just return the number of objects detected
        return jsonify({'objects_detected': int(num_detections)})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5001)
