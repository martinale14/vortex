import { createRoot } from 'react-dom/client';
import './index.css';
import App from './views/App';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service_worker.js', {
    scope: '.'
  });
}

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
