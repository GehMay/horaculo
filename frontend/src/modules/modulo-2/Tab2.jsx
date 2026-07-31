import React from 'react';
import styled from 'styled-components';

const TabContainer = styled.div`
  animation: fadeIn 0.4s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const ContentCard = styled.div`
  background: rgba(42, 42, 42, 0.5);
  backdrop-filter: blur(20px);
  padding: 2.5rem;
  border-radius: var(--border-radius);
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
`;

export function Tab2() {
  return (
    <TabContainer>
      <h2 style={{ marginBottom: '1.5rem' }}>Módulo 2: Conteúdo 1</h2>
      <ContentCard>
        <p style={{ color: 'var(--text-secondary)' }}>Esta é a janela de conteúdo do Módulo 2. Adicione seus componentes e lógicas aqui.</p>
      </ContentCard>
    </TabContainer>
  );
}
