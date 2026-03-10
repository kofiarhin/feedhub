import ReactDOM from 'react-dom/client';
import App from './App';
import AppProvider from './app/provider';
import './styles/globals.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AppProvider>
    <App />
  </AppProvider>
);
