import React, { useEffect } from 'react';
import {
  useFirebaseApp,
  useFirestore,
  useFirestoreCollectionData,
} from 'reactfire';
import { DEFAULT_REGION } from '../../../common/constants';
// eslint-disable-next-line import/no-named-as-default
import Header from '../Header';

const Root: React.FC = () => {
  const functions = useFirebaseApp().functions(DEFAULT_REGION);
  const firebase = useFirestore();
  const ref = firebase.collection('test');
  const data = useFirestoreCollectionData(ref);

  const getBiba = functions.httpsCallable('getBiba');

  useEffect(() => {
    const test = async () => {
      const res = await getBiba();
      console.log(res);
    };

    test();
  }, [getBiba]);

  console.log(data);

  return <Header />;
};

// eslint-disable-next-line jest/no-export
export default Root;
