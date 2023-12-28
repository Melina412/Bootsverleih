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
