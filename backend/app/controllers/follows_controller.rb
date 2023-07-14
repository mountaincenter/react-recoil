class FollowsController < ApplicationController
  before_action :set_user, only: %i[create destroy]
  before_action :set_follow, only: %i[destroy]

  def create
    follow = current_user.following_relationships.build(following_id: @user.id)

    if follow.save
      Notification.create!(
        user_id: params[:user_id],
        notification_type: "follow",
        notifiable: follow,
        read: false
      )
      render json: follow, status: :created
    else
      render json: { errors: follow.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @follow.destroy
    head :no_content
  end

  private

  def set_user
    @user = User.find(params[:user_id])
    render json: {error: 'User not found'}, status: :not_found unless @user
  end

  def set_follow
    @follow = current_user.following_relationships.find_by(following_id: @user.id)
    head :not_found unless @follow
  end

  def authenticate_user!
    render json: { status: 401, errors: ["Unauthorized"] } unless current_user
  end
end
