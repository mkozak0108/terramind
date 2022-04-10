import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Spin } from 'antd';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from "Providers";

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<Spin />}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
