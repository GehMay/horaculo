import sys
import os

# Adiciona o diretório 'backend' ao sys.path para que os imports absolutos funcionem
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.database import Base, engine
from app.routers import auth, profiles, jobs, events, admin, showcase

Base.metadata.create_all(bind=engine)

app = FastAPI(title=settings.PROJECT_NAME)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(profiles.router)
app.include_router(jobs.router)
app.include_router(events.router)
app.include_router(admin.router)
app.include_router(showcase.router)

@app.get("/")
def read_root():
    return {"message": "Bem-vindo à API do Horáculo!"}

if __name__ == "__main__":
    import uvicorn
    # Executa o servidor uvicorn programaticamente
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
