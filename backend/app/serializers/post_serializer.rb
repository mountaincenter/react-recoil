# frozen_string_literal: true

#
# post serializer
#
class PostSerializer < ActiveModel::Serializer
  attributes :id, :content, :images, :liked?, :bookmarked?, :bookmarks_count, :public_id, :created_at, :updated_at
  belongs_to :user
  belongs_to :parent, class_name: "Post", serializer: ParentSerializer
  has_many :likes
  has_many :replies, serializer: ReplySerializer

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
end
