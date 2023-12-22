import { Link } from 'react-router-dom';

function BootItem({ boot }) {
  return (
    <Link
      to={`/details/boote/${boot._id}`}
      // to={{ pathname: `/details/${boot._id}`, state: { itemType: 'boot' } }}
      // man kann über den react router link auch einen state weitergeben aber das hat nicht richtig funktioniert, deswegen nutze ich einfach den session storage und das klappt hervorragend
      title='Boot Detailseite'
      onClick={() => sessionStorage.setItem('itemType', 'boot')}
    >
      <p className='boot-item'>
        {boot.seriennummer}, {boot.name}, {boot.bootsart}
      </p>
    </Link>
  );
}

export default BootItem;
