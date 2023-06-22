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

  validates :username, presence: true,
                       uniqueness: {case_sensitive:false},
                       length: { in: 6..16},
                       format: { with: /\A[a-zA-Z0-9_]+\z/,
                                 message: "can only include letters, numbers, and underscores " }

  validates :name, presence: true, length: { maximum: 30 }
  validates :email, presence: true, length: { maximum: 100 }

  has_many :follower_relationships, class_name: "Follow", foreign_key: "following_id", dependent: :destroy
  has_many :followers, through: :follower_relationships, source: :follower

  has_many :following_relationships, class_name: "Follow", foreign_key: "follower_id", dependent: :destroy
  has_many :following, through: :following_relationships, source: :following

  def following?(other_user)
    following.include?(other_user)
  end

  private

    def generate_username
      return if username.present?
      loop do
        self.username = SecureRandom.alphanumeric(8)
        break unless User.exists?(username: username)
      end
    end
end
