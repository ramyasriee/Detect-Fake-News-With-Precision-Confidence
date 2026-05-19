"""
app.py
======
Fake News Detection — Streamlit Web Application

Run with:
    streamlit run app.py

Requires:
    * fake_news_model.pkl    (produced by model_training.py)
    * model_metadata.json   (produced by model_training.py)
"""

import re
import math
import json
import string
import warnings
import os
import joblib
import streamlit as st
import nltk
from PIL import Image

warnings.filterwarnings("ignore")

# ---------------------------------------------------------------------------
# NLTK RESOURCE BOOTSTRAP
# ---------------------------------------------------------------------------
for resource in ("stopwords", "wordnet", "omw-1.4"):
    try:
        nltk.data.find(f"corpora/{resource}")
    except LookupError:
        nltk.download(resource, quiet=True)

from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer

_STOP_WORDS = set(stopwords.words("english"))
_LEMMATIZER = WordNetLemmatizer()

MODEL_PATH    = "fake_news_model.pkl"
METADATA_PATH = "model_metadata.json"


# ---------------------------------------------------------------------------
# TEXT PREPROCESSING  (mirrors model_training.py exactly)
# ---------------------------------------------------------------------------
def clean_text(text: str) -> str:
    text = text.lower()
    text = re.sub(r"http\S+|www\S+", "", text)
    text = text.translate(str.maketrans("", "", string.punctuation + string.digits))
    tokens = text.split()
    tokens = [_LEMMATIZER.lemmatize(t) for t in tokens if t not in _STOP_WORDS and len(t) > 2]
    return " ".join(tokens)


# ---------------------------------------------------------------------------
# BACKEND LOADERS  (cached — load once per session)
# ---------------------------------------------------------------------------
@st.cache_resource(show_spinner="Loading model …")
def load_model():
    try:
        return joblib.load(MODEL_PATH)
    except FileNotFoundError:
        return None


@st.cache_data(show_spinner=False)
def load_metadata() -> dict:
    """Load training metadata from JSON produced by model_training.py."""
    if os.path.exists(METADATA_PATH):
        with open(METADATA_PATH, "r") as f:
            return json.load(f)
    return {}


def get_confidence(model, cleaned_text: str):
    """
    Return (prediction, confidence_pct) using the right scoring method.
    PassiveAggressiveClassifier → decision_function → sigmoid.
    LogisticRegression          → predict_proba.
    """
    prediction = int(model.predict([cleaned_text])[0])
    try:
        proba = model.predict_proba([cleaned_text])[0]
        confidence = float(max(proba)) * 100
    except AttributeError:
        decision = model.decision_function([cleaned_text])[0]
        confidence = (1 / (1 + math.exp(-abs(decision)))) * 100
    return prediction, confidence


# ---------------------------------------------------------------------------
# PAGE CONFIG
# ---------------------------------------------------------------------------
st.set_page_config(
    page_title="Fake News Detector",
    page_icon="🔍",
    layout="wide",
    initial_sidebar_state="expanded",
)

# ---------------------------------------------------------------------------
# CSS
# ---------------------------------------------------------------------------
st.markdown("""
<style>
    .stApp { background-color: #f0f4f8; }

    .card {
        background: #ffffff;
        border-radius: 16px;
        padding: 2rem 2.5rem;
        box-shadow: 0 4px 20px rgba(0,0,0,0.08);
        margin-bottom: 1.5rem;
    }

    .result-reliable {
        background: linear-gradient(135deg, #d4edda, #c3e6cb);
        border-left: 6px solid #28a745;
        border-radius: 10px;
        padding: 1.4rem 1.8rem;
        color: #155724;
        font-size: 1.2rem;
        font-weight: 700;
        margin-top: 1rem;
    }
    .result-fake {
        background: linear-gradient(135deg, #f8d7da, #f5c6cb);
        border-left: 6px solid #dc3545;
        border-radius: 10px;
        padding: 1.4rem 1.8rem;
        color: #721c24;
        font-size: 1.2rem;
        font-weight: 700;
        margin-top: 1rem;
    }

    .stat-box {
        background: #f8fafc;
        border: 1px solid #e2e8f0;
        border-radius: 12px;
        padding: 1rem;
        text-align: center;
    }
    .stat-val  { font-size: 1.6rem; font-weight: 700; color: #1e293b; }
    .stat-lbl  { font-size: 0.78rem; color: #64748b; margin-top: 2px; }

    div.stButton > button {
        background: linear-gradient(90deg, #4f8ef7, #2563eb);
        color: white;
        border: none;
        border-radius: 8px;
        padding: 0.6rem 2rem;
        font-size: 1rem;
        font-weight: 600;
        transition: opacity 0.2s;
    }
    div.stButton > button:hover { opacity: 0.85; }

    div[data-testid="metric-container"] {
        background: #f8fafc;
        border-radius: 10px;
        padding: 0.8rem;
        border: 1px solid #e2e8f0;
    }
</style>
""", unsafe_allow_html=True)


