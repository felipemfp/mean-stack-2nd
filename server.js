const app = require('./config/express')();

app.get('/', function(request, response) {
    response.send('<h1>Mais que bixinho!</h1>');
});

app.listen('3000', function() {
    console.log('Server running...');
    console.log('Ctrl + C will stop!');
});
