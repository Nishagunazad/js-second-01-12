const moment = require('moment');
const fs = require('fs');
let file = './server/db/logger.json';

function logger (name, action) {
    fs.readFile(file, 'utf-8', (err, data) => {
        if(err) {
            console.log('can not read');
        } else {
            let logs = JSON.parse(data);
            logs.push({
                time: moment().format('DD.MM.YYYY hh:mm:ss'),
                productName: name,
                userAction: action
            })
            fs.writeFile(file, JSON.stringify(logs), (err) => {
                if (err) {
                    console.log('can not write');
                } 
            })
        }
    })
}

module.exports = logger