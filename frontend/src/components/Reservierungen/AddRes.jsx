import { useEffect, useRef, useState } from 'react';

function AddRes({ setAddMode, fetchReservierungen }) {
  //$ ---------- useStates ---------------

  const [resStart, setResStart] = useState();
  const [resEnd, setResEnd] = useState();
  const [selectOptions, setSelectOptions] = useState([]);
  const [boatsWithoutReservations, setBoatsWithoutReservations] = useState([]);
  const [populatedReservations, setPopulatedReservations] = useState([]);
  const [added, setAdded] = useState(false);

  const minDate = resStart
    ? new Date(resStart).toISOString().split('T')[0]
    : null;

  console.log({ resStart });
  console.log({ selectOptions });
  console.log({ populatedReservations });
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
  console.log({ added });

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
        id: boat._id,
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

  //$ ---------- addReservation ---------------
  // Daten aus dem Formular ans Backend schicken

  async function addRes(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKENDURL}/api/reservations`,
        {
          method: 'POST',
          body: form,
        }
      );
      if (res.ok) {
        console.log('Reservierung wurde erstellt');
        setAdded(true);
        setTimeout(() => {
          setAddMode(false);
        }, 3000);
        fetchReservierungen();
      }
    } catch (error) {
      console.log('Fehler beim erstellen der Reservierung', error);
    }
  }
  return (
    <>
      {!added ? (
        <section>
          <form onSubmit={addRes}>
            <div>
              <label htmlFor='startdatum'>Startdatum</label>
              <input
                type='date'
                name='startdatum'
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) =>
                  setResStart(new Date(e.target.value).getTime())
                }
              />
            </div>
            <div>
              <label htmlFor='enddatum'>Enddatum</label>
              <input
                type='date'
                name='enddatum'
                min={minDate}
                onChange={(e) => setResEnd(new Date(e.target.value).getTime())}
              />
            </div>
            {resStart && resEnd ? (
              <div>
                <label htmlFor='boot'>Welches Boot</label>
                <select name='boot'>
                  {selectOptions?.map((option, key) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <div>
                <p>
                  Bitte zuerst Datum auswählen. Die verfügbaren Boote werden
                  dann angezeigt.
                </p>
              </div>
            )}

            <button type='submit'>Submit</button>
          </form>
          <button onClick={() => setAddMode(false)}>Abbrechen</button>
        </section>
      ) : (
        <div>
          <p>Reservierung wurde erstellt!</p>
          <p>Du wirst zu den Reservierungen weitergeleitet...</p>
        </div>
      )}
    </>
  );
}

export default AddRes;
