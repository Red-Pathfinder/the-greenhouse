import os
import pandas as pd
from pypdf import PdfReader
from docx import Document
from langchain_text_splitters import RecursiveCharacterTextSplitter


def load_pdf(path):
    text = ""
    reader = PdfReader(path)
    for page in reader.pages:
        text += page.extract_text() or ""
    return text


def load_docx(path):
    doc = Document(path)
    return "\n".join([para.text for para in doc.paragraphs])


def load_excel(path):
    text = ""
    xls = pd.ExcelFile(path)
    for sheet in xls.sheet_names:
        df = xls.parse(sheet)
        text += df.to_string()
    return text


def load_file(filepath):
    ext = os.path.splitext(filepath)[1].lower()

    if ext == ".pdf":
        return load_pdf(filepath)
    elif ext == ".docx":
        return load_docx(filepath)
    elif ext in [".xls", ".xlsx"]:
        return load_excel(filepath)
    else:
        return ""


def split_text(text):
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=500,
        chunk_overlap=50
    )
    return splitter.split_text(text)