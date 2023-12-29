import './App.scss';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Boote from './pages/Boote';
import Reservierungen from './pages/Reservierungen';
import Nav from './components/Nav';
import ResDetailseite from './pages/ResDetailseite';
import BootDetailseite from './pages/BootDetailseite';
import { LoginContext } from './context/LoginContext';

function App() {
  const [boote, setBoote] = useState([]);
  const [reservierungen, setReservierungen] = useState([]);
  const [addMode, setAddMode] = useState(false);

  const [loginData, setLoginData] = useState({
    email: null,
    password: null,
  });

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
  console.log({ addMode });

  return (
    <>
      <LoginContext.Provider value={{ loginData, setLoginData }}>
        <header>
          <p>
            user:{' '}
            {loginData.email !== null ? loginData.email : 'bitte einloggen'}
          </p>
        </header>
        <BrowserRouter>
          <div className='app-flex'>
            <Nav />
            <div>
              <Routes>
                <Route
                  path='/'
                  element={
                    <Dashboard boote={boote} reservierungen={reservierungen} />
                  }
                />
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
                      setAddMode={setAddMode}
                    />
                  }
                />
                <Route
                  path='/details/reservierungen/:id'
                  element={
                    <ResDetailseite
                      reservierungen={reservierungen}
                      boote={boote}
                      fetchReservierungen={fetchReservierungen}
                      setAddMode={setAddMode}
                      addMode={addMode}
                    />
                  }
                />
                <Route
                  path='/details/boote/:id'
                  element={
                    <BootDetailseite
                      boote={boote}
                      fetchBoote={fetchBoote}
                      fetchReservierungen={fetchReservierungen}
                    />
                  }
                />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </LoginContext.Provider>
    </>
  );
}

export default App;
