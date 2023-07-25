# frozen_string_literal: true

#
# mute model
#
class Mute < ApplicationRecord
  belongs_to :muted_by, class_name: "User"
  belongs_to :mutee, class_name: "User"
end
