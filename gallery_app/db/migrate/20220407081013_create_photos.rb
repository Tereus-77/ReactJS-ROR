class CreatePhotos < ActiveRecord::Migration[5.2]
  def change
    create_table :photos do |t|
      t.references :gallery, index: true
      t.string :name
      t.date :shooting_date
      t.string :description

      t.timestamps
    end
  end
end
