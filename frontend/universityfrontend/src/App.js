// import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import AllCohorts from './components/allcohorts';
import SingleCohort from './components/viewsinglecohort';
import DeleteCohortPage from './components/deletecohort';
import DrawerAppBar from './components/appbar';
import StickyFooter from './components/stickyfooter';
import CohortForm from './components/cohortform';

function App() {
  return (
    <div className="App">
    <BrowserRouter >
      <DrawerAppBar />
      <Routes>
        <Route path="/cohort" element={<AllCohorts />}></Route>
        <Route path="/cohort/:id" element={<SingleCohort />}></Route>
        <Route path="/delete/cohort" element={<DeleteCohortPage />}></Route>
        <Route path="/create/cohort" element={<CohortForm />}></Route>
      </Routes>
      <StickyFooter />
    </BrowserRouter>
    </div>
  );
}

export default App;
