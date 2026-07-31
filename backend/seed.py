from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import bcrypt

# Setup DB
engine = create_engine('sqlite:///c:/Users/26028945/Desktop/horaculo/backend/horaculo.db')
from app.database import Base
from app.models.user import User, RoleEnum, StatusEnum
from datetime import datetime

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
    print("Seed executado com sucesso! Usuários criados.")
except Exception as e:
    print(f"Erro ao criar seed: {e}")
    session.rollback()
finally:
    session.close()
