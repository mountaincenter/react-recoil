# frozen_string_literal: true

#
# original serializer
#
class OriginalSerializer < ActiveModel::Serializer
  attributes :id, :content, :images, :public_id, :created_at, :updated_at, :user
  def user
    object.user.as_json(only: %i[id name username])
  end
end
