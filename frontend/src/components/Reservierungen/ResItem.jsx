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
    <div className='list-item'>
      <Link
        to={`/details/reservierungen/${res._id}`}
        title='Details der Reservierung'
      >
        <p className='res-item'>Res.-Nr: {res._id.slice(-5)}</p>
        <p className='res-item'>{res.boot.name}</p>
        <p className='res-item'>{start_date + ' - ' + end_date}</p>
      </Link>
    </div>
  );
}

export default ResItem;
