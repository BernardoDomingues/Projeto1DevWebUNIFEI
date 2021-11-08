let counter = 0;
const movieApiKeys = [
  "k_taov506t",
  "k_xmg5bz3v",
  "k_e79fx2fd",
  "k_2bzlmvl6",
  "k_eb1b16cs",
];
export const apiKey = () =>
  fetch(
    `https://imdb-api.com/en/API/MostPopularMovies/${movieApiKeys[counter]}`
  ) // Faz a busca através do método fetch
    .then((response) => {
      return response.json(); // Retorna dados como JSON
    })
    .then((data) => {
      const { errorMessage } = data;
      if (movieApiKeys[counter] === "k_eb1b16cs") {
        return movieApiKeys[counter];
      } else {
        if (errorMessage) {
          counter++;
          return apiKey();
        } else {
          return movieApiKeys[counter];
        }
      }
    });
