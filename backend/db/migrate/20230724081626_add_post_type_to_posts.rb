# frozen_string_literal: true

class AddPostTypeToPosts < ActiveRecord::Migration[7.0]
  def change
    add_column :posts, :post_type, :string, default: 'original'
  end
end
