import os
from fastapi import UploadFile
from datetime import datetime

current_dir = os.path.dirname(os.path.realpath(__file__))
file_path = os.path.join(current_dir, "../pdf/")
uploads_folder = os.path.abspath(file_path)


def save_pdf(file: UploadFile) -> str:
    #si el directorio no existe, lo crea
    os.makedirs(uploads_folder, exist_ok=True)
    
    #generar un nombre unico
    filename = f"{file.filename}"
    
    #construir la rutra completa para guardar el archivo
    file_path = os.path.join(uploads_folder, filename)
    
    #guardar el archivo
    with open(file_path, "wb") as f:
        f.write(file.file.read())
    
    return file_path

def list_pdfs() -> list[str]:
    #obtener todos los pdfs
    pdf_files = [
        f for f in os.listdir(uploads_folder)
        if f.endswith('.pdf') and os.path.isfile(os.path.join(uploads_folder, f))
    ]
    return pdf_files