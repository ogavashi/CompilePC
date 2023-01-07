import React from 'react';
import {
  useFirebaseApp,
  useFirestore,
  useFirestoreCollectionData,
} from 'reactfire';
import { Routes, Route } from 'react-router-dom';
import { DEFAULT_REGION } from '../../common/constants';
import MainLayout from '../MainLayout';
import BuildScreen from '../BuildScreen';
import NotFoundScreen from '../NotFoundScreen';
import ProductScreen from '../ProductScreen';
import AuthenticationLayout from '../AuthenticationLayout';
import RegisterScreen from '../RegisterScreen';
import ProtectedRoute from '../ProtectedRoute';
import LoginScreen from '../LoginScreen';

const Root: React.FC = () => {
  const functions = useFirebaseApp().functions(DEFAULT_REGION);
  const firebase = useFirestore();
  const ref = firebase.collection('test');
  const data = useFirestoreCollectionData(ref);

  // const getBiba = functions.httpsCallable('getBiba');

  // useEffect(() => {
  //   const test = async () => {
  //     const res = await getBiba();
  //     console.log(res);
  //   };

  //   test();
  // }, [getBiba]);

  // console.log(data);

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
