# frozen_string_literal: true

#
# notification serializer
#
class NotificationSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :notification_type, :read, :notifiable_id, :notifiable_type, :created_at, :updated_at,
             :message

  def message
    object.message
  end
end
