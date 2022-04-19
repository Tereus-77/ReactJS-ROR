class Photo < ApplicationRecord

  #======================================= Relationships ===============================================================

  belongs_to :gallery
  has_many :comments, dependent: :destroy
  has_one_attached :image
  has_and_belongs_to_many :tags, join_table: :tags_photos

  #====================================== Validations ==================================================================

  validates_presence_of :name
  validates_uniqueness_of :name
end
