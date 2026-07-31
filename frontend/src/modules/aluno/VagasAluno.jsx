import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const SectionTitle = styled.h3`
  color: var(--primary-color);
  margin-bottom: 1rem;
  border-bottom: 2px solid rgba(0, 99, 65, 0.1);
  padding-bottom: 0.5rem;
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
  padding: 1.5rem;
  border-radius: var(--border-radius);
  border: 1px solid rgba(255,255,255,0.05);
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const JobTitle = styled.h4`
  font-size: 1.2rem;
  color: var(--text-primary);
`;

const CompanyName = styled.span`
  color: var(--text-secondary);
  font-weight: 500;
`;

const Tag = styled.span`
  background: rgba(0, 99, 65, 0.1);
  color: var(--primary-color);
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
  font-size: 0.85rem;
  font-weight: bold;
`;

const TagContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Button = styled.button`
  background: var(--primary-color);
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  margin-top: auto;
  &:hover { background: var(--primary-hover); }
`;

const SearchBar = styled.input`
  width: 100%;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: var(--border-radius);
  font-size: 1rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.02);
  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

export function VagasAluno() {
  const [searchTerm, setSearchTerm] = React.useState("");

  const vagasDisponiveis = [
    { id: 1, titulo: "Estágio em Análise de Dados", empresa: "TechCorp Brasil", modelo: "Híbrido", bolsa: "R$ 1.800" },
    { id: 2, titulo: "Analista Financeiro Jr.", empresa: "Banco Futuro", modelo: "Presencial", bolsa: "R$ 3.500" },
    { id: 4, titulo: "Desenvolvedor Front-end", empresa: "WebSolutions", modelo: "Home Office", bolsa: "R$ 2.500" },
  ];

  const minhasCandidaturas = [
    { id: 3, titulo: "Estágio em Marketing", empresa: "Agência Criativa", status: "Em Análise" }
  ];

  const vagasFiltradas = vagasDisponiveis.filter(v => 
    v.titulo.toLowerCase().includes(searchTerm.toLowerCase()) || 
    v.empresa.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.modelo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <div>
        <h2 style={{color: 'var(--primary-color)', marginBottom: '0.5rem'}}>Recrutamento</h2>
        <p style={{color: 'var(--text-secondary)'}}>Acompanhe suas candidaturas e descubra novas vagas de empresas parceiras.</p>
      </div>

      <SearchBar 
        placeholder="Pesquise por vagas, empresas ou modelo (ex: Home Office, Estágio...)" 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div>
        <SectionTitle>Vagas Recomendadas</SectionTitle>
        <Grid>
          {vagasFiltradas.length > 0 ? vagasFiltradas.map(vaga => (
            <Card key={vaga.id}>
              <div>
                <JobTitle>{vaga.titulo}</JobTitle>
                <CompanyName>{vaga.empresa}</CompanyName>
              </div>
              <TagContainer>
                <Tag>{vaga.modelo}</Tag>
                <Tag>{vaga.bolsa}</Tag>
              </TagContainer>
              <Button onClick={() => alert("Candidatura enviada com sucesso!")}>Me Candidatar</Button>
            </Card>
          )) : <p style={{color: 'var(--text-secondary)'}}>Nenhuma vaga encontrada para essa pesquisa.</p>}
        </Grid>
      </div>

      <div style={{marginTop: '1rem'}}>
        <SectionTitle>Minhas Candidaturas</SectionTitle>
        <Grid>
          {minhasCandidaturas.map(vaga => (
            <Card key={vaga.id} style={{borderLeft: '4px solid var(--primary-color)'}}>
              <div>
                <JobTitle>{vaga.titulo}</JobTitle>
                <CompanyName>{vaga.empresa}</CompanyName>
              </div>
              <div style={{marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <span style={{fontSize: '0.9rem', color: 'var(--text-secondary)'}}>Status atual:</span>
                <Tag>{vaga.status}</Tag>
              </div>
            </Card>
          ))}
        </Grid>
      </div>

    </Container>
  );
}
