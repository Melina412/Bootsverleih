import { useEffect, useRef, useState } from 'react';

function AddRes({ setAddMode, fetchReservierungen }) {
  //
  let boatsWithoutReservations = [
    {
      _id: '6582f2729f734dccea39f3a2',
      name: 'Boatzilla X3000',
      baujahr: 2021,
      seriennummer: 'BZ3000SN001',
      material: 'Metall',
      bootsart: 'Luftkissenboot',
      farbe: 'Silber',
      passagierzahl: 8,
      reserviert: [],
    },
    {
      _id: '6582f2b39f734dccea39f3a5',
      name: 'Regenbogen Racer',
      baujahr: 2022,
      seriennummer: 'RR2022SN005',
      material: 'GFK',
      bootsart: 'Motorboot',
      farbe: 'Bunt',
      passagierzahl: 4,
      reserviert: [],
    },
  ];

  let populatedReservations = [
    {
      _id: '65836d9024ebff65c36dbe84',
      startdatum: '2024-05-10T00:00:00.000Z',
      enddatum: '2024-05-30T00:00:00.000Z',
      boot: {
        _id: '6582f28f9f734dccea39f3a3',
        name: 'Quacksalber Queen',
      },
    },
    {
      _id: '65836fbea584d2878bd84e51',
      startdatum: '2024-01-01T00:00:00.000Z',
      enddatum: '2024-01-02T00:00:00.000Z',
      boot: {
        _id: '65835cb3436ea31e3670f0c0',
        name: 'Keks-Kanu',
      },
    },
  ];
  //

  // let today = new Date('2023-12-21').getTime();
  // let tomorrow = new Date('2023-12-22').getTime();
  //
  const [resStart, setResStart] = useState();
  const [resEnd, setResEnd] = useState();
  const [selectOptions, setSelectOptions] = useState([]);

  console.log({ resStart });
  console.log({ selectOptions });

  useEffect(() => {
    getSelectOptions();
  }, [resStart, resEnd]);

  //

  // hier erstelle ich einen array mit allen freien booten. der setzt sich aus zwei teilen zusammen
  function getSelectOptions() {
    const optionsArray = [];
    // 1. alle boote für die keine reservierung vorliegt
    boatsWithoutReservations.forEach((boat) =>
      optionsArray.push({
        id: boat._id,
        name: boat.name,
      })
    );

    // 2. gefilterte boote aus den populierten reservierungen, bei denen das eingegebene enddatum vor dem beginn der bestehenden Rrservierung liegt oder das eingegebene startdatum nach dem ende der bestehenden reservierung liegt
    const matchedRes = populatedReservations.filter(
      (res) =>
        new Date(res.startdatum).getTime() > resEnd ||
        new Date(res.enddatum).getTime() < resStart
    );
    console.log({ matchedRes });
    matchedRes.forEach((res) =>
      optionsArray.push({
        id: res.boot._id,
        name: res.boot.name,
      })
    );
    // für beide gruppen werden jeweils der name und die id des bootes im array gespeichert
    console.log({ optionsArray });
    setSelectOptions(optionsArray);
  }
  //
  //
  //
  async function addRes(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKENDURL}/api/reservations`,
        {
          method: 'POST',
          body: form,
        }
      );
      if (res.ok) {
        console.log('Reservierung wurde erstellt');
        setAddMode(false);
        fetchReservierungen();
      }
    } catch (error) {
      console.log('Fehler beim erstellen der Reservierung', error);
    }
  }
  return (
    <>
      <p>Add Res componente</p>
      <form onSubmit={addRes}>
        <div>
          <label htmlFor='startdatum'>Startdatum</label>
          <input
            type='date'
            name='startdatum'
            onChange={(e) => setResStart(new Date(e.target.value).getTime())}
          />
        </div>
        <div>
          <label htmlFor='enddatum'>Enddatum</label>
          <input
            type='date'
            name='enddatum'
            onChange={(e) => setResEnd(new Date(e.target.value).getTime())}
          />
        </div>
        {selectOptions ? (
          <div>
            <label htmlFor='boot'>Welches Boot</label>
            <select name='boot' id='boot'>
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
              Bitte zuerst Datum auswählen. Die verfügbaren Boote werden dann
              angezeigt.
            </p>
          </div>
        )}

        <button type='submit'>Submit</button>
      </form>
    </>
  );
}

export default AddRes;
