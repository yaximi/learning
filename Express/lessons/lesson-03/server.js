const express = require('express');

const server = express();

server.use('/', (req, res) => {
    console.log(req.query)
});

server.listen(8080, () => {
    console.log('Application is running at http://localhost:8080');
});