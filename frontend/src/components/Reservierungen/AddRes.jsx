import { useEffect, useRef, useState, useContext } from 'react';
import { ReservierungenContext } from '../../context/ReservierungenContext.jsx';
// import getSelectOptions from '../../utils/selectOptions';

function AddRes({ setAddMode, fetchReservierungen }) {
  const {
    selectOptions,

    fetchFreeBoats,
    fetchPopulatedReservations,
    resStart,
    resEnd,
    setResStart,
    setResEnd,
  } = useContext(ReservierungenContext);

  //$ ---------- useStates ---------------

  // const [resStart, setResStart] = useState();
  // const [resEnd, setResEnd] = useState();
  const [added, setAdded] = useState(false);

  const minDate = resStart
    ? new Date(resStart).toISOString().split('T')[0]
    : null;

  console.log({ added });

  //$ ---------- useEffects ---------------

  useEffect(() => {
    fetchFreeBoats();
    fetchPopulatedReservations();
  }, []);

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
                    <option key={option._id} value={option._id}>
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
