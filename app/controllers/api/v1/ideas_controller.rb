class Api::V1::IdeasController < ApplicationController
  before_action :set_idea, only: [:show, :edit, :update, :destroy]

  # GET /ideas
  # GET /ideas.json
  def index
     @ideas = Idea.order("created_at DESC")
    render json: @ideas
  end

  # GET /ideas/1
  # GET /ideas/1.json
  def show
    render json: @idea
  end

  # GET /ideas/new
  def new
    @idea = Idea.new
  end

  # GET /ideas/1/edit
  def edit
  end

  # POST /ideas
  # POST /ideas.json
  def create
    @idea = Idea.create(idea_params)
    render json: @idea
  end
  

  # PATCH/PUT /ideas/1
  # PATCH/PUT /ideas/1.json
  def update
    @idea.update_attributes(idea_params)
    render json: @idea
  end

  # DELETE /ideas/1
  # DELETE /ideas/1.json
  #def destroy
  # @idea.destroy
  #  respond_to do |format|
  #   format.html { redirect_to ideas_url, notice: 'Idea was successfully destroyed.' }
  #    format.json { head :no_content }
  #  end
  #end
  
  def destroy
    @idea = Idea.find(params[:id])
    if @idea.destroy
      head :no_content, status: :ok
    else
      render json: @idea.errors, status: :unprocessable_entity
    end
  end
  
  

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_idea
      @idea = Idea.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def idea_params
      params.require(:idea).permit(:title, :body)
    end
end
