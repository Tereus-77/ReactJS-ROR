class CreateComments < ActiveRecord::Migration[5.2]
  def change
    create_table :comments do |t|
      t.references :user, index: true
      t.references :photo, index: true
      t.string :comment
      t.date :create_date

      t.timestamps
    end
  end
end
