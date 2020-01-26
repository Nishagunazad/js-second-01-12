const moment = require('moment');
const fs = require('fs');
const writer = require('./writer')
let file = './sever/db/logger.json';

function logger (name, action) {
    fs.readFile(file, 'utf-8', (err, data) => {
        if(err) {
            console.log('can not read');
        } else {
            let logs = JSON.parse(data);
            logs.push({
                time: moment().format('DD MM YYYY hh:mm:ss'),
                productName: name,
                userAction: action
            })
            
            writer(file, JSON.stringify(logs), res)
        }
    })
}

module.exports = logger