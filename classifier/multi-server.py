from flask import Flask, request, jsonify
import torch
from transformers import BertTokenizer, BertForSequenceClassification
from utils.rules import isPriceListing
from utils.word_cloud import generate_word_cloud
import matplotlib

app = Flask(__name__)

tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
model_path = './pickles/bert_multi_class.pth'
label_dict = {
    'Urgency': 0,
    'Not Dark Pattern': 1,
    'Scarcity': 2,
    'Misdirection': 3,
    'Social Proof': 4,
    'Obstruction': 5,
    'Sneaking': 6,
    'Forced Action': 7
}
model = BertForSequenceClassification.from_pretrained(
    'bert-base-uncased', num_labels=len(label_dict))
model.load_state_dict(torch.load(model_path, map_location=torch.device('cpu')))
model.eval()


def predict_category(text):
    inputs = tokenizer.encode_plus(
        text,
        None,
        add_special_tokens=True,
        max_length=256,
        padding='max_length',
        return_token_type_ids=True,
        truncation=True
    )
    ids = torch.tensor(inputs['input_ids'], dtype=torch.long).unsqueeze(0)
    mask = torch.tensor(inputs['attention_mask'],
                        dtype=torch.long).unsqueeze(0)

    with torch.no_grad():
        outputs = model(ids, mask)
        predictions = torch.argmax(outputs.logits, dim=1)

    for key, value in label_dict.items():
        if value == predictions.item():
            return key
    return "No category predicted"


@app.route('/wordcloud', methods=['POST'])
def get_word_cloud():
    data = request.json
    detected_patterns = data['texts']
    word_cloud = generate_word_cloud(' '.join(detected_patterns))
    return jsonify(word_cloud)


@app.route('/predict', methods=['POST'])
def detect():
    if not request.is_json:
        return jsonify({"error": "Request does not contain JSON data"}), 400

    data = request.json
    if not data or 'texts' not in data:
        return jsonify({"error": "Missing 'texts' field in JSON payload"}), 400

    # Check if 'texts' is a list
    if not isinstance(data['texts'], list):
        return jsonify({'error': "'texts' must be a list"}), 400

    # Check if the text is a price listing
    non_price_texts = [text for text in data['texts']
                       if not isPriceListing(text)]
    # Process each text and make predictions
    results = {text: predict_category(text) for text in non_price_texts}

    # Store only valid dark patterns to respond with.
    dark_pattern_results = {}

    for text in results:
        if results[text] != 'Not Dark Pattern':
            dark_pattern_results[text] = results[text]

    # Check if response dict is empty or contains only non-dark patterns
    if not dark_pattern_results:
        error = {
            "error": True,
            'message': 'No dark patterns found on this website.'
        }
        return jsonify(error)

    return jsonify(dark_pattern_results)


@app.route('/', methods=['GET'])
def hello_world():
    return jsonify("Server is running")


if __name__ == '__main__':
    matplotlib.use('agg')
    app.run(debug=True, host='0.0.0.0', port=5001)
