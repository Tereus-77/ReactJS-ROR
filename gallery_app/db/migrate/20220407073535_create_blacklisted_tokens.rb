class CreateBlacklistedTokens < ActiveRecord::Migration[5.2]
  def change
    create_table :blacklisted_tokens do |t|
      t.references :user, index: true
      t.string :token

      t.timestamps
    end
  end
end
