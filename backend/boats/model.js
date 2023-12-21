import mongoose from 'mongoose';

const boatSchema = new mongoose.Schema({
  name: String,
  baujahr: Number,
  seriennummer: String,
  material: String,
  bootsart: String,
  farbe: String,
  passagierzahl: Number,
  // bild: String,
});

export const Boat = mongoose.model('boats', boatSchema);
// boats = Collection

// {
//   "name": "Boatzilla X3000",
//   "baujahr": 2021,
//   "seriennummer": "BZ3000SN001",
//   "material": "Metall",
//   "bootsart": "Luftkissenboot",
//   "farbe": "Silber",
//   "passagierzahl": 8,
//   "bild": "test"
// }

// name: String
// baujahr: Number,
// seriennummer: String,
// material: String,
// bootsart: String,
// farbe: String,
// passagierzahl: Number
