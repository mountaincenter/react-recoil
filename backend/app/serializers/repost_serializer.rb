# frozen_string_literal: true

#
# repost serializer
#
class RepostSerializer < PostSerializer
  attributes :id, :content, :images, :liked?, :user, :public_id, :original_id, :parent_id, :created_at, :updated_at
  has_many :likes

  def liked?
    return unless scope.present?

    object.likes.where(user_id: scope.id).exists?
  end

  def original_id
    object.original.id
  end

  def parent_id
    object.parent.id if object.parent.present?
  end

  def user
    object.user.as_json(only: %i[id name username avatar])
  end
end
