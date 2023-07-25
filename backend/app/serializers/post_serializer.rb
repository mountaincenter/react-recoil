# frozen_string_literal: true

#
# post serializer
#
class PostSerializer < ActiveModel::Serializer
  attributes :id, :content, :images, :post_type, :liked?, :bookmarked?, :bookmarks_count, :public_id, :created_at, :updated_at
  belongs_to :user
  belongs_to :parent, class_name: "Post", serializer: ParentSerializer
  belongs_to :original, class_name: "Post", serializer: OriginalSerializer
  has_many :likes
  has_many :replies, serializer: ReplySerializer
  has_many :reposts, serializer: RepostSerializer
  has_many :quote_reposts, serializer: QuoteRepostSerializer

  def liked?
    return unless scope.present?

    object.likes.where(user_id: scope.id).exists?
  end

  def bookmarked?
    return unless scope.present?

    object.bookmarks.where(user_id: scope.id).exists?
  end

  def bookmarks_count
    object.bookmarks.count
  end

  def post_type
    object.post_type
  end
end
