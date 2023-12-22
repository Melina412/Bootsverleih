import { Link } from 'react-router-dom';

function ResItem({ res }) {
  const start_date = new Date(res.startdatum)
    .toLocaleDateString()
    .split('.')
    .map((part) => part.padStart(2, '0'))
    .join('.');

  const end_date = new Date(res.enddatum)
    .toLocaleDateString()
    .split('.')
    .map((part) => part.padStart(2, '0'))
    .join('.');

  return (
    <Link
      to={{
        pathname: `/details/reservierungen/${res._id}`,
        state: { itemType: 'res' },
      }}
      title="hier geht's zur Reservierungen-Detailseite"
      onClick={() => sessionStorage.setItem('itemType', 'res')}
    >
      {/* <div className='res-list-items'> */}
      <p className='res-item'>Res.-Nr: {res._id.slice(-5)}</p>

      <p className='res-item'>
        Datum:
        {start_date + ' - ' + end_date}
      </p>
      {/* </div> */}
    </Link>
  );
}

export default ResItem;
