# frozen_string_literal: true

class CreateMutes < ActiveRecord::Migration[7.0]
  def change
    create_table :mutes do |t|
      t.references :muted_by, null: false, foreign_key: { to_table: :users }
      t.references :mutee, null: false, foreign_key: { to_table: :users }
      t.timestamps
    end
    add_index :mutes, %i[muted_by_id mutee_id], unique: true
  end
end
