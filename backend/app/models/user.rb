# frozen_string_literal: true

class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  include DeviseTokenAuth::Concerns::User
  mount_uploader :avatar, AvatarUploader
  before_validation :generate_username, on: :create
  has_many :todos, dependent: :destroy
  has_many :posts, dependent: :destroy
  has_many :likes, dependent: :destroy
  has_many :bookmarks, dependent: :destroy
  has_many :bookmarked_posts, through: :bookmarks, source: :post
  before_create :set_public_id

  validates :username, presence: true,
                       uniqueness: {case_sensitive:false},
                       length: { in: 6..16},
                       format: { with: /\A[a-zA-Z0-9_]+\z/,
                                 message: "can only include letters, numbers, and underscores " }

  validates :name, presence: true, length: { maximum: 30 }
  validates :email, presence: true, length: { maximum: 100 }
  validates :password, presence: true, length: { minimum: 8 }, on: :create
  validates :public_id, uniqueness: true

  has_many :follower_relationships, class_name: "Follow", foreign_key: "following_id", dependent: :destroy
  has_many :followers, through: :follower_relationships, source: :follower

  has_many :following_relationships, class_name: "Follow", foreign_key: "follower_id", dependent: :destroy
  has_many :following, through: :following_relationships, source: :following

  has_many :sent_messages, class_name: "Message", foreign_key: "sender_id", dependent: :destroy
  has_many :received_messages, class_name: "Message", foreign_key: "recipient_id", dependent: :destroy

  has_many :notifications, dependent: :destroy

  def following?(other_user)
    following.include?(other_user)
  end

  def self.search_with_posts(query)
    users = includes(:posts).where('username LIKE ? OR name LIKE ?', "%#{query}%", "%#{query}%")
    user_post_ids = users.flat_map { |user| user.posts.map(&:id) }
    posts =Post.where('content LIKE ?', "%#{query}%").where.not(id: user_post_ids).includes(:user)
    [users, posts]
  end

  private

    def generate_username
      return if username.present?
      loop do
        self.username = SecureRandom.alphanumeric(8)
        break unless User.exists?(username: username)
      end
    end

    def set_public_id
      self.public_id = SecureRandom.uuid
    end
end
