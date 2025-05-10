const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const texts = {};

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.post('/submit', (req, res) => {
    const text = req.body.text;
    const id = crypto.randomBytes(4).toString('hex');
    texts[id] = text;
    res.send(`Ссылка для доступа к тексту: <a href="/text/${id}">/text/${id}</a>`);
});

app.get('/text/:id', (req, res) => {
    const id = req.params.id;
    const text = texts[id];

    if (text) {
        delete texts[id];
        res.send(`<h1>${text}</h1><p>Ссылка больше не действительна.</p>`);
    } else {
        res.send('<h1>Текст не найден</h1>');
    }
});

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});