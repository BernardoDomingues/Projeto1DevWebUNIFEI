/*
TRABALHO 1 DESENVOLVIMENTO WEB - UNIFEI
NOME: Bernardo Domingues - RA: 2020007540
NOME: Vinicius Santos - RA: 2020021745
 */

import { service } from "./service.js";

const MostPopularMovies = async () => {
  const data = await service("homePage"); //Faz a requisição da API 
  const { items } = data;
  let returnedApiValue = ""; // Declara variável de armazenamento do HTML dos resultados
  if (data.personalError) {
    returnedApiValue = `<div class="error">${data.personalError}</div>`;
  } else {
    items.map(
      (i) =>
        (returnedApiValue = `${returnedApiValue}<div class="individualCardMovie"><a href="individualData.html"><img src="${i.image}" height=400px width=270px onClick="localStorage.setItem('id', '${i.id}')" /></a><div>${i.title}</div></div>`) // Itera os resultados na variável returnedApiValue
    );
  }
  document.getElementById("resultsDiv").innerHTML = returnedApiValue; // Coloca os resultados iterados dentro da div resultsDiv
};
MostPopularMovies();
