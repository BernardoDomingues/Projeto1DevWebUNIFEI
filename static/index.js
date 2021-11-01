const searchMovie = async (value) => {
  const movieApiKey = "k_xmg5bz3v";
  fetch(`https://imdb-api.com/en/API/SearchMovie/${movieApiKey}/${value}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const { results } = data;
      console.log(results);
      const returnedApiValue = results.map((i) => `<img src="${i.image}" height=300px width=200px; />`);
      document.getElementById('resultsDiv').innerHTML = returnedApiValue;
    });
};

const validadeSearch = () => {
  const contentSearchBox = document
    .getElementById("searchBox")
    .value.toLowerCase();
  if (contentSearchBox === "") {
    alert("Nada a Pesquisar");
  } else {
    searchMovie(contentSearchBox);
  }
};

const validadeKeyPressed = () => {
  if (event.key === "Enter") {
    validadeSearch();
  }
};

document
  .getElementById("searchButton")
  .addEventListener("click", validadeSearch);
document.addEventListener("keypress", validadeKeyPressed, false);

// ["click", "keypress"].forEach((evt) =>
//   document
//     .getElementById("searchButton")
//     .addEventListener(evt, searchMovie, false)
// );
