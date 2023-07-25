class AddOriginalIdToPosts < ActiveRecord::Migration[7.0]
  def change
    add_column :posts, :original_id, :integer
    add_index :posts, :original_id
  end
end
