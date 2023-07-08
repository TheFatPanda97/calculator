import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { addStyles } from 'react-mathquill';

import './scss/index.scss';

addStyles();

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
