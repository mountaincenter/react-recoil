# frozen_string_literal: true

class AddNotificationToFollows < ActiveRecord::Migration[7.0]
  def change
    add_reference :follows, :notifiable, polymorphic: true, null: false, index: true
  end
end
