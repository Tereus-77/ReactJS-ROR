class TagsPhotos < ActiveRecord::Migration[5.2]
  def change
    create_table :tags_photos, :id => false do |t|
      t.references :tag, index: true
      t.references :photo, index: true
    end
  end
end
