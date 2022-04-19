class CreateRefreshTokens < ActiveRecord::Migration[5.2]
  def change
    create_table :refresh_tokens do |t|
      t.references :user, index: true
      t.string :refresh_token

      t.timestamps
    end
  end
end
