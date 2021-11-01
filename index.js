/*
TRABALHO 1 DESENVOLVIMENTO WEB - UNIFEI
NOME: Bernardo Domingues - RA: 2020007540
NOME: Vinicius Santos - RA: 2020021745
 */

process.title = "MyWebServer";
var args = process.argv,
  port = args[2] || 7070,
  webServer = require("./server");

webServer.listen(port, function () {
  console.log(
    `Servidor iniciado na porta ${port}, acesse localhost:${port} no seu navegador`
  );
});
