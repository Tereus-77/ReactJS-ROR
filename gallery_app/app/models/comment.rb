class Comment < ApplicationRecord

  #=========================================== Relationships ===========================================================

  belongs_to :user
  belongs_to :photo

  #========================================== Validations ==============================================================

  validates_presence_of :comment
end
