from langchain_ollama import ChatOllama
from langchain_community.document_loaders import PyMuPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.embeddings.fastembed import FastEmbedEmbeddings
from langchain.prompts import PromptTemplate
import os

# Obtén la ruta del directorio actual
current_dir = os.path.dirname(os.path.realpath(__file__))

# Construye la ruta absoluta al archivo PDF
file_path = os.path.join(current_dir, "../pdf/overlord2.pdf")

# Asegúrate de que la ruta esté bien formada
file_path = os.path.abspath(file_path)
print(file_path)



# Inicialización del modelo LLM
llm = ChatOllama(model="llama3.2", streaming=True)

# Cargar y dividir el PDF

loader = PyMuPDFLoader(file_path)
data_pdf = loader.load()

# Configuración del splitter
text_splitter = RecursiveCharacterTextSplitter(chunk_size=2000, chunk_overlap=500)
chunks = text_splitter.split_documents(data_pdf)

# Definición del modelo de embeddings
embed_model = FastEmbedEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")

# Definición del prompt
custom_prompt_template = """Usa la siguiente información para responder a la pregunta del usuario.
Si la respuesta no se encuentra en dicha información, di que no sabes la respuesta.

Contexto: {context}
Pregunta: {question}

Solo devuelve la respuesta útil a continuación y nada más. Responde siempre en español:
"""

prompt = PromptTemplate(template=custom_prompt_template, input_variables=['context', 'question'])

# Función del servicio para responder preguntas con streaming
async def answer_question_streaming(question: str, chunks: list):
    context = "\n".join([chunk.page_content for chunk in chunks])
    formatted_prompt = prompt.format(context=context, question=question)

    # Reformateamos el mensaje para cumplir con los requisitos de Ollama
    messages = [
        {"role": "system", "content": "Eres un asistente de inteligencia artificial que solo responderá a preguntas sobre el contexto, y si te insultan o dicen palabras como 'inutil' o 'no sirves para nada', responde 'Nunca me digas eso emoji_carita_llorando'"},
        {"role": "user", "content": formatted_prompt},
    ]
    
    response = llm.stream(messages)

    # Generador que retorna el streaming de la respuesta
    async def event_stream():
        for chunk in response:
            yield f"{chunk.content}"

    return event_stream
