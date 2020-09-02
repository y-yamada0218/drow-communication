class RoomsController < ApplicationController

  def index
    @rooms = Room.all
  end

  def new
    @room = Room.new
  end

  def create
    @room = Room.new(room_params)
    if @room.save
      redirect_to root_path, notice: 'グループを作成しました'
    else
      render :new
    end
  end

  def edit
    @room = Room.find(params[:id])
  end

  def update
  end

  private
  def room_params
    params.require(:room).permit(:name)
  end

end
