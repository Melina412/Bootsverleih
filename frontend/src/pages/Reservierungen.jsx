import { useState } from 'react';
import Liste from '../components/Liste';
import AddRes from '../components/Reservierungen/AddRes';

function Reservierungen({ reservierungen, fetchReservierungen }) {
  const [addMode, setAddMode] = useState(false);
  console.log({ addMode });
  return (
    <main className='reservierungen'>
      <h1>Reservierungen</h1>
      {addMode ? (
        <AddRes
          setAddMode={setAddMode}
          fetchReservierungen={fetchReservierungen}
        />
      ) : (
        <Liste
          page='res'
          reservierungen={reservierungen}
          setAddMode={setAddMode}
        />
      )}
    </main>
  );
}

export default Reservierungen;
