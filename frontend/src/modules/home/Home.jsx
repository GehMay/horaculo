import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: var(--surface-color);
  padding: 1.5rem;
  border-radius: var(--border-radius);
  border: 1px solid rgba(255,255,255,0.05);
  box-shadow: 0 8px 32px rgba(0,0,0,0.05);
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const ListItem = styled.li`
  background: rgba(0, 99, 65, 0.05);
  padding: 0.75rem 1rem;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-left: 4px solid var(--primary-color);
`;

const EventItem = styled.li`
  background: rgba(0, 99, 65, 0.05);
  padding: 1.25rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  border-left: 4px solid #39A935;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background: rgba(0, 99, 65, 0.1);
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  }

  /* Aplica o estilo ao Container escondido quando hover no pai */
  &:hover .event-details {
    max-height: 200px;
    opacity: 1;
    margin-top: 1rem;
  }
`;

const EventHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const EventDetails = styled.div`
  max-height: 0;
  opacity: 0;
  overflow: hidden;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const EventDescription = styled.p`
  color: var(--text-secondary);
  font-size: 0.9rem;
  line-height: 1.4;
`;

const SubscribeButton = styled.button`
  background: var(--primary-color);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  align-self: flex-start;
  transition: background 0.2s;

  &:hover {
    background: var(--primary-hover);
  }
`;

const ScoreBadge = styled.span`
  background: var(--primary-color);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: bold;
`;

const CategoryTitle = styled.h4`
  margin-top: 1.5rem;
  color: var(--primary-color);
  font-size: 1.1rem;
  border-bottom: 2px solid rgba(0, 99, 65, 0.1);
  padding-bottom: 0.5rem;
`;

export function Home() {
  
  // Mocks de dados (depois será substituído por chamadas reais na API)
  const rankingTrabalhoEquipe = [
    { id: 1, nome: "João Silva", pontos: 15 },
    { id: 2, nome: "Carlos Lima", pontos: 12 },
    { id: 3, nome: "Ana Beatriz", pontos: 10 }
  ];

  const rankingEscutaAtiva = [
    { id: 4, nome: "Mariana Costa", pontos: 18 },
    { id: 1, nome: "João Silva", pontos: 14 },
    { id: 5, nome: "Pedro Alves", pontos: 9 }
  ];

  const rankingComunicacao = [
    { id: 2, nome: "Carlos Lima", pontos: 22 },
    { id: 6, nome: "Fernanda Souza", pontos: 19 },
    { id: 4, nome: "Mariana Costa", pontos: 16 }
  ];

  const eventosFuturos = [
    { 
      id: 1, 
      titulo: "Hackathon FECAP Tech", 
      data: "15/10/2026",
      descricao: "Maratona de 48h para criar soluções tecnológicas reais focadas em ESG. Equipes de até 5 pessoas."
    },
    { 
      id: 2, 
      titulo: "Workshop de Liderança", 
      data: "22/10/2026",
      descricao: "Aprenda na prática como engajar equipes e liderar projetos de alta complexidade com executivos convidados."
    },
    { 
      id: 3, 
      titulo: "Dinâmica de Crise e Resolução", 
      data: "05/11/2026",
      descricao: "Simulação realista de gestão de crise corporativa. Desenvolva sua tomada de decisão sob pressão."
    }
  ];

  const renderRanking = (titulo, dados) => (
    <div>
      <CategoryTitle>{titulo}</CategoryTitle>
      <List>
        {dados.map((aluno, index) => (
          <ListItem key={aluno.id}>
            <span>
              <strong>#{index + 1}</strong> {aluno.nome}
            </span>
            <ScoreBadge>{aluno.pontos} eventos</ScoreBadge>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const handleSubscribe = (eventoTitulo) => {
    alert(`Mock: Você se inscreveu no evento "${eventoTitulo}" com sucesso!`);
  };

  return (
    <Container>
      <div>
        <h2 style={{ marginBottom: '0.5rem', color: 'var(--primary-color)' }}>Visão Geral</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Bem-vindo ao FECAP HUB. Acompanhe os rankings de habilidades e os próximos eventos institucionais.</p>
      </div>

      <Grid>
        <Card>
          <h3 style={{ fontSize: '1.3rem', color: 'var(--text-primary)' }}>🏆 Top Alunos por Habilidade</h3>
          
          {renderRanking("Trabalho em Equipe", rankingTrabalhoEquipe)}
          {renderRanking("Escuta Ativa", rankingEscutaAtiva)}
          {renderRanking("Comunicação", rankingComunicacao)}
          
        </Card>

        <Card>
          <h3 style={{ fontSize: '1.3rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>📅 Eventos Futuros</h3>
          <List>
            {eventosFuturos.map((evento) => (
              <EventItem key={evento.id}>
                <EventHeader>
                  <span style={{ fontSize: '1.1rem' }}><strong>{evento.titulo}</strong></span>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', background: 'rgba(0,0,0,0.05)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                    {evento.data}
                  </span>
                </EventHeader>
                <EventDetails className="event-details">
                  <EventDescription>{evento.descricao}</EventDescription>
                  <SubscribeButton onClick={() => handleSubscribe(evento.titulo)}>
                    Inscrever-se
                  </SubscribeButton>
                </EventDetails>
              </EventItem>
            ))}
          </List>
        </Card>
      </Grid>
    </Container>
  );
}
