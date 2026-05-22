"""
streamlit_app.py
================
Fake News Detection — Streamlit Web Application

Run with:
    streamlit run streamlit_app.py

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
        "Train the model by running `python model_training.py` in the same folder."
    )
    st.stop()

st.title("Fake News Detection Dashboard")
st.write("Analyze a news article to estimate whether it is **reliable** or **fake**.")

article = st.text_area(
    "Paste article text here",
    height=240,
    placeholder="Paste a full article or long excerpt here..."
)

col1, col2 = st.columns([1, 3])
with col1:
    analyze = st.button("Analyze Article")

if analyze:
    if not article.strip():
        st.warning("Please enter some text to analyze.")
    else:
        with st.spinner("Analyzing article..."):
            cleaned = clean_text(article)
            prediction, confidence = get_confidence(model, cleaned)

        is_reliable = prediction == 1
        verdict_text = "RELIABLE" if is_reliable else "FAKE"
        result_class = "result-reliable" if is_reliable else "result-fake"
        confidence_label = f"Confidence: {confidence:.1f}%"

        st.markdown(
            f'<div class="{result_class}">'
            f'Article classified as <strong>{verdict_text}</strong><br>'
            f'{confidence_label}'
            f'</div>',
            unsafe_allow_html=True,
        )

        st.subheader("Analysis Preview")
        c1, c2 = st.columns(2)
        with c1:
            st.metric("Original words", len(article.split()))
        with c2:
            st.metric("Cleaned words", len(cleaned.split()))

        st.markdown("**Cleaned text preview**")
        st.code(cleaned[:1200] + ("..." if len(cleaned) > 1200 else ""))

        st.markdown("### Interpretation")
        if is_reliable:
            st.success(
                "The model found linguistic patterns more consistent with reliable reporting. "
                "Use this as a signal, not a fact check."
            )
        else:
            st.error(
                "The model found signals that often appear in fake or misleading articles. "
                "Verify the story with trusted sources."
            )

# ---------------------------------------------------------------------------
# FOOTER
# ---------------------------------------------------------------------------
st.markdown("---")
st.caption("Built with Streamlit · scikit-learn · NLTK")