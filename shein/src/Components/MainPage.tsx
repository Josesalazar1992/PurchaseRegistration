import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../heartloading.css"; // Archivo CSS para la animación del corazón

const MainPage: React.FC = () => {
  const [loading, setLoading] = useState(true); // Estado de carga
  const navigate = useNavigate(); // Hook de navegación
  const [texto, setTexto] = useState<string>(""); // Estado para guardar el texto del cuadro "crear orden"

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Cambia el estado de carga después de 3 segundos
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    navigate("/"); // Redirige a la página de login
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
        height: "100vh",
        width: "100vw",
        display: "flex",
        backgroundColor: loading ? "black" : "white", // Fondo negro mientras carga, luego blanco
      }}
    >
      {loading ? (
        <div className="heart" style={{ margin: "auto" }}></div> // Corazón de carga
      ) : (
        <>
          {/* Panel lateral izquierdo */}
          <div
            style={{
              width: "20%",
              backgroundColor: "#f4f4f4",
              padding: "20px",
              borderRight: "1px solid #ccc",
            }}
          >
            <h3>Opciones</h3>
            <button onClick={manejarClick} style={buttonStyle}>
              Crear Orden
            </button>
            <button style={buttonStyle}>Borrar Orden</button>
            <button style={buttonStyle}>Actualizar Orden</button>
          </div>

          {/* Contenido principal */}
          <div
            style={{
              flex: 1,
              padding: "20px",
            }}
          >
            <button
              style={{
                position: "fixed",
                top: "10px",
                right: "10px",
                padding: "10px 20px",
                backgroundColor: "#ff4c4c",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              onClick={handleLogout}
            >
              Logout
            </button>
            <h2>Contenido Principal</h2>
            <p>Aquí se mostrará la información relacionada.</p>
            <input
              type="text"
              value={texto}
              onChange={manejarCambio}
              placeholder="Ejemplo: 30/10/2024"
              style={{
                padding: "10px",
                margin: "10px 0",
                border: "1px solid #ccc",
                borderRadius: "5px",
                width: "100%",
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

// Estilos reutilizables para los botones
const buttonStyle: React.CSSProperties = {
  display: "block",
  width: "100%",
  padding: "10px",
  margin: "10px 0",
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

export default MainPage;