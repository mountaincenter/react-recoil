class AddPublicIdToUser < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :public_id, :string, after: :unconfirmed_email
    add_index :users, :public_id, unique: true
  end
end
