// import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import AllCohorts from './components/allcohorts';
import SingleCohort from './components/viewsinglecohort';
import DeleteCohortPage from './components/deletecohort';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/cohort" element={<AllCohorts />}></Route>
        <Route path="/cohort/:id" element={<SingleCohort />}></Route>
        <Route path="/delete/cohort" element={<DeleteCohortPage />}></Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
