/*
TRABALHO 1 DESENVOLVIMENTO WEB - UNIFEI
NOME: Bernardo Domingues - RA: 2020007540
NOME: Vinicius Santos - RA: 2020021745
 */

const MostPopularMovies = () => {
  const movieApiKey1 = "k_taov506t"; // Armazena a API Key na variável movieApiKey
  const movieApiKey2 = "k_xmg5bz3v";
  const movieApiKey3 = "k_e79fx2fd";
  const movieApiKey4 = "k_2bzlmvl6";
  const movieApiKey5 = "k_eb1b16cs";
  fetch(`https://imdb-api.com/en/API/MostPopularMovies/${movieApiKey1}`) // Faz a busca através do método fetch
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
