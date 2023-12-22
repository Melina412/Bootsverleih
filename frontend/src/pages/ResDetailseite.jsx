import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EditRes from '../components/Reservierungen/EditRes';
import AddRes from '../components/Reservierungen/AddRes';

function ResDetailseite({
  reservierungen,
  boote,
  fetchBoote,
  fetchReservierungen,
  setAddMode,
  addMode,
}) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [resData, setResData] = useState([]); // populated Reservierung
  const [bootData, setBootData] = useState(); //
  const [deleted, setDeleted] = useState(false);
  const [editMode, setEditMode] = useState(false);

  console.log({ editMode });

  const reservierung = reservierungen?.find((item) => item._id === id);
  const bootID = reservierung?.boot; // ref aus der reservierung
  const boot = boote?.find((item) => item._id === bootID); // sucht nochmal die id aus der boote collection weil die daten aus der pop. res nicht da waren (brauche ich das noch?)
  // console.log({ boot });

  // console.log({ reservierungen });
  console.log({ reservierung });
  // console.log({ bootID });
  console.log({ resData });
  console.log({ bootData });
  // console.log('????? Sind Boot Daten da?: ', resData?.boot);

  useEffect(() => {
    fetchResDetails();
  }, [reservierungen, reservierung, boote, boot]);

  useEffect(() => {
    console.log('resData.boot:', resData.boot);
    setBootData(resData?.boot);
  }, [resData]);

  const handleDeleteRes = () => {
    deleteReservierung();
    setTimeout(() => {
      navigate('/reservierungen');
    }, 2000);
  };

  //! ----- fetchResDetails --------------------

  async function fetchResDetails() {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKENDURL}/api/reservations/details`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            boot: bootID,
          }),
        }
      );
      if (res.ok) {
        const data = await res.json();
        console.log({ data });
        //# das Problem ist der response ist immer erst null (warum trotz await???)
        //# aber wenn die Daten dann da sind wird setResData nicht mehr ausgeführt, weil der Wert ja schon auf null gesetzt wurde!
        if (data !== null) {
          setResData(data);
        }
      }
    } catch (error) {
      console.log('Fehler beim fetch der Reservierungsdetails', error);
    }
  }

  //! ----- deleteReservierung --------------------

  async function deleteReservierung() {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKENDURL}/api/reservations`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(reservierung),
        }
      );
      if (res.ok) {
        console.log(reservierung?._id.slice(-5), 'wurde gelöscht');
        setDeleted(true);
        fetchReservierungen();
      } else {
        console.log('error');
      }
    } catch (error) {
      console.log('Fehler beim löschen', error);
    }
  }

  return (
    <>
      <section>
        {!deleted ? (
          <div>
            <h2>Reservierungsnummer: {reservierung?._id.slice(-5)}</h2>
            <p></p>
            <p>
              {new Date(resData?.startdatum)
                .toLocaleDateString()
                .split('.')
                .map((part) => part.padStart(2, '0'))
                .join('.')}{' '}
              bis{' '}
              {new Date(resData?.enddatum)
                .toLocaleDateString()
                .split('.')
                .map((part) => part.padStart(2, '0'))
                .join('.')}{' '}
            </p>
            {bootData ? (
              <div>
                <h3>Info zum reservierten Boot:</h3>
                <p>Name: {bootData.name}</p>
                <p>Seriennummer: {bootData.seriennummer}</p>
                <p>Baujahr: {bootData.baujahr}</p>
                <p>Material: {bootData.material}</p>
                <p>Art: {bootData.bootsart}</p>
                <p>Farbe: {bootData.farbe}</p>
                <p>Passagiere: {bootData.passagierzahl}</p>
              </div>
            ) : (
              <div>
                <p>Daten werden geladen ...</p>
              </div>
            )}
          </div>
        ) : (
          <div>
            <p>Reservierung wurde gelöscht!!!!!</p>
            <p>Du wirst jetzt weitergeleitet...</p>
          </div>
        )}
        <button className='edit-res' onClick={() => setEditMode(true)}>
          Reservierung bearbeiten
        </button>
        <button className='del-res' onClick={handleDeleteRes}>
          Reservierung löschen
        </button>
      </section>
      {addMode && <AddRes />}
      {editMode && <EditRes setEditMode={setEditMode} />}
    </>
  );
}

export default ResDetailseite;
