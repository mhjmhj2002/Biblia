module.exports = function(app){
  
  var cors = require('cors');
  
  app.get('/pagamentos', function(req, res){
    console.log('Recebida requisicao de teste na porta 3000.')
    res.send('OK.');
  });

  app.post('/pagamentos/pagamento', function(req, res){

    req.assert("forma_de_pagamento",
        "Forma de pagamento eh obrigatorio").notEmpty();
    req.assert("valor",
      "Valor eh obrigatorio e deve ser um decimal")
        .notEmpty().isFloat();

    var erros = req.validationErrors();

    if (erros){
      console.log('Erros de validacao encontrados');
      res.status(400).send(erros);
      return;
    }

    var pagamento = req.body;
    console.log('processando uma requisicao de um novo pagamento');

    pagamento.status = 'CRIADO';
    pagamento.data = new Date;

    var connection = app.persistencia.connectionFactory();
    var pagamentoDao = new app.biblia.persistencia.PagamentoDao(connection);

    pagamentoDao.salva(pagamento, function(erro, resultado){
      if(erro){
        console.log('Erro ao inserir no banco:' + erro);
        res.status(500).send(erro);
      } else {
      console.log('pagamento criado');
      res.location('/pagamentos/pagamento/' +
            resultado.insertId);

      res.status(201).json(pagamento);
    }
    });

  });  

  app.get('/pagamentos/pagamento/:id', function(req, res){
    var id = req.params.id;
    console.log('consultando pagamento: ' + id);

    var connection = app.persistencia.connectionFactory();
    var pagamentoDao = new app.biblia.persistencia.PagamentoDao(connection);

    pagamentoDao.buscaPorId(id, function(erro, resultado){
      if(erro){
        console.log('erro ao consultar no banco: ' + erro);
        res.status(500).send(erro);
        return;
      }
      console.log('pagamento encontrado: ' + JSON.stringify(resultado));
      res.json(resultado);
      return;
    });

  });
}
