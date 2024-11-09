from langchain_ollama import ChatOllama
from langchain_community.document_loaders import PyMuPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.embeddings.fastembed import FastEmbedEmbeddings
from langchain.prompts import PromptTemplate

# Definimos el modelo de llm que vamos a utilizar
llm = ChatOllama(model="llama3.2")

# Definimos el path del archivo pdf (ruta relativa en este caso)
file_path = "./overlord.pdf"

# Cargamos el archivo pdf
loader = PyMuPDFLoader(file_path)

# Cargamos el contenido del pdf
data_pdf = loader.load()

# Definimos el tamaño de los chunks y el overlap (superposición de los chunks)
text_splitter = RecursiveCharacterTextSplitter(chunk_size=2000, chunk_overlap=500)

# Dividimos el contenido del pdf en chunks
chunks = text_splitter.split_documents(data_pdf)

# Definimos el modelo de embeddings que vamos a utilizar
embed_model = FastEmbedEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")

# Definimos el template de la pregunta
custom_prompt_template = """Usa la siguiente información para responder a la pregunta del usuario.
Si la respuesta no se encuentra en dicha información, di que no sabes la respuesta.

Contexto: {context}
Pregunta: {question}

Solo devuelve la respuesta útil a continuación y nada más. Responde siempre en español:
"""

# Definimos el prompt template para la pregunta
prompt = PromptTemplate(
    template=custom_prompt_template,
    input_variables=['context', 'question']
)

# Función que busca en los chunks y pasa el contexto al modelo
def answer_question(question: str, chunks: list):
    # Unimos todos los chunks como contexto. Accedemos al contenido del documento a través del atributo 'page_content'.
    context = "\n".join([chunk.page_content for chunk in chunks]) 
    
    # Creamos el prompt con el contexto y la pregunta
    formatted_prompt = prompt.format(context=context, question=question)
    
    # Reformateamos el mensaje para cumplir con los requisitos de Ollama
    messages = [
        {"role": "system", "content": "Eres un asistente de inteligencia artificial."},
        {"role": "user", "content": formatted_prompt},
    ]
    # Invocamos al modelo
    response = llm.invoke(messages)  
    
    return response

# Realizamos la pregunta al modelo
quest = input("Ingrese su pregunta: ")

# Obtenemos la respuesta
resp = answer_question(quest, chunks)

# Imprimimos la respuesta
print(resp.content)
