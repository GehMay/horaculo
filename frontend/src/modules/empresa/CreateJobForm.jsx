import React from 'react';
import styled from 'styled-components';
import { useForm, useFieldArray } from 'react-hook-form';

const Container = styled.div`
  background: var(--surface-color);
  padding: 2rem;
  border-radius: var(--border-radius);
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  max-width: 800px;
  margin-top: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  input {
    padding: 0.75rem;
    border: 1px solid #ccc;
    border-radius: var(--border-radius);
    &:focus { outline: none; border-color: var(--primary-color); }
  }
`;

const RequisitoRow = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  background: #f9f9f9;
  padding: 1rem;
  border-radius: 8px;
`;

const Button = styled.button`
  background: var(--primary-color); color: white; border: none; padding: 1rem; border-radius: 8px; cursor: pointer;
  &:hover { background: var(--primary-hover); }
`;

const OutlineButton = styled(Button)`
  background: transparent; color: var(--primary-color); border: 1px solid var(--primary-color); padding: 0.5rem 1rem;
  &:hover { background: rgba(0, 99, 65, 0.1); }
`;

export function CreateJobForm() {
  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      titulo: '',
      descricao: '',
      requisitos: [{ atributo: 'Liderança', peso: 3 }]
    }
  });
  const { fields, append, remove } = useFieldArray({ control, name: "requisitos" });

  const onSubmit = data => {
    console.log("Mock Post /api/v1/jobs:", data);
    alert("Vaga criada com sucesso!");
  };

  return (
    <Container>
      <h3 style={{color: 'var(--primary-color)', marginBottom: '1rem'}}>Criar Nova Vaga</h3>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputGroup>
          <label>Título da Vaga</label>
          <input {...register("titulo")} placeholder="Ex: Estagiário de RH" />
        </InputGroup>
        
        <InputGroup>
          <label>Descrição</label>
          <input {...register("descricao")} placeholder="Atividades..." />
        </InputGroup>

        <div style={{marginTop: '1rem'}}>
          <h4>Requisitos Dinâmicos (Radar)</h4>
          <p style={{fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1rem'}}>Defina o peso desejado (1 a 5) para gerar o Match Score ideal.</p>
          
          <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
            {fields.map((field, index) => (
              <RequisitoRow key={field.id}>
                <input {...register(`requisitos.${index}.atributo`)} placeholder="Competência (ex: Liderança)" style={{flex: 1}} />
                <input type="number" min="1" max="5" {...register(`requisitos.${index}.peso`)} style={{width: '80px'}} />
                <button type="button" onClick={() => remove(index)} style={{background: 'none', border: 'none', color: 'red', cursor: 'pointer'}}>Remover</button>
              </RequisitoRow>
            ))}
          </div>
          
          <OutlineButton type="button" onClick={() => append({ atributo: '', peso: 3 })} style={{marginTop: '1rem'}}>
            + Adicionar Competência
          </OutlineButton>
        </div>

        <Button type="submit" style={{marginTop: '2rem'}}>Publicar Vaga</Button>
      </Form>
    </Container>
  );
}
