import './App.css';
import { BrowserRouter as Router, Route, Routes,useNavigate,useLocation } from 'react-router-dom';
import DashboardPage from './pages/dashboard.page';
import Reports from './pages/Reports.page'
import Header from './components/header.component';
import { useEffect } from 'react';
function App() {
// const navigate = useNavigate()

  return (
    <Router style={{width:'98%'}}>
      <Header sideHeading='Dashboard'/>
      <Routes>
      {/* <Route ex  path="" >
      {() => {
            navigate('/dashboard'); 
            return null; 
          }}
      </Route> */}

        <Route path="" element={<DashboardPage />} />
        <Route  path="/reports/:range/:reportType" element={<Reports />} />
      </Routes>
    </Router>
  );
}

export default App;

