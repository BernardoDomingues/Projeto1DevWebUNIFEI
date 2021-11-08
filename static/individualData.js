/*
TRABALHO 1 DESENVOLVIMENTO WEB - UNIFEI
NOME: Bernardo Domingues - RA: 2020007540
NOME: Vinicius Santos - RA: 2020021745
 */

import { apiKey } from './keys.js';

const handleActors = (actors) => {
  let actorsReturned = "";
  actors.map((i) => {
    actorsReturned = `${actorsReturned}<div class="individualActorCard"><img src="${i.image}" widith="100" height="100" /><div>${i.name}</div><div>${i.asCharacter}</div></div>`;
  });
  return actorsReturned;
};

const handleSimilarClick = (movieId) => {
  localStorage.setItem("id", movieId);
  document.location.reload(true);
};

const renderTrailer = (trailerData) => {
  if (trailerData.linkEmbed) {
    return `
    <h2>Trailer</h2>
    <div id="trailerDiv">
      <object>
        <param name="movie" value="${trailerData.linkEmbed}" />
        <embed src="${trailerData.linkEmbed}" type="application/x-shockwave-flash" />
      </object>
    </div>
    `;
  }
  return "";
};

const selectIndividualDataMovie = async () => {
  const key = await apiKey();
  const movieId = localStorage.getItem("id");
  fetch(`https://imdb-api.com/en/API/Title/${key}/${movieId}/Trailer,Ratings,`) // Faz a busca através do método fetch
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
        returnedApiValue = `
        <div class="internalData">
          <img src="${data.image}" height=400px width=270px />
          <div id="rightSide">
            <h1 id="movieTitle" >${data.fullTitle}</h1>
            <h3>${data.genres}</h3>
            <p>${data.plot}</p>
            <p>${data.year} - ${data.companies}</p>
          </div>
        </div>
        <h2>Atores</h2>
        <div id="actorsDiv">
          ${handleActors(data.actorList)}
        </div>
        ${renderTrailer(data.trailer)}
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
