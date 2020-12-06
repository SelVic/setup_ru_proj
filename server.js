let express = require('express');
let path = require('path');
let app = express();

app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.use('/build', express.static(path.join(__dirname, 'build')));

app.use('/images', express.static(path.join(__dirname, 'images')));

app.get(['/'], function(req, res) {
    res.sendFile(__dirname + '/index.html');
});


app.listen(3000);
console.log('http://localhost:3000');