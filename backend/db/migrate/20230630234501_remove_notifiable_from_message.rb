class RemoveNotifiableFromMessage < ActiveRecord::Migration[7.0]
  def change
    remove_column :messages, :notifiable_type, :string
    remove_column :messages, :notifiable_id, :string
  end
end
