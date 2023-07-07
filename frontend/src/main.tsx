import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { addStyles } from 'react-mathquill';

import './scss/index.scss';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.global ||= window;
addStyles();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
