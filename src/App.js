import './App.css';
import AuthProvider from './context/auth';

import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes/>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
