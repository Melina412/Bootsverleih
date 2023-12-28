import BootItem from './Boote/BootItem';
import ResItem from './Reservierungen/ResItem';
import { useState } from 'react';

function Liste({ page, boote, reservierungen, setAddMode }) {
  return (
    <section className='list'>
      {page === 'boote' && (
        <article>
          <button onClick={() => setAddMode(true)}>Neues Boot anlegen</button>
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
          <button onClick={() => setAddMode(true)}>
            Neue Reservierung anlegen
          </button>
          {reservierungen?.map((res, index) => (
            <div
              key={res._id}
              id='even-odd'
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
