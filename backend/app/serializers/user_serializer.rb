# frozen_string_literal: true

class UserSerializer < ActiveModel::Serializer
  attributes :id, :public_id, :name, :username, :avatar, :email,
             :profile, :following?, :followed?, :muting?, :uid, :provider
  has_many :posts

  def followed?
    scope&.following?(object)
  end

  def following?
    object.following.include?(scope)
  end

  def muting?
    object.mutees.include?(scope)
  end
end
