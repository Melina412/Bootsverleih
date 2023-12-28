import { useState } from 'react';

function AddBoot({ setAddMode, fetchBoote }) {
  const [added, setAdded] = useState(false);
  console.log({ added });

  async function addBoot(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKENDURL}/api/boats`, {
        method: 'POST',
        body: form,
      });
      if (res.ok) {
        console.log('Boot wurde erstellt');
        setAdded(true);
        setTimeout(() => {
          setAddMode(false);
        }, 3000);
        fetchBoote();
      }
    } catch (error) {
      console.log('Fehler beim erstellen des Bootes', error);
    }
  }

  return (
    <>
      {!added ? (
        <section className='add-boot add'>
          <h3>Hier kannst du die Daten für das neue Boot eingeben: </h3>
          <form onSubmit={addBoot}>
            <div>
              <input required type='text' name='name' placeholder='Name' />
              <span className='input-feedback'></span>
            </div>

            <div>
              <input
                required
                type='number'
                name='baujahr'
                placeholder='Baujahr'
              />
              <span className='input-feedback'></span>
            </div>

            <div>
              <input
                required
                type='text'
                name='seriennummer'
                placeholder='Seriennummer'
              />
              <span className='input-feedback'></span>
            </div>

            <div>
              <input
                required
                type='text'
                name='material'
                placeholder='Material'
              />
              <span className='input-feedback'></span>
            </div>

            <div>
              <input
                required
                type='text'
                name='bootsart'
                placeholder='Bootsart'
              />
              <span className='input-feedback'></span>
            </div>

            <div>
              <input required type='text' name='farbe' placeholder='Farbe' />
              <span className='input-feedback'></span>
            </div>

            <div>
              <input
                required
                type='number'
                name='passagierzahl'
                placeholder='Passagierzahl'
              />
              <span className='input-feedback'></span>
            </div>

            {/* <div>
          <label htmlFor='img'>Bild hochladen: </label>
          <input type='file' name='img' />
        </div> */}
            <button className='btn-submit' type='submit'>
              Speichern
            </button>
          </form>

          <button className='btn-cancel' onClick={() => setAddMode(false)}>
            Abbrechen
          </button>
        </section>
      ) : (
        <div>
          <p>Boot wurde erstellt und gespeichert!</p>
          <p>Du wirst zu den Booten weitergeleitet...</p>
        </div>
      )}
    </>
  );
}

export default AddBoot;
