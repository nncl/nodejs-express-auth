"use strict";

const express = require('express')
    , app = express()
    , auth = require('basic-auth')
    , PORT = process.env.PORT || 3000;

const protectRoute = (req, res, next) => {
    if (process.env.NODE_ENV !== 'production') {
        let user = auth(req);

        if (user === undefined || user['name'] !== 'root' || user['pass'] !== 'vhEEW_L?!pp@D-2*') {
            res.statusCode = 401;
            res.setHeader('WWW-Authenticate', 'Basic realm="Node"');
            res.end('Unauthorized');
        } else {
            next();
        }
    } else {
        next();
    }
};

app.get('/', (req, res) => {
    res.send('hello world');
});

app.get('/admin', protectRoute, (req, res) => {
    res.send('This is a protected route');
});

app.listen(PORT, () => {
    console.log('Example app listening on port 3000!');
});