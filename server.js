const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const app = express();
const port = 4123;

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

    res.send(`
        <style>
            html,body{padding:0;margin:0;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;width:100%;height:100%;min-width:100%}h1{font-size:2rem;font-family:sans-serif}a{display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;background:#fff;border:1px solid #f1f1f1;-webkit-box-shadow:0 .5rem 1rem #00000014;box-shadow:0 .5rem 1rem #00000014;border-radius:6px;font-size:2rem;color:#363636;text-decoration:none;padding:1.5rem 3rem;font-family:sans-serif}
        </style>
        <h1>
            Ссылка для доступа к тексту:
        </h1>
        <a href="/${id}">
            ${req.host}/${id}
        </a>
    `);
});

app.get('/:id', (req, res) => {
    const id = req.params.id;
    const text = texts[id];

    if (text) {
        delete texts[id];
        res.send(`
            <style>
               html,body{padding:0;margin:0;display:flex;align-items:center;justify-content:center;flex-direction:column;width:100%;height:100%;min-width:100%;font-family:sans-serif;font-size:16px}input[type="text"]{font-size:3rem;text-align:center;border:1px solid #ddd;border-radius:6px;line-height:5rem;padding:1rem}p{font-size:2rem}form,label{display:flex;margin:0}
            </style>
            <form>
                <label>
                    <input type="text" value="${text}" readonly />     
                </label>
            </form>
            <p>Данная ссылка больше не доступна</p>
        `);
    } else {
        res.send(`
            <style>
                html,body{padding:0;margin:0;display:flex;align-items:center;justify-content:center;flex-direction:column;width:100%;height:100%;min-width:100%;font-family:sans-serif;font-size:1rem}
            </style>
            <h1>Ссылка не найдена</h1>
        `);
    }
});

app.listen(port, () => {
    console.log(`Сервер запущен. PORT: ${port}`);
});