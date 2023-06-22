class TodoSerializer < ActiveModel::Serializer
  attributes :id, :title, :is_complete, :created_at, :updated_at
  belongs_to :user
end
