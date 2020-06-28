const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", fetchTrainers)

function renderTrainers(trainerData) {
    const main = document.querySelector('main')
    main.addEventListener("click", handleTasks)
    trainerData.forEach(trainer => {
        let renderedPokemons = renderPokemons(trainer["pokemons"]);
        main.innerHTML += `<div class="card" id="${trainer.id}"
        data-id="${trainer.id}"<p>${trainer.name}</p>
        <button class="add" data-trainer-id="${trainer.id}">Add Pokémon</button>
        <ul>${renderedPokemons}</ul></div>`;
        
    })
} 

function fetchTrainers() {
    fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(trainerData => renderTrainers(trainerData))
}

function renderPokemons(pokemons) {
    let pokemonString = ""
    pokemons.forEach(pokemon => {
        pokemonString += `<li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>`
    })
    return pokemonString
}

function renderPokemon(pokemon) {
    console.log(pokemon)
    return `<li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>`
}

function handleTasks(event) {
    let functionToDo = event.target
    if (functionToDo.className === "add") {
        addPokemon(functionToDo);
    } else if (functionToDo.className === "release") {
        releasePokemon(functionToDo);
    }
}

function addPokemon(functionToDo) {
    const trainerCard = document.getElementById(`${functionToDo.dataset.trainerId}`);
    if (trainerCard.querySelector("ul").querySelectorAll("li").length < 6) {
    const thisTrainerId = functionToDo.dataset.trainerId
    const dataSet = {
        trainer_id: thisTrainerId
    }
    
    const reqObj = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataSet)  
    }

    fetch(POKEMONS_URL, reqObj)
    .then(resp => resp.json())
    .then(pokedata => {
        const pokeString = renderPokemon(pokedata["data"]["attributes"])
        trainerCard.querySelector("ul").innerHTML += pokeString
    }
    )
    } else {
        const errorMessage = `<p style="font-size:12px;color:red" id="error">You already have six pokémon. Release a pokémon first.`
        trainerCard.innerHTML += errorMessage
    }
}

function releasePokemon(functionToDo) {
    const pokemonId = functionToDo.dataset.pokemonId
    const trainerCard = functionToDo.parentNode.parentNode.parentNode;
    
    const reqObj = {
        method: 'DELETE'
    }

    fetch(`${POKEMONS_URL}/${pokemonId}`, reqObj)
    .then(resp => resp.json())
    .then(pokedata => {
        functionToDo.parentNode.remove()
        const errorMessage = trainerCard.querySelector("p#error")
        if (errorMessage !== null) {
            errorMessage.remove()
        }

    })
}