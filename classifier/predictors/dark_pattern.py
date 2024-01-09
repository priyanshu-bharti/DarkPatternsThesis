import pickle
import torch
from transformers import logging, BertTokenizer, BertForSequenceClassification
from utils.rules import isPriceListing
logging.set_verbosity_error()


def binary_classification(texts):
    # Load the model
    model_path = './pickles/bert/bert_dark_pattern_classifier.pth'
    model = BertForSequenceClassification.from_pretrained(
        'bert-base-uncased', num_labels=2)

    # Use GPU acceleration if available
    if torch.backends.mps.is_available():
        device = "mps"
    elif torch.cuda.is_available():
        device = "cuda"
    else:
        device = "cpu"

    # Load the state dict and evaluate the model
    model.load_state_dict(torch.load(
        model_path, map_location=torch.device(device)))
    model.eval()

    # Load tokenizer
    tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')

    # # Read input data
    lines = [line.strip() for line in texts]

    # Tokenize and predict
    predictions = []
    for line in lines:
        inputs = tokenizer(line, return_tensors="pt",
                           padding=True, truncation=True, max_length=512)
        with torch.no_grad():
            outputs = model(**inputs)
        prediction = torch.argmax(outputs.logits, dim=1).item()
        predictions.append((prediction, line))

    # List of all true predictions
    valid_patterns = [
        text for pred, text in predictions if pred == 1 and not isPriceListing(text)]
    return valid_patterns


def predict_category(valid_patterns):
    # Load the trained model
    model_filename = './pickles/ensemble/ensemble-category.pkl'
    with open(model_filename, 'rb') as file:
        model = pickle.load(file)

    # Function to make predictions
    def make_predictions(texts, model): return model.predict(texts)

    # Make predictions
    final_predictions = make_predictions(valid_patterns, model)

    # Write the output
    results = dict(zip(valid_patterns, final_predictions))

    # Return the final predictions
    return results


def predict_dark_pattern(texts):
    return predict_category(binary_classification(texts))
