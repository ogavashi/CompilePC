/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default <T>(doc: any): T | undefined => {
  if (!doc?.exists) {
    return undefined;
  }
  return {
    id: doc.id,
    ...doc.data(),
  } as T;
};
