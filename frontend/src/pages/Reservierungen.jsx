import Liste from '../components/Liste';
import AddRes from '../components/Reservierungen/AddRes';
import { useEffect, useRef, useState, useContext } from 'react';
import { ReservierungenContext } from '../context/ReservierungenContext.jsx';

function Reservierungen() {
  const { populatedReservations } = useContext(ReservierungenContext);
  const [addMode, setAddMode] = useState(false);
  return (
    <main className='reservierungen'>
      <h1>Reservierungen</h1>
      {addMode ? (
        <AddRes setAddMode={setAddMode} />
      ) : (
        <Liste
          page='res'
          setAddMode={setAddMode}
          reservierungen={populatedReservations}
        />
      )}
    </main>
  );
}

export default Reservierungen;
