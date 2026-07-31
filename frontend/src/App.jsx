import React from 'react';
import { AppRoutes } from './routes/AppRoutes';
import { GlobalStyle } from './styles/global';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <GlobalStyle />
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
