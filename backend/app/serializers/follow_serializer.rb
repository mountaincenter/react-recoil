class FollowSerializer < ActiveModel::Serializer
  attributes :id, :follower_id, :following_id, :created_at, :updated_at
  belongs_to :follower, serializer: UserSerializer
  belongs_to :following, serializer: UserSerializer
end
