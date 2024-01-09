
import torch
from torch.utils.data import DataLoader, TensorDataset, RandomSampler, SequentialSampler
from transformers import BertTokenizer, BertForSequenceClassification, AdamW
from sklearn.metrics import accuracy_score, precision_recall_fscore_support
from sklearn.model_selection import StratifiedKFold
import numpy as np
import pandas as pd

# Load the dataset
file_path = '../dataset/dataset.tsv'
dataset = pd.read_csv(file_path, delimiter='\t')

# Tokenization and encoding the dataset
tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
encoded_data = tokenizer.batch_encode_plus(dataset['text'].tolist(),
                                           add_special_tokens=True,
                                           return_attention_mask=True,
                                           pad_to_max_length=True,
                                           max_length=256,
                                           return_tensors='pt')

input_ids = encoded_data['input_ids']
attention_masks = encoded_data['attention_mask']
labels = torch.tensor(dataset['label'].values)

# Use GPU acceleration if available
if torch.backends.mps.is_available():
    device = "mps"
elif torch.cuda.is_available():
    device = "cuda"
else:
    device = "cpu"

# Training loop
epochs = 4
performance_metrics = []  # To record performance metrics for each fold

skf = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
for fold, (train_idx, val_idx) in enumerate(skf.split(dataset, labels)):
    print(f"Starting fold {fold+1}...")

    # Split the data into training and validation sets for this fold
    train_inputs, val_inputs = input_ids[train_idx], input_ids[val_idx]
    train_labels, val_labels = labels[train_idx], labels[val_idx]
    train_masks, val_masks = attention_masks[train_idx], attention_masks[val_idx]

    # Create DataLoaders for training and validation sets
    train_data = TensorDataset(train_inputs, train_masks, train_labels)
    train_sampler = RandomSampler(train_data)
    train_dataloader = DataLoader(
        train_data, sampler=train_sampler, batch_size=32)

    val_data = TensorDataset(val_inputs, val_masks, val_labels)
    val_sampler = SequentialSampler(val_data)
    val_dataloader = DataLoader(val_data, sampler=val_sampler, batch_size=32)

    # Reset the model for each fold
    model = BertForSequenceClassification.from_pretrained(
        'bert-base-uncased', num_labels=2, output_attentions=False, output_hidden_states=False)
    model.to(device)
    optimizer = AdamW(model.parameters(), lr=1e-5)

    for epoch in range(epochs):
        print(f"    Epoch {epoch+1}/{epochs}...")

        # Training phase
        model.train()
        train_loss = 0
        for step, batch in enumerate(train_dataloader):
            if step % 10 == 0 and not step == 0:
                print(f'        Batch {step} of {len(train_dataloader)}.')

            model.zero_grad()
            batch = tuple(b.to(device) for b in batch)

            inputs = {
                'input_ids': batch[0], 'attention_mask': batch[1], 'labels': batch[2]}
            outputs = model(**inputs)
            loss = outputs[0]
            train_loss += loss.item()
            loss.backward()
            optimizer.step()

        avg_train_loss = train_loss / len(train_dataloader)
        print(f"        Average training loss: {avg_train_loss}")

        # Validation phase
        model.eval()
        val_loss, val_accuracy = 0, 0
        val_preds, val_true = [], []

        for batch in val_dataloader:
            batch = tuple(b.to(device) for b in batch)
            inputs = {
                'input_ids': batch[0], 'attention_mask': batch[1], 'labels': batch[2]}

            with torch.no_grad():
                outputs = model(**inputs)

            logits = outputs[1]
            logits = logits.detach().cpu().numpy()
            label_ids = inputs['labels'].cpu().numpy()

            val_preds.append(logits)
            val_true.append(label_ids)

        val_preds = np.concatenate(val_preds, axis=0)
        val_true = np.concatenate(val_true, axis=0)
        val_preds_flat = np.argmax(val_preds, axis=1).flatten()
        val_true_flat = val_true.flatten()

        val_accuracy = accuracy_score(val_true_flat, val_preds_flat)
        val_precision, val_recall, val_f1, _ = precision_recall_fscore_support(
            val_true_flat, val_preds_flat, average='binary')
        performance_metrics.append(
            (val_accuracy, val_precision, val_recall, val_f1))

        print(f"        Validation Accuracy: {val_accuracy}")
        print(f"        Precision: {val_precision}")
        print(f"        Recall: {val_recall}")
        print(f"        F1 Score: {val_f1}")

# Save the trained model
torch.save(model.state_dict(),
           '../pickles/bert/bert_dark_pattern_classifier.pth')
print("Model saved as 'bert_dark_pattern_classifier.pth'")

# Print performance metrics for each fold
for fold, metrics in enumerate(performance_metrics):
    print(
        f"Fold {fold+1}: Accuracy: {metrics[0]}, Precision: {metrics[1]}, Recall: {metrics[2]}, F1 Score: {metrics[3]}")
