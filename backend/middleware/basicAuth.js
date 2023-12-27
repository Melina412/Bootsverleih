import { User } from '../user/model.js';

const decodeBase64 = (base64String) =>
  Buffer.from(base64String, 'base64').toString();

export async function authenticate(req, res, next) {
  // auth logic
  const authHeader = req.headers.authorization; // eg: 'Basic dG9tLnMyMzQ1NkBnbWFpbC5jb206dG9tMTIzYWJj'
  if (!authHeader) {
    return res.status(401).json({
      success: false,
      error: 'Please authenticate',
    });
  }
  const [authType, authInfoBase64] = authHeader.split(' ');
  if (authType !== 'Basic' || !authInfoBase64) {
    return res.status(401).json({
      success: false,
      error: 'Please authenticate using basic auth',
    });
  }

  /// base64 -> klartext
  const authInfo = decodeBase64(authInfoBase64); // eg: 'tom.s23456@gmail.com:tom123abc'
  const [email, password] = authInfo.split(':'); // ['tom.s23456@gmail.com', 'tom123abc']
  if (!email || !password) {
    return res.status(401).json({
      success: false,
      error: 'Please authenticate using basic auth',
    });
  }

  // email & password
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({
      success: false,
      error: 'Unknown user with email ' + email,
    });
  }

  const passwordMatch = user.password === password;
  if (!passwordMatch) {
    return res.status(401).json({
      success: false,
      error: 'Invalid password',
    });
  }

  next(); // geh zum eigentlichen request handler
}
