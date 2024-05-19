const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const productosRouter = require("../productos/index");


const app = express();

// Middleware para analizar los cuerpos de las solicitudes en formato JSON
app.use(bodyParser.json());

// Crear una conexión a la base de datos MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bd_evaluacion'
});

// Conectar a la base de datos MySQL
connection.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conexión exitosa a la base de datos MySQL');
});

// Ruta para agregar una nueva orden
app.post('/ordenes', (req, res) => {
    // Crear una nueva orden basada en los datos de la solicitud
    const nuevaOrden = {
        clientes: req.body.cliente,
        // No es necesario especificar "fecha" aquí, se insertará automáticamente

    };

    // Insertar la nueva orden en la base de datos MySQL
    connection.query('INSERT INTO ordenes SET ?', nuevaOrden, (error, result) => {
        if (error) {
            console.error('Error al insertar la orden:', error);
            res.status(500).send('Error al guardar la orden en la base de datos.');
            return;
        }

        console.log('Orden agregada correctamente a la base de datos MySQL');
        res.status(201).send('Orden agregada correctamente.');
    });
});

// Ruta para obtener todos los productos
app.get('/productos', (req, res) => {
    // Consultar la base de datos para obtener los productos
    connection.query('SELECT * FROM productos', (error, results) => {
        if (error) {
            console.error('Error al obtener los productos:', error);
            res.status(500).send('Error al obtener los productos.');
            return;
        }
        
        // Enviar la lista de productos como respuesta
        res.json(results);
    });
});

// Usar el enrutador de productos
app.use('/productos', productosRouter);

// Iniciar el servidor en el puerto 3000
const port = 3000;
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
