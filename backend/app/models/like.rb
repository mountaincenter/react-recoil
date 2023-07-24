# frozen_string_literal: true

class Like < ApplicationRecord
  belongs_to :user
  belongs_to :post
  has_many :notifications, as: :notifiable, dependent: :destroy
  after_create :create_notification

  def create_notification
    Notification.create!(
      user_id: post.user_id,
      notification_type: "like",
      notifiable: self,
      read: false
    )
  end
end
