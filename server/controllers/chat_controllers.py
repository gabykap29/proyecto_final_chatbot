from fastapi import APIRouter
from fastapi.responses import StreamingResponse, JSONResponse
from services.chat_services import QuestionAnsweringService 
from fastapi import UploadFile, File, HTTPException
from services.pdf_services import save_pdf, list_pdfs
import os
router = APIRouter()

current_dir = os.path.dirname(os.path.realpath(__file__))
file_path = os.path.join(current_dir, "../pdf/")
uploads_folder = os.path.abspath(file_path)


# Instancia del servicio
qa_service = QuestionAnsweringService(model_name="llama3.2")

@router.post("/ask/")
async def ask_question(question: str):
    # Llama al servicio que genera la respuesta en streaming
    return StreamingResponse(qa_service.stream_answer(question), media_type="text/plain")

@router.post('/upload-pdf/')
async def upload_pdf(file: UploadFile = File(...)):
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Solo se admite archivos de tipo pdf!")
    
    try: 
        file_path = save_pdf(file)
    except Exception as e:
        return JSONResponse(content={"error": "Error al guardar el archivo!"})
    
    return {"filename": file.filename, "saved_path": file_path}

@router.get("/list-pdfs")
async def get_pdfs():
    try:
        pdf_files = list_pdfs()
    except Exception as e:
        return {"error": "No se pudo listar los archivos pdfs"}
    
    return {"pdf_files": pdf_files}

@router.post('/process_pdf')
async def process_pdf(file_name: str):
    file_path = os.path.join(uploads_folder, file_name)
    
    if not os.path.isfile(file_path):
        raise HTTPException(status_code=404, detail="Archivo no encontrado")
    
        # Procesar el PDF usando la ruta proporcionada
    qa_service.process_pdf(file_path)
    
    return {"message": f"Archivo {file_name} procesado correctamente"}