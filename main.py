from langchain_ollama import ChatOllama
from langchain_community.document_loaders import PyMuPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.embeddings.fastembed import FastEmbedEmbeddings
from langchain.prompts import PromptTemplate

# modelo de llm que vamos a utilizar
llm = ChatOllama(model="llama3.2", streaming=True)  #  `streaming=True` al modelo para obtener la respuesta en partes

# path del archivo pdf (ruta relativa en este caso)
file_path = "./overlord.pdf"

# se carga el archivo pdf
loader = PyMuPDFLoader(file_path)

# se carga el contenido del pdf
data_pdf = loader.load()

# se define el tamaño de los chunks y el overlap (superposición de los chunks)
text_splitter = RecursiveCharacterTextSplitter(chunk_size=2000, chunk_overlap=500)

# se divide el contenido del pdf en chunks
chunks = text_splitter.split_documents(data_pdf)

# se define el modelo de embeddings que vamos a utilizar
embed_model = FastEmbedEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")

# template de la pregunta
custom_prompt_template = """Usa la siguiente información para responder a la pregunta del usuario.
Si la respuesta no se encuentra en dicha información, di que no sabes la respuesta.

Contexto: {context}
Pregunta: {question}

Solo devuelve la respuesta útil a continuación y nada más. Responde siempre en español:
"""

# se define el prompt template para la pregunta
prompt = PromptTemplate(
    template=custom_prompt_template,
    input_variables=['context', 'question']
)

# funciona para buscar en los chunks y pasar el contexto al modelo
def answer_question(question: str, chunks: list):
    # se unen todos los chunks como contexto. Accedemos al contenido del documento a través del atributo 'page_content'.
    context = "\n".join([chunk.page_content for chunk in chunks]) 
    
    # se crea el prompt con el contexto y la pregunta
    formatted_prompt = prompt.format(context=context, question=question)
    
    # Reformateamos el mensaje para cumplir con los requisitos de Ollama
    messages = [
        {"role": "system", "content": "Eres un asistente de inteligencia artificial que solo responderá a preguntas sobre el contexto, y si te insultan o dicen palabras como 'inutil' o 'no sirves para nada', responde 'Nunca me digas eso emoji_carita_llorando'"},
        {"role": "user", "content": formatted_prompt},
    ]
    
    # Invocamos al modelo con el parámetro `streaming=True` para obtener la respuesta en partes
    response = llm.stream(messages)  # Usamos `stream` en lugar de `invoke`
    
    # Procesamos y mostramos las respuestas conforme llegan
    for chunk in response:
        # Imprimimos los fragmentos de la respuesta a medida que llegan
        print(chunk.content, end="", flush=True)

#hacemos un while para que el usuario pueda hacer varias preguntas
while True:
    # Preguntamos al usuario
    question = input("&: ")
    
    # si el usuario escribe 'salir', salimos del bucle
    if question == 'salir':
        break
    
    # función para responder a la pregunta
    answer_question(question, chunks)
    print()
