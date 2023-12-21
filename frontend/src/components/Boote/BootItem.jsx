import { Link } from 'react-router-dom';

function BootItem({ boot }) {
  return (
    <Link
      to={{ pathname: `/details/${boot._id}`, state: { itemType: 'boot' } }}
      title="hier geht's zur Boot-Detailseite"
      onClick={() => sessionStorage.setItem('itemType', 'boot')}
    >
      <p className='boot-item'>
        {boot.seriennummer}, {boot.name}, {boot.bootsart}
      </p>
    </Link>
  );
}

export default BootItem;
