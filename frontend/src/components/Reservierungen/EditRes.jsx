import { useState } from 'react';

function EditRes({ setEditMode }) {
  const [resStart, setResStart] = useState();
  const [resEnd, setResEnd] = useState();

  const minDate = resStart
    ? new Date(resStart).toISOString().split('T')[0]
    : null;

  const handleEdit = () => {};

  return (
    <section>
      <h2>Reservierung bearbeiten:</h2>
      <form>
        <div>
          <label htmlFor='startdatum'>Neues Startdatum</label>
          <input
            type='date'
            name='startdatum'
            min={new Date().toISOString().split('T')[0]}
            onChange={(e) => setResStart(new Date(e.target.value).getTime())}
          />
        </div>
        <div>
          <label htmlFor='enddatum'>Neues Enddatum</label>
          <input
            type='date'
            name='enddatum'
            min={minDate}
            onChange={(e) => setResEnd(new Date(e.target.value).getTime())}
          />
        </div>
        {resStart && resEnd ? (
          <div>
            <label htmlFor='boot'>Welches Boot</label>
            <select name='boot'>
              {selectOptions?.map((option, key) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div>
            <p>
              Bitte zuerst ein neues Datum auswählen. Die verfügbaren Boote für
              diesen Zeitraum werden dann angezeigt.
            </p>
          </div>
        )}

        <button type='submit' onClick={handleEdit}>
          Änderungen speichern
        </button>
      </form>
      <button onClick={() => setEditMode(false)}>Abbrechen</button>
    </section>
  );
}

export default EditRes;
