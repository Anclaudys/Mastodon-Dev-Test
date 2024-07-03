class CreateApiKeys < ActiveRecord::Migration[7.1]
  def change
    create_table :api_keys do |t|
      t.string :key
      t.text :description
      
      t.timestamps
    end
  end
end
