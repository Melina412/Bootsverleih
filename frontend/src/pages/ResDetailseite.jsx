import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ReservierungenContext } from '../context/ReservierungenContext.jsx';
import EditRes from '../components/Reservierungen/EditRes';
import AddRes from '../components/Reservierungen/AddRes';

function ResDetailseite({ boote, fetchBoote, setAddMode, addMode }) {
  const { populatedReservations } = useContext(ReservierungenContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [deleted, setDeleted] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [editMode, setEditMode] = useState(false);

  console.log({ editMode });

  const reservierung = populatedReservations?.find((item) => item._id === id);
  const bootID = reservierung?.boot; // ref aus der reservierung

  console.log({ reservierung });
  console.log('reservierung.boot:', reservierung?.boot);

  const handleDeleteRes = () => {
    setConfirm(true);
  };

  const handleConfirmDeleteRes = () => {
    deleteReservierung();
    setTimeout(() => {
      navigate('/reservierungen');
    }, 2000);
  };

  const handleCancelDeleteRes = () => {
    setConfirm(false);
  };

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
    <main className='res-details'>
      <h1>Reservierungsdetails</h1>
      <section>
        {!deleted ? (
          <div className='details'>
            <h2>Reservierungsnummer: {reservierung?._id.slice(-5)}</h2>

            <p className='datum'>
              {new Date(reservierung?.startdatum)
                .toLocaleDateString()
                .split('.')
                .map((part) => part.padStart(2, '0'))
                .join('.')}{' '}
              bis{' '}
              {new Date(reservierung?.enddatum)
                .toLocaleDateString()
                .split('.')
                .map((part) => part.padStart(2, '0'))
                .join('.')}{' '}
            </p>

            {/* {reservierung ? ( */}
            {!editMode && (
              <div>
                <h3>Info zum reservierten Boot:</h3>
                <div className='info-flex'>
                  <div>
                    <p>
                      Name: <span>{reservierung?.boot.name}</span>
                    </p>
                    <p>
                      Serien-Nr.: <span>{reservierung?.boot.seriennummer}</span>
                    </p>
                    <p>
                      Passagiere:{' '}
                      <span>{reservierung?.boot.passagierzahl}</span>
                    </p>
                    <p>
                      Baujahr: <span>{reservierung?.boot.baujahr}</span>
                    </p>
                  </div>
                  <div>
                    <p>
                      Art: <span>{reservierung?.boot.bootsart}</span>
                    </p>
                    <p>
                      Material: <span>{reservierung?.boot.material}</span>
                    </p>
                    <p>
                      Farbe: <span>{reservierung?.boot.farbe}</span>
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/*  ) : ( */}
            {/*  <div> */}
            {/*  <p>Daten werden geladen ...</p> */}
            {/*  </div> */}
            {/*  )} */}
          </div>
        ) : (
          <div>
            <p>Reservierung wurde gelöscht!!!!!</p>
            <p>Du wirst jetzt weitergeleitet...</p>
          </div>
        )}
        {!editMode && (
          <div>
            <button className='btn-edit' onClick={() => setEditMode(true)}>
              Reservierung bearbeiten
            </button>
            <button className='btn-del' onClick={handleDeleteRes}>
              Reservierung löschen
            </button>
          </div>
        )}

        {confirm && (
          <div className='warn'>
            <p>ACHTUNG!</p>
            <p>
              Möchtest du diese Reservierung wirklich aus der Datenbank löschen?
            </p>

            <button className='btn-conf' onClick={handleConfirmDeleteRes}>
              Ja
            </button>
            <button className='btn-cancel' onClick={handleCancelDeleteRes}>
              Nein
            </button>
          </div>
        )}
      </section>
      {editMode && <EditRes setEditMode={setEditMode} />}
    </main>
  );
}

export default ResDetailseite;
