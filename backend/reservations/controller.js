import { Reservation } from './model.js';
import { Boat } from '../boats/model.js';

//$ ----- addReservation ------------------------------------------------------

export async function addReservation(req, res) {
  console.log('req body:', req.body);
  const query = { _id: req.body.boot };

  try {
    const boat = await Boat.findOne(query);

    if (boat) {
      const reservation = new Reservation(req.body);
      reservation.boat = boat._id;
      console.log('reservation:', reservation);

      try {
        await reservation.save();
        console.log(boat.name, 'wurde reserviert');
        res.status(201).end();
      } catch (error) {
        console.log('reservierung konnte nicht erstellt werden', error);
        res.status(500).end();
      }
    }
  } catch (error) {
    console.log('Referenzboot wurde nicht gefunden', error);
    res.status(500).end();
  }
}

//$ ----- getReservations -----------------------------------------------------
//! lädt alle Reservierungen aus der collection (nur mit boot-ref)

export async function getReservations(req, res) {
  try {
    const reservations = await Reservation.find();
    res.json(reservations);
  } catch (error) {
    console.log('Reservierungen konnten nicht geladen werden', error);
    res.status(500).end();
  }
  res.end();
}

//$ ----- findReservation -----------------------------------------------------
//! anzeigen der Details -> populiert eine bestimmte Reservierung

export async function findReservation(req, res) {
  console.log('req body:', req.body);

  const query = { boot: req.body.boot };
  // hier muss ich nach der id von dem boot suchen und die ist im object unter 'boot' und nicht '_id'
  console.log({ query });

  const findBoat = await Reservation.findOne(query);
  console.log({ findBoat });
  try {
    const populatedReservation = await Reservation.findOne(query)
      .populate('boot')
      .exec();
    res.json(populatedReservation);
    console.log('pop. reservation:', populatedReservation);
  } catch (error) {
    console.log('Reservierung nicht gefunden', error);
    res.status(500).end();
  }
  res.end();
}
//
//

//$ ----- findBoatsWithReservations -----------------------------------------------------
//! Boote für die eine Reservierung existiert

async function findBoatsWithReservations() {
  try {
    const boatsWithReservations = await Boat.aggregate([
      {
        $lookup: {
          from: 'reservations',
          localField: '_id',
          foreignField: 'boot',
          as: 'reserviert',
        },
      },
      {
        $match: {
          reserviert: { $ne: [] },
        },
      },
    ]);

    const boatIdsWithReservations = boatsWithReservations.map(
      (boat) => boat._id
    );

    console.log('IDs der Boote mit Reservierung:', boatIdsWithReservations);
    // console.log('Boote mit Reservierung:', boatsWithReservations);
  } catch (error) {
    console.error('Fehler beim Abfragen der Boote mit Reservierungen:', error);
  }
}
findBoatsWithReservations();
//
//

//$ ----- findBoatsWithoutReservations -----------------------------------------------------
//! Boote die frei verfügbar sind

async function findBoatsWithoutReservations() {
  try {
    const boatsWithoutReservations = await Boat.aggregate([
      {
        $lookup: {
          from: 'reservations',
          localField: '_id',
          foreignField: 'boot',
          as: 'reserviert',
        },
      },
      {
        $match: {
          reserviert: { $eq: [] },
        },
      },
    ]);
    const boatIdsWithoutReservations = boatsWithoutReservations.map(
      (boat) => boat._id
    );

    console.log('IDs der Boote ohne Reservierung:', boatIdsWithoutReservations);
    console.log('Boote ohne Reservierung:', boatsWithoutReservations);
  } catch (error) {
    console.error('Fehler beim Abfragen der Boote ohne Reservierungen:', error);
  }
}
findBoatsWithoutReservations();
//
//

//$ ----- populateAllReservations -----------------------------------------------------
//! zeigt für alle Reservierungen den Zeitraum und das dazugehörige Boot an

async function populateAllReservations() {
  try {
    const allReservations = await Reservation.find();

    const populatedReservations = await Promise.all(
      allReservations.map(async (reservation) => {
        const populatedReservation = await Reservation.findById(reservation._id)
          .populate({
            path: 'boot',
            select: '_id name', // hier nur die beiden felder
          })
          .exec();

        return {
          _id: populatedReservation._id,
          startdatum: populatedReservation.startdatum,
          enddatum: populatedReservation.enddatum,
          boot: populatedReservation.boot,
        };
      })
    );

    console.log('Populierte Reservierungen:', populatedReservations);

    // Hier kannst du die populierten Reservierungen für weitere Verarbeitungsschritte verwenden
  } catch (error) {
    console.error('Fehler beim Populieren der Reservierungen:', error);
  }
}
populateAllReservations();
