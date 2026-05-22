"""
model_training.py
=================
Fake News Detection — Model Training Script

NLP Techniques Used:
--------------------
1. Text Cleaning     : Lowercasing, punctuation removal, stopword removal,
                       and lemmatization to normalise raw text.
2. TF-IDF            : Term Frequency–Inverse Document Frequency converts
                       cleaned text into numerical feature vectors.
                       Unigrams + bigrams (n-grams 1–2) capture single words
                       and two-word phrases, giving richer context.
3. Models Compared   :
   - PassiveAggressiveClassifier : An online learning algorithm that "passively"
     accepts correctly classified samples but "aggressively" updates weights on
     misclassified ones — very fast and accurate for text classification.
   - Logistic Regression         : A probabilistic baseline that also returns
     calibrated confidence scores.

Dataset: Kaggle Fake-News dataset
  True.csv  → label 1 (Reliable)
  Fake.csv  → label 0 (Fake)
Download from: https://www.kaggle.com/datasets/clmentbisaillon/fake-and-real-news-dataset
Place both CSV files in the same folder as this script.
"""

import os
import re
import string
import warnings
import json
import joblib
import pandas as pd
import numpy as np
import nltk
from datetime import datetime

from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import PassiveAggressiveClassifier, LogisticRegression
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report
from sklearn.pipeline import Pipeline

import matplotlib
matplotlib.use("Agg")          # non-interactive backend — safe for scripts
import matplotlib.pyplot as plt
import seaborn as sns

warnings.filterwarnings("ignore")

# ---------------------------------------------------------------------------
# 1. NLTK RESOURCE DOWNLOAD
# ---------------------------------------------------------------------------
for resource in ("stopwords", "wordnet", "omw-1.4"):
    try:
        nltk.data.find(f"corpora/{resource}")
    except LookupError:
        nltk.download(resource, quiet=True)

from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer

STOP_WORDS = set(stopwords.words("english"))
LEMMATIZER = WordNetLemmatizer()


# ---------------------------------------------------------------------------
# 2. TEXT PREPROCESSING
# ---------------------------------------------------------------------------
def clean_text(text: str) -> str:
    """
    Full preprocessing pipeline for a single document:
      1. Lowercase
      2. Remove URLs
      3. Remove punctuation & digits
      4. Tokenise
      5. Remove stopwords
      6. Lemmatize
    """
    # Lowercase
    text = text.lower()
    # Remove URLs
    text = re.sub(r"http\S+|www\S+", "", text)
    # Remove punctuation and digits
    text = text.translate(str.maketrans("", "", string.punctuation + string.digits))
    # Tokenise (simple whitespace split — no extra dependency needed)
    tokens = text.split()
    # Remove stopwords and lemmatize
    tokens = [LEMMATIZER.lemmatize(t) for t in tokens if t not in STOP_WORDS and len(t) > 2]
    return " ".join(tokens)


# ---------------------------------------------------------------------------
# 3. LOAD & PREPARE DATASET
# ---------------------------------------------------------------------------
def load_dataset(true_path: str = "True.csv", fake_path: str = "Fake.csv") -> pd.DataFrame:
    """Loads True.csv and Fake.csv, assigns labels, and returns a combined DataFrame."""
    if not os.path.exists(true_path) or not os.path.exists(fake_path):
        raise FileNotFoundError(
            "Dataset files not found!\n"
            "Please download True.csv and Fake.csv from:\n"
            "  https://www.kaggle.com/datasets/clmentbisaillon/fake-and-real-news-dataset\n"
            f"and place them in: {os.path.abspath('.')}"
        )

    df_true = pd.read_csv(true_path)
    df_fake = pd.read_csv(fake_path)

    df_true["label"] = 1   # Reliable
    df_fake["label"] = 0   # Fake

    df = pd.concat([df_true, df_fake], ignore_index=True)

    # Combine title + body for richer signal
    if "title" in df.columns and "text" in df.columns:
        df["content"] = df["title"].fillna("") + " " + df["text"].fillna("")
    elif "text" in df.columns:
        df["content"] = df["text"].fillna("")
    else:
        raise ValueError("Expected a 'text' column in the dataset CSV files.")

    print(f"Dataset loaded  — Total samples : {len(df)}")
    print(f"  Reliable (1)  : {(df['label'] == 1).sum()}")
    print(f"  Fake     (0)  : {(df['label'] == 0).sum()}\n")
    return df


