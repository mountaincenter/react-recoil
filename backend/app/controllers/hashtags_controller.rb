class HashtagsController < ApplicationController
  def posts
    @hashtag = Hashtag.find_by(name: params[:id])
    @posts = @hashtag.posts
    render json: @posts, each_serializer: PostSerializer
  end
end