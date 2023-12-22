import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ResDetailseite({ reservierungen, boote }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [resData, setResData] = useState([]);
  const [bootData, setBootData] = useState();
  const [deleted, setDeleted] = useState(false);

  const item = reservierungen?.find((item) => item._id === id);
  const bootID = item?.boot;
  const boot = boote?.find((item) => item._id === bootID);
  // console.log({ boot });

  // console.log({ reservierungen });
  // console.log({ item });
  console.log({ bootID });
  console.log({ resData });

  console.log('????? Sind Boot Daten da?: ', resData?.boot);

  const handleDeleteRes = () => {
    setDeleted(true);
    setTimeout(() => {
      navigate('/reservierungen');
    }, 2000);
  };

  useEffect(() => {
    fetchReservationDetails();
  }, [reservierungen, item, boote, boot]);

  async function fetchReservationDetails() {
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
  useEffect(() => {
    console.log('resData.boot:', resData.boot);
    setBootData(resData?.boot);
  }, [resData]);
  console.log({ bootData });

  return (
    <section>
      {!deleted ? (
        <div>
          <h2>Reservierungsnummer: {item?._id.slice(-6, -1)}</h2>
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
        </div>
      )}
      <button className='del-res' onClick={handleDeleteRes}>
        Reservierung löschen
      </button>
    </section>
  );
}

export default ResDetailseite;
