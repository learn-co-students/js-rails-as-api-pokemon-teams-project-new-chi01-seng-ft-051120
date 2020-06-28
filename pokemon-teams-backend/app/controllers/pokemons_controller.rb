require 'faker'

class PokemonsController < ApplicationController

    def create 
        new_pokemon = Pokemon.create(trainer_id: params[:trainer_id], 
        nickname: Faker::Name.first_name,
        species: Faker::Games::Pokemon.name)

        render json: PokemonSerializer.new(new_pokemon)
    end 

    def destroy 
        pokemon = Pokemon.find_by(id: params[:id])
        pokemon.destroy 

        render json: PokemonSerializer.new(pokemon)
    end 

end
