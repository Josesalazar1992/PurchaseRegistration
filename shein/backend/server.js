// Pata iniciar el servidor navega a D:\IT things\Repo\PurchaseRegistration\shein\backend> y corre node server.js


const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");



const app = express();
app.use(express.json());  // Para procesar solicitudes JSON
app.use(cors());

const ordersFilePath = path.join(__dirname, "orders.json");

// Leer órdenes desde el archivo
const readOrders = () => {
  if (fs.existsSync(ordersFilePath)) {
    const data = fs.readFileSync(ordersFilePath);
    return JSON.parse(data);
  }
  return [];  // Si no existe, devolver un arreglo vacío
};

// Guardar órdenes en el archivo
const writeOrders = (orders) => {
  fs.writeFileSync(ordersFilePath, JSON.stringify(orders, null, 2));
};

// Obtener todas las órdenes
app.get("/orders", (req, res) => {
  const orders = readOrders();
  res.json(orders);
});

// Agregar una nueva orden
app.post("/orders", (req, res) => {
  const { name } = req.body;
  const orders = readOrders();
  const newOrder = { id: orders.length + 1, name };
  orders.push(newOrder);
  writeOrders(orders);
  res.status(201).json(newOrder);
});

// Eliminar una orden
app.delete("/orders", (req, res) => {
  const { name } = req.body;
  let orders = readOrders();
  const initialLength = orders.length;

  orders = orders.filter(order => order.name !== name);

  if (orders.length < initialLength) {
    writeOrders(orders);
    res.status(200).json({ message: "Orden eliminada con éxito." });
  } else {
    res.status(404).json({ error: "Orden no encontrada." });
  }
});

// Agregar un producto a una orden
app.post("/orders/:id/products", (req, res) => {
  const { id } = req.params;
  const { product } = req.body; // Producto enviado en el cuerpo de la solicitud
  const orders = readOrders();

  const order = orders.find(o => o.id === parseInt(id));
  if (order) {
    order.products = order.products || []; // Inicializar si no existe
    order.products.push(product);
    writeOrders(orders);
    res.status(201).json(order);
  } else {
    res.status(404).json({ error: "Orden no encontrada." });
  }
});



// Iniciar servidor
app.listen(3001, () => {
  console.log("Server is running on http://localhost:3001");
});
