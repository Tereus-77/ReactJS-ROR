class TagsGalleries < ActiveRecord::Migration[5.2]
  def change
    create_table :tags_galleries, :id => false do |t|
      t.references :tag, index: true
      t.references :gallery, index: true
    end
  end
end
