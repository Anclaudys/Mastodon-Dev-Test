class CreateApiKeys < ActiveRecord::Migration[6.1]  # version might be different
  def change
    create_table :api_keys do |t|
      t.string :service_name
      t.string :private_key
      
      t.timestamps
    end
  end
end