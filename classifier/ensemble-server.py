from utils.word_cloud import generate_word_cloud
from predictors.dark_pattern import predict_dark_pattern
from flask import Flask, request, jsonify
import matplotlib

app = Flask(__name__)

@app.route('/', methods=['GET'])
def hello_world():
    return jsonify("Server is running")

@app.route('/ai/detect', methods=['POST'])
def detect_patterns():
    data = request.json

    print(data)

    url= data.get('url', '')
    texts = data.get('texts', [])
    publish = data.get('publish', False)

    try:
        detected_patterns = predict_dark_pattern(texts)
        word_cloud = generate_word_cloud(' '.join(detected_patterns.keys()))

        if publish:
            # Connect to mongodb and push the response object.
            print("Pushing the response object to database...")
            response = {
                "url": url,
                "patterns": detected_patterns,
                "word_cloud": word_cloud
            }
            return jsonify(response)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    response = {
        "patterns": detected_patterns,
    }

    return jsonify(response)

if __name__ == '__main__':
    matplotlib.use('agg')
    app.run(debug=True, host='0.0.0.0', port=5001)
