let counter = 0;
const movieApiKeys = [
  "k_zf6yfo2k",
  "k_taov506t",
  "k_xmg5bz3v",
  "k_e79fx2fd",
  "k_2bzlmvl6",
  "k_eb1b16cs",
  "k_kwi1c1vf",
]; // Array que armazena as chaves da API 

export const service = async (reqType, options) => {
  const typeOfRequisitions = {
    search: `https://imdb-api.com/en/API/SearchMovie/${movieApiKeys[counter]}/${options}`,
    homePage: `https://imdb-api.com/en/API/MostPopularMovies/${movieApiKeys[counter]}`,
    individualData: `https://imdb-api.com/en/API/Title/${movieApiKeys[counter]}/${options}/Trailer,Ratings,`,
  };  // objeto de tipos de requisição que acessa o array de chaves através do indice que é armazenado no contador 
  return fetch(typeOfRequisitions[reqType]) // Faz a busca através do método fetch, acessando a URL através do objeto typeOfRequisitions com a chave passada por parâmetro na chamada da função
    .then((response) => {
      return response.json(); // Retorna dados como JSON
    })
    .then((data) => {
      let { errorMessage } = data;  // Captura a mensagem de erro vinda da API 
      errorMessage ? (errorMessage = errorMessage) : (errorMessage = "");  // Operador ternário que atribui string vazia caso não existam erros
      if ((errorMessage.startsWith("Maximum usage")) || (errorMessage.startsWith("Invalid API Key"))) {  // Confere se a mensagem de erro começa com Maximum usage ou Invalid API Key
        if (counter === movieApiKeys.length) {
          return { personalError: "Uso máximo diário da aplicação atingido, volte amanhã" };  // Retorna um erro personalizado 
        }
        counter++;
        return service(reqType, options); // Retorna a própria função recursivamente
      }
      return data; // Retorna os dados da busca
    });
};
