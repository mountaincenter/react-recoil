# frozen_string_literal: true

#
# posts controller
#
class PostsController < ApplicationController
  before_action :set_post, only: %i[show destroy]

  def index
    posts = Posts::PostFetcher.new(current_user:, query: params[:query]).fetch
    render json: posts, each_serializer: PostSerializer, scope: current_user
  end

  def show
    render json: @post, each_serializer: PostSerializer, scope: current_user
  end

  def create
    post_service = select_service
    post = post_service.create_post
    if post.persisted?
      render json: post
    else
      render json: { error: post.errors }
    end
  end

  def destroy
    @post.destroy
    render json: @post
  end

  private

  def set_post
    @post = Post.find_by!(public_id: params[:id])
  end

  def post_params
    params.permit(:content, { images: [] })
  end

  def select_service
    service_args = [current_user, post_params]
    service_args << post_based_on_type if %w[reply repost quote_repost].include?(params[:post_type])
    Posts::PostService.new(*service_args)
  end

  def post_based_on_type
    case params[:post_type]
    when "reply", "repost", "quote_repost"
      params[:original_id]
    else
      raise "存在しない投稿タイプが指定されました: #{params[:post_type]}"
    end
  end
end
