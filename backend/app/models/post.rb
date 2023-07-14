class Post < ApplicationRecord
  belongs_to :user
  belongs_to :parent, class_name: "Post", optional:true
  has_many :replies, class_name: "Post", foreign_key: "parent_id", dependent: :destroy
  mount_uploaders :images, ImageUploader
  validates :content, presence: true, length: { maximum: 140 }
  validates :public_id, uniqueness: true
  has_many :likes, dependent: :destroy
  has_many :post_hashtags
  has_many :hashtags, through: :post_hashtags
  has_many :bookmarks, dependent: :destroy
  has_many :bookmarking_users, through: :bookmarks, source: :user


  before_create :set_public_id
  after_save :create_hashtags

  private

  def set_public_id
    self.public_id = SecureRandom.uuid
  end

  def create_hashtags
    if self.content.include?("#")
      self.content.scan(/#[\p{L}\w]+/).each do |hashtag|
        tag = Hashtag.find_or_create_by(name: hashtag.downcase.delete('#'))
        self.hashtags << tag
      end
    end
  end
end
