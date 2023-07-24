# frozen_string_literal: true

class RepostService < PostService
  def initialize(user, post_params, original_id)
    super(user, post_params)
    @original_id = original_id
  end

  def create_post
    original_post = Post.find(@original_id)
    post = @user.posts.new(@post_params.merge(original: original_post, post_type: "repost"))
    if post.save
      Notification.create(
        user_id: original_post.user.id,
        notifiable: post,
        notifiable_type: "repost",
        read: false
      )
    end
    post
  end
end
