class PostService
  def initialize(user, post_params, parent_id=nil)
    @user = user
    @post_params = post_params
    @parent_id = parent_id
  end

  def create_post
    if @parent_id
      create_reply
    else
      create_mention_post
    end
  end

  private

  def create_mention_post
    post = @user.posts.new(@post_params)
    if post.save
      create_mention(post) if post.content.include?('@')
    end
    post
  end

  def create_reply
    parent_post = Post.find(@parent_id)
    post_content = @post_params[:content]
    post= @user.posts.new(@post_params.merge(parent: parent_post, content: post_content))
    if post.save
      Notification.create(
        user_id: parent_post.user.id,
        notifiable: post,
        notification_type: 'reply',
        read: false
      )
    end
    post
  end


  def create_mention(post)
    usernames = post.content.scan(/@\w+/)
    usernames.each do |username|
      user = User.find_by(username: username.delete('@'))
      if user
        Notification.create(user_id: user.id, notifiable: post, notification_type: 'mention')
      end
    end
  end

end