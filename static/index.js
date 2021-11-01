const orderMovies = (a, b) => {
  if (a.description > b.description) {
    return 1;
  }
  if (a.description < b.description) {
    return -1;
  }
  return 0;
};

const searchMovie = async (value) => {
  const movieApiKey = "k_xmg5bz3v";
  fetch(`https://imdb-api.com/en/API/SearchMovie/${movieApiKey}/${value}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const { results } = data;
      results.sort((a, b) => orderMovies(a, b));
      console.log(results);
      let returnedApiValue = '';
      results.map(
        (i) => returnedApiValue = `${returnedApiValue}<img src="${i.image}" height=400px width=270px; />`
      );
      console.log(returnedApiValue);
      document.getElementById("resultsDiv").innerHTML = returnedApiValue;
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
