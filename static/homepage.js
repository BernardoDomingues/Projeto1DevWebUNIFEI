const MostPopularMovies=()=>{
    const movieApiKey1 = "k_xmg5bz3v"; // Armazena a API Key na variável movieApiKey
    const movieApiKey2 = "k_2bzlmvl6";
    const movieApiKey3 = "k_taov506t";
    const movieApiKey4 = "k_e79fx2fd";
    fetch(`https://imdb-api.com/en/API/MostPopularMovies/${movieApiKey3}`) // Faz a busca através do método fetch
    .then((response) => {
      return response.json(); // Retorna dados como JSON
    })
    .then((data)=>{
        const { items }=data;
        console.log(items);
        let returnedApiValue = ""; // Declara variável de armazenamento do HTML dos resultados
      items.map(
        (i) =>
          (returnedApiValue = `${returnedApiValue}<div class="individualCardMovie"><img src="${i.image}" height=400px width=270px; /><div>${i.title}</div></div>`) // Itera os resultados na variável returnedApiValue
      );
      console.log(returnedApiValue);
      document.getElementById("resultsDiv").innerHTML = returnedApiValue; // Coloca os resultados iterados dentro da div resultsDiv
    })

}
MostPopularMovies();

