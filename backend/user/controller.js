export function userLogin(_, res) {
  // wenn ich an diesen Punkt gelange wurde ich erfolgreich authentifiziert (aufgrund der useBasicAuth middleware, sonst hätte die mit res.status(401) abgebrochen)
  // mit dem einfach success true weiß das FE bescheid, dass es username und password zu speichern sind (für zukünftige Abfragen)
  res.json({ success: true });
}
