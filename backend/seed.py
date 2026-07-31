from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import bcrypt
import datetime

# Setup DB
engine = create_engine('sqlite:///horaculo.db')
from app.database import Base
from app.models.user import User, RoleEnum, StatusEnum
from app.models.profile import ProfileMentor

# Cria tabelas agora que o User está carregado no Base
Base.metadata.create_all(engine)

Session = sessionmaker(bind=engine)
session = Session()

# Helper para hash de senha
def hash_password(password: str) -> str:
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(password.encode('utf-8'), salt).decode('utf-8')

senha_padrao = hash_password("senha123")

# Lista de usuários mockados
usuarios = [
    User(
        email="aluno@fecap.br",
        password_hash=senha_padrao,
        role=RoleEnum.ALUNO,
        status=StatusEnum.ATIVO
    ),
    User(
        email="empresa@tech.com",
        password_hash=senha_padrao,
        role=RoleEnum.EMPRESA,
        status=StatusEnum.ATIVO
    ),
    User(
        email="mentor@expert.com",
        password_hash=senha_padrao,
        role=RoleEnum.MENTOR,
        status=StatusEnum.ATIVO
    )
]

try:
    for u in usuarios:
        # checar se ja existe
        existente = session.query(User).filter_by(email=u.email).first()
        if not existente:
            session.add(u)
    session.commit()
    
    # Criar perfil do Mentor
    mentor = session.query(User).filter_by(email="mentor@expert.com").first()
    if mentor:
        existente_perfil = session.query(ProfileMentor).filter_by(user_id=mentor.id).first()
        if not existente_perfil:
            perfil_mentor = ProfileMentor(
                user_id=mentor.id,
                nome_completo="Carlos Roberto (Especialista em RH)",
                cpf="12345678900",
                telefone="(11) 99999-9999",
                data_nascimento=datetime.date(1980, 5, 20),
                genero="Masculino",
                foto_url="/mentor.jpg"
            )
            session.add(perfil_mentor)
            session.commit()

    print("Seed executado com sucesso! Usuários e perfis criados.")
except Exception as e:
    print(f"Erro ao criar seed: {e}")
    session.rollback()
finally:
    session.close()
