import React, { useState } from 'react';
import styled from 'styled-components';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { StudentModal } from './StudentModal';

const Board = styled.div`
  display: flex;
  gap: 1.5rem;
  overflow-x: auto;
  padding-bottom: 1rem;
`;

const ColumnContainer = styled.div`
  background: var(--surface-color);
  border-radius: var(--border-radius);
  padding: 1rem;
  width: 300px;
  min-height: 500px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex-shrink: 0;
`;

const ColumnTitle = styled.h3`
  font-size: 1rem;
  color: var(--primary-color);
  border-bottom: 2px solid var(--primary-color);
  padding-bottom: 0.5rem;
`;

const Card = styled.div`
  background: #f9f9f9;
  border: 1px solid #eaeaea;
  padding: 1rem;
  border-radius: 6px;
  cursor: grab;
  box-shadow: 0 2px 4px rgba(0,0,0,0.02);
  
  &:active { cursor: grabbing; }
`;

function SortableCard({ id, student, onClick }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <Card ref={setNodeRef} style={style} {...attributes} {...listeners} onClick={() => onClick(student)}>
      <strong>{student.name}</strong>
      <div style={{fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.5rem'}}>Match Score: {student.match}%</div>
    </Card>
  );
}

export function KanbanBoard() {
  const [items, setItems] = useState([
    { id: '1', name: 'João Silva', match: 95, status: 'NOVO' },
    { id: '2', name: 'Maria Souza', match: 88, status: 'NOVO' },
    { id: '3', name: 'Carlos Mendes', match: 70, status: 'EM_ANALISE' }
  ]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const columns = ['NOVO', 'EM_ANALISE', 'ENTREVISTA', 'APROVADO'];

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;
    
    // In a real scenario with @dnd-kit/core across multiple containers, 
    // we would handle active.id vs over.id logic to move between columns.
    // For this mock, we'll just demonstrate the structure.
  };

  return (
    <div>
      <h2 style={{color: 'var(--primary-color)', marginBottom: '2rem'}}>Workspace da Empresa: Recrutamento</h2>
      
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <Board>
          {columns.map(col => (
            <ColumnContainer key={col}>
              <ColumnTitle>{col}</ColumnTitle>
              <SortableContext items={items.filter(i => i.status === col).map(i => i.id)} strategy={verticalListSortingStrategy}>
                {items.filter(i => i.status === col).map(student => (
                  <SortableCard key={student.id} id={student.id} student={student} onClick={setSelectedStudent} />
                ))}
              </SortableContext>
            </ColumnContainer>
          ))}
        </Board>
      </DndContext>

      {selectedStudent && <StudentModal student={selectedStudent} onClose={() => setSelectedStudent(null)} />}
    </div>
  );
}
