
import './App.css';
import { Components } from './Components/Components';

const { HeaderComponent, MainComponent, FooterComponent } = Components;

function App() {
  return (
    <>
      <HeaderComponent />
      <MainComponent />
      <FooterComponent />
    </>
  );
}

export default App;