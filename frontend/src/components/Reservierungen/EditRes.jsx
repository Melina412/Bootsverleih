import { useEffect, useRef, useState, useContext } from 'react';
import { ReservierungenContext } from '../../context/ReservierungenContext.jsx';

function EditRes({ setEditMode }) {
  const {
    selectOptions,
    fetchFreeBoats,
    fetchPopulatedReservations,
    resStart,
    resEnd,
    setResStart,
    setResEnd,
  } = useContext(ReservierungenContext);

  const minDate = resStart
    ? new Date(resStart).toISOString().split('T')[0]
    : null;

  const handleEdit = () => {};

  return (
    <section className='edit-res add'>
      <h2 className='h2-edit'>Reservierung bearbeiten:</h2>
      <form>
        <div className='edit-input'>
          <label htmlFor='startdatum'>Neues Startdatum</label>
          <input
            required
            type='date'
            name='startdatum'
            min={new Date().toISOString().split('T')[0]}
            onChange={(e) => setResStart(new Date(e.target.value).getTime())}
          />
        </div>
        <div className='edit-input'>
          <label htmlFor='enddatum'>Neues Enddatum</label>
          <input
            required
            type='date'
            name='enddatum'
            min={minDate}
            onChange={(e) => setResEnd(new Date(e.target.value).getTime())}
          />
        </div>
        {resStart && resEnd ? (
          <div className='edit-input'>
            <label htmlFor='boot'>Welches Boot</label>
            <select name='boot'>
              {selectOptions?.map((option, key) => (
                <option key={option._id} value={option._id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div>
            <p className='edit-text'>
              Bitte zuerst ein neues Datum auswählen. Die verfügbaren Boote für
              diesen Zeitraum werden dann angezeigt.
            </p>
          </div>
        )}

        <button
          className='btn-submit btn-submit-edit'
          type='submit'
          onClick={handleEdit}
        >
          Änderungen speichern
        </button>
      </form>
      <button className='btn-cancel' onClick={() => setEditMode(false)}>
        Abbrechen
      </button>
    </section>
  );
}

export default EditRes;
