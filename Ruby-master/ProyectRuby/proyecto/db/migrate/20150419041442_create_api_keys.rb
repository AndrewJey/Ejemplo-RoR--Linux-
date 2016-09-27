class CreateApiKeys < ActiveRecord::Migration
  def change
    create_table :api_keys do |t|
      t.string :access_token
      t.string :username
      t.datetime :current

      t.timestamps null: false
    end
  end
end
