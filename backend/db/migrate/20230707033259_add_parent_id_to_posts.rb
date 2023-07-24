# frozen_string_literal: true

class AddParentIdToPosts < ActiveRecord::Migration[7.0]
  def change
    # add_column :posts, :parent_id, :bigint, index: true
    add_foreign_key :posts, :posts, column: :parent_id
  end
end
