class Message < ApplicationRecord

  belongs_to :sender, class_name: "User"
  belongs_to :recipient, class_name: "User"
  validates :body, presence: true
  validate :different_sender_and_recipient

  has_many :notifications, as: :notifiable, dependent: :destroy

  # scope :between_users, ->(user1, user2) { where(sender_id: user1.id, recipient_id: user2.id).or(where(sender_id: user2.id, recipient_id: user1.id)) }
  scope :between_users, ->(user1, user2) { where(sender: user1, recipient: user2).or(where(sender: user2, recipient: user1)) }

  private

  def different_sender_and_recipient
    if sender.username == recipient.username
      errors.add(:base, "Sender and recipient must be different users")
    end
  end

end