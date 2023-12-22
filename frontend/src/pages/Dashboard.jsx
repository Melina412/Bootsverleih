function Dashboard({ boote, reservierungen }) {
  console.log(reservierungen.length);
  return (
    <main className='dash'>
      <h1>Dash</h1>
      <section>
        <article>
          <h2>Reservierungen</h2>
          <p>{reservierungen.length}</p>
        </article>

        <article>
          <h2>Verfügbare Boote</h2>
          <p>{boote.length - reservierungen.length}</p>
        </article>

        <article>
          <h2>Gesamtzahl Boote</h2>
          <p>{boote.length}</p>
        </article>
      </section>
    </main>
  );
}

export default Dashboard;
