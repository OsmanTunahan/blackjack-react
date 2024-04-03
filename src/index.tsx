import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const backgroundStyle = {
  height: '95vh',
  backgroundImage: 'url(/images/background.jpeg)',
  backgroundSize: 'cover',
  backgroundPosition: 'center'
};

root.render(
  <React.StrictMode>
    <div style={backgroundStyle}>
      <App></App>
    </div>
  </React.StrictMode>
);
