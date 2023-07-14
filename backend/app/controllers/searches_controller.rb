class SearchesController < ApplicationController
  def index
    query = params[:q]
    users, posts = User.search_with_posts(query)

    user_serializer = ActiveModel::Serializer::CollectionSerializer.new(users, each_serializer: UserSerializer)
    post_serializer = ActiveModel::Serializer::CollectionSerializer.new(posts, each_serializer: PostSerializer)

    render json: { users: user_serializer, posts: post_serializer}
  end
end
