import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { HelmetProvider } from 'react-helmet-async';

import TopNavbar from './modules/home/TopNavbar';

import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <HelmetProvider>
      <TopNavbar /> 
      <React.Fragment>
        <ToastContainer position="top-right" autoClose={3000} />
      </React.Fragment>
    </HelmetProvider>

  );
}

export default App;