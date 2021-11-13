let counter = 0;
const movieApiKeys = [
  "k_zf6yfo2k",
  "k_taov506t",
  "k_xmg5bz3v",
  "k_e79fx2fd",
  "k_2bzlmvl6",
  "k_eb1b16cs",
  "k_kwi1c1vf",
];

export const service = async (reqType, options) => {
  const typeOfRequisitions = {
    search: `https://imdb-api.com/en/API/SearchMovie/${movieApiKeys[counter]}/${options}`,
    homePage: `https://imdb-api.com/en/API/MostPopularMovies/${movieApiKeys[counter]}`,
    individualData: `https://imdb-api.com/en/API/Title/${movieApiKeys[counter]}/${options}/Trailer,Ratings,`,
  };
  return fetch(typeOfRequisitions[reqType]) // Faz a busca através do método fetch
    .then((response) => {
      return response.json(); // Retorna dados como JSON
    })
    .then((data) => {
      let { errorMessage } = data;
      errorMessage ? (errorMessage = errorMessage) : (errorMessage = "");
      if ((errorMessage.startsWith("Maximum usage")) || (errorMessage.startsWith("Invalid API Key"))) {
        if (counter === movieApiKeys.length) {
          return { personalError: "Uso máximo diário da aplicação atingido, volte amanhã" };
        }
        counter++;
        return service(reqType, options);
      }
      return data;
    });
};
