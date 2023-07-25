# frozen_string_literal: true

#
# messages controller
#
class MessagesController < ApplicationController
  before_action :set_recipient, only: %i[conversations]

  def index
    services = Message::UniqueConversationsService.new(current_user)
    @unique_conversations = services.call
    render json: @unique_conversations, status: :ok
  end

  def create
    service = Message::MessageCreationService.new(current_user, params[:public_id], message_params[:body])
    result = service.call

    if result[:status] == :created
      render json: result[:message], status: :created
    else
      render json: { error: result[:error] }, status: result[:status]
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
