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
        <section>
          <form onSubmit={addBoot}>
            <input type='text' name='name' placeholder='Name' />
            <input type='number' name='baujahr' placeholder='Baujahr' />
            <input type='text' name='seriennummer' placeholder='Seriennummer' />
            <input type='text' name='material' placeholder='Material' />
            <input type='text' name='bootsart' placeholder='Bootsart' />
            <input type='text' name='farbe' placeholder='Farbe' />
            <input
              type='number'
              name='passagierzahl'
              placeholder='Passagierzahl'
            />

            {/* <div>
          <label htmlFor='img'>Bild hochladen: </label>
          <input type='file' name='img' />
        </div> */}
            <button type='submit'>Submit</button>
          </form>

          <button onClick={() => setAddMode(false)}>Abbbrechen</button>
        </section>
      ) : (
        <div>
          <p>Boot wurde erstellt!</p>
        </div>
      )}
    </>
  );
}

export default AddBoot;
