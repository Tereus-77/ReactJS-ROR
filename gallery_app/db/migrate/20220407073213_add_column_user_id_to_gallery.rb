class AddColumnUserIdToGallery < ActiveRecord::Migration[5.2]
  def change
    add_reference :galleries, :user, index: true
  end
end
