# frozen_string_literal: true

class RemovePublicIdFromUser < ActiveRecord::Migration[7.0]
  def change
    remove_column :users, :public_id, :string
  end
end
