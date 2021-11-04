/*
TRABALHO 1 DESENVOLVIMENTO WEB - UNIFEI
NOME: Bernardo Domingues - RA: 2020007540
NOME: Vinicius Santos - RA: 2020021745
 */

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
  const movieApiKey1 = "k_taov506t"; // Armazena a API Key na variável movieApiKey
  const movieApiKey2 = "k_xmg5bz3v";
  const movieApiKey3 = "k_e79fx2fd";
  const movieApiKey4 = "k_2bzlmvl6";
  const movieApiKey5 = "k_eb1b16cs";

  fetch(`https://imdb-api.com/en/API/SearchMovie/${movieApiKey2}/${value}`) // Faz a busca através do método fetch
    .then((response) => {
      return response.json(); // Retorna dados como JSON
    })
    .then((data) => {
      const { results } = data; // Captura os resultados da busca
      const { errorMessage } = data; // Captura mensagem de erro
      let returnedApiValue = ""; // Declara variável de armazenamento do HTML dos resultados
      if (errorMessage) {
        returnedApiValue = `<div class="error">${errorMessage}</div>`;
      } else {
        results.sort((a, b) => orderMovies(a, b)); // Ordena os Filmes em ordem de lançamento
        results.map(
          (i) =>
            (returnedApiValue = `${returnedApiValue}<div class="individualCardMovie"><a href="individualData.html"><img src="${i.image}" height=400px width=270px onClick="localStorage.setItem('id', '${i.id}')" /></a><div>${i.title}</div></div>`) // Itera os resultados na variável returnedApiValue
        );
      }
      document.getElementById("resultsDiv").innerHTML = returnedApiValue; // Coloca os resultados iterados dentro da div resultsDiv
    });
};

const validadeSearch = () => {
  const contentSearchBox = document
    .getElementById("searchBox")
    .value.toLowerCase(); // Armazena a informação digitada pelo usuário na caixa de texto na variável contentSearchBox
  if (contentSearchBox !== "") {
    searchMovie(contentSearchBox); // Chama a função de Pesquisa na API caso a entrada de dados do usuário seja válida, passando a pesquisa por parâmetro
  }
};

const validadeKeyPressed = () => {
  // Caso a tecla clicada for "Enter" chama a função validadeSearch
  if (event.key === "Enter") {
    validadeSearch();
  }
};

document
  .getElementById("searchButton")
  .addEventListener("click", validadeSearch); // monitora clique no botão Pesquisar, chamando a função validateSearch em caso de evento encontrado
document.addEventListener("keypress", validadeKeyPressed, false); // Monitora entrada de dados no teclado, chamando a função validadeKeyPressed em caso de evento encontrado

// ["click", "keypress"].forEach((evt) =>
//   document
//     .getElementById("searchButton")
//     .addEventListener(evt, searchMovie, false)
// );
