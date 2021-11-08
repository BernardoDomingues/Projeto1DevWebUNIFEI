/*
TRABALHO 1 DESENVOLVIMENTO WEB - UNIFEI
NOME: Bernardo Domingues - RA: 2020007540
NOME: Vinicius Santos - RA: 2020021745
 */

import { apiKey } from './keys.js';

const MostPopularMovies = async () => {
  const key = await apiKey();
  console.log(key);
  fetch(`https://imdb-api.com/en/API/MostPopularMovies/${key}`) // Faz a busca através do método fetch
    .then((response) => {
      return response.json(); // Retorna dados como JSON
    })
    .then((data) => {
      const { items } = data;
      const { errorMessage } = data;
      let returnedApiValue = ""; // Declara variável de armazenamento do HTML dos resultados
      if (errorMessage) {
        returnedApiValue = `<div class="error">${errorMessage}</div>`;
      } else {
        items.map(
          (i) =>
            (returnedApiValue = `${returnedApiValue}<div class="individualCardMovie"><a href="individualData.html"><img src="${i.image}" height=400px width=270px onClick="localStorage.setItem('id', '${i.id}')" /></a><div>${i.title}</div></div>`) // Itera os resultados na variável returnedApiValue
        );
      }
      document.getElementById("resultsDiv").innerHTML = returnedApiValue; // Coloca os resultados iterados dentro da div resultsDiv
    });
};
MostPopularMovies();
