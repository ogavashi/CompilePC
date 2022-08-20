import React, { useEffect } from 'react';
import {
  useFirebaseApp,
  useFirestore,
  useFirestoreCollectionData,
} from 'reactfire';
import { Routes, Route } from 'react-router-dom';
import { DEFAULT_REGION } from '../../../common/constants';
import Layout from '../Layout';
import BuildScreen from '../BuildScreen';
import NotFoundScreen from '../NotFoundScreen';

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
    <Layout>
      <Routes>
        <Route path="/" element={<BuildScreen />} />
        <Route path="login" element={<div>Sign In</div>} />
        <Route path="login" element={<div>Sign Up</div>} />
        <Route path="product/:id" element={<div>Product</div>} />
        {/* Protected route */}
        <Route path="assemblies" element={<div>Assemblies</div>} />
        <Route path="*" element={<NotFoundScreen />} />
      </Routes>
    </Layout>
  );
};

// eslint-disable-next-line jest/no-export
export default Root;
