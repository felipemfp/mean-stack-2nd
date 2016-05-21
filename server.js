const http = require('http');
const fs = require('fs');
const url = require('url');

var index = fs.readFileSync('static/index.html');
var json = [];

json.push(fs.readFileSync('static/data-01.json'));
json.push(fs.readFileSync('static/data-02.json'));

const server = http.createServer(function(request, response) {
  // response.write('It\'s gonna be legen... <i>Wait for</i>... dary!');
  var currentUrl = url.parse(request.url, true);
  if (currentUrl.pathname == '/') {
    response.writeHead(200, { 'Content-type': 'text/html' });
    response.write(index);
  }
  else if (currentUrl.pathname == '/api')  {
    response.writeHead(200, { 'Content-type': 'application/json' });
    id = parseInt(currentUrl.query.id) - 1 || 0;
    if (id < json.length) {
      response.write(json[id]);
    }
    else {
      response.writeHead(400, { 'Content-type': 'text/plain; charset=utf-8' });
      response.write('Tu falhou, migs!');
    }
  }
  else {
    response.writeHead(404, { 'Content-type': 'text/plain; charset=utf-8' });
    response.write('Esse bagulho não existe, meu parça!');
  }
  console.log('[' + response.statusCode + ']', currentUrl.pathname);
  response.end();
});

// http.get({
//   hostname: 'localhost',
//   path: '/',
//   port: 3000
// }, function(response) {
//   console.log('STATUS:', response.statusCode);
//
//   var body = '';
//
//   response.on('data', function(data) {
//     body += data;
//   });
//
//   response.on('end', function() {
//     console.log(body);
//   });
// });

server.listen(3000, function(){
  console.log('Server running...');
  console.log('Ctrl + C will stop!');
});
