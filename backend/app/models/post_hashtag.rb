# frozen_string_literal: true

class PostHashtag < ApplicationRecord
  belongs_to :post
  belongs_to :hashtag
end
