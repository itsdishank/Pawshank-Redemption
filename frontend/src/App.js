import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Owners from './pages/Owners';
import Pets from './pages/Pets';
import Bookings from './pages/Bookings';
import Services from './pages/Services';
import Staff from './pages/Staff';
import MedicalRecords from './pages/MedicalRecords';
import Analytics from './pages/Analytics';
import './App.css';
import BookingSummary from './pages/BookingSummary';
import Invoices from './pages/Invoices';
import PetAgeChart from './pages/PetAgeChart';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/owners" element={<Owners />} />
        <Route path="/pets" element={<Pets />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/services" element={<Services />} />
        <Route path="/staff" element={<Staff />} />
        <Route path="/medicalrecords" element={<MedicalRecords />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/booking-summary" element={<BookingSummary />} />
        <Route path="/invoices" element={<Invoices />} />
        <Route path="/analytics/pet-age-chart" element={<PetAgeChart />} />
      </Routes>
    </Router>
  );
}

export default App;
