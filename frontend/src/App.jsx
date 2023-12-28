import './App.scss';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ReservierungenContext } from './context/ReservierungenContext';
import Nav from './components/Nav';
import Dashboard from './pages/Dashboard';
import Boote from './pages/Boote';
import Reservierungen from './pages/Reservierungen';
import BootDetailseite from './pages/BootDetailseite';
import ResDetailseite from './pages/ResDetailseite';
// import styled from 'styled-components';

// const AppWrapper = styled.div`
//   background-color: ${(props) => props.backgroundColor || '$purple'};
// `;
// das npm paket arbeitet auch mit der location D:

function App() {
  //$ fetch für alle Boote -------------------
  const [boote, setBoote] = useState([]);

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

  //$ states für den ReservierungenContext ----------

  const [boatsWithoutReservations, setBoatsWithoutReservations] = useState([]);
  const [populatedReservations, setPopulatedReservations] = useState([]);
  const [selectOptions, setSelectOptions] = useState([]);
  const [resStart, setResStart] = useState();
  const [resEnd, setResEnd] = useState();

  //$  Logik für die Erstellung eines Arrays aller verfügbaren Boote im Zeitraum einer gewünschten Reservierung

  useEffect(() => {
    getSelectOptions();
  }, [resStart, resEnd]);

  // der Array setzt sich aus zwei Gruppen zusammen:

  function getSelectOptions() {
    const optionsArray = [];

    // 1. alle Boote für die keine Reservierung vorliegt
    boatsWithoutReservations.forEach((boat) =>
      optionsArray.push({
        _id: boat._id,
        name: boat.name,
      })
    );

    // 2. gefilterte Boote aus den Reservierungen, bei denen sich der ausgewählte Zeitraum nicht mit einer bestehenden Reservierung überschneidet
    const matchedRes = populatedReservations.filter(
      (res) =>
        new Date(res.startdatum).getTime() > resEnd ||
        new Date(res.enddatum).getTime() < resStart
    );
    console.log({ matchedRes });
    matchedRes.forEach((res) => {
      const new_option = {
        _id: res.boot._id,
        name: res.boot.name,
      };
      // prüfen ob das Boot nicht bereits im Array existiert (aufgrund mehrfacher Reservierungen)
      if (!optionsArray.some((option) => option._id === new_option._id)) {
        optionsArray.push(new_option);
      }
    });
    // für beide Gruppen werden jeweils der Name und die id des Bootes im Array gespeichert
    console.log({ optionsArray });
    setSelectOptions(optionsArray);
  }

  useEffect(() => {
    fetchFreeBoats();
    fetchPopulatedReservations();
  }, []);

  //$ fetch aller Boote für die keine Reservierung vorliegt

  async function fetchFreeBoats() {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKENDURL}/api/reservations/unreserved`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (res.ok) {
        const data = await res.json();
        setBoatsWithoutReservations(data);
      }
    } catch (error) {
      console.log('Fehler beim fetch der freien Boote', error);
    }
  }

  //$ ---------- fetchPopulatedReservations ---------------

  async function fetchPopulatedReservations() {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKENDURL}/api/reservations/allpopulated`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (res.ok) {
        const data = await res.json();
        setPopulatedReservations(data);
      }
    } catch (error) {
      console.log('Fehler beim fetch der freien Boote', error);
    }
  }

  //$ console logs ------------------------

  console.log({ boote });
  console.log(
    'Boote ohne Reservierung:',
    boatsWithoutReservations.map(
      (boat) => boat.name + ' - ' + boat._id.slice(-5)
    )
  );
  console.log(
    'populated Reservierungen:',
    populatedReservations.map(
      (res) => res.boot.name + ' - ' + res.boot._id.slice(-5)
    )
  );
  console.log({ resStart });
  console.log({ resEnd });
  console.log({ selectOptions });

  //$ style -------------------------------------

  // const [background, setBackground] = useState('$purple');
  // const location = useLocation();

  // useEffect(() => {
  //   if (
  //     location.pathname === '/boote' ||
  //     location.pathname === '/details/boote'
  //   ) {
  //     setBackground('$sky');
  //   }
  // }, [location.pathname]);

  // die location kann nur im kontext des route genutzt werden. da die app außerhalb des routers ist geht das so nicht.
  // ich müsste den browserrouter und somit auch dien contectProvider und alle dazugehörigen states & funktionnen in die main.jsx verschieben

  //$ -------------------------------------

  return (
    <ReservierungenContext.Provider
      value={{
        boatsWithoutReservations,
        setBoatsWithoutReservations,
        populatedReservations,
        setPopulatedReservations,
        selectOptions,
        setSelectOptions,
        fetchFreeBoats,
        fetchPopulatedReservations,
        resStart,
        setResStart,
        resEnd,
        setResEnd,
      }}
    >
      <BrowserRouter>
        {/* <div className={`app-flex ${background}`}> */}
        <div className='app-flex'>
          <Nav />
          <div className='app-content'>
            <Routes>
              <Route
                path='/'
                element={
                  <Dashboard
                    boote={boote}
                    reservierungen={populatedReservations}
                  />
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
                    fetchReservierungen={fetchPopulatedReservations}
                  />
                }
              />
              <Route
                path='/details/reservierungen/:id'
                element={
                  <ResDetailseite
                    boote={boote}
                    fetchReservierungen={fetchPopulatedReservations}
                  />
                }
              />
              <Route
                path='/details/boote/:id'
                element={
                  <BootDetailseite
                    boote={boote}
                    fetchBoote={fetchBoote}
                    fetchReservierungen={fetchPopulatedReservations}
                  />
                }
              />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </ReservierungenContext.Provider>
  );
}

export default App;
