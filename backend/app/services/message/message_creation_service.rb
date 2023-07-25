# frozen_string_literal: true

module Message
  #
  # message creation service
  #
  class MessageCreationService
    def initialize(sender, recipient_public_id, body)
      @sender = sender
      @recipient_public_id = recipient_public_id
      @body = body
    end

    def call
      recipient = User.find_by!(public_id: @recipient_public_id)
      return { error: "User not found", status: :not_found } unless recipient

      message = @sender.sent_messages.build(body: @body, recipient_id: recipient.id)

      if message.save
        create_notification(recipient, message)
        { message:, status: :created }
      else
        { error: message.errors.full_messages, status: :unprocessable_entity }
      end
    end

    private

    def create_notification(recipient, message)
      Notification.create!(
        user_id: recipient.id,
        notification_type: "message",
        notifiable: message,
        read: false
      )
    end
  end
end
