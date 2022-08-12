/* global globalThis */
// this should happen on logout
// https://github.com/FirebaseExtended/reactfire/issues/228#issuecomment-632662842

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const clearFirestoreCache = () => {
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/dot-notation
    const map = globalThis['_reactFirePreloadedObservables'];
    Array.from(map.keys()).forEach(
      (key) => (key as any).includes('firestore') && map.delete(key), // eslint-disable-line  @typescript-eslint/no-explicit-any
    );
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
};
export default clearFirestoreCache;
