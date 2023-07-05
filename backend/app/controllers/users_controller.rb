class UsersController < ApplicationController

  def index
    users = User.all
    render json: users, each_serializer: UserSerializer, scope: current_user, status: 200
  end

  def show
    user = User.find_by!(username: params[:id])
    render json: user, each_serializer: UserSerializer, scope: current_user, status: 200
  end

  def update
    user = User.find_by!(username: params[:id])

    if user.update(user_params)
      render json: user, serializer: UserSerializer, scope: current_user, status: 200
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def following
    user = User.find_by!(username: params[:id])
    render json: user.following, each_serializer: FollowingUserSerializer, scope: current_user, status: 200
  end

  def followers
    user = User.find_by!(username: params[:id])
    render json: user.followers, each_serializer: FollowerUserSerializer, scope: current_user, status: 200
  end

  private

  def user_params
    params.permit(:name, :username, :email, :avatar, :profile)
  end
end
