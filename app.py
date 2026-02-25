from flask import Flask, render_template, request, jsonify
import os

from utils.file_loader import load_file, split_text
from models.llm import create_vectorstore, create_qa_chain

app = Flask(__name__)
UPLOAD_FOLDER = "uploads"
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

vectorstore = None
qa_chain = None

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/upload", methods=["POST"])
def upload_file():
    global vectorstore, qa_chain

    file = request.files["file"]
    model_name = request.form["model"]

    filepath = os.path.join(app.config["UPLOAD_FOLDER"], file.filename)
    file.save(filepath)

    text = load_file(filepath)
    chunks = split_text(text)

    vectorstore = create_vectorstore(chunks, model_name)
    qa_chain = create_qa_chain(vectorstore, model_name)

    print("File processed. QA chain created.")

    return jsonify({"message": "File processed successfully"})

@app.route("/ask", methods=["POST"])
def ask():
    global qa_chain

    if qa_chain is None:
        return jsonify({"error": "Upload a file first!"})

    question = request.json["question"]
    answer = qa_chain.invoke(question)

    return jsonify({"answer": answer})

if __name__ == "__main__":
    app.run(debug=True)