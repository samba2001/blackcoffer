import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardPage from './pages/dashboard.page';
import Reports from './pages/Reports.page'
import Header from './components/header.component';
function App() {
  return (
    <Router style={{width:'98%'}}>
      <Header sideHeading='Dashboard'/>
      <Routes>
        <Route path="dashboard" element={<DashboardPage />} />
        <Route  path="/reports/:range/:reportType" element={<Reports />} />
      </Routes>
    </Router>
  );
}

export default App;
