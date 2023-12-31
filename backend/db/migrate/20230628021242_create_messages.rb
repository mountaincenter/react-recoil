# frozen_string_literal: true

class CreateMessages < ActiveRecord::Migration[7.0]
  def change
    create_table :messages do |t|
      t.references :sender, null: false, foreign_key: { to_table: :users }
      t.references :recipient, null: false, foreign_key: { to_table: :users }
      t.string :body

      t.timestamps
    end
    add_index :messages, %i[sender_id recipient_id]
  end
end
