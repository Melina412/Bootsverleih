import { useState } from 'react';
import Liste from '../components/Liste';
import AddRes from '../components/Reservierungen/AddRes';

function Reservierungen({ reservierungen, fetchReservierungen, setAddMode }) {
  // const [addMode, setAddMode] = useState(false);

  return (
    <main className='reservierungen'>
      <h1>Reservierungen</h1>

      <button onClick={() => setAddMode(true)}>
        Neue Reservierung anlegen
      </button>
      {/*
      {addMode ? (
        <AddRes
          setAddMode={setAddMode}
          fetchReservierungen={fetchReservierungen}
        />
      ) : ( */}
      <Liste page='res' reservierungen={reservierungen} />
      {/* )} */}
    </main>
  );
}

export default Reservierungen;
