from fastapi import FastAPI
from controllers.chat_controllers import router as chat_router

app = FastAPI()

app.include_router(chat_router)

def main():
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)