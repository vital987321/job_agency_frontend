
import './App.css';
import { RouterComponent } from './router/RouterComponent';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';

const App=()=>{
  return(
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {RouterComponent}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
export default App;

