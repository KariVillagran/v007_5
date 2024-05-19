const express = require('express');
const bodyParser = require('body-parser');
const transbank = require('transbank-sdk');

transbank.Configuration.forTestingWebpayPlusNormal();

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.post('/initTransaction', async (req, res) => {
  try {
    const buyOrder = 'orden-de-compra-123';
    const sessionId = 'sesion-123';
    const amount = 1000; // CLP

    const response = await transbank.WebpayPlus.Transaction.create(
      buyOrder,
      sessionId,
      amount
    );
    res.json({ redirectUrl: response.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/confirmation', async (req, res) => {
  try {
    const token = req.body.token;
    const result = await transbank.WebpayPlus.Transaction.commit(token);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
