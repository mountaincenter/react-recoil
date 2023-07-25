# frozen_string_literal: true

#
# following user serializer
#
class FollowingUserSerializer < ActiveModel::Serializer
  attributes :id, :name, :username, :profile, :avatar, :followed?, :following?

  def followed?
    scope&.following?(object)
  end

  def following?
    object.following.include?(scope)
  end
end
