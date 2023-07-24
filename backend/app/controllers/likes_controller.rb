# frozen_string_literal: true

class LikesController < ApplicationController
  before_action :set_post
  before_action :set_like, only: :destroy

  def create
    like = current_user.likes.build(post: @post)
    if like.save
      Notification.find_by(notifiable: like)
      render json: like, status: :created
    else
      render json: { errors: like.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @like.destroy
    head :no_content
  end

  private

  def set_like
    @like = current_user.likes.find_by(post: @post)
    head :not_found unless @like
  end

  def set_post
    @post = Post.find_by!(public_id: params[:post_id])
  end
end
