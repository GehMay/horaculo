import React from 'react';
import styled from 'styled-components';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

const Overlay = styled.div`
  position: fixed; top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex; justify-content: center; align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: var(--surface-color);
  padding: 2rem;
  border-radius: var(--border-radius);
  width: 90%; max-width: 600px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.2);
`;

const CloseButton = styled.button`
  float: right;
  background: none; border: none; font-size: 1.5rem; cursor: pointer;
`;

const Seal = styled.div`
  display: inline-flex; align-items: center; gap: 0.5rem;
  background: #e6f4ea; color: #1e8e3e;
  padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.8rem; font-weight: bold;
  margin-top: 1rem;
`;

export function StudentModal({ student, onClose }) {
  const data = [
    { subject: 'Liderança', A: 90, fullMark: 100 },
    { subject: 'Comunicação', A: 98, fullMark: 100 },
    { subject: 'Trabalho em Equipe', A: 86, fullMark: 100 },
    { subject: 'Proatividade', A: 99, fullMark: 100 },
    { subject: 'Resolução de Conflitos', A: 85, fullMark: 100 },
  ];

  return (
    <Overlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <h2 style={{color: 'var(--primary-color)'}}>{student.name}</h2>
        <p style={{color: 'var(--text-secondary)'}}>Match Score Global: {student.match}%</p>
        
        <Seal>
          ✓ Validado por 3 mentores especialistas em RH
        </Seal>

        <div style={{ width: '100%', height: 300, marginTop: '2rem' }}>
          <ResponsiveContainer>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
              <Radar name="Aluno" dataKey="A" stroke="#006341" fill="#39A935" fillOpacity={0.6} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </ModalContent>
    </Overlay>
  );
}
