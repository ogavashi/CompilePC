import React, { useEffect } from 'react';
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
        <Route path="/login" element={<div>Sign In</div>} />
        <Route path="/register" element={<div>Sign Up</div>} />
      </Route>
      {/* Protected route */}
      <Route path="/assemblies" element={<div>Assemblies</div>} />
    </Routes>
  );
};

// eslint-disable-next-line jest/no-export
export default Root;
