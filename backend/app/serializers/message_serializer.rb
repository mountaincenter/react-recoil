class MessageSerializer < ActiveModel::Serializer
  attributes :id, :body, :sender_id, :recipient_id, :sender, :recipient ,:created_at

  def sender
    {
      id: object.sender.id,
      name: object.sender.name,
      username: object.sender.username,
      avatar: object.sender.avatar,
      public_id: object.sender.public_id,
      profile: object.sender.profile,
    }
  end

  def recipient
    {
      id: object.recipient.id,
      name: object.recipient.name,
      username: object.recipient.username,
      avatar: object.recipient.avatar,
      public_id: object.recipient.public_id,
      profile: object.recipient.profile,
    }
  end
end
