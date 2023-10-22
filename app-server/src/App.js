// import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from './components/layout';


function App() {
  const test = process.env.TEST
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout />}>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
