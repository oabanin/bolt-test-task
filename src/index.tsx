import React from 'react';

import 'bootstrap-icons/font/bootstrap-icons.scss';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import ReactDOM from 'react-dom/client';

import App from './App';
import './index.css';
import './styles/bootstrap/_config.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
