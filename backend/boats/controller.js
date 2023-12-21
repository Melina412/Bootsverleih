import { Boat } from './model.js';

//$ ----- addBoat -----

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
