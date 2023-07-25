# frozen_string_literal: true

module Posts
  #
  # repost service
  #
  class RepostService < PostService
    def initialize(user, post_params, original_id)
      super(user, post_params)
      @original_id = original_id
    end

    def create_post
      @original_post = Post.find(@original_id)
      post = @user.posts.new(@post_params.merge(original: @original_post, post_type: "repost"))
      create_notification_for_post(post) if post.save
      post
    end

    private

    def create_notification_for_post(post)
      Notification.create(
        user_id: @original_post.user.id,
        notifiable: post,
        notification_type: "repost",
        read: false
      )
    end
  end
end
