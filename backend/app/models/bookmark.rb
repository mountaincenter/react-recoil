# frozen_string_literal: true

#
# bookmark model
#
class Bookmark < ApplicationRecord
  belongs_to :user
  belongs_to :post
end
