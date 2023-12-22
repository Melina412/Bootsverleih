import mongoose from 'mongoose';

const resSchema = new mongoose.Schema({
  startdatum: {
    type: Date,
    default: Date.now,
    validate: {
      validator: function (value) {
        return value > Date.now();
      },
      message: 'Boote können nur in der Zukunft reserviert werden.',
    },
  },
  enddatum: {
    type: Date,
    default: () => new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 Tag nach dem Startdatum
    validate: {
      validator: function (value) {
        return value > this.startdatum;
      },
      message: 'Das Enddatum muss nach dem Startdatum liegen.',
    },
  },
  boot: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'boats',
  },
});

export const Reservation = mongoose.model('reservations', resSchema);
