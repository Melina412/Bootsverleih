import { Reservation } from '../reservations/model.js';
import { Boat } from './model.js';

//$ ----- addBoat -----
//# hierfür muss sich der user jetzt authentifizieren

export async function addBoat(req, res) {
  const boat = new Boat(req.body);
  console.log('boat:', boat);
  // boat.bild = req.file.path;

  try {
    await boat.save();
    console.log(boat.name, 'wurde erstellt');
    res.status(201).end();
  } catch (error) {
    console.log('boot konnte nicht erstellt werden', error);
    res.status(500).end();
  }
}

//$ ----- getBoats -----

export async function getBoats(req, res) {
  try {
    const boats = await Boat.find();
    res.json(boats);
  } catch (error) {
    console.log('Boote konnten nicht geladen werden', error);
    res.status(500).end();
  }
  res.end();
}

//$ ----- deleteBoat -----

export async function deleteBoat(req, res) {
  console.log('req body:', req.body);
  const query = { _id: req.body._id };
  const ref = { boot: req.body._id };
  console.log({ query });
  console.log({ ref });

  try {
    const DeleteResultBoat = await Boat.deleteOne(query);
    console.log({ DeleteResultBoat });

    if (DeleteResultBoat.deletedCount > 0) {
      console.log(req.body.name, 'wurde gelöscht');

      try {
        const reservations = await Reservation.find(ref);
        console.log({ reservations });

        const DeleteResultReservation = await Reservation.deleteMany(ref);

        if (DeleteResultReservation.deletedCount > 0) {
          console.log(
            ` Es wurden ${DeleteResultReservation.deletedCount} Reservierungen für ${req.body.name} gelöscht.`
          );
          res.status(204).end();
        }
      } catch (error) {
        console.log('Es wurden keinevReservierungen gefunden', error);
        res.status(500).end();
      }
      res.status(204).end();
    }
  } catch (error) {
    console.log('Boot wurde nicht gefunden', error);
    res.status(500).end();
  }
}
