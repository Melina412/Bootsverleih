function AddBoot({ setAddMode, fetchBoote }) {
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
        setAddMode(false);
        fetchBoote();
      }
    } catch (error) {
      console.log('Fehler beim erstellen des Bootes', error);
    }
  }

  return (
    <>
      <p>Add Boot componente</p>
      <form onSubmit={addBoot}>
        <input type='text' name='name' placeholder='Name' />
        <input type='number' name='baujahr' placeholder='Baujahr' />
        <input type='text' name='seriennummer' placeholder='Seriennummer' />
        <input type='text' name='material' placeholder='Material' />
        <input type='text' name='bootsart' placeholder='Bootsart' />
        <input type='text' name='farbe' placeholder='Farbe' />
        <input type='number' name='passagierzahl' placeholder='Passagierzahl' />

        {/* <div>
          <label htmlFor='img'>Bild hochladen: </label>
          <input type='file' name='img' />
        </div> */}
        <button type='submit'>Submit</button>
      </form>
    </>
  );
}

export default AddBoot;
