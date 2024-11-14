import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import '../heartloading.css';  // Asegúrate de tener el archivo CSS de la animación del corazón

const MainPage: React.FC = () => {
  const [loading, setLoading] = useState(true);  // Estado de carga
  const [orders, setOrders] = useState<any[]>([]); // Estado para las órdenes
  const [clients, setClients] = useState<any[]>([]); // Estado para los clientes
  const [products, setProducts] = useState<any[]>([]); // Estado para los productos
  const navigate = useNavigate();  // Hook de navegación

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);  // Cambia el estado de carga después de 3 segundos
    }, 3000);  // 3 segundos de espera para la animación de carga
    return () => clearTimeout(timer);  // Limpia el temporizador cuando el componente se desmonta
  }, []);

  // Funciones para manejar la creación de órdenes, clientes y productos
  const handleCreateOrder = () => {
    const newOrder = { id: orders.length + 1, date: new Date().toISOString() };
    const updatedOrders = [...orders, newOrder];
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders)); // Guardar en localStorage
  };

  const handleLoadOrders = () => {
    const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders(storedOrders);
  };

  const handleAddClient = () => {
    const newClient = { id: clients.length + 1, name: `Client ${clients.length + 1}` };
    const updatedClients = [...clients, newClient];
    setClients(updatedClients);
    localStorage.setItem('clients', JSON.stringify(updatedClients)); // Guardar en localStorage
  };

  const handleAddProduct = () => {
    const newProduct = { 
      id: products.length + 1, 
      serialNumber: `SN${products.length + 1}`, 
      name: `Product ${products.length + 1}`,
      description: `Description for product ${products.length + 1}`,
      quantity: 1,
      cost: 100 
    };
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts)); // Guardar en localStorage
  };

  const handleLogout = () => {
    navigate('/'); // Redirige a la página de login
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
        flexDirection: 'column'
      }}
    >
      {loading ? (
        <div className="heart"></div>  // Corazón de carga
      ) : (
        <div>
          <strong>Excelente, ya estás aquí</strong>
          <button onClick={handleLogout}>Logout</button>
          <button onClick={handleCreateOrder}>Crear Orden</button>
          <button onClick={handleLoadOrders}>Cargar Órdenes</button>
          <button onClick={handleAddClient}>Agregar Cliente</button>
          <button onClick={handleAddProduct}>Agregar Producto</button>
        </div>
      )}
    </div>
  );
};

export default MainPage;
