import parseCPUPage from '../cpu/parseCPUPage';

export const DEFAULT_REGION = 'europe-central2';
export const EKATALOG_LINK = 'https://ek.ua';
export const EKATALOG_LIST_LINK = `${EKATALOG_LINK}/en/list/`;

export const parserByCategoryId: Record<string, CallableFunction> = {
  186: parseCPUPage,
};
