# frozen_string_literal: true

unless Message.exists?

  users = User.all
  users.each do |user|
    other_users = users.to_a.reject { |u| u.id == user.id }.shuffle

    other_users.each do |other_user|
      num_messages = rand(0..5)
      num_messages.times do |_i|
        body = Faker::Lorem.paragraph_by_chars(number: rand(1..20), supplemental: false)
        message = Message.create!(sender: user, recipient: other_user, body:)
        Notification.create!(user: other_user, notifiable: message, notification_type: "message")
      end
    end
  end
end
