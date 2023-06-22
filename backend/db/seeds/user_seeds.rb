unless User.exists?
  avatars = [
    File.open("app/assets/images/icon01.png"),
    File.open("app/assets/images/icon02.jpeg"),
    File.open("app/assets/images/icon03.png"),
    nil,
  ]

  num_users = 10
  num_users.times do |i|
    email = "test#{i + 1}@example.com"
    # 英語の名前を使用
    name = Faker::Name.name
    # 日本語の名前を使用
    Faker::Config.locale = 'ja'
    jp_name = Faker::Name.name
    # ロケールを元に戻す
    Faker::Config.locale = nil
    # 交互に英語名と日本語名を使用
    name = i.odd? ? jp_name : name
    avatar = avatars[i % avatars.size]
    User.create!(email: email, password:"password",
                 uid: email, provider: "email", name: name, username: "testuser#{i +1}",
                 avatar: avatar, profile: Faker::Lorem.paragraph_by_chars(number: 160, supplemental: false))
  end

  guest = "guest@example.com"
  User.create!(email:guest, password: "password",
               uid: guest, provider: "email", name:"ゲストユーザー", username: "guestuser", profile: "ゲストユーザーです。")

  users = User.all
  users.each do |user|
    num_to_follow = rand(1..num_users)
    users_to_follow = users.where.not(id: user.id).sample(num_to_follow)
    users_to_follow.each do |user_to_follow|
      user.following << user_to_follow unless user.following.include?(user_to_follow)
    end
  end
end