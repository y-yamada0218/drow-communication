class FrontsController < ApplicationController
  def index
    @rooms = Room.all
  end

end
