class AddNotificationMessages < ActiveRecord::Migration[7.0]
  def change
        add_reference :messages, :notifiable, polymorphic: true, null: false, index: true
  end
end
