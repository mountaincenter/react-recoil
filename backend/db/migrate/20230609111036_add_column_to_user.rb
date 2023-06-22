class AddColumnToUser < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :username, :string, after: :name
    add_column :users, :avatar, :string, after: :username
  end
end
