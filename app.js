const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`
const fetchPokemon = () =>{
    const pokemonPromises = []

    for (let i = 1; i < 130; i++) {
        pokemonPromises.push(fetch(getPokemonUrl(i)).then(response => response.json()))
    }

    Promise.all(pokemonPromises)
    .then(pokemons => {
        console.log(pokemons)

        const lisPokemons = pokemons.reduce((acumulator, pokemon) =>{
            const types = pokemon.types.map(typeInfo => typeInfo.type.name)

            acumulator += `
            <li class="card ${types[0]}">
            <img class="card-image" alt="${pokemon.name}" src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png" />
            <h2 class="card-title"> ${pokemon.id}. ${pokemon.name}</h2>
            <p class="card-subtitle">${types.join(' | ')} </p>
            
            </li>
            `

            return acumulator
        }, '')

        const ul = document.querySelector('[data-js="pokedex"]')

        ul.innerHTML = lisPokemons
    })

}

fetchPokemon()