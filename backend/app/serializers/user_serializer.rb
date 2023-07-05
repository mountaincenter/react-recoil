class UserSerializer < ActiveModel::Serializer
  attributes :id, :public_id, :name, :username, :avatar, :email,
             :profile, :following?, :followed?, :uid, :provider
  has_many :todos

  def followed?
    scope&.following?(object)
  end

  def following?
    object.following.include?(scope)
  end

end
