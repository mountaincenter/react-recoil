# frozen_string_literal: true

#
# post hashtag model
#
class PostHashtag < ApplicationRecord
  belongs_to :post
  belongs_to :hashtag
end
