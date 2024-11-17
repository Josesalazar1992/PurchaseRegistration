import React, { useState, useEffect } from "react";
import axios from "axios";

const OrderManager: React.FC = () => {
  const [newOrder, setNewOrder] = useState("");
  const [orders, setOrders] = useState<any[]>([]);

  const handleAddOrder = async () => {
    try {
      // Hacer POST a la API para agregar una nueva orden
      const response = await axios.post("http://localhost:3001/orders", {
        name: newOrder,
      });
      setOrders([...orders, response.data]);
      setNewOrder(""); // Limpiar el campo de entrada
    } catch (error) {
      console.error("Error agregando la orden:", error);
    }
  };

  // Obtener las órdenes al cargar el componente
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:3001/orders");
        setOrders(response.data);
      } catch (error) {
        console.error("Error obteniendo órdenes:", error);
      }
    };

    fetchOrders();
  }, []); // Se ejecuta solo una vez cuando el componente se monta

  return (
    <div>
      <h3>Gestión de Órdenes</h3>
      <input
        value={newOrder}
        onChange={(e) => setNewOrder(e.target.value)}
        placeholder="Nueva Orden"
      />
      <button onClick={handleAddOrder}>Agregar Orden</button>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>{order.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default OrderManager;
