class AddPublicIdToPosts < ActiveRecord::Migration[7.0]
  def change
    add_column :posts, :public_id, :string
    add_index  :posts, :public_id, unique: true
  end
end
