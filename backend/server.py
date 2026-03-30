from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)  # Allow React frontend to call this

UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# ---------------- Upload a video ----------------
@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files or 'name' not in request.form:
        return jsonify({'message': 'No file or name provided ❌'}), 400

    file = request.files['file']
    name = request.form['name']

    filename = f"{name}_{file.filename}"
    filepath = os.path.join(UPLOAD_FOLDER, filename)
    file.save(filepath)

    return jsonify({'message': f'File "{filename}" uploaded successfully ✅'})

# ---------------- List all uploaded videos ----------------
@app.route('/videos', methods=['GET'])
def list_videos():
    files = os.listdir(UPLOAD_FOLDER)
    files = [f for f in files if os.path.isfile(os.path.join(UPLOAD_FOLDER, f))]
    return jsonify({'videos': files})

# ---------------- Serve uploaded video files ----------------
@app.route('/uploads/<filename>')
def serve_file(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)

# ---------------- Delete a video ----------------
@app.route('/delete/<filename>', methods=['DELETE'])
def delete_file(filename):
    filepath = os.path.join(UPLOAD_FOLDER, filename)
    if os.path.exists(filepath):
        os.remove(filepath)
        return jsonify({'message': f'{filename} deleted ✅'})
    else:
        return jsonify({'message': 'File not found ❌'}), 404

if __name__ == '__main__':
    app.run(debug=True, port=5000)