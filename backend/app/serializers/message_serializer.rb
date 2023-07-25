# frozen_string_literal: true

#
# message serializer
#
class MessageSerializer < ActiveModel::Serializer
  attributes :id, :body, :sender_id, :recipient_id, :sender, :recipient, :created_at

  def sender
    object.sender.as_json(only: %i[id name username avatar public_id profile])
  end

  def recipient
    object.recipient.as_json(only: %i[id name username avatar public_id profile])
  end
end
