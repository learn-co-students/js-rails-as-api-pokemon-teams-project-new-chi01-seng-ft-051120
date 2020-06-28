class TrainersController < ApplicationController
    def index 
        trainers = Trainer.all 
        render json: trainers.to_json(:include => {
            :pokemons => {:only => [:id, :species, :nickname]},
        }, :except => [:created_at, :updated_at])
    end

    def show
        trainer = Trainer.find_by(id: params[:id]) 
        options = {include: [:pokemons]}
        render json: TrainerSerializer.new(trainer, options)
    end
end
