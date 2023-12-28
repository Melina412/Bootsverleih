// import { ReservierungenContext } from '../context/ReservierungenContext';
// import { useState, useContext, useEffect } from 'react';

// // hier erstelle ich den Array mit allen verfügbaren Booten im Zeitraum der gewünschten Reservierung. der setzt sich aus zwei Gruppen zusammen
// function getSelectOptions() {
//   const { boatsWithoutReservations, populatedReservations, setSelectOptions } =
//     useContext(ReservierungenContext);

//   const optionsArray = [];
//   // 1. alle Boote für die keine Reservierung vorliegt
//   boatsWithoutReservations.forEach((boat) =>
//     optionsArray.push({
//       id: boat._id,
//       name: boat.name,
//     })
//   );

//   // 2. gefilterte Boote aus den populierten Reservierungen, bei denen das eingegebene Enddatum vor dem Beginn der bestehenden Reservierung liegt oder das eingegebene Startdatum nach dem Ende der bestehenden Reservierung liegt
//   const matchedRes = populatedReservations.filter(
//     (res) =>
//       new Date(res.startdatum).getTime() > resEnd ||
//       new Date(res.enddatum).getTime() < resStart
//   );
//   console.log({ matchedRes });
//   matchedRes.forEach((res) => {
//     const new_option = {
//       _id: res.boot._id,
//       name: res.boot.name,
//     };
//     // prüfen ob das Boot nicht bereits im Array existiert (aufgrund mehrfacher Reservierungen)
//     if (!optionsArray.some((option) => option._id === new_option._id)) {
//       optionsArray.push(new_option);
//     }
//   });
//   // für beide Gruppen werden jeweils der Name und die id des Bootes im Array gespeichert
//   console.log({ optionsArray });
//   setSelectOptions(optionsArray);

//   return optionsArray;
// }

// export default getSelectOptions;
