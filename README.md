# Proyecto Final Chatbot

Este es el proyecto final para el desarrollo de un chatbot. El objetivo de este proyecto es crear un chatbot interactivo que pueda responder a diversas consultas de los usuarios.

## Características

- Respuestas automáticas a preguntas frecuentes.
- Interacción en tiempo real.
- Fácil de personalizar y expandir.
- Contexto mediante el ingreso de un pdf.
- Elegir el contexto por los diferenctes pdfs subidos.

## Requisitos

- Para instalar y ejecutar este proyecto, necesitarás tener Python instalado en tu sistema. Además, todas las dependencias necesarias están listadas en el archivo `requirements.txt`.
- Tener instalado nodejs versión 18 o +. 
- Tener instalado ollama y descargado el modelo llama3.2:1b

## Instalación

Sigue estos pasos para instalar las dependencias y ejecutar el proyecto:

1. Clona este repositorio en tu máquina local:
    ```bash
    git clone https://github.com/gabykap29/proyecto_final_chatbot.git
    ```

2. Navega al directorio del proyecto:
    ```bash
    cd proyecto_final_chatbot/server
    ```

3. Crea un entorno virtual (opcional pero recomendado):
    ```bash
    python -m venv venv
    source venv/bin/activate  # En Windows usa `venv\Scripts\activate`
    ```

4. Instala las dependencias:
    ```bash
    pip install -r requirements.txt
    ```

5. Ejecuta el servidor:
    ```bash
    uvicorn main:app --reload
    ```
6. Ingresa a la carpeta del cliente

7. ```bash
    cd client
    ```
8. Instala todas las dependencias necesarias
    ```bash
    npm install 
    ```
9. Ejecuta el servidor
    ```bash
    npm run dev
    ```
   
## Uso

Una vez que el chatbot esté en funcionamiento, puedes interactuar con él a través de http://127.0.0.1:5173/


