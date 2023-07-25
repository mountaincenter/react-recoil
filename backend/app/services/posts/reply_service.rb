# frozen_string_literal: true

module Posts
  #
  # reply service
  #
  class ReplyService < PostService
    def initialize(user, post_params, parent_id)
      super(user, post_params)
      @parent_id = parent_id
    end

    def create_post
      @parent_post = Post.find(@parent_id)
      post_content = @post_params[:content]
      post = @user.posts.new(@post_params.merge(parent: @parent_post, content: post_content))
      create_notification_for_post(post) if post.save
      post
    end

    private

    def create_notification_for_post(post)
      Notification.create(
        user_id: @parent_post.user.id,
        notifiable: post,
        notification_type: "reply",
        read: false
      )
    end
  end
end
