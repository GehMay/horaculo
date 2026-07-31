import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import api from '../../services/api';

const pulse = keyframes`
  0% { opacity: 0.6; }
  50% { opacity: 1; }
  100% { opacity: 0.6; }
`;

const StatusCard = styled.div`
  background: var(--surface-color);
  padding: 2rem;
  border-radius: var(--border-radius);
  border: 1px solid rgba(255,255,255,0.05);
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 600px;
`;

const StatusIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &::before {
    content: '';
    display: block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: ${props => props.$connected ? '#4ade80' : '#f87171'};
    box-shadow: 0 0 10px ${props => props.$connected ? '#4ade80' : '#f87171'};
    animation: ${pulse} 2s infinite;
  }
`;

export function BackendStatus() {
  const [status, setStatus] = useState('checking'); // checking, connected, error

  useEffect(() => {
    // Exemplo de ping para o backend
    api.get('/health')
      .then(() => setStatus('connected'))
      .catch(() => setStatus('error'));
  }, []);

  return (
    <div>
      <h2 style={{ marginBottom: '1.5rem' }}>Módulo 1: Comunicação Backend</h2>
      <StatusCard>
        <h3>Status da Conexão</h3>
        <StatusIndicator $connected={status === 'connected' || status === 'checking'}>
          {status === 'checking' && 'Verificando conexão com o servidor...'}
          {status === 'connected' && 'Conectado ao Backend (Axios Online)'}
          {status === 'error' && 'Falha na conexão com o Backend'}
        </StatusIndicator>
        <p style={{ color: 'var(--text-secondary)', marginTop: '1rem', fontSize: '0.9rem' }}>
          Este módulo gerencia as instâncias e interceptadores globais do Axios para requisições na API externa.
        </p>
      </StatusCard>
    </div>
  );
}
