import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import api from '../services/api';

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const Title = styled.h1`
  color: var(--primary-color);
  margin-bottom: 2rem;
`;

const ErrorMsg = styled.div`
  color: #dc3545;
  margin-bottom: 1rem;
`;

const EventCard = styled.div`
  background: white;
  border-radius: var(--border-radius);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
`;

const EventHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const EventTitle = styled.h2`
  color: var(--text-primary);
  font-size: 1.25rem;
`;

const EventStatus = styled.span`
  background: var(--bg-color);
  color: var(--primary-color);
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
`;

const EventInfo = styled.p`
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
  white-space: pre-wrap;
`;

const StudentsSection = styled.div`
  margin-top: 1.5rem;
  border-top: 1px solid #eee;
  padding-top: 1rem;
`;

const StudentsTitle = styled.h3`
  font-size: 1.1rem;
  color: var(--text-primary);
  margin-bottom: 0.75rem;
`;

const StudentList = styled.ul`
  list-style: none;
  padding: 0;
`;

const StudentItem = styled.li`
  padding: 0.5rem 0;
  border-bottom: 1px solid #f5f5f5;
  color: var(--text-secondary);
  
  &:last-child {
    border-bottom: none;
  }
`;

export function MentorEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadEvents() {
      try {
        const response = await api.get('/api/v1/events/mentor/my-events');
        setEvents(response.data);
      } catch (err) {
        console.error(err);
        setError('Não foi possível carregar seus eventos.');
      } finally {
        setLoading(false);
      }
    }
    loadEvents();
  }, []);

  if (loading) return <div>Carregando...</div>;

  return (
    <Container>
      <Title>Meus Eventos</Title>
      {error && <ErrorMsg>{error}</ErrorMsg>}
      
      {events.length === 0 && !error ? (
        <p>Você ainda não está inscrito em nenhum evento.</p>
      ) : (
        events.map((event) => (
          <EventCard key={event.id}>
            <EventHeader>
              <EventTitle>{event.titulo}</EventTitle>
              <EventStatus>{event.status}</EventStatus>
            </EventHeader>
            
            <EventInfo>
              <strong>Data/Hora:</strong> {event.data_hora ? new Date(event.data_hora).toLocaleString('pt-BR') : 'A definir'}
            </EventInfo>
            <EventInfo>
              <strong>Descrição:</strong><br />
              {event.descricao}
            </EventInfo>

            <StudentsSection>
              <StudentsTitle>Alunos sob sua avaliação ({event.alunos.length})</StudentsTitle>
              {event.alunos.length === 0 ? (
                <p style={{ color: 'var(--text-secondary)' }}>Nenhum aluno associado ainda.</p>
              ) : (
                <StudentList>
                  {event.alunos.map(aluno => (
                    <StudentItem key={aluno.id}>
                      ✉️ {aluno.email}
                    </StudentItem>
                  ))}
                </StudentList>
              )}
            </StudentsSection>
          </EventCard>
        ))
      )}
    </Container>
  );
}
