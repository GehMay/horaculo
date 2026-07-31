import React, { useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../services/api';

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  background-color: var(--bg-color);
  padding: 2rem;
`;

const FormCard = styled.form`
  background: var(--surface-color);
  padding: 2.5rem;
  border-radius: var(--border-radius);
  box-shadow: 0 10px 40px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const Title = styled.h2`
  color: var(--primary-color);
  text-align: center;
  margin-bottom: 0.5rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const Label = styled.label`
  font-weight: 500;
  font-size: 0.9rem;
  color: var(--text-primary);
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  background: white;
  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

const Select = styled.select`
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  background: white;
  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

const GridRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const Button = styled.button`
  background-color: var(--primary-color);
  color: #fff;
  padding: 0.8rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  margin-top: 1rem;
  transition: background 0.2s;
  &:hover {
    background-color: var(--primary-hover);
  }
`;

export function Register() {
  const [role, setRole] = useState('ALUNO');
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      const payload = {
        email: data.email,
        password: data.senha,
        role: role
      };
      // Requisição para criar usuário base
      await api.post('/api/v1/auth/register', payload);
      alert('Cadastro realizado com sucesso! Faça login para continuar.');
      navigate('/login');
    } catch (error) {
      alert('Erro ao realizar o cadastro. Verifique os dados ou se o e-mail já existe.');
      console.error(error);
    }
  };

  return (
    <Container>
      <FormCard onSubmit={handleSubmit(onSubmit)}>
        <Title>Criar Conta</Title>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
          Junte-se ao FECAP Hub hoje mesmo.
        </p>

        <InputGroup>
          <Label>Selecione seu perfil</Label>
          <Select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="ALUNO">Aluno</option>
            <option value="EMPRESA">Empresa</option>
            <option value="MENTOR">Mentor</option>
          </Select>
        </InputGroup>

        {role === 'ALUNO' && (
          <>
            <GridRow>
              <InputGroup>
                <Label>Nome Completo</Label>
                <Input type="text" {...register('nome')} required />
              </InputGroup>
              <InputGroup>
                <Label>E-mail</Label>
                <Input type="email" {...register('email')} required />
              </InputGroup>
            </GridRow>
            <GridRow>
              <InputGroup>
                <Label>Senha</Label>
                <Input type="password" {...register('senha')} required />
              </InputGroup>
              <InputGroup>
                <Label>RA</Label>
                <Input type="text" {...register('ra')} required />
              </InputGroup>
            </GridRow>
            <GridRow>
              <InputGroup>
                <Label>CPF</Label>
                <Input type="text" {...register('cpf')} required />
              </InputGroup>
              <InputGroup>
                <Label>Telefone</Label>
                <Input type="tel" {...register('telefone')} />
              </InputGroup>
            </GridRow>
            <GridRow>
              <InputGroup>
                <Label>Data de Nascimento</Label>
                <Input type="date" {...register('dataNascimento')} />
              </InputGroup>
              <InputGroup>
                <Label>Gênero</Label>
                <Select {...register('genero')}>
                  <option value="">Selecione...</option>
                  <option value="masculino">Masculino</option>
                  <option value="feminino">Feminino</option>
                  <option value="outro">Outro</option>
                </Select>
              </InputGroup>
            </GridRow>
            <GridRow>
              <InputGroup>
                <Label>Turno das Aulas</Label>
                <Select {...register('turno')} required>
                  <option value="manha">Manhã</option>
                  <option value="tarde">Tarde</option>
                  <option value="noite">Noite</option>
                </Select>
              </InputGroup>
              <InputGroup>
                <Label>URL da Foto (Opcional)</Label>
                <Input type="text" placeholder="https://..." {...register('foto')} />
              </InputGroup>
            </GridRow>
          </>
        )}

        {role === 'EMPRESA' && (
          <>
            <GridRow>
              <InputGroup>
                <Label>Razão Social</Label>
                <Input type="text" {...register('razaoSocial')} required />
              </InputGroup>
              <InputGroup>
                <Label>CNPJ</Label>
                <Input type="text" {...register('cnpj')} required />
              </InputGroup>
            </GridRow>
            <GridRow>
              <InputGroup>
                <Label>E-mail Corporativo</Label>
                <Input type="email" {...register('email')} required />
              </InputGroup>
              <InputGroup>
                <Label>Senha</Label>
                <Input type="password" {...register('senha')} required />
              </InputGroup>
            </GridRow>
            <GridRow>
              <InputGroup>
                <Label>Inscrição Estadual ou Municipal</Label>
                <Input type="text" {...register('inscricao')} />
              </InputGroup>
              <InputGroup>
                <Label>Ramo de Atividade</Label>
                <Input type="text" {...register('ramo')} required />
              </InputGroup>
            </GridRow>
          </>
        )}

        {role === 'MENTOR' && (
          <>
            <GridRow>
              <InputGroup>
                <Label>Nome Completo</Label>
                <Input type="text" {...register('nome')} required />
              </InputGroup>
              <InputGroup>
                <Label>E-mail</Label>
                <Input type="email" {...register('email')} required />
              </InputGroup>
            </GridRow>
            <GridRow>
              <InputGroup>
                <Label>Senha</Label>
                <Input type="password" {...register('senha')} required />
              </InputGroup>
              <InputGroup>
                <Label>CPF</Label>
                <Input type="text" {...register('cpf')} required />
              </InputGroup>
            </GridRow>
            <GridRow>
              <InputGroup>
                <Label>Data de Nascimento</Label>
                <Input type="date" {...register('dataNascimento')} />
              </InputGroup>
              <InputGroup>
                <Label>Gênero</Label>
                <Select {...register('genero')}>
                  <option value="">Selecione...</option>
                  <option value="masculino">Masculino</option>
                  <option value="feminino">Feminino</option>
                  <option value="outro">Outro</option>
                </Select>
              </InputGroup>
            </GridRow>
            <GridRow>
              <InputGroup>
                <Label>Telefone</Label>
                <Input type="tel" {...register('telefone')} />
              </InputGroup>
              <InputGroup>
                <Label>URL da Foto (Opcional)</Label>
                <Input type="text" placeholder="https://..." {...register('foto')} />
              </InputGroup>
            </GridRow>
          </>
        )}

        <Button type="submit">Finalizar Cadastro</Button>
        <div style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.9rem' }}>
          Já tem uma conta? <Link to="/login" style={{ color: 'var(--primary-color)', fontWeight: 'bold', textDecoration: 'none' }}>Fazer Login</Link>
        </div>
      </FormCard>
    </Container>
  );
}
