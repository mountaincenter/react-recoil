class PostsController < ApplicationController
  before_action :set_post, only: %i[show destroy]

  def index
    if params[:query].present?
      hashtag = Hashtag.find_by(name: params[:query].downcase.delete("#"))
      if hashtag
        posts = hashtag.posts
      else
        posts = Post.where('content Like ?', "%#{params[:query]}%")
      end
    else
      posts = Post.includes(:user).order(created_at: :desc)
    end
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
