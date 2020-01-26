const cart = require('./cart');
const writer = require('./writer');
const logger = require('./logger');
const fs = require('fs');
const express = require('express');
const app = express();
const port = 3000;
const path = 'server/db/';

app.use(express.json());
app.use(express.static('public'));

app.get('/catalog', (req, res) => {
    fs.readFile(path + 'catalogData.json', 'utf-8', (err, data) => {
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
    fs.readFile(path + 'userCart.json', 'utf-8', (err, data) => {
        if(err) {
            res.sendStatus(404, JSON.stringify({result: 0}));
        } else {
            let newCart = cart.add(req, JSON.parse(data));
            writer(path + 'userCart.json', JSON.stringify(newCart), res)
        }
    })
})

app.put('/cart/:id', (req, res) => {
    fs.readFile(path + 'userCart.json', 'utf-8', (err, data) => {
        if(err) {
            res.sendStatus(404, JSON.stringify({result: 0}));
        } else {
            let newCart = cart.change(req, JSON.parse(data));
            writer(path + 'userCart.json', JSON.stringify(newCart), res)
        }
    })
})

app.delete('/cart/:id', (req, res) => {
    fs.readFile(path + 'userCart.json', 'utf-8', (err, data) => {
        if(err) {
            res.sendStatus(404, JSON.stringify({result: 0}));
        } else {
            let newCart = cart.delete(req, JSON.parse(data));
            writer(path + 'userCart.json', JSON.stringify(newCart), res)
        }
    })
})

app.listen(port, () => console.log(`app listening at port ${port}...`));