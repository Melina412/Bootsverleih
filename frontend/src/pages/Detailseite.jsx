import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BootDetails from '../components/Boote/BootDetails';
import ResDetails from '../components/Reservierungen/ResDetails';

function Detailseite({ boote, reservierungen }) {
  const { id } = useParams();
  const itemType = sessionStorage.getItem('itemType');
  console.log({ itemType });
  const [items, setItems] = useState();

  useEffect(() => {
    if (itemType === 'boot') {
      setItems(boote);
    }
    if (itemType === 'res') {
      setItems(reservierungen);
    }
  }, [itemType, boote, reservierungen]);

  const item = items?.find((item) => item._id === id);
  console.log({ item });
  console.log({ items });

  return (
    <>
      <p>(Detailseite)</p>
      {itemType === 'boot' && <BootDetails boot={item} />}
      {itemType === 'res' && <ResDetails reservierung={item} />}
    </>
  );
}

export default Detailseite;
