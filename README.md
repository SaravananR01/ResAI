# 📘 RAG with Node.js, LangChain, and pgvector

This project is a simple **Retrieval-Augmented Generation (RAG)** pipeline built with:
- **Node.js / Express** (backend server)
- **LangChain.js** (for embeddings + RAG chain)
- **pgvector** (Postgres extension for vector similarity search)
- **Multer** (for file uploads)

The app allows users to:
1. Upload a document
2. Embed it into a PostgreSQL + pgvector database
3. Ask natural language questions against the stored knowledge

---

## 🚀 Features
- Upload a PDF 
- Chunk + embed text using LangChain
- Store embeddings in Postgres `pgvector`
- Query documents using similarity search
- RAG chain answers questions with context

## Models Used
- Chat - Gemini LLM
- Embedding - HuggingFace - BAAI/bge-base-en-v1.5
