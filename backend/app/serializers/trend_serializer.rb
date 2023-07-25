# frozen_string_literal: true

#
# trend serializer
#
class TrendSerializer < ActiveModel::Serializer
  attributes :name, :posts_count

  def name
    object.name
  end

  def posts_count
    object.posts.count
  end
end
