class AddProfileToUser < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :profile, :string, after: :avatar
  end
end
