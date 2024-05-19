
const bodyParser = require('body-parser');
const mysql = require('mysql');
const express = require('express');
const router = express.Router();





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

// Crear una aplicación Express
const app = express();

// Middleware para analizar los cuerpos de las solicitudes en formato JSON
app.use(bodyParser.json());

// Ruta para agregar un nuevo producto
app.post('/productos', (req, res) => {
    // Crear un nuevo producto basado en los datos de la solicitud
    const nuevoProducto = {
        nombre: req.body.nombre,
        precio: req.body.precio
    };

    // Insertar el nuevo producto en la base de datos MySQL
    connection.query('INSERT INTO productos SET ?', nuevoProducto, (error, results, fields) => {
        if (error) {
            console.error('Error al insertar el producto:', error);
            res.status(500).send('Error al guardar el producto en la base de datos.');
            return;
        }
        console.log('Producto agregado correctamente a la base de datos MySQL');
        res.status(201).send('Producto agregado correctamente.');
    });
});
// Define las rutas y la lógica para los productos aquí
router.get('/', (req, res) => {
  connection.query('SELECT * FROM productos', (error, results, fields) => {
    if (error) {
        console.error('Error al obtener los productos:', error);
        res.status(500).send('Error al obtener los productos.');
        return;
    }
    
    // Enviar la lista de productos como respuesta
    res.json(results);
});
});

module.exports = router;


// Iniciar el servidor en el puerto 3001
const port = 3001;
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});

