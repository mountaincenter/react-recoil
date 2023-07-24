# frozen_string_literal: true

class PostService
  def initialize(_user, post_params)
    @user = User
    @post_params = post_params
  end

  def create_post
    post = @user.posts.new(@post_params)
    create_mention(post) if post.save && post.content.include?("@")
    post
  end

  def create_mention(post)
    usernames = post.content.scan(/@\w+/)
    usernames.each do |username|
      user = User.find_by(username: username.delete("@"))
      next unless user

      Notification.create(
        user_id: user.id,
        notifiable: post,
        notification_type: "mention"
      )
    end
  end
end
