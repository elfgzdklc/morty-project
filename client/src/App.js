import React from 'react';
import 'rsuite/dist/rsuite.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import Favorites from './pages/favorites';
import DetailsPage from './pages/details';
import Layout from './components/Layout';
import PrivateRoute from './components/PrivateRoute';

function App() {

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<PrivateRoute Component={<Home/>} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/favorites" element={<PrivateRoute Component={<Favorites/>} />} />
          <Route path="/details/:id" element={<PrivateRoute Component={<DetailsPage/>} />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
