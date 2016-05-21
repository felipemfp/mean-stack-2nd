module.exports = function(app) {
    var Controller = app.controllers.contato;
    app.get('/api/contatos/:id?', Controller.getContato);
    app.post('/api/contatos', Controller.saveContato);
    app.delete('/api/contatos/:id', Controller.deleteContato);
    app.put('/api/contatos/:id', Controller.updateContato);
}
