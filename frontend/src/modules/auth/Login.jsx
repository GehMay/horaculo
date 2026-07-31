import React, { useContext } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const loginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres')
});

const Container = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-color: var(--bg-color);
`;

const FormCard = styled.form`
  background: var(--surface-color);
  padding: 3rem;
  border-radius: var(--border-radius);
  box-shadow: 0 10px 40px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Title = styled.h2`
  color: var(--primary-color);
  text-align: center;
  margin-bottom: 1rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: var(--border-radius);
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

const ErrorText = styled.span`
  color: #e74c3c;
  font-size: 0.8rem;
`;

const Button = styled.button`
  background-color: var(--primary-color);
  color: #fff;
  padding: 0.75rem;
  border: none;
  border-radius: var(--border-radius);
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background var(--transition);
  &:hover {
    background-color: var(--primary-hover);
  }
`;

export function Login() {
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data) => {
    try {
      await signIn(data.email, data.password);
      navigate('/');
    } catch (error) {
      alert(error.response?.data?.detail || "Erro ao fazer login. Verifique o console.");
      console.error(error);
    }
  };

  return (
    <Container>
      <FormCard onSubmit={handleSubmit(onSubmit)}>
        <Title>FECAP Login</Title>
        <InputGroup>
          <label>E-mail</label>
          <Input type="email" {...register('email')} placeholder="seu.email@fecap.br" />
          {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
        </InputGroup>
        
        <InputGroup>
          <label>Senha</label>
          <Input type="password" {...register('password')} placeholder="********" />
          {errors.password && <ErrorText>{errors.password.message}</ErrorText>}
        </InputGroup>

        <Button type="submit">Entrar</Button>
        <div style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.9rem' }}>
          Não tem login? <Link to="/register" style={{ color: 'var(--primary-color)', fontWeight: 'bold', textDecoration: 'none' }}>Cadastre-se</Link>
        </div>
      </FormCard>
    </Container>
  );
}
