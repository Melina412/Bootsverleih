import { Link } from 'react-router-dom';

function ResItem({ res }) {
  return (
    <Link
      to={{ pathname: `/details/${res._id}`, state: { itemType: 'res' } }}
      title="hier geht's zur Reservierungen-Detailseite"
      onClick={() => sessionStorage.setItem('itemType', 'res')}
    >
      <p className='res-item'>
        {res.boot}, {new Date(res.startdatum).toLocaleDateString()} -{' '}
        {new Date(res.enddatum).toLocaleDateString()}
      </p>
    </Link>
  );
}

export default ResItem;
