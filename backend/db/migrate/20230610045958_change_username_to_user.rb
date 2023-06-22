class ChangeUsernameToUser < ActiveRecord::Migration[7.0]
  def up
    change_column_null :users, :username, false
    change_column_default :users, :username, from: nil, to: ''
    add_index :users, :username, unique: true
  end

  def down
    change_column_null :users, :username, true
    change_column_default :users, :username, from: '', to: nil
    remove_index :users, :username
  end
end
