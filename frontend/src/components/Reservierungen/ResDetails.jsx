import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function ResDetails({ reservierung }) {
  const navigate = useNavigate();
  const [deleted, setDeleted] = useState(false);
  console.log({ reservierung });

  const handleDeleteRes = () => {
    setDeleted(true);
    setTimeout(() => {
      navigate('/reservierungen');
    }, 2000);
  };

  return (
    <section>
      {!deleted ? (
        <div>
          <p>{reservierung?.boot} ist reserviert von:</p>
          <p>
            {reservierung?.startdatum} bis {reservierung?.enddatum}{' '}
          </p>
        </div>
      ) : (
        <div>
          <p>Reservierung wurde gelöscht!!!!!</p>
        </div>
      )}
      <button className='del-res' onClick={handleDeleteRes}>
        Reservierung löschen
      </button>
    </section>
  );
}

export default ResDetails;
