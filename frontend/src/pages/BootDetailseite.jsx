import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function BootDetailseite({ boote, reservierungen }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [deleted, setDeleted] = useState(false);

  const boot = boote?.find((item) => item._id === id);
  console.log({ boot });

  const handleDeleteBoot = () => {
    setDeleted(true);
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
          <p>{boot?.name} wurde gelöscht!!!!!</p>
          <p>du wirst jetzt zur Übersicht der Boote weitergeleitet...</p>
        </div>
      )}
      <button className='del-res' onClick={handleDeleteBoot}>
        Boot löschen
      </button>
    </section>
  );
}

export default BootDetailseite;
