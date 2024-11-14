// server

const { Console } = require('console');
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;
const DATA_FILE = path.join(__dirname, 'orders.json');

app.use(express.json());

// Ruta para obtener todas las ordenes
app.get('/api/orders', (req, res) => {
    fs.readFile(DATA_FILE, 'utf8', (err, data) => {
        if(err) {
            return res.status(500).json({error: "Error al leer el archivo de datos"})
        }
        res.json(JSON.parse(data || '[]'));
    });
});

// Ruta para guardar una nueva orden
app.post('/api/orders', (req, res) => {
    const newOrder = req.body;

    fs.readFile(DATA_FILE, 'utf8', (err, data) =>{
        const orders = data ? JSON.parse(data) : [];
        orders.push(newOrder);

        fs.writeFile(DATA_FILE,JSON.stringify(orders, null, 2), (err) => {
            if(err){
                return res.status(500).json({ error: 'Error al guardar la orden'});
            }
            res.json({ message: 'Ordern guardada exitosamente'});
        });
    });
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`)
})
