from fastapi import FastAPI
from controllers.chat_controllers import router as chat_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins= origins,
    allow_credentials=True,
    allow_methods = ['*'],
    allow_headers = ['*'],
)

app.include_router(chat_router)

def main():
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)