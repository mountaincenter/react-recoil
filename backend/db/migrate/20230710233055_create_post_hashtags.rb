# frozen_string_literal: true

class CreatePostHashtags < ActiveRecord::Migration[7.0]
  def change
    create_table :post_hashtags do |t|
      t.references :post, null: false, foreign_key: true
      t.references :hashtag, null: false, foreign_key: true

      t.timestamps
    end
    add_index :post_hashtags, %i[post_id hashtag_id], unique: true
  end
end
