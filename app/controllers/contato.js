var Contatos = []

module.exports = function() {
    var Controller = {
        getContato: getContato,
        saveContato: saveContato,
        deleteContato: deleteContato,
        updateContato: updateContato
    }

    function getContato(request, response) {
        var id = request.params.id;
        if (id) {
            var contato = Contatos.filter(function (contato) {
              return contato.id == id;
            });
            if (contato[0]) {
              response.status(200).json(contato[0]);
            }
            else
            {
              response.status(404).json({
                  message: 'Esse contato não existe.'
              });
            }
        } else {
            response.status(200).json(Contatos);
        }
    }

    function saveContato(request, response) {
        var contato = request.body;
        if (isValid(contato)) {
            Contatos.push({
                id: nextId(),
                nome: contato.nome,
                email: contato.email
            });
            response.status(201).json({
                message: 'Um novo contato foi salvo.'
            });
        } else {
            response.status(400).json({
                message: 'Seu contato não tá num formato aceito.'
            });
        }
    }

    function deleteContato(request, response) {
        var id = request.params.id;
        Contatos = Contatos.filter(function(contato) {
            return contato.id != id;
        });
        response.status(200).json({
            message: 'O contato ' + id + ' foi apagado.'
        });
    }


    function updateContato(request, response) {
        var contatoUpdate = request.body;
        var id = request.params.id;

        if (!isValid(contatoUpdate)) {
            response.status(400).json({
                message: 'Seu contato não tá num formato aceito.'
            });
        } else {
            Contatos.forEach(function(contato) {
                if (contato.id == id) {
                    contato.nome = contatoUpdate.nome;
                    contato.email = contatoUpdate.email;
                }
            });

            response.status(200).json({
                message: 'O contato ' + id + ' foi atualizado.'
            });
        }
    }

    function isValid(contato) {
        return contato.nome && contato.email;
    }

    function nextId() {
        if (Contatos.length > 0) {
            return Contatos[Contatos.length - 1].id + 1;
        } else {
            return 1;
        }
    }

    return Controller;
}
