class Gallery < ApplicationRecord

  #============================================== Relationships ======================================================

  belongs_to :user
  has_many :photos, dependent: :destroy
  has_and_belongs_to_many :tags, join_table: :tags_galleries

  #=============================================== Validations ========================================================

  validates_presence_of :name, :description
  validates_uniqueness_of :name
end
