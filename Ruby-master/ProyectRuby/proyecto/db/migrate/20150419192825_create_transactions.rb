class CreateTransactions < ActiveRecord::Migration
  def change
    create_table :transactions do |t|
      t.integer :offert_product_id
      t.string :require_product_id

      t.timestamps null: false
    end
  end
end
