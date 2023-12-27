import { useRef, useState } from 'react';

function Login() {
  const userRef = useRef();
  const passwordRef = useRef();

  const [login, setLogin] = useState(false);

  const [loginFailed, setLoginFailed] = useState(false);
  const [loginData, setLoginData] = useState({
    email: null,
    password: null,
  });
  console.log('loginData:', loginData.email, loginData.password);
  console.log({ login });

  const handleLogin = () => {
    userLogin();
  };

  async function userLogin() {
    const encodeBase64 = btoa(
      `${userRef.current.value}:${passwordRef.current.value}`
    );
    const headers = new Headers({
      Authorization: `Basic ${encodeBase64}`,
      'Content-Type': 'application/json',
    });

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKENDURL}/api/login`, {
        method: 'POST',
        headers: headers,
      });
      console.log({ res });
      if (res.ok) {
        setLogin(true);
        setLoginData({
          email: userRef.current.value,
          password: passwordRef.current.value,
        });
        console.log('Login erfolgreich');
      } else if (res.status === 401) {
        setLoginFailed(true);
        userRef.current.value = '';
        passwordRef.current.value = '';
        console.error('Fehler beim Login:', res.statusText);
      }
    } catch (error) {
      console.error('Fehler beim Login Request', error);
    }
  }

  return (
    <section className='login'>
      <h1>Login</h1>

      {!login ? (
        <article>
          <div>
            <label htmlFor='email'>Username: </label>
            <input
              type='email'
              name='email'
              placeholder='email'
              ref={userRef}
            />
          </div>

          <div>
            <label htmlFor='password'>Passwort: </label>
            <input
              type='password'
              name='password'
              placeholder='passwort'
              ref={passwordRef}
            />
          </div>

          {loginFailed && (
            <p className='error-text'>
              Login fehlgeschlagen! Bitte gib deine Daten nochmal ein.
            </p>
          )}

          <button onClick={handleLogin}>Login</button>
        </article>
      ) : (
        <div>
          <p>Du bist eingeloggt!</p>
        </div>
      )}
    </section>
  );
}

export default Login;
