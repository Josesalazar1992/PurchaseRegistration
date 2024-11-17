import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import loginpage from '../images/loginpage.jpg'
import '../LoginPage.css';

const LoginPage: React.FC = () => {
  const [user, setUser] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();  // Hook de navegación

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    if (user === 'Adriana' && password === 'password123' || user === '1' && password === '1' ) {
      navigate('home'); // Redirige a la página de inicio después de la autenticación exitosa
    } else {
      setError('Invalid User or password');
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // 3 segundos para la imagen/video
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
    style={{
      backgroundImage: `url(${loginpage})`,
      backgroundSize: 'cover',  // Ajusta la imagen para cubrir toda la pantalla
      backgroundPosition: 'center', // Centra la imagen
      height: '100vh',  // Asegura que cubra toda la altura de la pantalla
      width: '100vw',   // Asegura que cubra toda la anchura de la pantalla
      display: 'flex',
      justifyContent: 'center', // Opcional: centra el contenido
      alignItems: 'center',     // Opcional: centra el contenido
    }} >
      {loading ? (
        <div className="loader"></div>
      ) : (
        <div>
          <strong>Hola Adriana bienvenida, ten un lindo dia</strong>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <div>
          <label>Usuario</label>
          <input
            type="Usuario"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
