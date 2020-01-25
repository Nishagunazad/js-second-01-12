const cart = require('./cart')
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

app.post('/cart', (req, res) => {
    fs.readFile('./db/userCart.json', 'utf-8', (err, data) => {
        if(err) {
            res.sendStatus(500, JSON.stringify({result: 0}));
        } else {
            let newCart = cart.add(req, JSON.parse(data));
            writeFile('./db/userCart.json', JSON.stringify(newCart))
        }
    })
})

app.put('/cart/:id', (req, res) => {
    fs.readFile('./db/userCart.json', 'utf-8', (err, data) => {
        if(err) {
            res.sendStatus(500, JSON.stringify({result: 0}));
        } else {
            let newCart = cart.change(req, JSON.parse(data));
            writeFile('./db/userCart.json', JSON.stringify(newCart))
        }
    })
})

app.delete('/cart/:id', (req, res) => {
    fs.readFile('./db/userCart.json', 'utf-8', (err, data) => {
        if(err) {
            res.sendStatus(500, JSON.stringify({result: 0}));
        } else {
            let newCart = cart.delete(req, JSON.parse(data));
            writeFile('./db/userCart.json', JSON.stringify(newCart))
        }
    })
})

function writeFile (file, obj) {
    fs.writeFile(file, obj, (err) => {
        if (err) {
            res.sendStatus(500, JSON.stringify({result: 0}));
        } else {
            res.send(JSON.stringify({result: 1}));
        }
    })
}

app.listen(port, () => console.log(`app listening at port ${port}...`));