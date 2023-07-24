# frozen_string_literal: true

class LikeSerializer < ActiveModel::Serializer
  attributes :id, :user, :post, :created_at, :updated_at

  def user
    object.user.as_json(only: %i[id name username avatar])
  end

  def post
    object.post.as_json(only: %i[id content])
  end
end
