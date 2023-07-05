class NotificationSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :notification_type, :read, :notifiable_id, :notifiable_type, :created_at, :updated_at, :message
  belongs_to :user
  attribute :notifiable

  def notifiable
    case object.notifiable_type
    when 'Follow'
      FollowSerializer.new(object.notifiable)
    when 'Message'
      MessageSerializer.new(object.notifiable)
    end
  end

  def message
    object.message
  end
end
