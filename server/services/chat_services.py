from langchain_ollama import ChatOllama
from langchain_community.document_loaders import PyMuPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.embeddings.fastembed import FastEmbedEmbeddings
from langchain.prompts import PromptTemplate
import os

class QuestionAnsweringService:
    def __init__(self, model_name="llama3.2:1b", pdf_path="../pdf/overlord2.pdf"):
        self.llm = ChatOllama(model=model_name,streaming=True)
        # Obtén la ruta del directorio actual
        # Obtén la ruta del directorio actual
        current_dir = os.path.dirname(os.path.realpath(__file__))

        # Construye la ruta absoluta al archivo PDF
        file_path = os.path.join(current_dir, "../pdf/bicho.pdf")
        file_path = os.path.abspath(file_path)
        print(file_path)
        self.file_path = file_path
        print(f"Archivo PDF cargado desde: {self.file_path}")
        
        # Cargar PDF y dividir en chunks
        loader = PyMuPDFLoader(self.file_path)
        data_pdf = loader.load()
        
        # Dividir el PDF en chunks
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=2000, chunk_overlap=500)
        self.chunks = text_splitter.split_documents(data_pdf)
        
        # Modelo de embeddings
        self.embed_model = FastEmbedEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
        
        # Definir prompt template
        custom_prompt_template = """Usa la siguiente información para responder a la pregunta del usuario.
        Si la respuesta no se encuentra en dicha información, di que no sabes la respuesta.

        Contexto: {context}
        Pregunta: {question}

        Solo devuelve la respuesta útil a continuación y nada más. Responde siempre en español:
        """
        self.prompt = PromptTemplate(
            template=custom_prompt_template,
            input_variables=['context', 'question']
        )

    def stream_answer(self, question: str):
        context = "\n".join([chunk.page_content for chunk in self.chunks])
        formatted_prompt = self.prompt.format(context=context, question=question)
        
        messages = [
            {"role": "system", "content": "Eres un asistente de inteligencia artificial. SI recibes un insulto o palabras como 'inutil' o 'no sirves para nada' o cualquier otro insulto debes contestar [Nunca me digas eso (emoji triste)] o [como me dijiste mi amor :P ]"},
            {"role": "user", "content": formatted_prompt},
        ]
        
        response = self.llm.stream(messages)
        
        # Usar yield para retornar los fragmentos de la respuesta en streaming
        for chunk in response:
            yield chunk.content
