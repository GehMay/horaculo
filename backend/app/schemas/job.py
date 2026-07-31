from pydantic import BaseModel
from typing import List
from app.models.job import ApplicationStatus

class JobRequirementCreate(BaseModel):
    atributo: str
    peso_desejado: int

class JobCreate(BaseModel):
    titulo: str
    descricao: str = ""
    modelo: str
    area: str
    local: str
    salario: str
    requisitos: List[JobRequirementCreate] = []

class JobResponse(BaseModel):
    id: int
    empresa_id: int
    titulo: str
    descricao: str | None
    modelo: str
    area: str
    local: str
    salario: str
    
    # Adicionando um campo extra pro front-end saber quantos candidatos tem (opcional)
    candidatos_count: int = 0
    empresa_nome: str = ""
    
    class Config:
        from_attributes = True

class ApplicationStatusUpdate(BaseModel):
    status: ApplicationStatus
