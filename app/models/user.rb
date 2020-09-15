class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  belongs_to :room, optional: true

  
  has_many :user_rooms
  has_many :rooms, through: :user_rooms

  def self.number_of_users_for_current_user(room_id)
    array = []
    room_id.each do |num|
      array << User.where(room: num.to_s).count
    end
    return array
  end
  
end

