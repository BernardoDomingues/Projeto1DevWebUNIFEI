/*
TRABALHO 1 DESENVOLVIMENTO WEB - UNIFEI
NOME: Bernardo Domingues - RA: 2020007540
NOME: Vinicius Santos - RA: 2020021745
 */

const movieApiKey1 = "k_taov506t"; // Armazena a API Key na variável movieApiKey
const movieApiKey2 = "k_xmg5bz3v";
const movieApiKey3 = "k_e79fx2fd";
const movieApiKey4 = "k_2bzlmvl6";
const movieApiKey5 = "k_eb1b16cs";

// const getActorData = (actorId) =>
//   fetch(`https://imdb-api.com/en/API/Search/${movieApiKey4}/${actorId}`) // Faz a busca através do método fetch
//     .then((response) => {
//       return response.json(); // Retorna dados como JSON
//     })
//     .then((data) => {
//       const actorData = data.results[0];
//       const returnedValue = {
//         name: actorData.title,
//         image: actorData.image,
//         roles: actorData.description,
//       };
//       return returnedValue;
//     });

const handleSimilarClick = (movieId) => {
  localStorage.setItem("id", movieId);
  document.location.reload(true);
};

const selectIndividualDataMovie = () => {
  const movieId = localStorage.getItem("id");
  fetch(`https://imdb-api.com/en/API/Title/${movieApiKey5}/${movieId}`) // Faz a busca através do método fetch
    .then((response) => {
      return response.json(); // Retorna dados como JSON
    })
    .then((data) => {
      const { errorMessage } = data;
      let similarMoviesCode = "";
      let returnedApiValue = "";
      if (errorMessage) {
        returnedApiValue = `<div class="error">${errorMessage}</div>`;
      } else {
        data.similars.map(
          (i) =>
            (similarMoviesCode = `${similarMoviesCode}<div class="mapSimilarMovies" onClick="handleSimilarClick('${i.id}')" ><img src="${i.image}" height=250px width=160px /><div>${i.title}</div></div>`)
        );
        //   data.starList.map((i) => {
        //     const teste = getActorData(i.id);
        //   });
        returnedApiValue = `
        <div class="internalData">
          <img src="${data.image}" height=400px width=270px />
          <div id="rightSide">
              <h1 id="movieTitle" >${data.fullTitle}</h1>
              <h3>${data.genres}</h3>
              <p>${data.plot}</p>
              <span>${data.year} - ${data.companies}</span>
          </div>
        </div>
        <h2>Similares</h2>
        <div class="similarMovies">
          ${similarMoviesCode}
        </div>
      `;
      }
      document.getElementById("movieDataDiv").innerHTML = returnedApiValue; // Coloca os resultados iterados dentro da div resultsDiv
    });
};
selectIndividualDataMovie();
