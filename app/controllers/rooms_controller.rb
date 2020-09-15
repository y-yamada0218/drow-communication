class RoomsController < ApplicationController

  def index
    @rooms = Room.all
  end

  def new
    @room = Room.new
  end

  def show
    @room = Room.find(params[:id])
    respond_to do |format|
      format.html
      format.json
    end
  end

  def edit
    @room = Room.find(params[:id])
  end

  def create
    @room = Room.new(room_params)
    if @room.save
      redirect_to root_path, notice: 'グループを作成しました'
    else
      render :new
    end
  end

  def update
    @room = Room.find(params[:id])
    if @room.update(room_illust_params)
      respond_to do |format|
        format.json
      end
    end  
  end

  def join
    if current_user == nil
      redirect_to user_session_path 
    else 
      @room = Room.find(params[:id])
      @user = User.find(current_user.id)
      @member = User.where(room: @room.id).order(updated_at: "DESC")
      @user.room_id = @room.id
      if @user.save
        respond_to do |format|
          format.html
          format.json
        end
      end
    end
  end

  private
  def room_params
    params.require(:room).permit(:name)
  end

  def room_illust_params
    params.permit(:illust)
  end

  def room_id_params
    params.permit(:id)
  end

end
