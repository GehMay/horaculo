import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  background: var(--surface-color);
  padding: 2.5rem;
  border-radius: var(--border-radius);
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ProfileImage = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: #ddd;
  background-image: url('https://i.pravatar.cc/150?img=11');
  background-size: cover;
  background-position: center;
  margin: 0 auto;
  border: 4px solid var(--primary-color);
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  
  input {
    padding: 0.75rem;
    border: 1px solid #ccc;
    border-radius: var(--border-radius);
    font-size: 1rem;
    &:focus { outline: none; border-color: var(--primary-color); }
  }
`;

const Button = styled.button`
  background: var(--primary-color);
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  font-size: 1rem;
  margin-top: 1rem;
  transition: background 0.2s;
  &:hover { background: var(--primary-hover); }
`;

export function OnboardingAluno() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    alert("Perfil atualizado com sucesso!");
    console.log("Mock enviando atualização de perfil:", data);
  };

  return (
    <Container>
      <h2 style={{color: 'var(--primary-color)', marginBottom: '2rem', textAlign: 'center'}}>Meu Perfil</h2>
      
      <ProfileImage />
      <p style={{textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem'}}>
        (Em breve: Upload de nova foto)
      </p>

      <Form onSubmit={handleSubmit(onSubmit)}>
        
        <InputGroup>
          <label>Nome Completo</label>
          <input {...register('nome_completo')} defaultValue="João Silva (Mock)" />
        </InputGroup>

        <InputGroup>
          <label>CPF (Apenas visualização)</label>
          <input type="text" value="***.***.123-45" disabled style={{ background: '#f5f5f5', color: '#888' }} />
        </InputGroup>

        <InputGroup>
          <label>RA (Apenas visualização)</label>
          <input type="text" value="1234****" disabled style={{ background: '#f5f5f5', color: '#888' }} />
        </InputGroup>

        <InputGroup>
          <label>URL da Foto de Perfil</label>
          <input {...register('foto_url')} placeholder="https://..." />
        </InputGroup>

        <InputGroup>
          <label>Nova Senha (opcional)</label>
          <input type="password" {...register('nova_senha')} placeholder="Deixe em branco para não alterar" />
        </InputGroup>

        <Button type="submit">Atualizar Perfil</Button>
      </Form>
    </Container>
  );
}
