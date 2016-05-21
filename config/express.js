var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');

module.exports = function() {
    var app = express();

    app.use(express.static('./public'));
    app.use(bodyParser());

    load('models', {
            cwd: 'app'
        })
        .then('controllers')
        .then('routes')
        .into(app);

    return app;
}
