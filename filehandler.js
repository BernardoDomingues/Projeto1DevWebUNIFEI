/*
TRABALHO 1 DESENVOLVIMENTO WEB - UNIFEI
NOME: Bernardo Domingues - RA: 2020007540
NOME: Vinicius Santos - RA: 2020021745
 */

var fs = require("fs");

module.exports = function (filename, successFn, errorFn) {
  fs.readFile(filename, function (err, data) {
    if (err) {
      errorFn(err);
    } else {
      successFn(data);
    }
  });
};
