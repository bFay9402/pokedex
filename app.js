async function fetchPokemon() {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
  const data = await res.json();

  data.results.forEach((pokemon) => {
    fetchPokemonData(pokemon);
  });
}

async function fetchPokemonData(pokemon) {
  let url = pokemon.url;

  const res = await fetch(url);
  const data = await res.json();
  
  showPokemon(data);
}

//shows the pokemon on the screen
function showPokemon(pokeData){
  let pokemonContainer = document.querySelector('.pokemon-container');
  let pokeCard = document.createElement('div');
  pokeCard.classList.add('ui', 'card');
  
  let pokeImage = document.createElement('img');
  pokeImage.srcset = pokeData.sprites.front_default;
  
  let pokeName = document.createElement('h4');
  pokeName.innerText = `#${pokeData.id} ${pokeData.name}`;

  let pokeTypes = document.createElement('ul');

  getTypes(pokeData.types, pokeTypes);

  pokeCard.append(pokeImage, pokeName, pokeTypes);

  pokemonContainer.appendChild(pokeCard);
}

// makes a ul that contains the pokemons types
function getTypes(types, ul) {
  types.forEach((type) => {
    let typeLi = document.createElement('li');
    typeLi.innerText = type.type.name;
    typeLi.classList.add(type.type.name);
    ul.append(typeLi);
  })
}

fetchPokemon();