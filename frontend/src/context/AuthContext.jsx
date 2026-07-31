import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData() {
      const token = localStorage.getItem('@FecapHub:token');
      if (token) {
        try {
          api.defaults.headers.authorization = `Bearer ${token}`;
          // Busca os dados reais do usuário logado
          const response = await api.get('/api/v1/auth/me');
          setUser(response.data);
        } catch (err) {
          console.error("Token inválido ou expirado", err);
          localStorage.removeItem('@FecapHub:token');
        }
      }
      setLoading(false);
    }
    loadStorageData();
  }, []);

  const signIn = async (email, password) => {
    // FastAPI OAuth2 usa form-data para login (username/password)
    const formData = new URLSearchParams();
    formData.append('username', email);
    formData.append('password', password);

    const response = await api.post('/api/v1/auth/login', formData, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    const { access_token, role, status } = response.data;

    localStorage.setItem('@FecapHub:token', access_token);
    api.defaults.headers.authorization = `Bearer ${access_token}`;

    // Atualiza estado do usuário
    setUser({ email, role, status });
  };

  const signOut = () => {
    localStorage.removeItem('@FecapHub:token');
    api.defaults.headers.authorization = '';
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ signed: !!user, user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
