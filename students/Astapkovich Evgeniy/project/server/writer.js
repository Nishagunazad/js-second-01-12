const fs = require('fs')

function writeFile (file, obj, res) {
    fs.writeFile(file, obj, (err) => {
        if (err) {
            res.sendStatus(404, JSON.stringify({result: 0}));
        } else {
            res.send(JSON.stringify({result: 1}));
        }
    })
}

module.exports = writeFile