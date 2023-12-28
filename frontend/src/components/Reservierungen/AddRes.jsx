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
        <section className='add-res add'>
          <form onSubmit={addRes}>
            <div className='input-flex'>
              <label htmlFor='startdatum'>Startdatum</label>
              <div>
                <input
                  required
                  type='date'
                  name='startdatum'
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) =>
                    setResStart(new Date(e.target.value).getTime())
                  }
                />
                <span className='input-feedback'></span>
              </div>
            </div>
            <div className='input-flex'>
              <label htmlFor='enddatum'>Enddatum</label>
              <div>
                <input
                  required
                  type='date'
                  name='enddatum'
                  min={minDate}
                  onChange={(e) =>
                    setResEnd(new Date(e.target.value).getTime())
                  }
                />
                <span className='input-feedback'></span>
              </div>
            </div>
            {resStart && resEnd ? (
              <div className='input-flex'>
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

            <button className='btn-submit' type='submit'>
              Speichern
            </button>
          </form>
          <button
            className='btn-cancel
          '
            onClick={() => setAddMode(false)}
          >
            Abbrechen
          </button>
        </section>
      ) : (
        <div>
          <p>Reservierung wurde erstellt und gespeichert!</p>
          <p>Du wirst zu den Reservierungen weitergeleitet...</p>
        </div>
      )}
    </>
  );
}

export default AddRes;