# ---------------------------------------------------------------------------
# 4. BUILD, TRAIN & EVALUATE A MODEL INSIDE A PIPELINE
# ---------------------------------------------------------------------------
def build_and_evaluate(X_train, X_test, y_train, y_test, model, model_name: str):
    """
    Builds a TF-IDF + classifier Pipeline, trains it, prints metrics,
    saves a confusion-matrix plot, and returns (pipeline, accuracy, vocab_size).
    """
    pipeline = Pipeline([
        ("tfidf", TfidfVectorizer(
            max_features=100_000,   # vocabulary cap
            ngram_range=(1, 2),     # unigrams + bigrams
            sublinear_tf=True,      # log-scaling of TF scores
            min_df=2,               # ignore very rare terms
            max_df=0.95,            # ignore very common terms
        )),
        ("clf", model),
    ])

    print(f"{'='*60}")
    print(f"  Training: {model_name}")
    print(f"{'='*60}")
    pipeline.fit(X_train, y_train)
    y_pred = pipeline.predict(X_test)

    acc = accuracy_score(y_test, y_pred)
    print(f"  Accuracy  : {acc:.4f}  ({acc*100:.2f}%)\n")
    print("  Classification Report:")
    print(classification_report(y_test, y_pred, target_names=["Fake", "Reliable"]))

    # --- Confusion matrix plot ---
    cm = confusion_matrix(y_test, y_pred)
    fig, ax = plt.subplots(figsize=(5, 4))
    sns.heatmap(cm, annot=True, fmt="d", cmap="Blues",
                xticklabels=["Fake", "Reliable"],
                yticklabels=["Fake", "Reliable"], ax=ax)
    ax.set_title(f"Confusion Matrix — {model_name}")
    ax.set_ylabel("Actual")
    ax.set_xlabel("Predicted")
    plt.tight_layout()
    plot_path = f"confusion_matrix_{model_name.replace(' ', '_')}.png"
    plt.savefig(plot_path, dpi=150)
    plt.close()
    print(f"  Confusion matrix saved → {plot_path}\n")

    # Retrieve vocabulary size from the fitted TF-IDF vectorizer
    vocab_size = len(pipeline.named_steps["tfidf"].vocabulary_)

    return pipeline, acc, vocab_size


# ---------------------------------------------------------------------------
# 5. MAIN
# ---------------------------------------------------------------------------
def main():
    # -- Load data
    df = load_dataset("True.csv", "Fake.csv")
    total_samples = len(df)
    fake_count    = int((df["label"] == 0).sum())
    real_count    = int((df["label"] == 1).sum())

    # -- Clean text (can take a minute on large datasets)
    print("Cleaning text … (this may take a moment)")
    df["clean_content"] = df["content"].apply(clean_text)
    print("Text cleaning complete.\n")

    X = df["clean_content"]
    y = df["label"]

    # -- Train / test split  (80 / 20, stratified)
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.20, random_state=42, stratify=y
    )
    print(f"Train size: {len(X_train)} | Test size: {len(X_test)}\n")

    # -- Model 1 : PassiveAggressiveClassifier
    pac_pipeline, pac_acc, pac_vocab = build_and_evaluate(
        X_train, X_test, y_train, y_test,
        PassiveAggressiveClassifier(max_iter=1000, random_state=42, C=0.5),
        "PassiveAggressiveClassifier"
    )

    # -- Model 2 : Logistic Regression
    lr_pipeline, lr_acc, lr_vocab = build_and_evaluate(
        X_train, X_test, y_train, y_test,
        LogisticRegression(max_iter=1000, random_state=42, C=1.0, solver="lbfgs"),
        "LogisticRegression"
    )

    # -- Choose best model (by accuracy) and save
    best_pipeline = pac_pipeline if pac_acc >= lr_acc else lr_pipeline
    best_name     = "PassiveAggressiveClassifier" if pac_acc >= lr_acc else "LogisticRegression"
    best_vocab    = pac_vocab if pac_acc >= lr_acc else lr_vocab
    print(f"Best model: {best_name}  (accuracy={max(pac_acc, lr_acc):.4f})")

    model_path = "fake_news_model.pkl"
    joblib.dump(best_pipeline, model_path)
    print(f"Model saved → {model_path}")

    # -- Save metadata so app.py can display real stats in the UI
    metadata = {
        "best_model":       best_name,
        "pac_accuracy":     round(pac_acc * 100, 2),
        "lr_accuracy":      round(lr_acc  * 100, 2),
        "best_accuracy":    round(max(pac_acc, lr_acc) * 100, 2),
        "total_samples":    total_samples,
        "fake_count":       fake_count,
        "real_count":       real_count,
        "train_size":       len(X_train),
        "test_size":        len(X_test),
        "vocab_size":       best_vocab,
        "ngram_range":      [1, 2],
        "max_features":     100000,
        "trained_at":       datetime.now().strftime("%Y-%m-%d %H:%M"),
        "cm_pac":           "confusion_matrix_PassiveAggressiveClassifier.png",
        "cm_lr":            "confusion_matrix_LogisticRegression.png",
    }
    metadata_path = "model_metadata.json"
    with open(metadata_path, "w") as f:
        json.dump(metadata, f, indent=2)
    print(f"Metadata saved → {metadata_path}")


if __name__ == "__main__":
    main()
