# frozen_string_literal: true

class RemoveNotifiableFromFollow < ActiveRecord::Migration[7.0]
  def change
    remove_column :follows, :notifiable_type, :string
    remove_column :follows, :notifiable_id, :string
  end
end
