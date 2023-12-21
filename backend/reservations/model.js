import mongoose from 'mongoose';

const resSchema = new mongoose.Schema({
  startdatum: Date,
  enddatum: Date,
  boot: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'boats',
  },
});

export const Reservation = mongoose.model('reservations', resSchema);
