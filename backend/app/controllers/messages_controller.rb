# frozen_string_literal: true

class MessagesController < ApplicationController
  before_action :set_recipient, only: %i[conversations]

  def index
    services = UniqueConversationsService.new(current_user)
    @unique_conversations = services.call
    render json: @unique_conversations, status: :ok
  end

  def create
    message = current_user.sent_messages.build(message_params)
    recipient = User.find_by!(public_id: params[:public_id])

    render json: { error: "User not found" }, status: :not_found and return unless recipient

    message.recipient_id = recipient.id

    if message.save
      Notification.create!(
        user_id: recipient.id,
        notification_type: "message",
        notifiable: message,
        read: false
      )
      render json: message, status: :created
    else
      render json: { error: message.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def conversations
    message = Message.between_users(current_user, @recipient).order(created_at: :asc)
    render json: message, status: :ok
  end

  private

  def message_params
    params.permit(:body)
  end

  def set_recipient
    @recipient = User.find_by!(public_id: params[:id])
    return if @recipient

    render json: { error: "User not found" }, status: :not_found
  end
end
