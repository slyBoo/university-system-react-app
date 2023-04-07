// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AllCohorts from './components/allcohorts';
import SingleCohort from './components/viewsinglecohort';
import DeleteCohortPage from './components/deletecohort';
import DrawerAppBar from './components/appbar';
import StickyFooter from './components/stickyfooter';
import CohortForm from './components/cohortform';
import AllDegrees from './components/alldegrees';
import SingleDegree from './components/viewsingledegree';
import AllModules from './components/allmodules';
import DegreeForm from './components/degreeform';
import StudentForm from './components/studentform';
import HeroPage from './components/heropage';
import PageNotFound from './components/pagenotfound';
import SearchForm from './components/searchstudent';
import SingleStudent from './components/viewsinglestudent';

function App() {
  return (
    <div className="App">
        <BrowserRouter >
          <DrawerAppBar />
          <Routes>
            <Route path="/" element={<HeroPage />}></Route>
            <Route path="/cohort" element={<AllCohorts />}></Route>
            <Route path="/cohort/:id" element={<SingleCohort />}></Route>
            <Route path="/delete/cohort" element={<DeleteCohortPage />}></Route>
            <Route path="/create/cohort" element={<CohortForm />}></Route>
            <Route path="/degree" element={<AllDegrees />}></Route>
            <Route path="/degree/:id" element={<SingleDegree />}></Route>
            <Route path="/create/degree" element={<DegreeForm />}></Route>
            <Route path="/module" element={<AllModules />}></Route>
            <Route path="/module/:id" element={<SingleDegree />}></Route>
            <Route path="/create/module" element={<DegreeForm />}></Route>
            <Route path="/student/:id" element={<SingleStudent />}></Route>
            <Route path="/single/student" element={<SearchForm />}></Route>
            <Route path="/create/student" element={<StudentForm />}></Route>
            <Route path="/notfound" element={<PageNotFound />}></Route>
            <Route path="*" element={<PageNotFound />}></Route>
          </Routes>
          <StickyFooter />
        </BrowserRouter>
    </div>
  );
}

export default App;
