import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import StratifiedKFold, GridSearchCV
from sklearn.ensemble import VotingClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC
from sklearn.metrics import classification_report
from sklearn.pipeline import Pipeline
import numpy as np
import pickle

# Load your dataset
file_path = '../dataset/dataset.tsv'
dataset = pd.read_csv(file_path, sep='\t')

# Data Preparation
dark_patterns = dataset[dataset['label'] == 1]
X = dark_patterns['text']
y = dark_patterns['Pattern Category']

# Feature Extraction
tfidf_vectorizer = TfidfVectorizer(stop_words='english', max_features=5000)

# Base Classifiers
log_reg = LogisticRegression(random_state=0)
random_forest = RandomForestClassifier(random_state=0)
svm = SVC(random_state=0)

# Ensemble Voting Classifier
voting_clf = VotingClassifier(
    estimators=[
        ('lr', log_reg),
        ('rf', random_forest),
        ('svm', svm)
    ],
    voting='hard'
)

# Stratified K-Fold Cross-Validation
# Reduced number of splits
skf = StratifiedKFold(n_splits=3, shuffle=True, random_state=0)

# Performance Metrics Storage
performance_metrics = []

# Perform Stratified K-Fold Cross-Validation
for fold, (train_index, test_index) in enumerate(skf.split(X, y)):
    X_train, X_test = X.iloc[train_index], X.iloc[test_index]
    y_train, y_test = y.iloc[train_index], y.iloc[test_index]

    pipeline = Pipeline([
        ('tfidf', tfidf_vectorizer),
        ('clf', voting_clf)
    ])

    pipeline.fit(X_train, y_train)
    predictions = pipeline.predict(X_test)
    report = classification_report(
        y_test, predictions, output_dict=True, zero_division=1)
    performance_metrics.append(report)

""" # Averaging performance metrics
avg_performance = {metric: np.mean([fold.get(metric, {'f1-score': 0})['f1-score'] for fold in performance_metrics])
                   for metric in set().union(*performance_metrics)}

# Print the averaged performance metrics
print("Averaged Performance Metrics:")
for metric, score in avg_performance.items():
    print(f"{metric}: {score}")
 """

# Averaging performance metrics
avg_performance = {}
metrics_of_interest = ['precision', 'recall', 'f1-score', 'support']

# Initialize average performance dictionary
for metric in metrics_of_interest:
    avg_performance[metric] = []

# Iterate over each fold's metrics
for fold_metrics in performance_metrics:
    for metric in metrics_of_interest:
        # Check if the metric exists in this fold
        if metric in fold_metrics['weighted avg']:
            avg_performance[metric].append(
                fold_metrics['weighted avg'][metric])
        else:
            # Default to 0 if metric not present
            avg_performance[metric].append(0)

# Calculate the mean for each metric
for metric in avg_performance:
    avg_performance[metric] = np.mean(avg_performance[metric])

# Print the averaged performance metrics
print("Averaged Performance Metrics:")
for metric, score in avg_performance.items():
    print(f"{metric}: {score}")

# Save the model
model_filename = '../pickles/ensemble/ensemble-category.pkl'
with open(model_filename, 'wb') as file:
    pickle.dump(pipeline, file)

print(f"Model saved as {model_filename}")
