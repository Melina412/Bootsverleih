import { Link } from 'react-router-dom';

function BootItem({ boot }) {
  return (
    <div className='list-item'>
      <Link to={`/details/boote/${boot._id}`} title='Boot Details'>
        <p className='boot-item'>{boot.name}</p>
        <p className='boot-item'>{boot.bootsart}</p>
        <p className='boot-item s-nr'>Serien-Nr. {boot.seriennummer}</p>
      </Link>
    </div>
  );
}

export default BootItem;
