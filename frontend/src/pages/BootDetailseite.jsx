import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function BootDetailseite({
  boote,
  reservierungen,
  fetchBoote,
  fetchReservierungen,
}) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [deleted, setDeleted] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const boot = boote?.find((item) => item._id === id);
  console.log({ boot });

  async function deleteBoot() {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKENDURL}/api/boats`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(boot),
      });
      if (res.ok) {
        console.log(boot.name, 'wurde gelöscht');
        setDeleted(true);
        fetchBoote();
        fetchReservierungen();
      } else {
        console.log('error');
      }
    } catch (error) {
      console.log('Fehler beim löschen', error);
    }
  }

  const handleDeleteBoot = () => {
    setConfirm(true);
  };

  const handleConfirmDeleteBoot = () => {
    deleteBoot();
    setTimeout(() => {
      navigate('/boote');
    }, 2000);
  };

  const handleCancelDeleteBoot = () => {
    setConfirm(false);
  };

  return (
    <main className='boot-details'>
      <h1>Bootdetails</h1>
      <section>
        {!deleted ? (
          <div className='details'>
            <h2>{boot?.name}</h2>
            <h3>{boot?.seriennummer}</h3>
            <p>
              Art: <span> {boot?.bootsart}</span>{' '}
            </p>
            <p>
              Baujahr: <span> {boot?.baujahr}</span>{' '}
            </p>
            <p>
              Material: <span> {boot?.material}</span>{' '}
            </p>
            <p>
              Farbe: <span> {boot?.farbe}</span>{' '}
            </p>
            <p>
              Passagierzahl: <span> {boot?.passagierzahl}</span>{' '}
            </p>
          </div>
        ) : (
          <div>
            <p>Boot wurde gelöscht!</p>
            <p>du wirst jetzt weitergeleitet...</p>
          </div>
        )}
        <button className='btn-del' onClick={handleDeleteBoot}>
          Boot löschen
        </button>
        {confirm && (
          <div className='warn'>
            <p>ACHTUNG!</p>
            <p>Möchtest du dieses Boot wirklich aus der Datenbank löschen?</p>

            <button className='btn-conf' onClick={handleConfirmDeleteBoot}>
              Ja
            </button>
            <button className='btn-cancel' onClick={handleCancelDeleteBoot}>
              Nein
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

export default BootDetailseite;
