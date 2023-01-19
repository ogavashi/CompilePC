import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ROUTES } from '../../common/constants';
import MainLayout from '../MainLayout';
import BuildScreen from '../BuildScreen';
import NotFoundScreen from '../NotFoundScreen';
import ProductScreen from '../ProductScreen';
import AuthenticationLayout from '../AuthenticationLayout';
import RegisterScreen from '../RegisterScreen';
import ProtectedRoute from '../ProtectedRoute';
import LoginScreen from '../LoginScreen';
import useAuthState from '../../hooks/useAuthState';
import AssemblyScreen from '../AssemblyScreen';

const Root: React.FC = () => {
  useAuthState();

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path={ROUTES.MAIN} element={<BuildScreen />} />
        <Route path={ROUTES.PRODUCT} element={<ProductScreen />} />
        <Route
          path={ROUTES.ASSEMBLIES}
          element={
            <ProtectedRoute>
              <div>Assemblies</div>
            </ProtectedRoute>
          }
        />
        <Route path={ROUTES.ASSEMBLY} element={<AssemblyScreen />} />
        <Route path={ROUTES.NOT_FOUND} element={<NotFoundScreen />} />
      </Route>
      <Route element={<AuthenticationLayout />}>
        <Route path={ROUTES.LOGIN} element={<LoginScreen />} />
        <Route path={ROUTES.REGISTER} element={<RegisterScreen />} />
      </Route>
    </Routes>
  );
};

// eslint-disable-next-line jest/no-export
export default Root;
