const fetchPokemon = () =>{
    const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

    const pokemonPromisses = [];

    for (let i = 1; i < 150; i++) {
        pokemonPromisses.push(fetch(getPokemonUrl(i)).then(response => response.json()))
    }

    Promise.all(pokemonPromisses)
    .then(pokemons => {
        //console.log(pokemons)

        const lisPokemons = pokemons.reduce((acumulator, pokemon) =>{
            acumulator += `
            <li class="card">
            ${pokemon.name} 
            </li>
            `

            return acumulator
        },'')

        console.log(lisPokemons)
    })

}

fetchPokemon()