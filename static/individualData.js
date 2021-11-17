/*
TRABALHO 1 DESENVOLVIMENTO WEB - UNIFEI
NOME: Bernardo Domingues - RA: 2020007540
NOME: Vinicius Santos - RA: 2020021745
 */

import { service } from "./service.js";

const handleActors = (actors) => {  // Recebe o array de atores por parâmetro
  let actorsReturned = "";  // Declara variável de armazenamento do HTML dos atores
  actors.map((i) => {
    actorsReturned = `${actorsReturned}<div class="individualActorCard"><img src="${i.image}" widith="100" height="100" /><div>${i.name}</div><div>${i.asCharacter}</div></div>`; // Itera os resultados na variável returnedApiValue
  });
  return actorsReturned; // Retorna o HTML dos atores
};

const renderTrailer = (trailerData) => {  // Recebe os dados do trailer por parâmetro
  if (trailerData.linkEmbed) {            // Caso seja encontrado o linkEmbed (link exportável) do trailer 
    return `  
    <h2>Trailer</h2>
    <div id="trailerDiv">
      <object>
        <param name="movie" value="${trailerData.linkEmbed}" />
        <embed src="${trailerData.linkEmbed}" type="application/x-shockwave-flash" />
      </object>
    </div>
    `; // Retorna um bloco de código HTML responsável por redenrizar o trailer 
  } 
  return "";
};

const selectIndividualDataMovie = async () => {
  const movieId = localStorage.getItem("id"); // Busca no localStorage o id do filme selecionado pelo usuário e armazena na variável movieId
  const data = await service("individualData", movieId); // Chama sincronamente a função service passando como o parâmetro o tipo de requisição individualData e a variável movieId
  let similarMoviesCode = "";  // Declara variável de armazenamento do HTML dos filmes similares
  let returnedApiValue = "";  // Declara variável de armazenamento do HTML dos resultados
  if (data.personalError) {  // Se o personalError for encontrado
    returnedApiValue = `<div class="error">${data.personalError}</div>`;  // Retorna uma div de erro para o usuário
  } else {
    data.similars.map(  // Adiciona o array de items na estrutura de repetição map, para criar div individuais de cada filme similar
      (i) =>
        (similarMoviesCode = `${similarMoviesCode}<div class="mapSimilarMovies" onClick="localStorage.setItem('id', '${i.id}'), document.location.reload(true)" ><img src="${i.image}" height=250px width=160px /><div>${i.title}</div></div>`) // Itera os resultados na variável similarMoviesCode
    );
    returnedApiValue = `
      <div class="internalData">
        <div class="imagePrincipalDiv">
          <img src="${data.image}" height=400px width=270px />
        </div>
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
    `;  // Retorna o HTML individual do filme selecionado
  }
  document.getElementById("movieDataDiv").innerHTML = returnedApiValue; // Coloca os resultados iterados dentro da div movieDataDiv
};
selectIndividualDataMovie();