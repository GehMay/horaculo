import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1rem;
`;

const SectionTitle = styled.h2`
  color: var(--primary-color);
  margin-bottom: 0.5rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: var(--surface-color);
  padding: 2rem;
  border-radius: var(--border-radius);
  border: 1px solid rgba(0,0,0,0.05);
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1rem;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.1);
  }
`;

const Form = styled.form`
  background: var(--surface-color);
  padding: 2rem;
  border-radius: var(--border-radius);
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-top: 1rem;
  animation: fadeIn 0.3s ease;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label { font-weight: 500; font-size: 0.95rem; }
  
  input, select {
    padding: 0.75rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
    &:focus { outline: none; border-color: var(--primary-color); }
  }
`;

const Button = styled.button`
  background: var(--primary-color);
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 1rem;
  &:hover { background: var(--primary-hover); }
`;

const VagaItem = styled.div`
  background: rgba(0, 99, 65, 0.05);
  padding: 1.5rem;
  border-radius: 8px;
  border-left: 4px solid var(--primary-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Badge = styled.span`
  background: var(--primary-color);
  color: white;
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-weight: bold;
  font-size: 0.9rem;
`;

export function RecrutamentoEmpresa() {
  const [activeTab, setActiveTab] = useState(null);

  const vagasPublicadas = [
    { id: 1, titulo: "Desenvolvedor Front-end Jr", candidatos: 12 },
    { id: 2, titulo: "Analista de Banco de Dados", candidatos: 5 },
    { id: 3, titulo: "Estágio em Marketing", candidatos: 28 },
  ];

  const handleCreateJob = (e) => {
    e.preventDefault();
    alert("Nova vaga publicada com sucesso!");
    setActiveTab(null);
  };

  return (
    <Container>
      <div>
        <SectionTitle>Painel da Empresa</SectionTitle>
        <p style={{color: 'var(--text-secondary)'}}>Gerencie suas oportunidades e acompanhe os talentos da FECAP.</p>
      </div>

      <Grid>
        <Card onClick={() => setActiveTab('CREATE')}>
          <h3 style={{color: 'var(--primary-color)'}}>➕ Criar Novas Vagas</h3>
          <p style={{color: 'var(--text-secondary)'}}>Publique uma oportunidade de estágio ou emprego e alcance milhares de alunos.</p>
        </Card>
        
        <Card onClick={() => setActiveTab('TRACK')}>
          <h3 style={{color: 'var(--primary-color)'}}>👥 Candidatos por Vaga</h3>
          <p style={{color: 'var(--text-secondary)'}}>Acompanhe o volume de candidaturas recebidas nas vagas já publicadas.</p>
        </Card>
      </Grid>

      {activeTab === 'CREATE' && (
        <Form onSubmit={handleCreateJob}>
          <h3 style={{color: 'var(--primary-color)', marginBottom: '1rem'}}>Preencha os dados da Nova Vaga</h3>
          
          <InputGroup>
            <label>Título da Vaga</label>
            <input required placeholder="Ex: Estagiário de Dados" />
          </InputGroup>

          <InputGroup>
            <label>Tipo de Vaga / Modelo</label>
            <select required>
              <option value="">Selecione...</option>
              <option value="presencial">Presencial</option>
              <option value="hibrido">Híbrido</option>
              <option value="homeoffice">Home Office</option>
            </select>
          </InputGroup>

          <InputGroup>
            <label>Área de Atuação</label>
            <input required placeholder="Ex: Tecnologia da Informação, Finanças..." />
          </InputGroup>

          <InputGroup>
            <label>Local de Trabalho (Endereço/Cidade)</label>
            <input required placeholder="Ex: São Paulo, SP - Av. Paulista" />
          </InputGroup>

          <InputGroup>
            <label>Salário ou Bolsa Auxílio</label>
            <input required placeholder="Ex: R$ 2.000,00" />
          </InputGroup>

          <Button type="submit">Publicar Vaga</Button>
          <button type="button" onClick={() => setActiveTab(null)} style={{background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', marginTop: '0.5rem'}}>
            Cancelar
          </button>
        </Form>
      )}

      {activeTab === 'TRACK' && (
        <div style={{display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem'}}>
          <h3 style={{color: 'var(--primary-color)', marginBottom: '0.5rem'}}>Visão Geral de Candidaturas</h3>
          {vagasPublicadas.map(vaga => (
            <VagaItem key={vaga.id}>
              <div>
                <h4 style={{fontSize: '1.2rem', marginBottom: '0.3rem'}}>{vaga.titulo}</h4>
                <p style={{color: 'var(--text-secondary)', fontSize: '0.9rem'}}>Publicada recentemente</p>
              </div>
              <Badge>{vaga.candidatos} Candidatos</Badge>
            </VagaItem>
          ))}
          <button type="button" onClick={() => setActiveTab(null)} style={{background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', marginTop: '1rem'}}>
            Voltar
          </button>
        </div>
      )}
    </Container>
  );
}
