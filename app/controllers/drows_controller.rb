class DrowsController < ApplicationController
  def index
    @users = User.all
    @room = Room.new
    @drow = Room.new
  end

  def show 
  end

 def create
 end

 def update
  @drow = Room.new(drow_params)
  binding.pry
    if @drow.save
      respond_to do |format|
        format.json 
      end
    end
 end

 private

 def drow_params
  params.permit(:illust)
 end

end
