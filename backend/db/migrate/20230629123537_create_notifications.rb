# frozen_string_literal: true

class CreateNotifications < ActiveRecord::Migration[7.0]
  def change
    create_table :notifications do |t|
      t.bigint :user_id, null: false
      t.string :notification_type, null: false
      t.boolean :read, default: false
      t.references :notifiable, polymorphic: true, null: false, index: true
      t.timestamps
    end

    add_index :notifications, %w[user_id read], name: 'index_notifications_on_user_and_read'
    add_foreign_key :notifications, :users
  end
end
