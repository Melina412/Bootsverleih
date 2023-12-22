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

//$ ----- populateReservation -----------------------------------------------------
//! anzeigen der Details -> populiert eine bestimmte Reservierung
//# suche anhand der Boot id

export async function populateReservation(req, res) {
  console.log('req body:', req.body);

  // hier muss ich nach der id von dem boot suchen und die ist im object unter 'boot' und nicht '_id'
  const query = { boot: req.body.boot };
  console.log({ query });

  // der schritt ist nur um zu sehen ob die query richtig ist
  const findBoat = await Reservation.findOne(query);
  console.log({ findBoat });

  try {
    const populatedReservation = await Reservation.findOne(query)
      .populate('boot')
      .exec();
    res.json(populatedReservation);
    console.log('pop. reservation:', populatedReservation);
    //
  } catch (error) {
    console.log('Reservierung nicht gefunden', error);
    res.status(500).end();
  }
  res.end();
}

//$ ----- findBoatsWithReservations -----------------------------------------------------
//! Boote für die eine Reservierung existiert

//xxx hierfür brauche ich keine route!
export async function findBoatsWithReservations() {
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
// findBoatsWithReservations();
//
//

//$ ----- findBoatsWithoutReservations -----------------------------------------------------
//! Boote die frei verfügbar sind

export async function findBoatsWithoutReservations(req, res) {
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
    res.json(boatsWithoutReservations); // <- damit schicke ich die Daten ans Frontend!
    console.log('IDs der Boote ohne Reservierung:', boatIdsWithoutReservations);
    console.log('Boote ohne Reservierung:', boatsWithoutReservations);
  } catch (error) {
    console.error('Fehler beim Abfragen der Boote ohne Reservierungen:', error);
    res.status(500).end();
  }
  res.end();
}
//
//

//$ ----- populateAllReservations -----------------------------------------------------
//! zeigt für alle Reservierungen den Zeitraum und das dazugehörige Boot an

export async function populateAllReservations(req, res) {
  try {
    const allReservations = await Reservation.find();

    if (allReservations) {
      try {
        const populatedReservations = await Promise.all(
          allReservations.map(async (reservation) => {
            const populatedReservation = await Reservation.findById(
              reservation._id
            )
              .populate({
                path: 'boot',
                select: '_id name', // hier sollen nur die beiden felder angezeigt werden
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
        res.json(populatedReservations);
        console.log('Populierte Reservierungen:', populatedReservations);
      } catch (error) {
        console.error('Fehler beim populieren der Reservierungen:', error);
        res.status(500).end();
      }
    }
  } catch (error) {
    console.log('Fehler beim finden der Reservierungen:', error);
    res.status(500).end();
  }
  res.end();
}
