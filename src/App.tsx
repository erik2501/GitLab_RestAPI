import CardContainer from './Components/CardContainer';
import Login from './Components/Login';
import FilterBar from './Components/FilterBar';
import { BrowserRouter } from "react-router-dom";
import RoutesComponent from './pages/RoutesComponent';

function App() {


  return (
    <div className='App' >
      <BrowserRouter>
        <RoutesComponent/>
      </BrowserRouter>
      {/* <Login/>
      <FilterBar/>
      <CardContainer /> */}
    </div>
  );
}

export default App;


