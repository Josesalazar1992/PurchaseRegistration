import React, { useState, useEffect } from "react";
import axios from "axios";

const AddProduct: React.FC = () => {
    const [orders, setOrders] = useState<any[]>([]);
    const [orderId, setOrderId] = useState<string>(""); // Guarda el ID de la orden
  
    const handleAddProduct = async (orderId: string) => {
      try {
        const response = await axios.post(`http://localhost:3001/orders/${orderId}/products`, {
          product: {
            price: 100.50,
            sku: "ABC123",
            description: "blusa",
            unidad: 3,
          },
        });
        console.log("Producto agregado:", response.data);
      } catch (error) {
        console.error("Error agregando el producto:", error);
      }
    };
  
    return (
      <div>
        <h3>Gestión de Órdenes</h3>
        <input
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)} // Captura el ID de la orden
          placeholder="ID de la Orden"
        />
        <button onClick={() => handleAddProduct(orderId)}>Agregar Producto</button>
        <ul>
          {orders.map((order) => (
            <li key={order.id}>{order.name}</li>
          ))}
        </ul>
      </div>
    );
  };
  


export default AddProduct;
