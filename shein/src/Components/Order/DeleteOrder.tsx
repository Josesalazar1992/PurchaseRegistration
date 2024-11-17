import React, { useState, useEffect } from "react";
import axios from "axios";

const DeleteOrder: React.FC = () => {
  const [orderToDelete, setOrderToDelete] = useState("");  // Nombre de la orden a eliminar
  const [orders, setOrders] = useState<any[]>([]);

  const handleDeleteOrder = async () => {
    try {
      // Hacer DELETE a la API para eliminar la orden
      const response = await axios.delete("http://localhost:3001/orders", {
        data: { name: orderToDelete }, // Pasamos el nombre de la orden en el cuerpo de la solicitud
      });
      // Filtrar la orden eliminada del estado de las órdenes
      setOrders(orders.filter(order => order.name !== orderToDelete));
      setOrderToDelete(""); // Limpiar el campo de entrada
    } catch (error) {
      console.error("Error eliminando la orden:", error);
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
        value={orderToDelete}
        onChange={(e) => setOrderToDelete(e.target.value)}  // Actualiza el estado con el nombre de la orden
        placeholder="Eliminar Orden"
      />
      <button onClick={handleDeleteOrder}>Borrar Orden</button>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>{order.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default DeleteOrder;
