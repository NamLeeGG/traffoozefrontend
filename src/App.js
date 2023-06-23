import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from './LoginPage/LoginPage';
import UpdatesMap from './TrafficUpdates';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<UpdatesMap />} />
      </Routes>
    </Router>
  );
}

export default App;
