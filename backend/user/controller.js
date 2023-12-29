export function userLogin(_, res) {
  // wenn ich an diesen Punkt gelange wurde ich erfolgreich authentifiziert (aufgrund der useBasicAuth middleware, sonst hätte die mit res.status(401) abgebrochen)
  // mit dem einfach success true weiß das FE bescheid, dass es username und password zu speichern sind (für zukünftige Abfragen)

  res.json({ success: true });

  // oder ich gebe die fehler and frontend weiter (nicht wirklich, aber es geht):+
  // if (res.locals.error) {
  //   console.log(res.locals.error);
  //   return res.status(401).json({
  //     success: false,
  //     error: 'Authentication failed',
  //   });
  // }

  // res.status(200).json({
  //   success: true,
  //   message: 'Login successful',
  // });
  // console.log(res.locals.message);
}
