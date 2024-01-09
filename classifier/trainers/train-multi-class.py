import pandas as pd
import numpy as np
from sklearn.model_selection import StratifiedKFold
from sklearn.metrics import accuracy_score, precision_recall_fscore_support
from transformers import BertTokenizer, BertForSequenceClassification, AdamW
from torch.utils.data import Dataset, DataLoader
import torch
import tqdm

# Load the dataset
file_path = '/content/drive/MyDrive/Colab Notebooks/dataset.tsv'
df = pd.read_csv(file_path, sep='\t')

# Preprocessing
tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')

class TextDataset(Dataset):
    def __init__(self, texts, labels):
        self.texts = texts
        self.labels = labels

    def __len__(self):
        return len(self.texts)

    def __getitem__(self, idx):
        text = self.texts[idx]
        inputs = tokenizer.encode_plus(
            text,
            None,
            add_special_tokens=True,
            max_length=256,
            padding='max_length',
            return_token_type_ids=True,
            truncation=True
        )
        ids = inputs['input_ids']
        mask = inputs['attention_mask']

        return {
            'ids': torch.tensor(ids, dtype=torch.long),
            'mask': torch.tensor(mask, dtype=torch.long),
            'labels': torch.tensor(self.labels[idx], dtype=torch.long)
        }

# Encode labels
label_dict = {}
for index, possible_label in enumerate(df['Pattern Category'].unique()):
    label_dict[possible_label] = index
df['encoded_labels'] = df['Pattern Category'].replace(label_dict)

# 5-Fold Cross-Validation
skf = StratifiedKFold(n_splits=5)
fold_performance = {}

for fold, (train_idx, test_idx) in enumerate(skf.split(df, df['encoded_labels'])):
    print(f"FOLD {fold}")
    print("--------------------------------")

    # Split data
    train_data, test_data = df.iloc[train_idx], df.iloc[test_idx]

    # Create datasets
    training_set = TextDataset(train_data['text'].to_numpy(), train_data['encoded_labels'].to_numpy())
    testing_set = TextDataset(test_data['text'].to_numpy(), test_data['encoded_labels'].to_numpy())

    # Create loaders
    train_params = {'batch_size': 16, 'shuffle': True, 'num_workers': 0}
    test_params = {'batch_size': 16, 'shuffle': False, 'num_workers': 0}
    training_loader = DataLoader(training_set, **train_params)
    testing_loader = DataLoader(testing_set, **test_params)

    # Load BERT model
    model = BertForSequenceClassification.from_pretrained('bert-base-uncased', num_labels=len(label_dict))
    model.to('cuda')

    # Optimizer
    optimizer = AdamW(params=model.parameters(), lr=1e-5)

    # Training loop
    for epoch in range(4):
        model.train()
        total_loss, total_accuracy = 0, 0

        # Training
        for _, data in tqdm.tqdm(enumerate(training_loader, 0)):
            ids = data['ids'].to('cuda', dtype=torch.long)
            mask = data['mask'].to('cuda', dtype=torch.long)
            labels = data['labels'].to('cuda', dtype=torch.long)

            optimizer.zero_grad()
            loss, logits = model(ids, mask, labels=labels).values()

            total_loss += loss.item()
            loss.backward()
            optimizer.step()

        # Evaluation
        model.eval()
        total_eval_accuracy = 0
        total_eval_precision = 0
        total_eval_recall = 0
        total_eval_f1 = 0

        with torch.no_grad():
            for _, data in tqdm.tqdm(enumerate(testing_loader, 0)):
                ids = data['ids'].to('cuda', dtype=torch.long)
                mask = data['mask'].to('cuda', dtype=torch.long)
                labels = data['labels'].to('cuda', dtype=torch.long)

                output = model(ids, mask)
                logits = output.logits
                logits = logits.detach().cpu().numpy()
                label_ids = labels.to('cpu').numpy()

                predictions = np.argmax(logits, axis=1)
                accuracy = accuracy_score(label_ids, predictions)
                precision, recall, f1, _ = precision_recall_fscore_support(label_ids, predictions, average='weighted')

                total_eval_accuracy += accuracy
                total_eval_precision += precision
                total_eval_recall += recall
                total_eval_f1 += f1

        avg_val_accuracy = total_eval_accuracy / len(testing_loader)
        avg_val_precision = total_eval_precision / len(testing_loader)
        avg_val_recall = total_eval_recall / len(testing_loader)
        avg_val_f1 = total_eval_f1 / len(testing_loader)
        fold_performance[f'Fold {fold} Epoch {epoch}'] = {
            'Accuracy': avg_val_accuracy,
            'Precision': avg_val_precision,
            'Recall': avg_val_recall,
            'F1 Score': avg_val_f1
        }
        print(f"Epoch {epoch} - Accuracy: {avg_val_accuracy}, Precision: {avg_val_precision}, Recall: {avg_val_recall}, F1: {avg_val_f1}")

# Displaying fold performance
print("\nFold Performance:")
for key, value in fold_performance.items():
    print(f"{key}: {value}")

# Final Training on Complete Data
final_train_set = TextDataset(df['text'].to_numpy(), df['encoded_labels'].to_numpy())
final_train_params = {'batch_size': 16, 'shuffle': True, 'num_workers': 0}
final_training_loader = DataLoader(final_train_set, **final_train_params)

# Reinitialize the model
model = BertForSequenceClassification.from_pretrained('bert-base-uncased', num_labels=len(label_dict))
model.to('cuda')

# Reinitialize the optimizer with the best hyperparameters (if identified during cross-validation)
optimizer = AdamW(params=model.parameters(), lr=1e-5)

# Final training
model.train()
for epoch in range(4):
    for _, data in tqdm.tqdm(enumerate(final_training_loader, 0)):
        ids = data['ids'].to('cuda', dtype=torch.long)
        mask = data['mask'].to('cuda', dtype=torch.long)
        labels = data['labels'].to('cuda', dtype=torch.long)

        optimizer.zero_grad()
        loss, _ = model(ids, mask, labels=labels).values()
        loss.backward()
        optimizer.step()

# Save the final model
torch.save(model.state_dict(), 'bert_dark_pattern_classification.pth')
print("Model training complete and saved.")
