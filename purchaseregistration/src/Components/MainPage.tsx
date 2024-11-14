import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import '../heartloading.css';  // Asegúrate de tener el archivo CSS de la animación del corazón

const MainPage: React.FC = () => {
  const [loading, setLoading] = useState(true);  // Estado de carga
  const navigate = useNavigate();  // Hook de navegación
  const [texto, setTexto] = useState<string>(''); // Estado para guardar el texto del cuadro "crear orden"

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);  // Cambia el estado de carga después de 3 segundos
    }, 3000);  // 3 segundos de espera para la animación de carga
    return () => clearTimeout(timer);  // Limpia el temporizador cuando el componente se desmonta
  }, []);

  const handleLogout = () => {
    navigate('/'); // Redirige a la página de login
  };

  const manejarCambio = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTexto(event.target.value); // Actualizar el estado con el valor del cuadro de texto
  };

  const manejarClick = () => {
    alert(`Información guardada: ${texto}`); // Aquí podrías hacer algo con el texto, como enviarlo a una API
  };

  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: loading ? 'black' : 'white',  // Fondo negro mientras carga, luego blanco
      }}
    >
      {loading ? (
        <div className="heart"></div>  // Corazón de carga
      ) : (
        <div>
            <div>
          <button 
                style={{
                position: 'fixed',
                top: '10px',
                right: '10px',
                padding: '10px 20px',
                backgroundColor: '#ff4c4c',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
                }}
            onClick={handleLogout}>Logout</button>
            </div>
            <button onClick={manejarClick}>Crear Orden</button>
          <input
            type="text" 
            value={texto} 
            onChange={manejarCambio} 
            placeholder=" Ejemplo: 30/10/2024"
          />
        </div>
      )}
    </div>
  );
};

export default MainPage;
