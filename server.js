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
    const id = crypto.randomBytes(2).toString('hex');
    texts[id] = text;
    res.send(`Ссылка для доступа к тексту: <a href="/${id}">/${id}</a>`);
});

app.get('/:id', (req, res) => {
    const id = req.params.id;
    const text = texts[id];

    if (text) {
        delete texts[id];
        res.send(`
            <h1>${text}</h1>
        `);
    } else {
        res.send(`
            <h1>Ссылка больше не действительна.</h1>
        `);
    }
});

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});