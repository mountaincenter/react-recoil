# frozen_string_literal: true

module Posts
  #
  # post fetcher
  #
  class PostFetcher
    def initialize(current_user:, query: nil)
      @current_user = current_user
      @query = query
    end

    def fetch
      posts = find_posts
      filter_posts_by_mutees(posts)
    end

    private

    def find_posts
      if @query.present?
        find_posts_by_query
      else
        find_all_posts
      end
    end

    def find_posts_by_query
      hashtag = Hashtag.find_by(name: @query.downcase.delete("#"))
      if hashtag
        hashtag.posts
      else
        Post.where("content LIKE ?", "%#{@query}%")
      end
    end

    def find_all_posts
      Post.includes(:user).order(created_at: :desc)
    end

    def filter_posts_by_mutees(posts)
      if @current_user
        posts.where.not(user: @current_user.mutees)
      else
        posts
      end
    end
  end
end
