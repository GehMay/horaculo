import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Home } from '../modules/home/Home';
import { PrivateRoute } from './PrivateRoute';
import { Login } from '../modules/auth/Login';
import { OnboardingAluno } from '../modules/onboarding/OnboardingAluno';
import { CreateJobForm } from '../modules/empresa/CreateJobForm';
import { Tab4 } from '../modules/modulo-4/Tab4';
import { Tab5 } from '../modules/modulo-5/Tab5';
import { Register } from '../modules/auth/Register';
import { AuthContext } from '../context/AuthContext';

import { VagasAluno } from '../modules/aluno/VagasAluno';

import { RecrutamentoEmpresa } from '../modules/empresa/RecrutamentoEmpresa';

import { MentorEvents } from '../pages/MentorEvents';

function IndexRoute() {
  const { user } = useContext(AuthContext);
  if (user?.role === 'EMPRESA') {
    return <Navigate to="/empresa/kanban" replace />;
  }
  return <Home />;
}

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Private Routes */}
        <Route path="/" element={<PrivateRoute />}>
          <Route element={<Layout />}>
            <Route index element={<IndexRoute />} />
            <Route path="onboarding" element={<OnboardingAluno />} />
            <Route path="aluno/vagas" element={<VagasAluno />} />
            <Route path="empresa/kanban" element={<RecrutamentoEmpresa />} />
            <Route path="mentor/eventos" element={<MentorEvents />} />
            <Route path="modulo-4" element={<Tab4 />} />
            <Route path="modulo-5" element={<Tab5 />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
