import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../MainLayout';
import BuildScreen from '../BuildScreen';
import NotFoundScreen from '../NotFoundScreen';
import ProductScreen from '../ProductScreen';
import AuthenticationLayout from '../AuthenticationLayout';
import RegisterScreen from '../RegisterScreen';
import ProtectedRoute from '../ProtectedRoute';
import LoginScreen from '../LoginScreen';
import useAuthState from '../../hooks/useAuthState';

const Root: React.FC = () => {
  useAuthState();

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<BuildScreen />} />
        <Route path="/product/:category/:id/*" element={<ProductScreen />} />
        <Route path="/*" element={<NotFoundScreen />} />
      </Route>
      <Route element={<AuthenticationLayout />}>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
      </Route>
      {/* Protected route */}
      <Route
        path="/assemblies"
        element={
          <ProtectedRoute>
            <div>Assemblies</div>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

// eslint-disable-next-line jest/no-export
export default Root;
