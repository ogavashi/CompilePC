import { DEFAULT_REGION } from './constants';
import app from './firebaseApp';

const functions = app.functions(DEFAULT_REGION);

export default functions;
