# frozen_string_literal: true

class ChangeUsernameDefault < ActiveRecord::Migration[7.0]
  def change
    change_column_default :users, :username, from: nil, to: -> { "'#{SecureRandom.alphanumeric(8)}'" }, unique: true
  end
end
