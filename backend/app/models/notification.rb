class Notification < ApplicationRecord
  self.inheritance_column = nil
  belongs_to :user
  belongs_to :notifiable, polymorphic: true


  def message
    case notification_type
    when 'follow'
      follower = User.find_by(id: notifiable.follower_id)
      if follower
        {
          avatar: follower.avatar,
          name: "#{follower.name}さんからフォローされました"
        }
      else
        Rails.logger.error "存在しないユーザーが参照されました: #{notifiable.follower_id}"
        { error: "システムエラーが発生しました。管理者に連絡してください。" }
      end
    when 'message'
      message = notifiable
      sender = User.find_by(id: message.sender_id)
      if sender
        {
          avatar: sender.avatar,
          name: "#{sender.name}さんから新しいメッセージが届きました",
          body: message.body
        }
      else
        Rails.logger.error "存在しないユーザーが参照されました: #{notifiable.sender_id}"
        { error: "システムエラーが発生しました。管理者に連絡してください。" }
      end
    when 'like'
      like = notifiable
      user = User.find_by(id: like.user_id)
      post = Post.find_by(id: like.post_id)
      if user && post
        {
          avatar: user.avatar,
          name: "#{user.name}さんがあなたの投稿をいいねしました",
          body: post.content
        }
      else
        Rails.logger.error "存在しないユーザーまたは投稿が参照されました: ユーザーID #{like.user_id}, 投稿ID #{like.post_id}"
        { error: "システムエラーが発生しました。管理者に連絡してください。" }
      end
    when 'mention'
      post = notifiable
      user = User.find_by(id: post.user_id)
      if user
        {
          avatar: user.avatar,
          name: "#{user.name}さんからのメンションがあります",
          body: post.content
        }
      else
        Rails.logger.error "存在しないユーザーが参照されました: #{post.user_id}"
        { error: "システムエラーが発生しました。管理者に連絡してください。"}
      end
    when 'reply'
      post = notifiable
      user = User.find_by(id: post.user_id)
      if user
        {
          avatar: user.avatar,
          name: "#{user.name}さんからの返信があります",
          body: post.content
        }
      end
    else
      Rails.logger.error "未知の通知タイプ: #{notifiable_type}"
      { error: "システムエラーが発生しました。管理者に連絡してください。" }
    end
  end
end
