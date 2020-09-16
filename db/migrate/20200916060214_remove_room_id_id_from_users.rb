class RemoveRoomIdIdFromUsers < ActiveRecord::Migration[6.0]
  def change
    remove_column :users, :room_id_id, :intger
  end
end
