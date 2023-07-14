class ReplySerializer < ActiveModel::Serializer
  attributes :id, :content, :images, :liked?, :user, :public_id, :parent_id, :created_at, :updated_at
  has_many :likes

  def liked?
    if scope.present?
      object.likes.where(user_id: scope.id).exists?
    end
  end

  def parent_id
    object.parent.id
  end

  def user
    object.user.as_json(only: %i[id name username avatar])
  end
end
