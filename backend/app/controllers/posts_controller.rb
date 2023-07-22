class PostsController < ApplicationController
  before_action :set_post, only: %i[show destroy]

  def index
      posts = PostFetcher.new(current_user: current_user, query: params[:query]).fetch
      render json: posts, each_serializer: PostSerializer, scope: current_user
  end

  def show
    render json: @post, each_serializer: PostSerializer, scope: current_user
  end

  def create
    post_service = PostService.new(current_user, post_params, params[:parent_id])
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
end
