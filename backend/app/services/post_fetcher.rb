class PostFetcher
  def initialize(current_user:, query: nil)
    @current_user = current_user
    @query = query
  end


  def fetch
    posts = if @query.present?
              hashtag = Hashtag.find_by(name: @query.downcase.delete('#'))
              if hashtag
                posts = hashtag.posts
              else
                posts = Post.where("content LIKE ?", "%#{@query}%")
              end
            else
              posts = Post.includes(:user).order(created_at: :desc)
            end

    if @current_user
      posts.where.not(user: @current_user.mutees)
    else
      posts
    end
  end
end