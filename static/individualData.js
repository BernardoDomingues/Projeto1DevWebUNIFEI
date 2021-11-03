/*
TRABALHO 1 DESENVOLVIMENTO WEB - UNIFEI
NOME: Bernardo Domingues - RA: 2020007540
NOME: Vinicius Santos - RA: 2020021745
 */

const movieApiKey1 = "k_xmg5bz3v"; // Armazena a API Key na variável movieApiKey
const movieApiKey2 = "k_2bzlmvl6";
const movieApiKey3 = "k_taov506t";
const movieApiKey4 = "k_e79fx2fd";

const getActorData = (actorId) =>
  fetch(`https://imdb-api.com/en/API/Search/${movieApiKey4}/${actorId}`) // Faz a busca através do método fetch
    .then((response) => {
      return response.json(); // Retorna dados como JSON
    })
    .then((data) => {
      const actorData = data.results[0];
      const returnedValue = {
        name: actorData.title,
        image: actorData.image,
        roles: actorData.description,
      };
      return returnedValue;
    });

const selectIndividualDataMovie = () => {
  const movieId = localStorage.getItem("id");
  fetch(`https://imdb-api.com/en/API/Title/${movieApiKey4}/${movieId}`) // Faz a busca através do método fetch
    .then((response) => {
      return response.json(); // Retorna dados como JSON
    })
    .then((data) => {
      console.log(data);
      let similarMoviesCode = "";
      data.similars.map(
        (i) =>
          (similarMoviesCode = `${similarMoviesCode}<div><img src="${i.image}" height=250px width=160px /><div>${i.fullTitle}</div></div>`)
      );
      data.starList.map((i) => {
        const teste = getActorData(i.id);
        console.log(teste);
      });
      const returnedApiValue = `
        <img src="${data.image}" height=400px width=270px />
        <div>
            <h1 id="movieTitle" >${data.fullTitle}</h1>
            <h3>${data.genres}</h3>
            <p>${data.plot}</p>
            <span>${data.year} - ${data.companies}</span>
        </div>
        <div>
          <h4>Similares</h4>
          ${similarMoviesCode}
        </div>
      `;
      document.getElementById("movieDataDiv").innerHTML = returnedApiValue; // Coloca os resultados iterados dentro da div resultsDiv
    });
};
selectIndividualDataMovie();
