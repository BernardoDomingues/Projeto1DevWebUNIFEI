/*
TRABALHO 1 DESENVOLVIMENTO WEB - UNIFEI
NOME: Bernardo Domingues - RA: 2020007540
NOME: Vinicius Santos - RA: 2020021745
 */

import { service } from "./service.js";

const MostPopularMovies = async () => {
  const data = await service("homePage"); // Chama sincronamente a função service passando como o parâmetro o tipo de requisição homepage 
  const { items } = data; // Declara a variável items a partir do array de respostas da API
  let returnedApiValue = ""; // Declara variável de armazenamento do HTML dos resultados
  if (data.personalError) { // Se o personalError for encontrado 
    returnedApiValue = `<div class="error">${data.personalError}</div>`; // Retorna uma div de erro para o usuário
  } else {
    items.map( // Adiciona o array de items na estrutura de repetição map, para criar div individuais de cada filme 
      (i) =>
        (returnedApiValue = `${returnedApiValue}<div class="individualCardMovie"><a href="individualData.html"><img src="${i.image}" height=400px width=270px onClick="localStorage.setItem('id', '${i.id}')" /></a><div>${i.title}</div></div>`) // Itera os resultados na variável returnedApiValue
    );
  }
  document.getElementById("resultsDiv").innerHTML = returnedApiValue; // Coloca os resultados iterados dentro da div resultsDiv
};
MostPopularMovies();
