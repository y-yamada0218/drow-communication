class DrowsController < ApplicationController
  def index
    @users = User.all
  end

  def show 
  end

  def update
    @room = Room.find(room_params)
    binding.pry
    if @room.save
      respond_do do |format|
        format.json
      end
    end  
  end

  private

  def room_params
    params.permit(:name, :illust)
  end

end
