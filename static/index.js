/*
TRABALHO 1 DESENVOLVIMENTO WEB - UNIFEI
NOME: Bernardo Domingues - RA: 2020007540
NOME: Vinicius Santos - RA: 2020021745
 */

import { service } from "./service.js";

const orderMovies = (a, b) => {
  // Função que ordena os filmes por data de lançamento
  if (a.description > b.description) {
    return 1;
  }
  if (a.description < b.description) {
    return -1;
  }
  return 0;
};

const searchMovie = async (value) => {
  const data = await service("search", value);
  const { results } = data;
  let returnedApiValue = ""; // Declara variável de armazenamento do HTML dos resultados
  if (data.personalError) {
    returnedApiValue = `<div class="error">${data.personalError}</div>`;
  } else {
    results.sort((a, b) => orderMovies(a, b)); // Ordena os Filmes em ordem de lançamento
    results.map(
      (i) =>
        (returnedApiValue = `${returnedApiValue}<div class="individualCardMovie"><a href="individualData.html"><img src="${i.image}" height=400px width=270px onClick="localStorage.setItem('id', '${i.id}')" /></a><div>${i.title}</div></div>`) // Itera os resultados na variável returnedApiValue
    );
  }
  document.getElementById("resultsDiv").innerHTML = returnedApiValue; // Coloca os resultados iterados dentro da div resultsDiv
};

const validadeSearch = () => {
  const contentSearchBox = document
    .getElementById("searchBox")
    .value.toLowerCase(); // Armazena a informação digitada pelo usuário na caixa de texto na variável contentSearchBox
  if (contentSearchBox !== "") {
    searchMovie(contentSearchBox); // Chama a função de Pesquisa na API caso a entrada de dados do usuário seja válida, passando a pesquisa por parâmetro
  }
};

document
  .getElementById("searchButton")
  .addEventListener("click", validadeSearch); // Monitora clique no botão Pesquisar, chamando a função validateSearch em caso de evento encontrado

window.addEventListener( // Monitora o clique no botão enter para fazer a pesquisa
  "keydown",
  (event) => {
    if (event.code === "Enter") {
      validadeSearch();
    }
  },
  false
);
