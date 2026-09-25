<div align="center">

# 🔮 Horáculo

<strong>Plataforma que conecta FECAP, alunos, empresas e mentores — criada na 6ª Maratona da Inovação FECAP</strong>

<p>
  <img alt="React" src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img alt="Vite" src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img alt="FastAPI" src="https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white" />
  <img alt="Python" src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" />
</p>

<img alt="Licença MIT" src="https://img.shields.io/badge/Licença-MIT-2f855a?style=flat-square" />

</div>

---

## 📖 Sobre o projeto

**Horáculo** é uma plataforma desenvolvida durante a **6ª Maratona da Inovação da FECAP** (hackathon acadêmico), com o objetivo de conectar em um único ambiente digital os quatro principais perfis de um ecossistema de inovação universitário: **FECAP**, **alunos**, **empresas** e **mentores**.

Este repositório reúne o **front-end** da aplicação, construído com **React + Vite**, junto a uma versão do **back-end** em **FastAPI**, responsável pela autenticação e pelas regras de negócio da plataforma.

## 🛠️ Tecnologias utilizadas

- **Front-end:** React 19, Vite e Oxlint.
- **Back-end:** FastAPI, SQLAlchemy, Alembic e SQLite.
- **Autenticação:** JWT com controle de acesso por papéis (RBAC), com quatro perfis: `FECAP`, `ALUNO`, `EMPRESA` e `MENTOR`.

## ✨ Principais conceitos

- 🔐 **Autenticação por papéis:** cada usuário se cadastra como Aluno, Empresa, Mentor ou FECAP, e o acesso é liberado de acordo com o seu perfil.
- ✅ **Aprovação institucional:** cadastros de empresas e mentores ficam com status `PENDENTE` até serem aprovados pela FECAP.
- 🎓 **Foco em conexão:** aproxima alunos de oportunidades oferecidas por empresas, com apoio de mentores ao longo do processo.

## 📂 Estrutura do projeto

```text
horaculo/
├── src/               # Código-fonte do front-end (React)
├── public/            # Arquivos estáticos
├── backend/           # API em FastAPI (autenticação, banco de dados)
├── frontend/          # Documentação/versão auxiliar do front-end
├── doc/               # Especificações técnicas por módulo
├── documentation/      # Documentação de FrontEnd e BackEnd
├── index.html
├── vite.config.js
├── package.json
└── LICENSE
```

## 💻 Como rodar o projeto localmente

### Front-end

É necessário ter o [Node.js](https://nodejs.org) instalado.

```bash
git clone https://github.com/GehMay/horaculo.git
cd horaculo
npm install
npm run dev
```

### Back-end

É necessário ter o [Python](https://www.python.org) instalado.

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## 👩‍💻 Autoria

Desenvolvido por **Geovanna Tamagusko** ([@GehMay](https://github.com/GehMay)) durante a 6ª Maratona da Inovação FECAP.

## 📜 Licença

Este projeto está licenciado sob a licença **MIT** — veja o arquivo [LICENSE](LICENSE) para mais detalhes.
