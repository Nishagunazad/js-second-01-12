const fs = require('fs');
const express = require('express');
const app = express();
let port = 3000;

app.use(express.json());
app.use(express.static('public'));
app.get('/catalog', (req, res) => {
    fs.readFile('server/db/catalogData.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus(404, JSON.stringify({result: 0}));
        } else {
            res.send(data);
        }
    });
});

app.get('/cart', (req, res) => {
    fs.readFile('server/db/userCart.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus(404, JSON.stringify({result: 0}));
        } else {
            res.send(data);
        }
    });
});

app.listen(port, () => console.log(`app listening at port ${port}...`));