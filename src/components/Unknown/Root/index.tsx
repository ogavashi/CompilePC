import React, { useEffect } from 'react';
import {
  useFirebaseApp,
  useFirestore,
  useFirestoreCollectionData,
} from 'reactfire';
import { DEFAULT_REGION } from '../../../common/constants';
import BuildPage from '../BuildPage';
import Layout from '../Layout';
import BuilderProduct from '../BuildScreen/Builder/BuilderProduct';
import BuilderProductExample from '../BuildScreen/Builder/BuilderProduct/BuilderProductExample';
import ProductAccordion from '../BuildScreen/Builder/ProductAccordion';

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

  return (
    <div>
      {/* <Button color="primary" variant="contained">
        Press Me
      </Button>
      <Button color="secondary" variant="contained">
        Press Me
      </Button>
      <InputBase /> */}
      <ProductAccordion
        category="Processor"
        icon="https://pcua.nerdpart.com/configurator/images/confg-ico-1.svg"
      >
        <BuilderProductExample />
        <BuilderProductExample />
        <BuilderProductExample />
      </ProductAccordion>
    </div>
  );
};

// eslint-disable-next-line jest/no-export
export default Root;
