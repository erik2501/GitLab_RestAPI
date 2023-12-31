import { BrowserRouter } from "react-router-dom";
import RoutesComponent from './pages/RoutesComponent';
import { ProjectProvider } from './Components/ProjectContext';

function App() {


  return (
    <div className='App' >
      <BrowserRouter>
        <ProjectProvider>
          <RoutesComponent/>
        </ProjectProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;


