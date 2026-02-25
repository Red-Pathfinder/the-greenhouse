from langchain_community.llms import Ollama
from langchain_community.embeddings import OllamaEmbeddings
from langchain_community.vectorstores import FAISS
from langchain_core.documents import Document
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough


def create_vectorstore(text_chunks, model_name):
    embeddings = OllamaEmbeddings(model=model_name)
    documents = [Document(page_content=text) for text in text_chunks]
    vectorstore = FAISS.from_documents(documents, embedding=embeddings)
    return vectorstore


def create_qa_chain(vectorstore, model_name):
    llm = Ollama(model=model_name)
    retriever = vectorstore.as_retriever()

    prompt = PromptTemplate.from_template(
        "Answer the question based only on the context.\n"
        "Context: {context}\n"
        "Question: {question}"
    )

    def format_docs(docs):
        return "\n\n".join(doc.page_content for doc in docs)

    chain = (
        {
            "context": retriever | format_docs,
            "question": RunnablePassthrough(),
        }
        | prompt
        | llm
        | StrOutputParser()
    )

    return chain