# ---------------------------------------------------------------------------
# LOAD BACKEND ASSETS
# ---------------------------------------------------------------------------
model    = load_model()
metadata = load_metadata()


# ---------------------------------------------------------------------------
# SIDEBAR — wired to real backend metadata
# ---------------------------------------------------------------------------
with st.sidebar:
    st.markdown("## 🔍 Fake News Detector")
    st.caption("Powered by scikit-learn · NLTK · Streamlit")
    st.divider()

    # ---- Model Info (from metadata) ----
    st.markdown("### 🤖 Active Model")
    if metadata:
        best = metadata.get("best_model", "N/A")
        badge_color = "#2563eb" if "Passive" in best else "#7c3aed"
        st.markdown(
            f'<div style="background:{badge_color};color:white;padding:0.4rem 0.8rem;'
            f'border-radius:8px;font-weight:600;font-size:0.9rem;text-align:center;">'
            f'{best}</div>',
            unsafe_allow_html=True,
        )
        st.markdown(
            f"**Accuracy:** `{metadata.get('best_accuracy', 'N/A')}%`  \n"
            f"**Trained:** {metadata.get('trained_at', 'N/A')}",
        )
    else:
        st.info("Run `model_training.py` to populate model info.")

    st.divider()

    # ---- Dataset Stats (from metadata) ----
    st.markdown("### 📊 Training Dataset")
    if metadata:
        c1, c2 = st.columns(2)
        c1.metric("Total Articles", f"{metadata.get('total_samples', 0):,}")
        c2.metric("Vocabulary",     f"{metadata.get('vocab_size', 0):,}")
        c3, c4 = st.columns(2)
        c3.metric("✅ Reliable",   f"{metadata.get('real_count', 0):,}")
        c4.metric("🚨 Fake",       f"{metadata.get('fake_count', 0):,}")
        st.markdown(
            f"**Train split:** {metadata.get('train_size', 0):,} samples  \n"
            f"**Test split:**  {metadata.get('test_size',  0):,} samples  \n"
            f"**N-gram range:** {metadata.get('ngram_range', [1,2])}  \n"
            f"**Max TF-IDF features:** {metadata.get('max_features', 0):,}"
        )
    else:
        st.info("No metadata found.")

    st.divider()

    # ---- Model Comparison (from metadata) ----
    st.markdown("### 🏆 Model Comparison")
    if metadata:
        pac_acc = metadata.get("pac_accuracy", 0)
        lr_acc  = metadata.get("lr_accuracy",  0)

        st.markdown("**PassiveAggressiveClassifier**")
        st.progress(int(pac_acc))
        st.caption(f"{pac_acc}% accuracy")

        st.markdown("**Logistic Regression**")
        st.progress(int(lr_acc))
        st.caption(f"{lr_acc}% accuracy")

    st.divider()

    # ---- NLP Pipeline explanation ----
    st.markdown("### ⚙️ NLP Pipeline")
    st.markdown("""
1. **Lowercase** raw text  
2. **Remove** URLs, punctuation, digits  
3. **Filter** stopwords (NLTK)  
4. **Lemmatize** tokens (WordNet)  
5. **TF-IDF** vectorize (unigrams + bigrams)  
6. **Classify** with trained model  
    """)


# ---------------------------------------------------------------------------
# MAIN CONTENT
# ---------------------------------------------------------------------------
if model is None:
    st.error(
        "**Model file not found.**  \n"
        "Run `python model_training.py` first to generate `fake_news_model.pkl`."
    )
    st.stop()

