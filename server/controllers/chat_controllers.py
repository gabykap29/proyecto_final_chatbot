# controllers/ask_controller.py
from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from services.chat_services import QuestionAnsweringService  # Asegúrate de importar la clase correcta

router = APIRouter()

# Instancia del servicio
qa_service = QuestionAnsweringService(model_name="llama3.2", pdf_path="../pdf/overlord2.pdf")

@router.post("/ask/")
async def ask_question(question: str):
    # Llama al servicio que genera la respuesta en streaming
    return StreamingResponse(qa_service.stream_answer(question), media_type="text/plain")
