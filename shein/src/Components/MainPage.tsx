import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../heartloading.css"; // Archivo CSS para la animación del corazón
import OrderManager from "./Order/CreateOrder";
import DeleteOrder from "./Order/DeleteOrder";

const MainPage: React.FC = () => {
  const [loading, setLoading] = useState(true); // Estado de carga
  const [showOrderManager, setShowOrderManager] = useState(false); // Controla visibilidad de OrderManager
  const [showDeleteOrder, setShowOrderToDelete] = useState(false); // Controla visibilidad de DeleteOrder
  const navigate = useNavigate(); // Hook de navegación

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Cambia el estado de carga después de 3 segundos
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    navigate("/"); // Redirige a la página de login
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
            <button
              onClick={() => setShowOrderManager(true)}
              style={buttonStyle}
            >
              Crear Orden
            </button>
            <button onClick={() => setShowOrderToDelete(true) } 
             style={buttonStyle}>
              Borrar Orden
              </button>
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
            {showOrderManager ? (
              <OrderManager />
            ) : showDeleteOrder ? (
              <DeleteOrder />
            ) : (
              <p>Selecciona una opción del menú.</p>
            )}
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
