class AddRoomIdToUser < ActiveRecord::Migration[6.0]
  def change
    add_reference :users, :room, foreign_key: true
  end
end
