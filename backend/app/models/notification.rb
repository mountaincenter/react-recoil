class Notification < ApplicationRecord
  self.inheritance_column = nil
  belongs_to :user
  belongs_to :notifiable, polymorphic: true


  def message
    case notification_type
    when 'follow'
      follower = User.find_by(id: notifiable.follower_id)
      build_message(follower, "#{follower.name}さんからフォローされました")
    when 'message'
      message = notifiable
      sender = User.find_by(id: message.sender_id)
      build_message(sender, "#{sender.name}さんからメッセージから届いています", message.body)
    when 'like', 'mention', 'reply', 'repost', 'quote_repost'
      post = notifiable
      user = User.find_by(id: post.user_id)
      build_message(user, message_for_post_type, post.content)
    else
      Rails.logger.error "存在しない通知タイプが参照されました: #{notification_type}"
      { error: "システムエラーが発生しました。管理者に連絡してください。"}
    end
  end
  private

  def build_message(user, name, body=nil)
    if user
      {
        avatar: user.avatar,
        name: name,
        body: body
      }
    else {
      Rails.logger.error "存在しないユーザーが参照されました: #{user&.id}"
      { error: "システムエラーが発生しました。管理者に連絡してください。" }
    }
    end
  end

  def message_for_post_type
    case notification_type
    when 'like'
      likers = notifiable.likes.map(&:user)
      likers_count = likers.count
      if likers_count == 1
        "#{likers.first.name}さんがあなたの投稿にいいねしました"
      else
        "#{likers.first.name}さん他#{likers_count - 1}名があなたの投稿にいいねしました"
    when 'mention'
      "#{user.name}さんからのメンションがあります"
    when 'reply'
      "#{user.name}さんからの返信があります"
    when 'repost'
      "#{user.name}さんがあなたの投稿をリツイートしました"
    when 'quote_repost'
      "#{user.name}さんがあなたの投稿を引用リツイートしました"
    end
  end
end
