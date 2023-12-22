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
    deleteBoot();
    setTimeout(() => {
      navigate('/boote');
    }, 2000);
  };

  return (
    <section>
      {!deleted ? (
        <div>
          <h1>{boot?.name}</h1>
          <h2>{boot?.seriennummer}</h2>
          <p>Art: {boot?.bootsart}</p>
          <p>Baujahr: {boot?.baujahr}</p>
          <p>Material: {boot?.material}</p>
          <p>Farbe: {boot?.farbe}</p>
          <p>Passagierzahl: {boot?.passagierzahl}</p>
        </div>
      ) : (
        <div>
          <p>Boot wurde gelöscht!</p>
          <p>du wirst jetzt weitergeleitet...</p>
        </div>
      )}
      <button className='del-res' onClick={handleDeleteBoot}>
        Boot löschen
      </button>
    </section>
  );
}

export default BootDetailseite;
