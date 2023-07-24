# frozen_string_literal: true

class ParentSerializer < ActiveModel::Serializer
  attributes :id, :content, :images, :public_id, :created_at, :updated_at, :user
  def user
    object.user.as_json(only: %i[id name username])
  end
end
