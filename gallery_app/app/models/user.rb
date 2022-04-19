class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  #============================================ Relationships =========================================================

  has_many :galleries, dependent: :destroy
  has_many :refresh_tokens, dependent: :destroy
  has_many :blacklisted_tokens, dependent: :destroy
  has_many :comments

  #=========================================== Methods ================================================================

  def name
    first_name + " " + last_name
  end
end
