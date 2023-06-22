class FollowsController < ApplicationController
  before_action :set_user, only: %i[create destroy]
  before_action :set_follow, only: [:destroy]

  def create
    follow = current_user.following_relationships.build(following_id: params[:user_id])

    if follow.save
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
  end

  def set_follow
    @follow = current_user.following_relationships.find_by(following_id: params[:user_id])
    head :not_found unless @follow
  end

  def authenticate_user!
    render json: { status: 401, errors: ["Unauthorized"] } unless current_user
  end
end
