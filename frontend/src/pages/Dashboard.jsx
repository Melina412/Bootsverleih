function Dashboard({ boote, reservierungen }) {
  return (
    <main className='dash'>
      <h1>🛟⚓️⛵️✨Helges Bootverleih✨⛵️⚓️🛟</h1>
      <section>
        <article>
          <h3>Reservierungen</h3>
          <p>{reservierungen.length}</p>
        </article>

        <article>
          <h3>Verfügbare Boote</h3>
          <p>{boote.length - reservierungen.length}</p>
        </article>

        <article>
          <h3>Gesamtzahl Boote</h3>
          <p>{boote.length}</p>
        </article>
      </section>
    </main>
  );
}

export default Dashboard;
