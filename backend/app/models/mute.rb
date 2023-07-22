class Mute < ApplicationRecord
  belongs_to :muted_by, class_name:  "User"
  belongs_to :mutee, class_name: "User"
end
