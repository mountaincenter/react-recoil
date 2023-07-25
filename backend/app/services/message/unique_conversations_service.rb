# frozen_string_literal: true

module Message
  #
  # unique conversations service
  #
  class UniqueConversationsService
    def initialize(user)
      @user = user
    end

    def call
      sent_users = @user.sent_messages.pluck(:recipient_id).uniq
      received_users = @user.received_messages.pluck(:sender_id).uniq
      user_ids = sent_users | received_users
      User.find(user_ids)
    end
  end
end
