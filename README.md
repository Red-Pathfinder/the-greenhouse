# 🌿 the Greenhouse

**A local AI garden for your documents.**

Plant a file.
Ask a question.
Wait a moment.

When the tree blooms…
the answer appears.

No cloud.
No tracking.
No one watching your garden but you.

---

## What is this?

The Greenhouse is a privacy-focused, offline AI assistant that reads your documents and answers questions.

Think of it like this:

1. You **plant a seed** → upload a document
2. The system **grows roots** → creates embeddings
3. You **ask something**
4. The tree **blooms** → you get your answer

All of this happens **locally on your machine**.

Your data never leaves your soil.

---

## What can it do?

* Upload **PDF / DOCX / Excel**
* Ask questions about your document
* Choose your plant species (model):

  * Llama3 
  * Gemma 
* Fully **offline**
* Lightweight interface
* Local semantic search using **FAISS**

No logins.
No ads.
No API keys.
No mysterious clouds hovering overhead.

---

## Tools inside the greenhouse

Built with:

* Flask
* Ollama (Llama3 / Gemma)
* LangChain
* FAISS
* HTML / CSS / JS

Simple tools. Honest tools. Soil-level engineering.

---

## Requirements

Before gardening, install:

* Python **3.10+** (3.11 recommended)
* Ollama

Get Ollama here:
https://ollama.com

Then pull your plants:

```bash
ollama pull llama3
ollama pull gemma
```

---

## How to grow it locally

Clone the garden:

```bash
git clone https://github.com/Red-Pathfinder/the-greenhouse.git
cd the-greenhouse
```

Create a virtual environment:

```bash
python -m venv venv
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Start the greenhouse:

```bash
python app.py
```

Open your browser:

```
http://127.0.0.1:5000
```

Now plant something.

---

## What happens behind the scenes?

```
You upload file
      ↓
Text is split into chunks
      ↓
Embeddings are created (roots)
      ↓
Stored in FAISS (soil memory)
      ↓
Your question searches relevant chunks
      ↓
LLM generates answer (bloom)
```

---

## ⚠️ Gardener Notes

* First upload may take time (root growing phase)
* Works best with documents under ~50–100 pages on CPU
* Bigger models = bigger plants = slower growth
* Designed for learning, experimenting, and local use

If it feels slow… your tree is thinking.

---

## Why this exists

Because intelligence shouldn’t always live in someone else’s server.

Because privacy should be normal.

Because sometimes you just want a quiet machine
that minds its own business.

Local intelligence.
Your data.
Your control.

---

## Author

Built by **Red-Pathfinder**

Growing strange little systems locally.
