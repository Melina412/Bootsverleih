import BootItem from './Boote/BootItem';
import ResItem from './Reservierungen/ResItem';

function Liste({ page, boote, reservierungen, setAddMode }) {
  return (
    <section className='list'>
      {page === 'boote' && (
        <article>
          <button onClick={() => setAddMode(true)}>+ Add Boot</button>
          {boote?.map((boot, index) => (
            <div
              key={boot._id}
              className={index % 2 === 0 ? 'even-boat' : 'odd-boat'}
            >
              <BootItem boot={boot} boote={boote} />
            </div>
          ))}
        </article>
      )}
      {page === 'res' && (
        <article>
          <button onClick={() => setAddMode(true)}>+ Add Reservation</button>
          {reservierungen?.map((res, index) => (
            <div
              key={res._id}
              className={index % 2 === 0 ? 'even-res' : 'odd-res'}
            >
              <ResItem res={res} reservierungen={reservierungen} />
            </div>
          ))}
        </article>
      )}
    </section>
  );
}

export default Liste;
