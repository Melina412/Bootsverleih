import './App.scss';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Boote from './pages/Boote';
import Reservierungen from './pages/Reservierungen';
import Nav from './components/Nav';
import Detailseite from './pages/Detailseite';

function App() {
  const [boote, setBoote] = useState([]);
  const [reservierungen, setReservierungen] = useState([]);

  useEffect(() => {
    fetchBoote();
  }, []);

  async function fetchBoote() {
    const res = await fetch(`${import.meta.env.VITE_BACKENDURL}/api/boats`);
    if (res.ok) {
      const data = await res.json();
      setBoote(data);
    }
  }

  useEffect(() => {
    fetchReservierungen();
  }, []);

  async function fetchReservierungen() {
    const res = await fetch(
      `${import.meta.env.VITE_BACKENDURL}/api/reservations`
    );
    if (res.ok) {
      const data = await res.json();
      setReservierungen(data);
    }
  }

  console.log({ boote });
  console.log({ reservierungen });

  return (
    <>
      <BrowserRouter>
        <div className='app-flex'>
          <Nav />
          <div>
            <Routes>
              <Route path='/' element={<Dashboard />} />
              <Route
                path='/boote'
                element={<Boote boote={boote} fetchBoote={fetchBoote} />}
              />
              <Route
                path='/reservierungen'
                element={
                  <Reservierungen
                    reservierungen={reservierungen}
                    fetchReservierungen={fetchReservierungen}
                  />
                }
              />
              <Route
                path='/details/:id'
                element={
                  <Detailseite boote={boote} reservierungen={reservierungen} />
                }
              />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