# ---- Header ----
st.markdown("""
<div class="card">
    <h1 style="margin:0;color:#1e293b;">🔍 Fake News Detector</h1>
    <p style="margin:0.5rem 0 0;color:#64748b;font-size:1rem;">
        Paste any news article below and the AI will classify it as
        <strong>Reliable</strong> or <strong>Fake</strong>, with a confidence score.
    </p>
</div>
""", unsafe_allow_html=True)

# ---- Live accuracy banner from backend ----
if metadata:
    best_acc  = metadata.get("best_accuracy", "?")
    best_name = metadata.get("best_model", "?").replace("Classifier", "")
    st.info(
        f"**Active model:** {best_name} &nbsp;|&nbsp; "
        f"**Test accuracy:** {best_acc}% &nbsp;|&nbsp; "
        f"**Trained on:** {metadata.get('total_samples', 0):,} articles",
        icon="🤖",
    )

# ---- Input area ----
st.markdown('<div class="card">', unsafe_allow_html=True)
st.markdown("#### Paste your news article here")
article = st.text_area(
    label="article_input",
    label_visibility="collapsed",
    placeholder="Enter or paste the full news article text …",
    height=260,
)
predict_clicked = st.button("🔎 Predict", use_container_width=True)
st.markdown('</div>', unsafe_allow_html=True)


# ---------------------------------------------------------------------------
# PREDICTION LOGIC — fully wired to backend model
# ---------------------------------------------------------------------------
if predict_clicked:
    if not article.strip():
        st.warning("Please paste some article text before clicking Predict.")
    else:
        with st.spinner("Analysing article …"):
            cleaned    = clean_text(article)
            prediction, confidence = get_confidence(model, cleaned)
            conf_label = f"{confidence:.1f}%"

        # ---- Result banner ----
        if prediction == 1:
            st.markdown(f"""
            <div class="result-reliable">
                ✅ &nbsp;This article appears to be
                <span style="font-size:1.35rem;"> RELIABLE</span>
                &nbsp;&nbsp;|&nbsp;&nbsp; Confidence: {conf_label}
            </div>""", unsafe_allow_html=True)
        else:
            st.markdown(f"""
            <div class="result-fake">
                🚨 &nbsp;This article appears to be
                <span style="font-size:1.35rem;"> FAKE</span>
                &nbsp;&nbsp;|&nbsp;&nbsp; Confidence: {conf_label}
            </div>""", unsafe_allow_html=True)

        st.markdown("---")

        # ---- Analysis detail metrics ----
        st.markdown("#### Analysis Details")
        word_count       = len(article.split())
        clean_word_count = len(cleaned.split())
        words_removed    = word_count - clean_word_count

        col1, col2, col3, col4 = st.columns(4)
        col1.metric("Original Words",   word_count)
        col2.metric("After Cleaning",   clean_word_count)
        col3.metric("Words Removed",    words_removed)
        col4.metric("Confidence Score", conf_label)

        # ---- Confidence bar ----
        st.markdown(f"**Prediction Confidence — {conf_label}**")
        st.progress(int(confidence))

        # ---- Confusion matrix images from real training ----
        if metadata:
            st.markdown("---")
            st.markdown("#### Model Evaluation (from training)")
            cm_tab1, cm_tab2 = st.tabs([
                f"🏆 {metadata.get('best_model','PAC')} (Best)",
                "📊 Logistic Regression"
            ])
            with cm_tab1:
                cm_path = metadata.get("cm_pac", "")
                if os.path.exists(cm_path):
                    st.image(Image.open(cm_path), caption=f"Confusion Matrix — {metadata.get('best_model','')}  |  Accuracy: {metadata.get('pac_accuracy','')}%")
                else:
                    st.caption("Confusion matrix image not found. Re-run model_training.py.")
            with cm_tab2:
                cm_path = metadata.get("cm_lr", "")
                if os.path.exists(cm_path):
                    st.image(Image.open(cm_path), caption=f"Confusion Matrix — Logistic Regression  |  Accuracy: {metadata.get('lr_accuracy','')}%")
                else:
                    st.caption("Confusion matrix image not found. Re-run model_training.py.")
