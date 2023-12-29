import { useRef, useState, useContext } from 'react';
import { LoginContext } from '../context/LoginContext';

function Login() {
  const userRef = useRef();
  const passwordRef = useRef();

  const [loginFailed, setLoginFailed] = useState(false);
  const { loginData, setLoginData } = useContext(LoginContext);

  console.log('loginData:', loginData.email, loginData.password);

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

      // egal ob ich einen body vom client zum server sende oder nicht
      // hier oder nach nach res.ok muss ich IMMER das machen:
      //! const data = await res.json();
      // weil sonst der res.json({sucess: false, error: '...'}) nicht gelesen werden kann

      const response = await res.json();
      if (res.ok) {
        setLoginData({
          email: userRef.current.value,
          password: passwordRef.current.value,
        });
        console.log('Login erfolgreich:', response.success);
      } else if (res.status === 401) {
        setLoginFailed(true);
        userRef.current.value = '';
        passwordRef.current.value = '';
        console.error('Login nicht erfolgreich:', response.error);
      }
    } catch (error) {
      console.error('Fehler beim Login Request', error);
    }
  }

  return (
    <section className='login'>
      <h1>Login</h1>

      {loginData.email === null ? (
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
          <p>Du bist eingeloggt als user {loginData.email}</p>
          <button onClick={() => setLoginData({ email: null, password: null })}>
            Logout
          </button>
        </div>
      )}
    </section>
  );
}

export default Login;
