import { useState, useContext } from 'react';
import { LoginContext } from '../../context/LoginContext';

function AddBoot({ setAddMode, fetchBoote }) {
  const { loginData } = useContext(LoginContext);
  const [added, setAdded] = useState(false);

  console.log({ added });
  console.log({ loginData });

  async function addBoot(e) {
    e.preventDefault();
    const form = new FormData(e.target);

    const encodeBase64 = btoa(`${loginData.email}:${loginData.password}`);
    console.log({ encodeBase64 });
    const headers = new Headers({
      Authorization: `Basic ${encodeBase64}`,
    });

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKENDURL}/api/boats`, {
        method: 'POST',
        headers: headers,
        body: form,
      });
      const response = await res.json();
      console.log({ response });
      if (res.ok) {
        console.log('Boot wurde erstellt');
        setAdded(true);
        setTimeout(() => {
          setAddMode(false);
        }, 3000);
        fetchBoote();
      } else if (res.status === 401) {
        console.error('Login nicht erfolgreich:', response.error);
      }
    } catch (error) {
      console.log('Fehler beim erstellen des Bootes', error);
    }
  }

  return (
    <>
      {loginData.email === null && (
        <p>
          Nur der Admin ist berechtigt Boote zu erstellen. Bitte logge dich ein
          um fortzufahren.{' '}
        </p>
      )}
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
          <p>Du wirst zu den Booten weitergeleitet...</p>
        </div>
      )}
    </>
  );
}

export default AddBoot;
