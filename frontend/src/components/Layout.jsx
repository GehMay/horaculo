import React from 'react';
import styled from 'styled-components';
import { NavLink, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  background-color: var(--bg-color);
`;

const Sidebar = styled.aside`
  width: 250px;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  padding: 2rem 0;
  box-shadow: 2px 0 10px rgba(0,0,0,0.05);
`;

const NavList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0 1rem;
`;

const StyledLink = styled(NavLink)`
  padding: 0.75rem 1rem;
  border-radius: var(--border-radius);
  color: var(--text-secondary);
  font-weight: 500;
  transition: all var(--transition);
  
  &:hover {
    background: rgba(0, 99, 65, 0.1);
    color: var(--primary-color);
  }

  &.active {
    background: var(--primary-color);
    color: #fff;
    box-shadow: 0 4px 12px rgba(0, 99, 65, 0.3);
  }
`;

const MainContent = styled.main`
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  color: var(--primary-color);
  text-align: center;
  margin-bottom: 2rem;
  font-weight: 700;
`;

export function Layout() {
  const { user, signOut } = React.useContext(AuthContext);
  const isEmpresa = user?.role === 'EMPRESA';
  const isMentor = user?.role === 'MENTOR';

  return (
    <Container>
      <Sidebar>
        <Title>FECAP HUB</Title>
        <NavList>
          {!isEmpresa && !isMentor && (
            <>
              <li><StyledLink to="/">Home</StyledLink></li>
              <li><StyledLink to="/onboarding">Meu Perfil</StyledLink></li>
              <li><StyledLink to="/aluno/vagas">Vagas & Estágios</StyledLink></li>
            </>
          )}
          {isMentor && (
            <>
              <li><StyledLink to="/">Home</StyledLink></li>
              <li><StyledLink to="/onboarding">Meu Perfil</StyledLink></li>
              <li><StyledLink to="/mentor/eventos">Meus Eventos</StyledLink></li>
            </>
          )}
          {isEmpresa && (
            <>
              <li><StyledLink to="/empresa/kanban">Recrutamento (Vagas)</StyledLink></li>
              {/* Adicionaremos a rota de 'criação de vagas' futuramente, apontando pro Kanban por enquanto */}
            </>
          )}
          <li>
            <button onClick={signOut} style={{ marginTop: 'auto', background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', textAlign: 'left', padding: '0.75rem 1rem' }}>Sair</button>
          </li>
        </NavList>
      </Sidebar>
      <MainContent>
        <Outlet />
      </MainContent>
    </Container>
  );
}
