import './App.scss';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Boote from './pages/Boote';
import Reservierungen from './pages/Reservierungen';
import Nav from './components/Nav';
import ResDetailseite from './pages/ResDetailseite';
import BootDetailseite from './pages/BootDetailseite';
import { ReservierungenContext } from './context/ReservierungenContext';
// import getSelectOptions from './utils/selectOptions';

function App() {
  //$ states
  const [boote, setBoote] = useState([]);
  const [reservierungen, setReservierungen] = useState([]);
  // const [addMode, setAddMode] = useState(false);

  //$ states für ReservierungenContext
  const [boatsWithoutReservations, setBoatsWithoutReservations] = useState([]);
  const [populatedReservations, setPopulatedReservations] = useState([]);
  const [selectOptions, setSelectOptions] = useState([]);
  const [resStart, setResStart] = useState();
  const [resEnd, setResEnd] = useState();

  useEffect(() => {
    fetchBoote();
  }, []);

  useEffect(() => {
    fetchReservierungen();
  }, []);

  async function fetchBoote() {
    const res = await fetch(`${import.meta.env.VITE_BACKENDURL}/api/boats`);
    if (res.ok) {
      const data = await res.json();
      setBoote(data);
    }
  }

  async function fetchReservierungen() {
    const res = await fetch(
      `${import.meta.env.VITE_BACKENDURL}/api/reservations`
    );
    if (res.ok) {
      const data = await res.json();
      setReservierungen(data);
    }
  }

  //$ ---------- getSelectOptions ---------------

  useEffect(() => {
    getSelectOptions();
  }, [resStart, resEnd]);

  // hier erstelle ich einen Array mit allen verfügbaren Booten im Zeitraum der gewünschten Reservierung. der setzt sich aus zwei Gruppen zusammen
  function getSelectOptions() {
    const optionsArray = [];
    // 1. alle Boote für die keine Reservierung vorliegt
    boatsWithoutReservations.forEach((boat) =>
      optionsArray.push({
        _id: boat._id,
        name: boat.name,
      })
    );

    // 2. gefilterte Boote aus den populierten Reservierungen, bei denen das eingegebene Enddatum vor dem Beginn der bestehenden Reservierung liegt oder das eingegebene Startdatum nach dem Ende der bestehenden Reservierung liegt
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

  //$ ---------- fetchFreeBoats ---------------

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

  //$ console logs

  console.log({ boote });
  console.log({ reservierungen });
  // console.log({ addMode });

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
                    // addMode={addMode}
                    // setAddMode={setAddMode}
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
                    // setAddMode={setAddMode}
                    // addMode={addMode}
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
    </ReservierungenContext.Provider>
  );
}

export default App;
