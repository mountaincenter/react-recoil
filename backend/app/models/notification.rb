class Notification < ApplicationRecord
  self.inheritance_column = nil
  belongs_to :user
  belongs_to :notifiable, polymorphic: true


  def message
    case notification_type
    when 'follow'
      follower = User.find_by(id: notifiable.follower_id)
      if follower
        "#{follower.name}さんからフォローされました"
      else
        Rails.logger.error "存在しないユーザーが参照されました: #{notifiable.follower_id}"
        "システムエラーが発生しました。管理者に連絡してください。"
      end
    when 'message'
      sender = User.find_by(id: notifiable.sender_id)
      if sender
        "#{sender.name}さんから新しいメッセージが届きました"
      else
        Rails.logger.error "存在しないユーザーが参照されました: #{notifiable.sender_id}"
        "システムエラーが発生しました。管理者に連絡してください。"
      end
    else
      Rails.logger.error "未知の通知タイプ: #{notifiable_type}"
      "システムエラーが発生しました。管理者に連絡してください。"
    end
  end
end
