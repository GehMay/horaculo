from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.user import User, RoleEnum
from app.models.job import Job, JobRequirement, JobApplication
from app.schemas.job import JobCreate, JobResponse, ApplicationStatusUpdate
from app.core.security import get_current_user, require_role

router = APIRouter(prefix="/api/v1", tags=["jobs"])

@router.post("/jobs", response_model=JobResponse, status_code=status.HTTP_201_CREATED)
def create_job(
    job_in: JobCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role([RoleEnum.EMPRESA]))
):
    new_job = Job(
        empresa_id=current_user.id,
        titulo=job_in.titulo,
        descricao=job_in.descricao,
        modelo=job_in.modelo,
        area=job_in.area,
        local=job_in.local,
        salario=job_in.salario
    )
    db.add(new_job)
    db.flush()
    
    for req in job_in.requisitos:
        new_req = JobRequirement(
            job_id=new_job.id,
            atributo=req.atributo,
            peso_desejado=req.peso_desejado
        )
        db.add(new_req)
        
    db.commit()
    db.refresh(new_job)
    
    # Retorna com empresa_nome formatado
    response = JobResponse.model_validate(new_job)
    response.empresa_nome = current_user.email
    return response

@router.get("/jobs", response_model=list[JobResponse])
def list_jobs(db: Session = Depends(get_db)):
    jobs = db.query(Job).all()
    results = []
    for job in jobs:
        resp = JobResponse.model_validate(job)
        empresa = db.query(User).filter(User.id == job.empresa_id).first()
        resp.empresa_nome = empresa.email if empresa else "Desconhecida"
        results.append(resp)
    return results

@router.get("/jobs/empresa", response_model=list[JobResponse])
def list_company_jobs(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role([RoleEnum.EMPRESA]))
):
    jobs = db.query(Job).filter(Job.empresa_id == current_user.id).all()
    results = []
    for job in jobs:
        resp = JobResponse.model_validate(job)
        candidatos = db.query(JobApplication).filter(JobApplication.job_id == job.id).count()
        resp.candidatos_count = candidatos
        results.append(resp)
    return results

@router.post("/jobs/{job_id}/apply", status_code=status.HTTP_201_CREATED)
def apply_to_job(
    job_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role([RoleEnum.ALUNO]))
):
    job = db.query(Job).filter(Job.id == job_id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Vaga não encontrada")
        
    existing = db.query(JobApplication).filter(JobApplication.job_id == job_id, JobApplication.aluno_id == current_user.id).first()
    if existing:
        raise HTTPException(status_code=400, detail="Você já se candidatou a esta vaga")
        
    application = JobApplication(job_id=job_id, aluno_id=current_user.id)
    db.add(application)
    db.commit()
    return {"message": "Candidatura enviada com sucesso!"}

@router.patch("/applications/{id}/status")
def update_application_status(
    id: int,
    status_update: ApplicationStatusUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role([RoleEnum.EMPRESA]))
):
    application = db.query(JobApplication).filter(JobApplication.id == id).first()
    if not application:
        raise HTTPException(status_code=404, detail="Candidatura não encontrada.")
    
    job = db.query(Job).filter(Job.id == application.job_id).first()
    if not job or job.empresa_id != current_user.id:
        raise HTTPException(status_code=403, detail="Você não tem permissão para alterar esta candidatura.")
        
    application.status = status_update.status
    db.commit()
    
    return {"message": "Status atualizado com sucesso", "new_status": application.status}
