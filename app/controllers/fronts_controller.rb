class FrontsController < ApplicationController
  def index
    @rooms = Room.all
    if current_user == nil 
    else
      @user = User.find(current_user.id)
      @user.room_id = nil
      @user.save
    end
    @users = User.number_of_users_for_current_user(@rooms.ids)
  end

end
