from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from services.chat_services import answer_question_streaming

router = APIRouter()

@router.post("/ask/")
async def ask_question(question: str):
    return StreamingResponse(answer_question_streaming(question, chunks),media_type="text/plain")

