const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');
const loading = document.querySelector('.loading');

const hifen = document.querySelector('.hifen');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');

const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => { 
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data; 
    }
}

const renderPokemon = async (pokemon) => {

    let loadingTimeout;

    loadingTimeout = setTimeout(() => {
        pokemonName.innerHTML = 'Carregando...';
        pokemonNumber.innerHTML = '';
        hifen.innerHTML = '';
        loading.style.display = 'block';
    }, 300);

    const data = await fetchPokemon(pokemon);

    clearTimeout(loadingTimeout);

    if (data) {
        pokemonImage.style.display = 'block';
        
        const limitedName = data.name.length > 10 ? data.name.substring(0, 10) + '...' : data.name;
        
        pokemonName.innerHTML = limitedName;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        searchPokemon = data.id;
        input.value = '';
        hifen.innerHTML = '-';
        loading.style.display = 'none';
    } else {
        pokemonName.innerHTML = 'Não encontrado';
        pokemonNumber.innerHTML = '';
        pokemonImage.style.display = 'none';
        hifen.innerHTML = '';
        loading.style.display = 'none';
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon); 
    }
});

buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon); 
});

renderPokemon(searchPokemon);